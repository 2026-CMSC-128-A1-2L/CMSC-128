import { FunctionComponent } from 'react';
import bill from '../../../assets/billings.png';
import trash from '../../../assets/trash.svg';
import report from '../../../assets/reportUser.svg';
import calendar from '../../../assets/calendar.svg';
import home from '../../../assets/Home.svg';

type Props = {
  onCancel: () => void;
  onSave: () => void;
};

const UpdateManager1: FunctionComponent<Props> = ({ onCancel, onSave }) => {
  return (
    <div className="relative rounded-tl-[25.6px] rounded-tr-0 rounded-b-0 bg-white w-full flex items-center text-left text-[32px] text-white font-poppins">
      {/* Width: 612 * 0.8 = 490px | Gap: 42 * 0.8 = 33.6px | pb: 60 * 0.8 = 48px */}
      <div className="w-[490px] flex flex-col items-center justify-center pt-0 px-0 pb-[48px] box-border gap-[33.6px]">
        {/* Height: 873 * 0.8 = 698.4px */}
        <div className="self-stretch h-[698.4px] flex flex-col items-center">
          {/* Padding y: 12 * 0.8 = 9.6px | Padding Left: 57 * 0.8 = 45.6px | Padding Right: 32 * 0.8 = 25.6px */}
          <div className="self-stretch rounded-tl-[25.6px] rounded-tr-0 rounded-b-0 [background:linear-gradient(183.48deg,_#096c5b,_#16917c)] flex flex-col items-start justify-center py-[9.6px] pl-[45.6px] pr-[25.6px] shrink-0">
            {/* Width: 533 * 0.8 = 426.4px | pt: 32 * 0.8 = 25.6px */}
            <div className="w-[426.4px] flex flex-col items-start justify-center pt-[25.6px] px-0 pb-[6.4px] box-border shrink-0">
              <b className="self-stretch relative">Update Permissions</b>
              <b className="self-stretch relative text-[18px] tracking-[-0.01em] font-inter text-aliceblue">
                Update your manager's permissions
              </b>
            </div>
          </div>

          {/* Body Padding: 32 * 0.8 = 25.6px | px: 48 * 0.8 = 38.4px | Gap: 22 * 0.8 = 17.6px */}
          <div className="self-stretch flex flex-col items-start pt-[25.6px] px-[38.4px] pb-[16px] gap-[17.6px] shrink-0 text-num-14 text-dimgray font-inter">
            <div className="self-stretch flex flex-col items-start gap-[6.4px]">
              <b className="self-stretch relative">Email Address</b>
              {/* Height: 48 * 0.8 = 38.4px */}
              <div className="self-stretch h-[38.4px] rounded-[9.6px] border-whitesmoke border-solid border-[1px] box-border flex flex-col items-start justify-center py-[3.2px] px-[12.8px] text-black">
                <div className="relative leading-6 font-medium">ncunanan@gmail.com</div>
              </div>
            </div>

            <div className="self-stretch flex flex-col items-start gap-[16px]">
              <div className="self-stretch flex items-end py-0 pl-0 pr-[17.6px]">
                <b className="self-stretch flex-1 relative flex items-center">
                  Property Management
                </b>
                <div className="flex items-center gap-[8.8px] text-[12px] text-slategray">
                  <div className="relative font-medium">Select All</div>
                  {/* Checkbox Size: 24 * 0.8 = 19.2px */}
                  <div className="h-[19.2px] w-[19.2px] relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_1.6px_rgba(0,_0,_0,_0.25)] rounded-[3.2px] bg-whitesmoke" />
                  </div>
                </div>
              </div>

              <div className="self-stretch flex flex-col items-start gap-[16.8px] text-black">
                {/* Row Item: py: 12 * 0.8 = 9.6px | gap: 16 * 0.8 = 12.8px */}
                {[
                  {
                    img: trash,
                    title: 'Delete Buildings',
                    desc: 'Allow manager to remove building records',
                  },
                  {
                    img: trash,
                    title: 'Delete Listings',
                    desc: 'Allow manager to remove listing records',
                  },
                  {
                    img: home,
                    title: 'Manage Buildings',
                    desc: 'Allow manager to access and edit building info',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="self-stretch rounded-[9.6px] flex items-center py-[9.6px] pl-[9.6px] pr-[17.6px] gap-[12.8px]"
                  >
                    <div className="flex-1 flex items-center gap-[12.8px]">
                      {/* Icon Circle: 30 * 0.8 = 24px */}
                      <div className="w-[24px] h-[24px] flex items-center justify-center relative rounded-[50%] bg-whitesmoke-100">
                        <img className="h-[12px] w-[12px] relative" alt="" src={item.img} />
                      </div>
                      <div className="flex flex-col items-start justify-center gap-[3.2px]">
                        <b className="relative">{item.title}</b>
                        <div className="relative text-[12px] font-medium text-dimgray">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <div className="h-[19.2px] w-[19.2px] relative">
                      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_1.6px_rgba(0,_0,_0,_0.25)] rounded-[3.2px] bg-whitesmoke" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Financials Section */}
            <div className="self-stretch flex flex-col items-start gap-[16px]">
              <div className="self-stretch flex items-end py-0 pl-0 pr-[17.6px]">
                <b className="self-stretch flex-1 relative flex items-center">
                  Billings and Financials
                </b>
                <div className="flex items-center gap-[8.8px] text-[12px] text-slategray">
                  <div className="relative font-medium">Select All</div>
                  <div className="h-[19.2px] w-[19.2px] relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_1.6px_rgba(0,_0,_0,_0.25)] rounded-[3.2px] bg-whitesmoke" />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start text-black">
                <div className="self-stretch rounded-[9.6px] flex items-center py-[9.6px] pl-[9.6px] pr-[17.6px] gap-[12.8px]">
                  <div className="flex-1 flex items-center gap-[12.8px]">
                    <div className="w-[24px] h-[24px] flex items-center justify-center relative rounded-[50%] bg-whitesmoke-100">
                      <img className="h-[12px] w-[12px] relative" alt="" src={bill} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-[3.2px]">
                      <b className="relative">Manage Billings</b>
                      <div className="relative text-[12px] font-medium text-dimgray">
                        Manage rents and utility payments
                      </div>
                    </div>
                  </div>
                  <div className="h-[19.2px] w-[19.2px] relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_1.6px_rgba(0,_0,_0,_0.25)] rounded-[3.2px] bg-whitesmoke" />
                  </div>
                </div>
              </div>
            </div>

            {/* Tenant Section */}
            <div className="self-stretch flex flex-col items-start gap-[16px]">
              <div className="self-stretch flex items-end py-0 pl-0 pr-[17.6px]">
                <b className="self-stretch flex-1 relative flex items-center">Tenant Management</b>
                <div className="flex items-center gap-[8.8px] text-[12px] text-slategray">
                  <div className="relative font-medium">Select All</div>
                  <div className="h-[19.2px] w-[19.2px] relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_1.6px_rgba(0,_0,_0,_0.25)] rounded-[3.2px] bg-whitesmoke" />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start gap-[16.8px] text-black">
                {[
                  {
                    img: calendar,
                    title: 'Accept Ocular Visits',
                    desc: 'Accept ocular visit requests',
                  },
                  {
                    img: report,
                    title: 'Report Users',
                    desc: 'Report users for misconduct upon review',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="self-stretch rounded-[9.6px] flex items-center py-[9.6px] pl-[9.6px] pr-[17.6px] gap-[12.8px]"
                  >
                    <div className="flex-1 flex items-center gap-[12.8px]">
                      <div className="w-[24px] h-[24px] flex items-center justify-center relative rounded-[50%] bg-whitesmoke-100">
                        <img className="h-[12px] w-[12px] relative" alt="" src={item.img} />
                      </div>
                      <div className="flex flex-col items-start justify-center gap-[3.2px]">
                        <b className="relative">{item.title}</b>
                        <div className="relative text-[12px] font-medium text-dimgray">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                    <div className="h-[19.2px] w-[19.2px] relative">
                      <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_1.6px_rgba(0,_0,_0,_0.25)] rounded-[3.2px] bg-whitesmoke" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer Buttons: py: 8 * 0.8 = 6.4px | px: 24 * 0.8 = 19.2px | Gap: 16 * 0.8 = 12.8px */}
        <div className="flex items-center gap-[12.8px] text-num-14 text-crimson font-inter">
          <div className="rounded-[9.6px] flex items-center justify-center py-[6.4px] px-[19.2px]">
            <button
              className="relative font-semibold inline-block max-w-[215.3px]"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
          <div className="rounded-[9.6px] bg-lightcyan overflow-hidden flex items-center justify-center py-[6.4px] px-[19.2px] text-teal">
            <button
              className="relative font-semibold inline-block max-w-[215.3px]"
              onClick={onSave}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateManager1;
