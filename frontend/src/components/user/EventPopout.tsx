import { FunctionComponent } from "react";
import dotIcon from "../../../assets/dot.svg";
import exIcon from "../../../assets/ex.svg";
import deleteIcon from "../../../assets/delete.svg";

export type EventPopoutType = {
  className?: string;
  onClose?: () => void;
};

const EventPopout: FunctionComponent<EventPopoutType> = ({
  className = "",
  onClose,
}) => {
  return (
    <div
      className={`w-[419px] h-[164px] relative max-w-full max-h-full overflow-auto text-left text-[12px] text-black font-lora ${className}`}
    >
      <div className="absolute top-[0px] left-[0px] rounded-md bg-white w-[419px] h-[164px]" />
      <img
        className="absolute top-[11px] left-[367px] w-10 h-10 cursor-pointer"
        src={exIcon}
        alt="close"
        onClick={onClose}
      />
      <div className="absolute top-[12px] left-[322px] w-10 h-10">
        <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[7.27px] bg-white" />
        <div className="absolute h-[72.75%] w-[72.75%] top-[13.64%] right-[13.62%] bottom-[13.61%] left-[13.63%] rounded-[3.64px] flex flex-col items-start opacity-[0.7]">
          <div className="self-stretch h-[29.1px] relative overflow-hidden shrink-0" />
        </div>
      </div>
      <div className="absolute top-[39px] left-[85px] text-[20px] font-semibold">
        Ocular visit
      </div>
      <div className="absolute top-[69px] left-[85px] whitespace-pre-wrap">
        Tuesday, March 9 4:00PM - 5:00PM
      </div>
      <div className="absolute top-[88px] left-[85px] whitespace-pre-wrap">{`One Sapphire Place     `}</div>
      <div className="absolute top-[107px] left-[85px]">
        {" "}
        Daphne the Landlord
      </div>
      <img
        className="absolute top-[44px] left-[53px] w-[24px] h-[24px]"
        src={dotIcon}
        alt="red dot"
      />
      <img
        className="absolute top-[19px] left-[330px] w-6 h-6"
        src={deleteIcon}
        alt="trash"
      />
    </div>
  );
};

export default EventPopout;
