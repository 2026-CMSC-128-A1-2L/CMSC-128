import { FunctionComponent } from "react";
import Message from "../general/InboxMessage";
import { Icon } from "@iconify/react";

const DmsSidebar: FunctionComponent = () => {
  return (
    <div className="w-50 h-screen relative overflow-hidden flex flex-col items-start py-15 pl-2.5 pr-2 box-border gap-2 text-left font-inter">
      <div className="w-full flex flex-col items-start gap-[1.875rem]">
        <div className="w-full flex items-center gap-0 text-[0.875rem]">
          <Icon
            icon="material-symbols-light:chevron-left"
            className="w-8 h-8"
          ></Icon>
          <div className="flex-1 px-3 py-2 rounded-num-8 bg-unavailable_action flex items-center text-num-14">
            <div className="font-medium text-unselected">Search messages</div>
          </div>
        </div>

        {/* notifications */}
        <div className="self-stretch flex flex-col items-start gap-1 font-lora">
          <div className="self-stretch flex items-end py-1 font-inter">
            <b className="w-full flex-1 relative flex items-start pl-3 text-num-18">
              Notifications
            </b>
          </div>
          <div className="w-full flex flex-col items-start gap-2 text-right text-[0.5rem]">
            <Message></Message>
            <Message></Message>
          </div>
          <div className="w-full flex items-center justify-center gap-1 text-center">
            <div className="relative font-semibold text-num-12 text-teal">
              View All
            </div>
            <Icon
              icon="material-symbols-light:chevron-right"
              className="w-5 h-5 text-teal"
            ></Icon>
          </div>
        </div>

        {/* direct messages */}
        <div className="h-fit w-full flex flex-col items-start gap-3 font-lora">
          <div className="self-stretch flex items-end py-1 font-inter">
            <b className="w-full flex-1 relative flex items-start text-num-18 pl-3">
              Direct Messages
            </b>
          </div>
          <div className="w-full flex items-start px-0 gap-1.5 pl-3">
            <div className="h-fit rounded-[100px] bg-darkgreen flex items-center justify-center py-2 px-4 box-border">
              <b className="relative text-num-12 font-inter text-white">All</b>
            </div>
            <div className="h-fit rounded-[100px] bg-lightcyan flex items-center justify-center py-2 px-4 box-border">
              <b className="relative text-num-12 font-inter text-teal">
                Unread 1
              </b>
            </div>
          </div>
          <div className="w-full h-full flex flex-col items-start gap-2 text-right text-[0.5rem]">
            <Message></Message>
            <Message></Message>
          </div>
          <div className="w-full flex items-center justify-center gap-1 text-center">
            <div className="relative font-semibold text-num-12 text-teal">
              View Archive
            </div>
            <Icon
              icon="material-symbols-light:chevron-right"
              className="w-5 h-5 text-teal"
            ></Icon>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DmsSidebar;
