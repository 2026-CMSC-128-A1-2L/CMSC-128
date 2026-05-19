import { create } from 'zustand';
import { MessageService } from '../service/MessageService';
import { pusherClient, getChatChannelName } from '../service/pusherInstance';
import { useAuthStore } from './useAuthStore';

type Conversation = {
  user: {
    id: string;
    profilePicture: string | null | undefined;
    firstName: string;
    middleName: string | null | undefined;
    lastName: string;
    userType: string;
  };
  message: {
    userId: string;
    text: string;
  };
  createdAt: string;
  readAt: string | null | undefined;
};

type ChatMessage = {
  _id: string;
  senderId: string;
  receiverId: string;
  text: string;
  createdAt: string;
};

type MessageState = {
  conversations: Conversation[];
  activeUserId: string | null;
  activeMessages: ChatMessage[];
  activeOtherUser: Conversation['user'] | null;
  typingUsers: string[];
  _userChannel: ReturnType<typeof pusherClient.subscribe> | null;
  _chatChannel: ReturnType<typeof pusherClient.subscribe> | null;
  fetchConversations: () => Promise<void>;
  setActiveConversation: (otherUserId: string) => Promise<void>;
  sendMessage: (otherUserId: string, text: string) => Promise<void>;
  emitTyping: (_otherUserId: string, isTyping: boolean) => void;
  subscribeToPusher: () => void;
  unsubscribeFromPusher: () => void;
};

const getMyId = (): string | undefined => useAuthStore.getState().user?._id;

export const useMessageStore = create<MessageState>((set, get) => ({
  conversations: [],
  activeUserId: null,
  activeMessages: [],
  activeOtherUser: null,
  typingUsers: [],
  _userChannel: null,
  _chatChannel: null,

  fetchConversations: async () => {
    const { data } = await MessageService.getMessages();
    set({ conversations: data.conversations });
  },

  setActiveConversation: async (otherUserId: string) => {
    const state = get();
    if (state._chatChannel) {
      pusherClient.unsubscribe(state._chatChannel.name);
    }

    const { data } = await MessageService.getUserMessages(otherUserId);
    const otherUser = state.conversations.find((c) => c.user.id === otherUserId)?.user ?? {
      id: data.user.id,
      profilePicture: data.user.profilePicture,
      firstName: data.user.firstName,
      middleName: data.user.middleName,
      lastName: data.user.lastName,
      userType: data.user.userType,
    };

    const myId = getMyId();
    const messages: ChatMessage[] = data.messages.map(
      (m: { userId: string; text: string }, i: number) => ({
        _id: `msg-${i}`,
        senderId: m.userId,
        receiverId: m.userId === otherUserId ? (myId ?? '') : otherUserId,
        text: m.text,
        createdAt: new Date().toISOString(),
      }),
    );

    let chatChannel = null;
    if (myId) {
      chatChannel = pusherClient.subscribe(getChatChannelName(myId, otherUserId));
      chatChannel.bind('message-sent', (msg: ChatMessage) => {
        set((s) => {
          if (s.activeUserId !== otherUserId) return s;
          if (s.activeMessages.some((m) => m._id === msg._id)) return s;

          const myId = getMyId();
          const optimisticIdx = s.activeMessages.findIndex(
            (m) => m._id.startsWith('temp-') && m.senderId === myId && m.text === msg.text,
          );

          if (optimisticIdx >= 0) {
            const updated = [...s.activeMessages];
            updated[optimisticIdx] = msg;
            return { activeMessages: updated };
          }

          return { activeMessages: [...s.activeMessages, msg] };
        });
      });
      chatChannel.bind(
        'client-typing',
        ({ userId, isTyping }: { userId: string; isTyping: boolean }) => {
          set((s) => {
            if (s.activeUserId !== otherUserId) return s;
            const next = isTyping
              ? s.typingUsers.includes(userId)
                ? s.typingUsers
                : [...s.typingUsers, userId]
              : s.typingUsers.filter((u) => u !== userId);
            return { typingUsers: next };
          });
        },
      );
    }

    set({
      activeUserId: otherUserId,
      activeMessages: messages,
      activeOtherUser: otherUser,
      _chatChannel: chatChannel,
      typingUsers: [],
    });

    set((s) => ({
      conversations: s.conversations.map((conversation) =>
        conversation.user.id === otherUserId
          ? { ...conversation, readAt: data.readAt ?? new Date().toISOString() }
          : conversation,
      ),
    }));
  },

  sendMessage: async (otherUserId: string, text: string) => {
    const myId = getMyId();
    if (!myId) return;

    const tempId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const optimisticMsg: ChatMessage = {
      _id: tempId,
      senderId: myId,
      receiverId: otherUserId,
      text,
      createdAt: new Date().toISOString(),
    };

    set((s) => ({
      activeMessages:
        s.activeUserId === otherUserId ? [...s.activeMessages, optimisticMsg] : s.activeMessages,
      conversations: s.conversations.map((c) =>
        c.user.id === otherUserId
          ? {
              ...c,
              message: { userId: myId, text },
              createdAt: new Date().toISOString(),
              readAt: new Date().toISOString(),
            }
          : c,
      ),
    }));

    try {
      await MessageService.sendMessages(otherUserId, { text });
    } catch {
      set((s) => ({
        activeMessages: s.activeMessages.filter((m) => m._id !== tempId),
      }));
    }
  },

  emitTyping: (_otherUserId: string, isTyping: boolean) => {
    const myId = getMyId();
    if (!myId) return;
    const channel = get()._chatChannel;
    if (!channel) return;
    channel.trigger('client-typing', { userId: myId, isTyping });
  },

  subscribeToPusher: () => {
    const myId = getMyId();
    if (!myId) return;
    if (get()._userChannel) return;

    const userChannel = pusherClient.subscribe(`private-user-${myId}`);
    userChannel.bind('new-message', async (msg: ChatMessage) => {
      const state = get();
      const otherId = msg.senderId === myId ? msg.receiverId : msg.senderId;
      const idx = state.conversations.findIndex(
        (c) => c.user.id === msg.senderId || c.user.id === msg.receiverId,
      );
      const isMe = msg.senderId === myId;

      let otherUser: Conversation['user'];
      if (idx >= 0) {
        otherUser = state.conversations[idx].user;
      } else {
        try {
          const { data } = await MessageService.getUserMessages(otherId);
          otherUser = {
            id: data.user.id,
            profilePicture: data.user.profilePicture,
            firstName: data.user.firstName,
            middleName: data.user.middleName,
            lastName: data.user.lastName,
            userType: data.user.userType,
          };
        } catch {
          otherUser = {
            id: otherId,
            profilePicture: null,
            firstName: '',
            middleName: null,
            lastName: '',
            userType: '',
          };
        }
      }

      const conversation: Conversation = {
        user: otherUser,
        message: { userId: msg.senderId, text: msg.text },
        createdAt: msg.createdAt,
        readAt: isMe ? new Date().toISOString() : undefined,
      };

      set((s) => {
        const existing = s.conversations.findIndex((c) => c.user.id === conversation.user.id);
        const next =
          existing >= 0
            ? [conversation, ...s.conversations.filter((_, i) => i !== existing)]
            : [conversation, ...s.conversations];

        const activeId = s.activeUserId;
        let msgs = s.activeMessages;
        if (activeId === msg.senderId || activeId === msg.receiverId) {
          const targetOtherId = msg.senderId === myId ? msg.receiverId : msg.senderId;
          if (activeId === targetOtherId && !msgs.some((m) => m._id === msg._id)) {
            msgs = [...msgs, msg];
          }
        }

        return { conversations: next, activeMessages: msgs };
      });
    });

    set({ _userChannel: userChannel });
  },

  unsubscribeFromPusher: () => {
    const state = get();
    if (state._chatChannel) {
      pusherClient.unsubscribe(state._chatChannel.name);
    }
    if (state._userChannel) {
      pusherClient.unsubscribe(state._userChannel.name);
    }
    set({ _userChannel: null, _chatChannel: null, activeUserId: null, typingUsers: [] });
  },
}));
