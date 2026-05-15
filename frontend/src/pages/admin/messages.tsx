import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Icon } from '@iconify/react';
import SideBarAdmin from '../../components/admin/SideBarAdmin';
import AdminPageTransition from '../../components/admin/AdminPageTransition';
import PageBackground from '../../components/general/PageBackground';
import type { MessageItem } from '../../components/admin/SideBarAdminMessagesView';

type ChatMessage = {
  id: string;
  from: 'them' | 'you';
  text: string;
};

type Conversation = {
  id: string;
  name: string;
  role: string;
  messages: ChatMessage[];
};

const mockInbox: MessageItem[] = [
  {
    id: 'msg-1',
    sender: 'Three Sapphire Place',
    preview: 'Hi Daphne! Your application is being reviewed by our do...',
    timeLabel: '1hr ago',
    unread: true,
  },
  {
    id: 'msg-2',
    sender: 'Three Sapphire Place',
    preview: 'Hi Daphne! Your application is being reviewed by our do...',
    timeLabel: '1hr ago',
    unread: true,
  },
  {
    id: 'msg-3',
    sender: 'Three Sapphire Place',
    preview: 'Hi Daphne! Your application is being reviewed by our do...',
    timeLabel: '1hr ago',
    unread: true,
  },
  {
    id: 'msg-4',
    sender: 'Three Sapphire Place',
    preview: 'Hi Daphne! Your application is being reviewed by our do...',
    timeLabel: '1hr ago',
    unread: false,
  },
  {
    id: 'msg-5',
    sender: 'Three Sapphire Place',
    preview: 'Hi Daphne! Your application is being reviewed by our do...',
    timeLabel: '1hr ago',
    unread: false,
  },
];

const mockConversations: Record<string, Conversation> = {
  'msg-1': {
    id: 'msg-1',
    name: 'Three Sapphire Place',
    role: 'Landlord',
    messages: [
      {
        id: 'c1',
        from: 'them',
        text: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem...',
      },
      {
        id: 'c2',
        from: 'them',
        text: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem...',
      },
      {
        id: 'c3',
        from: 'you',
        text: 'Lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem...',
      },
    ],
  },
};

const getConversation = (id: string | null | undefined): Conversation | null => {
  if (!id) return null;
  if (mockConversations[id]) return mockConversations[id];
  // Build a fallback conversation using the inbox preview.
  const item = mockInbox.find((m) => m.id === id);
  if (!item) return null;
  return {
    id: item.id,
    name: item.sender,
    role: 'Landlord',
    messages: [{ id: 'preview', from: 'them', text: item.preview }],
  };
};

function Messages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedId = searchParams.get('id');
  const conversation = useMemo(() => getConversation(selectedId), [selectedId]);
  const [draft, setDraft] = useState('');

  const handleSelectMessage = (id: string) => {
    setSearchParams({ id });
  };

  return (
    <AdminPageTransition>
      <div className="relative -mx-[calc((100vw-100%)/2)] flex w-screen h-screen flex-col overflow-hidden bg-transparent">
        <PageBackground />
        <div className="flex flex-1 relative z-10 overflow-hidden">
          <SideBarAdmin
            activeItem="messages"
            initialView="messages_tab"
            messages={mockInbox}
            activeMessageId={selectedId ?? undefined}
            onSelectMessage={handleSelectMessage}
          />

          {/* Main body: chat thread */}
          <div className="flex flex-1 overflow-y-auto items-start justify-center bg-transparent px-[32px] py-[24px]">
            <div className="flex h-[calc(100vh-48px)] min-h-[600px] w-full max-w-[1036px] flex-col overflow-hidden rounded-[12px] border border-solid border-[#F0F0F0] dark:border-[#303331] bg-white dark:bg-[#141515] shadow-[0px_2px_20px_0px_rgba(0,0,0,0.06)]">
              {conversation ? (
                <>
                  {/* Conversation header */}
                  <div className="flex items-center gap-[13px] border-b border-solid border-[#F0F0F0] dark:border-[#303331] px-[18px] py-[10px]">
                    <div className="flex h-[46px] w-[46px] items-center justify-center overflow-hidden rounded-full bg-[#E5E7EB] dark:bg-[#242526] text-[#666] dark:text-[#a4acba]">
                      <Icon icon="mdi:home-city" className="h-[28px] w-[28px]" aria-hidden="true" />
                    </div>
                    <div className="flex flex-col">
                      <h2 className="font-['Inter'] text-[24px] font-bold leading-[32px] text-[#001D18] dark:text-[#d7e0ef]">
                        {conversation.name}
                      </h2>
                      <p className="font-['Poppins'] text-[15px] text-[#001D18] dark:text-[#a4acba]">
                        {conversation.role}
                      </p>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="flex flex-1 flex-col gap-[30px] overflow-y-auto px-[48px] py-[32px]">
                    <ChatThread name={conversation.name} messages={conversation.messages} />
                  </div>

                  {/* Composer */}
                  <div className="border-t border-solid border-[#F0F0F0] dark:border-[#303331] bg-white dark:bg-[#141515] px-[28px] py-[20px]">
                    <div className="flex items-center gap-[12px]">
                      <div className="flex flex-1 items-center rounded-[12px] border border-solid border-[rgba(27,61,47,0.1)] dark:border-[#303331] bg-[#F5F5F5] dark:bg-[#1f2022] px-[16px] py-[14px]">
                        <input
                          type="text"
                          value={draft}
                          onChange={(e) => setDraft(e.target.value)}
                          placeholder="Aa"
                          className="flex-1 bg-transparent font-['Lora'] text-[16px] font-medium text-[#001D18] dark:text-[#d7e0ef] outline-none placeholder:text-[#666] dark:placeholder:text-[#a4acba]"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => setDraft('')}
                        aria-label="Send message"
                        className="flex h-[40px] w-[40px] cursor-pointer items-center justify-center rounded-full bg-[#024338] text-white transition-colors hover:bg-[#0b251c]"
                      >
                        <Icon
                          icon="mynaui:send-solid"
                          className="h-[20px] w-[20px]"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <EmptyChatState />
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminPageTransition>
  );
}

type ChatThreadProps = {
  name: string;
  messages: ChatMessage[];
};

function ChatThread({ name, messages }: ChatThreadProps) {
  const fromThem = messages.filter((m) => m.from === 'them');
  const fromYou = messages.filter((m) => m.from === 'you');

  return (
    <>
      {fromThem.length > 0 && (
        <div className="flex flex-col items-start gap-[4px]">
          <p className="font-['Inter'] text-[14px] font-bold text-[#001D18] dark:text-[#a4acba]">
            {name}
          </p>
          <div className="flex flex-col items-start gap-[4px]">
            {fromThem.map((m) => (
              <div
                key={m.id}
                className="max-w-[520px] rounded-[12px] rounded-tl-[2px] bg-[#F5F5F5] dark:bg-[#1f2022] px-[16px] py-[12px]"
              >
                <p className="font-['Lora'] text-[14px] font-medium text-[#001D18] dark:text-[#d7e0ef]">
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {fromYou.length > 0 && (
        <div className="flex flex-col items-end gap-[4px]">
          <p className="font-['Inter'] text-[14px] font-bold text-[#001D18] dark:text-[#a4acba]">
            You
          </p>
          <div className="flex flex-col items-end gap-[4px]">
            {fromYou.map((m) => (
              <div
                key={m.id}
                className="max-w-[520px] rounded-[12px] rounded-tr-[2px] bg-[#024338] px-[16px] py-[12px]"
              >
                <p className="text-right font-['Lora'] text-[14px] font-medium text-white">
                  {m.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function EmptyChatState() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-white dark:bg-[#141515]">
      <Icon
        icon="solar:chat-round-dots-outline"
        className="h-16 w-16 text-[#7c8db5] dark:text-[#a4acba]"
      />
      <h1 className="font-['Outfit'] text-[28px] font-semibold text-black dark:text-[#d7e0ef]">
        Select a conversation
      </h1>
      <p className="font-['Outfit'] text-[16px] text-[#7c8db5] dark:text-[#a4acba]">
        Pick a message from the list on the left to open the chat.
      </p>
    </div>
  );
}

export default Messages;
