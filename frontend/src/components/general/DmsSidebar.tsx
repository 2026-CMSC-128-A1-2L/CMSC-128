import { useState, type FunctionComponent } from "react";
import Message from "../general/InboxMessage";
import { Icon } from "@iconify/react";
import { useNavigate } from "react-router-dom";

const DmsSidebar: FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="w-72 h-screen relative overflow-hidden flex flex-col items-start py-10 pl-4 pr-3 box-border gap-2 text-left font-inter bg-white shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      <div className="w-full flex flex-col items-start gap-8">
        
        {/* Header & Search */}
        <div className="w-full flex items-center gap-2 text-[0.875rem]">
          <Icon
            icon="material-symbols-light:chevron-left"
            className="w-8 h-8 cursor-pointer shrink-0 hover:text-teal transition-colors"
            onClick={() => navigate(-1)}
          />

          <div className="flex-1 px-3 py-2 rounded-num-8 bg-unavailable_action flex items-center gap-2 transition-all focus-within:ring-1 focus-within:ring-teal/30 focus-within:bg-white focus-within:shadow-sm">
            <Icon icon="material-symbols:search" className="w-4 h-4 text-unselected shrink-0" />
            <input
              type="text"
              placeholder="Search messages"
              value={searchQuery}
              maxLength={50}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent border-none outline-none text-num-14 font-medium text-darkgreen placeholder:text-unselected"
            />
          </div>
        </div>

        {/* Notifications Section */}
        <div className="self-stretch flex flex-col items-start gap-2 font-lora">
          <div className="self-stretch flex items-center justify-between py-1 font-inter">
            <b className="relative flex items-start pl-2 text-num-18 text-[#2d3748]">
              Notifications
            </b>
            <span className="bg-teal/10 text-teal text-[10px] font-bold px-2 py-0.5 rounded-full">
              New
            </span>
          </div>

          {/* Subtly Interactable Notification List */}
          <div className="w-full flex flex-col items-start gap-1">
            <div className="w-full group cursor-pointer p-1 rounded-xl transition-all hover:bg-teal/[0.04] active:scale-[0.98]">
               <Message />
            </div>
            <div className="w-full group cursor-pointer p-1 rounded-xl transition-all hover:bg-teal/[0.04] active:scale-[0.98]">
               <Message />
            </div>
          </div>

          <button className="w-full mt-1 flex items-center justify-center gap-1 group">
            <div className="relative font-semibold text-num-12 text-teal group-hover:underline">
              View All
            </div>
            <Icon
              icon="material-symbols-light:chevron-right"
              className="w-5 h-5 text-teal group-hover:translate-x-1 transition-transform"
            />
          </button>
        </div>

        {/* Direct Messages Section */}
        <div className="h-fit w-full flex flex-col items-start gap-4 font-lora">
          <div className="self-stretch flex items-end py-1 font-inter">
            <b className="w-full flex-1 relative flex items-start text-num-18 pl-2 text-[#2d3748]">
              Direct Messages
            </b>
          </div>

          {/* Filter Pills */}
          <div className="w-full flex items-start gap-2 pl-2">
            <button className="h-fit rounded-full bg-darkgreen flex items-center justify-center py-1.5 px-5 transition-transform active:scale-95 shadow-md shadow-darkgreen/20">
              <b className="relative text-num-12 font-inter text-white">All</b>
            </button>
            <button className="h-fit rounded-full bg-lightcyan flex items-center justify-center py-1.5 px-5 transition-colors hover:bg-teal/10 active:scale-95">
              <b className="relative text-num-12 font-inter text-teal">Unread</b>
            </button>
          </div>

          <div className="w-full flex flex-col gap-1">
             <div className="w-full hover:bg-gray-50 rounded-xl transition-colors cursor-pointer p-1">
                <Message />
             </div>
             <div className="w-full hover:bg-gray-50 rounded-xl transition-colors cursor-pointer p-1">
                <Message />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DmsSidebar;