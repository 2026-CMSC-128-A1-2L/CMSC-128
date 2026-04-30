import { FunctionComponent } from 'react';
import MessageNotificationCard from './MessageNotificationCard';

interface MessageSidebarProps {
  onBackClick: () => void;
}

const MessageSidebar: FunctionComponent<MessageSidebarProps> = ({ onBackClick }) => {
  return (
    <div className="h-[924px] flex items-center p-num-10 box-border shrink-0">
      <div className="h-[924px] w-num-340 relative overflow-y-auto shrink-0">
        <div className="absolute top-[0px] left-[0px] shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] bg-white w-num-340 h-[924px] overflow-y-auto">
          {/* Notifications Section */}
          <div className="absolute top-[522px] left-[0px] w-num-340 h-[183px] flex flex-col items-start py-num-0 px-num-36 box-border gap-3 shrink-0">
            <MessageNotificationCard
              title="Three Sapphire Place"
              message="Hi Daphne! Your application is being reviewed by our do..."
              time="1hr ago"
            />
            <MessageNotificationCard
              title="Narra Recidences"
              message="Hi Daphne! Your application is being reviewed by our do..."
              time="2m ago"
            />
          </div>

          {/* Header and System Messages */}
          <div className="absolute top-[-17px] left-[0px] w-num-340 h-[537px] shrink-0 text-num-24 text-dimgray">
            <div className="absolute top-[0px] left-[0px] bg-white w-num-340 h-[537px]" />
            <div className="absolute top-[68px] left-[0px] w-num-340 flex flex-col items-start gap-[30px]">
              {/* Search and Back Button */}
              <div className="self-stretch flex items-center py-num-0 px-num-36 gap-3 text-num-14">
                <img
                  className="w-6 relative max-h-full cursor-pointer"
                  alt="back"
                  onClick={onBackClick}
                />
                <div className="h-10 w-[228px] relative rounded-lg bg-whitesmoke-100 border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0">
                  <div className="absolute top-[8px] left-[18px] flex items-center py-num-0 pl-3 pr-num-0 gap-2">
                    <img className="h-6 w-6 relative" alt="" />
                    <div className="relative">Search messages...</div>
                  </div>
                </div>
              </div>

              {/* System Section */}
              <div className="self-stretch flex flex-col items-start gap-[7px] text-gray-200">
                <div className="self-stretch flex items-end py-num-10 px-num-36">
                  <b className="relative leading-num-32 text-transparent !bg-clip-text [background:rgba(0,_0,_0,_0.2),_#001d18] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                    System
                  </b>
                </div>
                <div className="self-stretch flex flex-col items-start py-num-0 px-num-36 gap-3 text-num-14">
                  <MessageNotificationCard
                    isHighlight
                    title="Verification Status"
                    message="Hi Daphne! Your verification has been approved by our a..."
                    time="2m ago"
                  />
                  <MessageNotificationCard
                    title="Welcome to ATLAS!"
                    message="Hi Daphne! Welcome to ATLAS..."
                    time="2m ago"
                  />
                </div>
                <div className="self-stretch flex items-center justify-center gap-[26px] text-center text-num-12 font-lora">
                  <div className="h-[19px] w-[54px] relative tracking-num-0_02 font-semibold flex items-center justify-center shrink-0">
                    View All
                  </div>
                  <img className="w-[6.8px] relative max-h-full" alt="" />
                </div>
              </div>

              {/* Direct Messages Section */}
              <div className="self-stretch flex flex-col items-start gap-2.5 text-white">
                <div className="self-stretch flex items-center py-num-10 px-num-36">
                  <b className="relative leading-num-32 text-transparent !bg-clip-text [background:rgba(0,_0,_0,_0.2),_#001d18] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                    Direct Messages
                  </b>
                </div>
                <div className="self-stretch flex items-center py-num-0 px-num-36 gap-2 text-num-12">
                  <div className="h-8 rounded-[100px] bg-gray-100 flex items-center justify-center py-2 px-3 box-border">
                    <b className="relative">All</b>
                  </div>
                  <div className="h-8 w-20 rounded-[100px] bg-lightcyan flex items-center justify-center py-2 px-3 box-border text-teal-200">
                    <b className="relative whitespace-pre-wrap">Unread 8</b>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Archived Messages */}
          <div className="absolute top-[869px] left-[76px] w-[151px] h-[19px] shrink-0 text-center text-num-12 text-gray-200 font-lora">
            <div className="absolute top-[0px] left-[0px] tracking-num-0_02 font-semibold flex items-center justify-center w-[151px] h-[19px]">
              View Archived Messages
            </div>
          </div>
          <img
            className="absolute h-[0.67%] w-[2%] top-[94.81%] right-[30.94%] bottom-[4.52%] left-[67.06%] max-w-full overflow-hidden max-h-full shrink-0"
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default MessageSidebar;
