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
        className="mb-[28px] flex h-[32px] w-[32px] cursor-pointer items-center justify-center text-black transition-colors duration-150 hover:text-[#2F8677]"
      >
        <Icon icon="ic:baseline-chevron-left" className="h-[28px] w-[28px]" aria-hidden="true" />
      </button>

      {/* Search */}
      <div className="mb-[28px] flex h-[40px] w-full items-center gap-[8px] rounded-[8px] border border-solid border-[#F0F0F0] bg-[#F8FAFC] px-[12px]">
        <Icon
          icon="ic:baseline-search"
          className="h-[20px] w-[20px] shrink-0 text-[#666]"
          aria-hidden="true"
        />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search messages..."
          className="flex-1 bg-transparent font-['Inter'] text-[14px] text-[#2F3136] outline-none placeholder:text-[#666]"
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
              ? 'bg-[#0B251C] text-white'
              : 'bg-transparent text-[#0B251C] hover:bg-[#E6F7F1]',
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
              ? 'bg-[#CBF6ED] text-[#096C5B]'
              : 'bg-transparent text-[#096C5B] hover:bg-[#E6F7F1]',
          ].join(' ')}
        >
          <span>Unread</span>
          <span>{unreadCount}</span>
        </button>
      </div>

      {/* Message list */}
      <div className="flex flex-1 flex-col gap-[12px] overflow-y-auto pb-[12px] pr-[2px]">
        {filtered.length === 0 ? (
          <p className="mt-4 text-center font-['Lora'] text-[12px] text-[#666]">
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
      <div className="mx-auto mb-[12px] mt-[12px] h-[1px] w-[228px] bg-[#BEBEBE]" />

      {/* View Archived Messages */}
      <button
        type="button"
        onClick={onViewArchived}
        className="mx-auto cursor-pointer font-['Lora'] text-[12px] font-semibold tracking-[0.24px] text-[#001D18] transition-colors hover:text-[#2F8677] hover:underline"
      >
        View Archived Messages
      </button>
    </div>
  );
};

export default SideBarAdminMessagesView;
