import { type FunctionComponent, useState, useRef, useEffect, useCallback } from 'react';

interface ChatMessage {
  _id: string;
  senderId: string;
  text: string;
  createdAt: string;
}

interface ChatDetailProps {
  title: string;
  subtitle: string;
  avatar?: string;
  messages: ChatMessage[];
  myId?: string;
  typingUsers: string[];
  showInput?: boolean;
  onSendMessage?: (text: string) => void;
  onTyping?: (isTyping: boolean) => void;
}

const ChatDetail: FunctionComponent<ChatDetailProps> = ({
  title,
  subtitle,
  avatar,
  messages,
  myId,
  typingUsers,
  showInput = false,
  onSendMessage,
  onTyping,
}) => {
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  });

  const handleTyping = useCallback(
    (value: string) => {
      setInput(value);
      if (!onTyping) return;
      if (value.length > 0) {
        onTyping(true);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
        typingTimeoutRef.current = setTimeout(() => onTyping(false), 2000);
      } else {
        onTyping(false);
        if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
      }
    },
    [onTyping],
  );

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed || !onSendMessage) return;
    onSendMessage(trimmed);
    setInput('');
    if (onTyping) onTyping(false);
    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const typingText =
    typingUsers.length > 0
      ? `${typingUsers.join(', ')} ${typingUsers.length === 1 ? 'is' : 'are'} typing...`
      : null;

  return (
    <div className="w-full h-full flex flex-col font-inter relative">
      {/* Header */}
      <div className="mx-8 mt-8 mb-4 p-4 bg-white rounded-[20px] border border-whitesmoke-200 shadow-sm dark:bg-[#101111] dark:border-[#303331] dark:shadow-none flex items-center gap-4 animate-fade-in relative z-10">
        <div className="w-16 h-16 rounded-full overflow-hidden bg-whitesmoke-300 shrink-0 dark:bg-[#202221]">
          {avatar ? (
            <img src={avatar} alt={title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-num-24 font-bold text-teal bg-teal/10">
              {title.charAt(0)}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <h1 className="text-num-24 font-bold text-darkslategray dark:text-[#edf6f4] m-0 leading-tight">
            {title}
          </h1>
          <span className="text-num-14 text-slategray dark:text-[#a4acba] font-medium">
            {subtitle}
          </span>
          {typingText && (
            <span className="text-num-12 text-teal font-medium italic mt-0.5">{typingText}</span>
          )}
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 px-12 py-4 flex flex-col gap-8 overflow-y-auto relative z-10">
        {messages.map((msg) => {
          const isMe = msg.senderId === myId;
          const senderLabel = isMe ? 'You' : title;
          return (
            <div
              key={msg._id}
              className={`flex flex-col gap-1 max-w-[70%] ${isMe ? 'self-end items-end' : 'self-start items-start'}`}
            >
              <span
                className={`text-num-12 font-bold text-darkslategray px-2 dark:text-[#d7e0ef] ${isMe ? 'text-right' : 'text-left'}`}
              >
                {senderLabel}
              </span>
              <div
                className={`px-6 py-4 rounded-[20px] shadow-sm text-num-16 leading-relaxed font-medium transition-all hover:shadow-md ${
                  isMe
                    ? 'bg-teal text-white rounded-tr-none'
                    : 'bg-whitesmoke-100 text-darkslategray rounded-tl-none border border-whitesmoke-200 dark:bg-[#171918] dark:text-[#d7e0ef] dark:border-[#303331]'
                }`}
              >
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Optional Input */}
      {showInput && (
        <div className="p-8 relative z-10">
          <div className="w-full bg-white rounded-full border border-whitesmoke-200 dark:bg-[#101111] dark:border-[#303331] p-2 flex items-center gap-2 shadow-sm focus-within:ring-1 focus-within:ring-teal/30">
            <input
              type="text"
              placeholder="Aa"
              value={input}
              onChange={(e) => handleTyping(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none px-6 py-2 text-num-14 font-medium text-darkslategray dark:text-[#edf6f4]"
            />
            <button
              type="button"
              onClick={handleSend}
              className="w-10 h-10 rounded-full bg-teal/10 flex items-center justify-center text-teal hover:bg-teal hover:text-white transition-all cursor-pointer"
            >
              <svg
                className="w-6 h-6 fill-current"
                viewBox="0 0 24 24"
                role="img"
                aria-label="Send message"
              >
                <title>Send</title>
                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatDetail;
