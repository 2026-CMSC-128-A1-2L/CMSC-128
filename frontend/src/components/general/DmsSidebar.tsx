import {
  useState,
  type FunctionComponent,
  type Dispatch,
  type SetStateAction,
} from "react";
import Message from "../general/InboxMessage";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

interface NotificationItem {
  id: number;
  title: string;
  unread: boolean;
  // ... other properties are handled in the parent, but we need these for rendering
}

interface DMItem {
  id: number;
  title: string;
  body: string;
  time: string;
  icon: string;
  unread: boolean;
  unreadCount?: number;
  archived: boolean;
}

interface DmsSidebarProps {
  notifications: any[];
  directMessages: DMItem[];
  selectedItem: { type: "notification" | "dm"; id: number } | null;
  onItemSelect: (type: "notification" | "dm", id: number) => void;
  setNotifications: Dispatch<SetStateAction<any[]>>;
  setDirectMessages: Dispatch<SetStateAction<DMItem[]>>;
}

const DmsSidebar: FunctionComponent<DmsSidebarProps> = ({
  notifications,
  directMessages,
  selectedItem,
  onItemSelect,
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [showAllNotifications, setShowAllNotifications] = useState(false);
  const [dmFilter, setDmFilter] = useState<"all" | "unread">("all");
  const [showAllArchive, setShowAllArchive] = useState(false);

  const displayedNotifications = showAllNotifications
    ? notifications
    : notifications.slice(0, 2);

  const activeDMs = directMessages.filter((dm) => !dm.archived);
  const archivedDMs = directMessages.filter((dm) => dm.archived);

  const filteredActiveDMs = activeDMs.filter((dm) => {
    if (dmFilter === "unread") return dm.unread;
    return true;
  });

  const totalUnreadCount = activeDMs.reduce(
    (acc, dm) => acc + (dm.unreadCount || 0),
    0,
  );

  const displayedArchivedDMs = showAllArchive ? archivedDMs : [];

  return (
    <div className="w-72 h-screen relative flex flex-col items-start py-10 pl-4 pr-3 box-border gap-2 text-left font-inter bg-white shadow-[4px_0_24px_rgba(0,0,0,0.02)] dark:bg-[#101111] dark:text-[#d7e0ef] dark:shadow-[4px_0_24px_rgba(0,0,0,0.25)] overflow-y-auto overflow-x-hidden">
      <div className="w-full flex flex-col items-start gap-8">
        {/* Header & Search */}
        <div className="w-full flex items-center gap-2 text-[0.875rem] dark:gap-5">
          <Icon
            icon="material-symbols-light:chevron-left"
            className="w-8 h-8 cursor-pointer shrink-0 hover:text-teal transition-colors"
            onClick={() => navigate("/home")}
          />
          <div className="flex-1 px-3 py-2 rounded-num-8 bg-unavailable_action flex items-center gap-2 transition-all focus-within:ring-1 focus-within:ring-teal/30 focus-within:bg-white focus-within:shadow-sm dark:bg-[#202123] dark:focus-within:bg-[#2a2c2e] dark:focus-within:ring-[#72cbb8]/30 dark:shadow-none">
            <Icon
              icon="material-symbols:search"
              className="w-4 h-4 text-unselected shrink-0 dark:text-[#a4acba]"
            />
            <input
              type="text"
              placeholder="Search messages"
              value={searchQuery}
              maxLength={50}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-num-14 font-medium text-darkgreen placeholder:text-unselected dark:text-[#d7e0ef] dark:placeholder:text-[#a4acba]"
            />
          </div>
        </div>

        {/* Notifications Section */}
        <div
          id="notif-section"
          className="self-stretch flex flex-col items-start gap-2 font-lora"
        >
          <div className="self-stretch flex items-center justify-between py-1 font-inter">
            <b className="relative flex items-start pl-2 text-num-18 text-[#2d3748] dark:text-[#d7e0ef] dark:text-[1.65rem]">
              Notifications
            </b>
            <span className="bg-teal/10 text-teal text-[10px] font-bold px-2 py-0.5 rounded-full dark:bg-[#102c27] dark:text-[#72cbb8]">
              New
            </span>
          </div>

          <div className="w-[260px] flex flex-col items-start gap-2 text-right text-[0.5rem]">
            {displayedNotifications.map((notif) => (
              <Message
                key={notif.id}
                title={notif.title}
                body={notif.body || notif.headline}
                time={notif.time}
                icon="iconamoon:notification"
                unread={notif.unread}
                onClick={() => onItemSelect("notification", notif.id)}
                active={
                  selectedItem?.type === "notification" &&
                  selectedItem?.id === notif.id
                }
              />
            ))}
          </div>

          <button
            className="w-full mt-1 flex items-center justify-center gap-1 group"
            onClick={() => setShowAllNotifications(!showAllNotifications)}
          >
            <div className="relative font-semibold text-num-12 text-teal group-hover:underline">
              {showAllNotifications ? "Show Less" : "View All"}
            </div>
            <Icon
              icon={
                showAllNotifications
                  ? "material-symbols-light:chevron-up"
                  : "material-symbols-light:chevron-right"
              }
              className="w-5 h-5 text-teal group-hover:translate-x-0.5 transition-transform"
            />
          </button>
        </div>

        {/* Direct Messages Section */}
        <div
          id="dm-section"
          className="h-fit w-full flex flex-col items-start gap-4 font-lora"
        >
          <div className="self-stretch flex items-end py-1 font-inter">
            <b className="w-full flex-1 relative flex items-start text-num-18 pl-2 text-[#2d3748] dark:text-[#d7e0ef] dark:text-[1.65rem]">
              Direct Messages
            </b>
          </div>

          {/* Filter Pills */}
          <div className="w-full flex items-start gap-2 pl-2">
            <button
              className={`h-fit rounded-full flex items-center justify-center py-1.5 px-5 transition-all active:scale-95 ${dmFilter === "all"
                  ? "bg-teal text-white shadow-md shadow-teal/20 dark:bg-[#0d3a32] dark:text-[#d7e0ef] dark:shadow-none"
                  : "bg-lightcyan text-teal hover:bg-teal/10 dark:bg-[#102c27] dark:text-[#72cbb8] dark:hover:bg-[#17352f]"
                }`}
              onClick={() => setDmFilter("all")}
            >
              <b className="relative text-num-12 font-inter">All</b>
            </button>
            <button
              className={`h-fit rounded-full flex items-center justify-center py-1.5 px-5 transition-all active:scale-95 ${dmFilter === "unread"
                  ? "bg-teal text-white shadow-md shadow-teal/20 dark:bg-[#0d3a32] dark:text-[#d7e0ef] dark:shadow-none"
                  : "bg-lightcyan text-teal hover:bg-teal/10 dark:bg-[#102c27] dark:text-[#72cbb8] dark:hover:bg-[#17352f]"
                }`}
              onClick={() => setDmFilter("unread")}
            >
              <b className="relative text-num-12 font-inter flex items-center gap-1">
                Unread{" "}
                {totalUnreadCount > 0 && (
                  <span className="opacity-80">{totalUnreadCount}</span>
                )}
              </b>
            </button>
          </div>

          {/* Active Messages List */}
          <div className="w-full flex flex-col items-start gap-2 text-right text-[0.5rem]">
            {filteredActiveDMs.length > 0 ? (
              filteredActiveDMs.map((dm) => (
                <Message
                  key={dm.id}
                  title={dm.title}
                  body={dm.body}
                  time={dm.time}
                  icon={dm.icon}
                  unread={dm.unread}
                  unreadCount={dm.unreadCount}
                  onClick={() => onItemSelect("dm", dm.id)}
                  active={
                    selectedItem?.type === "dm" && selectedItem?.id === dm.id
                  }
                />
              ))
            ) : (
              <p className="w-full text-center text-num-12 text-dimgray py-4 font-inter dark:text-[#a4acba]">
                No messages found
              </p>
            )}
          </div>

          {/* Archive Section */}
          <div
            id="archive-section"
            className="w-full flex flex-col items-start gap-2 mt-4"
          >
            <div className="self-stretch flex items-center justify-between py-1 border-t border-whitesmoke pt-4 dark:border-[#303331]">
              <b className="relative flex items-start pl-2 text-num-14 text-slategray dark:text-gray-400 font-inter uppercase tracking-wider">
                Archive
              </b>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-whitesmoke text-slategray dark:bg-[#202221] dark:text-[#a4acba]">
                {archivedDMs.length}
              </span>
            </div>

            <div className="w-full flex flex-col items-start gap-2 text-right text-[0.5rem]">
              {displayedArchivedDMs.map((dm) => (
                <Message
                  key={dm.id}
                  title={dm.title}
                  body={dm.body}
                  time={dm.time}
                  icon={dm.icon}
                  unread={dm.unread}
                  unreadCount={dm.unreadCount}
                  onClick={() => onItemSelect("dm", dm.id)}
                  active={
                    selectedItem?.type === "dm" && selectedItem?.id === dm.id
                  }
                />
              ))}
            </div>

            <button
              className="w-full flex items-center justify-center gap-1 text-center group mt-1"
              onClick={() => setShowAllArchive(!showAllArchive)}
            >
              <div className="relative font-semibold text-num-12 text-teal group-hover:underline">
                {showAllArchive ? "Show Less" : "View Archive"}
              </div>
              <Icon
                icon={
                  showAllArchive
                    ? "material-symbols-light:chevron-up"
                    : "material-symbols-light:chevron-right"
                }
                className="w-5 h-5 text-teal group-hover:translate-x-0.5 transition-transform"
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DmsSidebar;
