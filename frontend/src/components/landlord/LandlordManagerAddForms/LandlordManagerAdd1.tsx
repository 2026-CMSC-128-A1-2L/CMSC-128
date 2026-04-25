import { FunctionComponent } from 'react';
import bill from '../../../../assets/billings.png';
import trash from '../../../../assets/trash.svg';
import report from '../../../../assets/reportUser.svg';
import calendar from '../../../../assets/calendar.svg';
import home from '../../../../assets/Home.svg';

type Props = {
  onCancel: () => void;
  onSend: () => void;
};

const AddManager1: FunctionComponent<Props> = ({ onCancel, onSend }) => {
  return (
    <div className="relative rounded-tl-[26px] rounded-tr-num-0 rounded-b-num-0 bg-white w-full flex items-center text-left text-[28px] text-white font-poppins">
      <div className="w-[490px] flex flex-col items-center justify-center pt-0 px-0 pb-[48px] box-border gap-[34px]">
        <div className="self-stretch h-[698px] flex flex-col items-center">
          <div className="self-stretch rounded-tl-[26px] rounded-tr-num-0 rounded-b-num-0 [background:linear-gradient(183.48deg,_#096c5b,_#16917c)] flex flex-col items-start justify-center py-[10px] pl-[46px] pr-[26px] shrink-0">
            <div className="w-[426px] flex flex-col items-start justify-center pt-[26px] px-0 pb-[6px] box-border shrink-0">
              <b className="self-stretch relative">Add Dorm Manager</b>
              <b className="self-stretch relative text-[15px] tracking-[-0.01em] font-inter text-aliceblue">
                Set permission for the facility manager
              </b>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start pt-[26px] px-[38px] pb-4 gap-[18px] shrink-0 text-[13px] text-dimgray font-inter">
            <div className="self-stretch flex flex-col items-start gap-[6px]">
              <b className="self-stretch relative">Email Address</b>
              <div className="self-stretch h-[38px] rounded-[10px] border-whitesmoke border-solid border-[1px] box-border flex flex-col items-start justify-center py-1 px-[13px] text-black">
                <div className="relative leading-6 font-medium">ncunanan@gmail.com</div>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start gap-4">
              <div className="self-stretch flex items-end py-0 pl-0 pr-[18px]">
                <b className="self-stretch flex-1 relative flex items-center">
                  Property Management
                </b>
                <div className="flex items-center gap-[9px] text-[11px] text-slategray">
                  <div className="relative font-medium">Select All</div>
                  <div className="h-5 w-5 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-[3px] bg-whitesmoke" />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start gap-[17px] text-black">
                <div className="self-stretch rounded-[10px] flex items-center py-[10px] pl-[10px] pr-[18px] gap-[13px]">
                  <div className="flex-1 flex items-center gap-[13px]">
                    <div className="w-[24px] h-[24px] flex items-center justify-center relative rounded-[50%] bg-whitesmoke-100">
                      <img className="h-[12px] w-[12px] relative" alt="" src={trash} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                      <b className="relative">Delete Buildings</b>
                      <div className="relative text-[11px] font-medium text-dimgray">
                        Allow manager to remove building records
                      </div>
                    </div>
                  </div>
                  <div className="h-5 w-5 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-[3px] bg-whitesmoke" />
                  </div>
                </div>
                <div className="self-stretch rounded-[10px] flex items-center py-[10px] pl-[10px] pr-[18px] gap-[13px]">
                  <div className="flex-1 flex items-center gap-[13px]">
                    <div className="w-[24px] h-[24px] flex items-center justify-center relative rounded-[50%] bg-whitesmoke-100">
                      <img className="h-[12px] w-[12px] relative" alt="" src={trash} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                      <b className="relative">Delete Listings</b>
                      <div className="relative text-[11px] font-medium text-dimgray">
                        Allow manager to remove listing records
                      </div>
                    </div>
                  </div>
                  <div className="h-5 w-5 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-[3px] bg-whitesmoke" />
                  </div>
                </div>
                <div className="self-stretch rounded-[10px] flex items-center py-[10px] pl-[10px] pr-[18px] gap-[13px]">
                  <div className="flex-1 flex items-center gap-[13px]">
                    <div className="w-[24px] h-[24px] flex items-center justify-center relative rounded-[50%] bg-whitesmoke-100">
                      <img className="h-[12px] w-[12px] relative" alt="" src={home} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                      <b className="relative">Manage Buildings</b>
                      <div className="relative text-[11px] font-medium text-dimgray">
                        Allow manager to access and edit building info
                      </div>
                    </div>
                  </div>
                  <div className="h-5 w-5 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-[3px] bg-whitesmoke" />
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start gap-4">
              <div className="self-stretch flex items-end py-0 pl-0 pr-[18px]">
                <b className="self-stretch flex-1 relative flex items-center">
                  Billings and Financials
                </b>
                <div className="flex items-center gap-[9px] text-[11px] text-slategray">
                  <div className="relative font-medium">Select All</div>
                  <div className="h-5 w-5 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-[3px] bg-whitesmoke" />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start text-black">
                <div className="self-stretch rounded-[10px] flex items-center py-[10px] pl-[10px] pr-[18px] gap-[13px]">
                  <div className="flex-1 flex items-center gap-[13px]">
                    <div className="h-[24px] w-[24px] relative">
                      <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-whitesmoke w-[24px] h-[24px]" />
                      <div className="w-[24px] h-[24px] flex items-center justify-center relative rounded-[50%] bg-whitesmoke-100">
                        <img className="h-[12px] w-[12px] relative" alt="" src={bill} />
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                      <b className="relative">Manage Billings</b>
                      <div className="relative text-[11px] font-medium text-dimgray">
                        Manage rents and utility payments
                      </div>
                    </div>
                  </div>
                  <div className="h-5 w-5 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-[3px] bg-whitesmoke" />
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start gap-4">
              <div className="self-stretch flex items-end py-0 pl-0 pr-[18px]">
                <b className="self-stretch flex-1 relative flex items-center">Tenant Management</b>
                <div className="flex items-center gap-[9px] text-[11px] text-slategray">
                  <div className="relative font-medium">Select All</div>
                  <div className="h-5 w-5 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-[3px] bg-whitesmoke" />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start gap-[17px] text-black">
                <div className="self-stretch rounded-[10px] flex items-center py-[10px] pl-[10px] pr-[18px] gap-[13px]">
                  <div className="flex-1 flex items-center gap-[13px]">
                    <div className="w-[24px] h-[24px] flex items-center justify-center relative rounded-[50%] bg-whitesmoke-100">
                      <img className="h-[12px] w-[12px] relative" alt="" src={calendar} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                      <b className="relative">Accept Ocular Visits</b>
                      <div className="relative text-[11px] font-medium text-dimgray">
                        Accept ocular visit requests from potential tenants
                      </div>
                    </div>
                  </div>
                  <div className="h-5 w-5 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-[3px] bg-whitesmoke" />
                  </div>
                </div>
                <div className="self-stretch rounded-[10px] flex items-center py-[10px] pl-[10px] pr-[18px] gap-[13px]">
                  <div className="flex-1 flex items-center gap-[13px]">
                    <div className="w-[24px] h-[24px] flex items-center justify-center relative rounded-[50%] bg-whitesmoke-100">
                      <img className="h-[12px] w-[12px] relative" alt="" src={report} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                      <b className="relative">Report Users</b>
                      <div className="relative text-[11px] font-medium text-dimgray">
                        Report users for misconduct upon review
                      </div>
                    </div>
                  </div>
                  <div className="h-5 w-5 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,_0,_0,_0.25)] rounded-[3px] bg-whitesmoke" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-[13px] text-[13px] text-crimson font-inter">
          <div className="rounded-[10px] flex items-center justify-center py-[6px] px-5">
            <button
              className="relative font-semibold inline-block max-w-[215px]"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
          <div className="rounded-[10px] bg-lightcyan overflow-hidden flex items-center justify-center py-[6px] px-5 text-teal">
            <button className="relative font-semibold inline-block max-w-[215px]" onClick={onSend}>
              Send Invite
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddManager1;
