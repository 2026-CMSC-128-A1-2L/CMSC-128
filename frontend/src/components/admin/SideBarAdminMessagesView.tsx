import { useState } from 'react';
import { Icon } from '@iconify/react';
import MessageCard, { type MessageCardState } from '../general/MessageCard';

export type MessageItem = {
  id: string;
  sender: string;
  preview: string;
  timeLabel: string;
  unread?: boolean;
};

type SideBarAdminMessagesViewProps = {
  messages: MessageItem[];
  activeMessageId?: string;
  onSelectMessage?: (id: string) => void;
  onBack?: () => void;
  onViewArchived?: () => void;
};

const SideBarAdminMessagesView = ({
  messages,
  activeMessageId,
  onSelectMessage,
  onBack,
  onViewArchived,
}: SideBarAdminMessagesViewProps) => {
  const [filter, setFilter] = useState<'all' | 'unread'>('all');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [query, setQuery] = useState('');

  const unreadCount = messages.filter((m) => m.unread).length;

  const filtered = messages
    .filter((m) => (filter === 'unread' ? m.unread : true))
    .filter((m) => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return m.sender.toLowerCase().includes(q) || m.preview.toLowerCase().includes(q);
    });

  const resolveState = (id: string): MessageCardState => {
    if (id === activeMessageId) return 'clicked';
    if (id === hoveredId) return 'hovered';
    return 'default';
  };

  return (
    <div className="flex h-full w-full flex-col px-[36px] pb-[24px] pt-[24px]">
      <button
        type="button"
        onClick={onBack}
        aria-label="Back to navigation"
        className="mb-[28px] flex h-[32px] w-[32px] cursor-pointer items-center justify-center text-black dark:text-[#d7e0ef] transition-colors duration-150 hover:text-[#2F8677] dark:hover:text-[#72cbb8]"
      >
        <Icon icon="ic:baseline-chevron-left" className="h-[28px] w-[28px]" aria-hidden="true" />
      </button>

      {/* Search */}
      <div className="mb-[28px] flex h-[40px] w-full items-center gap-[8px] rounded-[8px] border border-solid border-[#F0F0F0] dark:border-[#303331] bg-[#F8FAFC] dark:bg-[#1f2022] px-[12px]">
        <Icon
          icon="ic:baseline-search"
          className="h-[20px] w-[20px] shrink-0 text-[#666] dark:text-[#a4acba]"
          aria-hidden="true"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search messages..."
          className="flex-1 bg-transparent font-['Inter'] text-[14px] text-[#2F3136] dark:text-[#d7e0ef] outline-none placeholder:text-[#666] dark:placeholder:text-[#a4acba]"
        />
      </div>

      {/* Filters */}
      <div className="mb-[20px] flex items-center gap-[8px]">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={[
            "h-[32px] cursor-pointer rounded-full px-[16px] font-['Inter'] text-[12px] font-bold transition-colors duration-200",
            filter === 'all'
              ? 'bg-[#0B251C] dark:bg-[#72cbb8] text-white dark:text-[#101111]'
              : 'bg-transparent text-[#0B251C] dark:text-[#a4acba] hover:bg-[#E6F7F1] dark:hover:bg-[#17201d]',
          ].join(' ')}
        >
          All
        </button>
        <button
          type="button"
          onClick={() => setFilter('unread')}
          className={[
            "flex h-[32px] cursor-pointer items-center gap-[6px] rounded-full px-[16px] font-['Inter'] text-[12px] font-bold transition-colors duration-200",
            filter === 'unread'
              ? 'bg-[#CBF6ED] dark:bg-[#12342e] text-[#096C5B] dark:text-[#72cbb8]'
              : 'bg-transparent text-[#096C5B] dark:text-[#72cbb8] hover:bg-[#E6F7F1] dark:hover:bg-[#17201d]',
          ].join(' ')}
        >
          <span>Unread</span>
          <span>{unreadCount}</span>
        </button>
      </div>

      {/* Message list */}
      <div className="flex flex-1 flex-col gap-[12px] overflow-y-auto pb-[12px] pr-[2px] cursor-pointer">
        {filtered.length === 0 ? (
          <p className="mt-4 text-center font-['Lora'] text-[12px] text-[#666] dark:text-[#a4acba]">
            No messages found.
          </p>
        ) : (
          filtered.map((m) => (
            <MessageCard
              key={m.id}
              sender={m.sender}
              preview={m.preview}
              timeLabel={m.timeLabel}
              state={resolveState(m.id)}
              onMouseEnter={() => setHoveredId(m.id)}
              onMouseLeave={() => setHoveredId((prev) => (prev === m.id ? null : prev))}
              onClick={() => onSelectMessage?.(m.id)}
            />
          ))
        )}
      </div>

      {/* Divider */}
      <div className="mx-auto mb-[12px] mt-[12px] h-px w-[228px] bg-[#BEBEBE] dark:bg-[#303331]" />

      {/* View Archived Messages */}
      <button
        type="button"
        onClick={onViewArchived}
        className="mx-auto cursor-pointer font-['Lora'] text-[12px] font-semibold tracking-[0.24px] text-[#001D18] dark:text-[#a4acba] transition-colors hover:text-[#2F8677] dark:hover:text-[#72cbb8] hover:underline"
      >
        View Archived Messages
      </button>
    </div>
  );
};

export default SideBarAdminMessagesView;
