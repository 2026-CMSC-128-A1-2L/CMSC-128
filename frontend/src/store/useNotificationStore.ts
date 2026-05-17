import { create } from 'zustand';
import { NotificationService } from '../service/NotificationService';
import { pusherClient } from '../service/pusherInstance';
import { useAuthStore } from './useAuthStore';

type Notification = {
  _id: string;
  subject: string;
  content: string;
  status: string;
  createdAt: string;
};

type NotificationState = {
  notifications: Notification[];
  _channel: ReturnType<typeof pusherClient.subscribe> | null;
  fetchNotifications: () => Promise<void>;
  readNotification: (notificationId: string) => Promise<void>;
  subscribeToPusher: () => void;
  unsubscribeFromPusher: () => void;
};

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  _channel: null,

  fetchNotifications: async () => {
    const { data } = await NotificationService.getNotifications({ status: undefined });
    set({ notifications: data });
  },

  readNotification: async (notificationId: string) => {
    await NotificationService.readNotification(notificationId);
    set((s) => ({
      notifications: s.notifications.map((n) =>
        n._id === notificationId ? { ...n, status: 'read' } : n,
      ),
    }));
  },

  subscribeToPusher: () => {
    const myId = useAuthStore.getState().user?._id;
    if (!myId) return;

    const channel = pusherClient.subscribe(`private-user-${myId}`);
    channel.bind('new-notification', (notif: Notification) => {
      set((s) => ({
        notifications: [notif, ...s.notifications],
      }));
    });

    set({ _channel: channel });
  },

  unsubscribeFromPusher: () => {
    const channel = get()._channel;
    if (channel) {
      pusherClient.unsubscribe(channel.name);
    }
    set({ _channel: null });
  },
}));
