import type { FunctionComponent } from 'react';
import bill from '../../../../assets/billings.png';
import trash from '../../../../assets/trash.svg';
import report from '../../../../assets/reportUser.svg';
import calendar from '../../../../assets/calendar.svg';
import home from '../../../../assets/Home.svg';

type Props = {
  onCancel: () => void;
  onSave: () => void;
};

const UpdateManager1: FunctionComponent<Props> = ({ onCancel, onSave }) => {
  return (
    <div className="relative rounded-tl-[32px] rounded-tr-num-0 rounded-b-num-0 bg-white w-full flex items-center text-left text-[32px] text-white font-poppins">
      <div className="w-[612px] flex flex-col items-center justify-center pt-0 px-0 pb-[60px] box-border gap-[42px]">
        <div className="self-stretch h-[873px] flex flex-col items-center">
          <div className="self-stretch rounded-tl-[32px] rounded-tr-num-0 rounded-b-num-0 [background:linear-gradient(183.48deg,#096c5b,#16917c)] flex flex-col items-start justify-center py-3 pl-[57px] pr-8 shrink-0">
            <div className="w-[533px] flex flex-col items-start justify-center pt-8 px-0 pb-2 box-border shrink-0">
              <b className="self-stretch relative">Update Permissions</b>
              <b className="self-stretch relative text-[18px] tracking-[-0.01em] font-inter text-aliceblue">
                Update your manager's permissions
              </b>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start pt-8 px-12 pb-5 gap-[22px] shrink-0 text-num-14 text-dimgray font-inter">
            <div className="self-stretch flex flex-col items-start gap-2">
              <b className="self-stretch relative">Email Address</b>
              <div className="self-stretch h-12 rounded-num-12 border-whitesmoke border-solid border box-border flex flex-col items-start justify-center py-1 px-4 text-black">
                <div className="relative leading-6 font-medium">ncunanan@gmail.com</div>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start gap-5">
              <div className="self-stretch flex items-end py-0 pl-0 pr-num-22">
                <b className="self-stretch flex-1 relative flex items-center">
                  Property Management
                </b>
                <div className="flex items-center gap-[11px] text-[12px] text-slategray">
                  <div className="relative font-medium">Select All</div>
                  <div className="h-6 w-6 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,0,0,0.25)] rounded-num-4 bg-whitesmoke" />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start gap-[21px] text-black">
                <div className="self-stretch rounded-num-12 flex items-center py-3 pl-3 pr-num-22 gap-4">
                  <div className="flex-1 flex items-center gap-4">
                    <div className="w-[30px] h-[30px] flex items-center justify-center relative rounded-[50%] bg-whitesmoke-100">
                      <img className="h-num-15 w-[15px] relative" alt="" src={trash} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                      <b className="relative">Delete Buildings</b>
                      <div className="relative text-[12px] font-medium text-dimgray">
                        Allow manager to remove building records
                      </div>
                    </div>
                  </div>
                  <div className="h-6 w-6 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,0,0,0.25)] rounded-num-4 bg-whitesmoke" />
                  </div>
                </div>
                <div className="self-stretch rounded-num-12 flex items-center py-3 pl-3 pr-num-22 gap-4">
                  <div className="flex-1 flex items-center gap-4">
                    <div className="w-[30px] h-[30px] flex items-center justify-center relative rounded-[50%] bg-whitesmoke-100">
                      <img className="h-num-15 w-[15px] relative" alt="" src={trash} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                      <b className="relative">Delete Listings</b>
                      <div className="relative text-[12px] font-medium text-dimgray">
                        Allow manager to remove listing records
                      </div>
                    </div>
                  </div>
                  <div className="h-6 w-6 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,0,0,0.25)] rounded-num-4 bg-whitesmoke" />
                  </div>
                </div>
                <div className="self-stretch rounded-num-12 flex items-center py-3 pl-3 pr-num-22 gap-4">
                  <div className="flex-1 flex items-center gap-4">
                    <div className="w-[30px] h-[30px] flex items-center justify-center relative rounded-[50%] bg-whitesmoke-100">
                      <img className="h-num-15 w-[15px] relative" alt="" src={home} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                      <b className="relative">Manage Buildings</b>
                      <div className="relative text-[12px] font-medium text-dimgray">
                        Allow manager to access and edit building info
                      </div>
                    </div>
                  </div>
                  <div className="h-6 w-6 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,0,0,0.25)] rounded-num-4 bg-whitesmoke" />
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start gap-5">
              <div className="self-stretch flex items-end py-0 pl-0 pr-num-22">
                <b className="self-stretch flex-1 relative flex items-center">
                  Billings and Financials
                </b>
                <div className="flex items-center gap-[11px] text-[12px] text-slategray">
                  <div className="relative font-medium">Select All</div>
                  <div className="h-6 w-6 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,0,0,0.25)] rounded-num-4 bg-whitesmoke" />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start text-black">
                <div className="self-stretch rounded-num-12 flex items-center py-3 pl-3 pr-num-22 gap-4">
                  <div className="flex-1 flex items-center gap-4">
                    <div className="h-num-30 w-[30px] relative">
                      <div className="absolute top-0 left-0 rounded-[50%] bg-whitesmoke w-[30px] h-num-30" />
                      <div className="w-[30px] h-[30px] flex items-center justify-center relative rounded-[50%] bg-whitesmoke-100">
                        <img className="h-num-15 w-[15px] relative" alt="" src={bill} />
                      </div>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                      <b className="relative">Manage Billings</b>
                      <div className="relative text-[12px] font-medium text-dimgray">
                        Manage rents and utility payments
                      </div>
                    </div>
                  </div>
                  <div className="h-6 w-6 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,0,0,0.25)] rounded-num-4 bg-whitesmoke" />
                  </div>
                </div>
              </div>
            </div>
            <div className="self-stretch flex flex-col items-start gap-5">
              <div className="self-stretch flex items-end py-0 pl-0 pr-num-22">
                <b className="self-stretch flex-1 relative flex items-center">Tenant Management</b>
                <div className="flex items-center gap-[11px] text-[12px] text-slategray">
                  <div className="relative font-medium">Select All</div>
                  <div className="h-6 w-6 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,0,0,0.25)] rounded-num-4 bg-whitesmoke" />
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start gap-[21px] text-black">
                <div className="self-stretch rounded-num-12 flex items-center py-3 pl-3 pr-num-22 gap-4">
                  <div className="flex-1 flex items-center gap-4">
                    <div className="w-[30px] h-[30px] flex items-center justify-center relative rounded-[50%] bg-whitesmoke-100">
                      <img className="h-num-15 w-[15px] relative" alt="" src={calendar} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                      <b className="relative">Accept Ocular Visits</b>
                      <div className="relative text-[12px] font-medium text-dimgray">
                        Accept ocular visit requests from potential tenants
                      </div>
                    </div>
                  </div>
                  <div className="h-6 w-6 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,0,0,0.25)] rounded-num-4 bg-whitesmoke" />
                  </div>
                </div>
                <div className="self-stretch rounded-num-12 flex items-center py-3 pl-3 pr-num-22 gap-4">
                  <div className="flex-1 flex items-center gap-4">
                    <div className="w-[30px] h-[30px] flex items-center justify-center relative rounded-[50%] bg-whitesmoke-100">
                      <img className="h-num-15 w-[15px] relative" alt="" src={report} />
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                      <b className="relative">Report Users</b>
                      <div className="relative text-[12px] font-medium text-dimgray">
                        Report users for misconduct upon review
                      </div>
                    </div>
                  </div>
                  <div className="h-6 w-6 relative">
                    <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_2px_rgba(0,0,0,0.25)] rounded-num-4 bg-whitesmoke" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-4 text-num-14 text-crimson font-inter">
          <div className="rounded-num-12 flex items-center justify-center py-2 px-6">
            <button
              className="relative font-semibold inline-block max-w-[269.11px]"
              onClick={onCancel}
            >
              Cancel
            </button>
          </div>
          <div className="rounded-num-12 bg-lightcyan overflow-hidden flex items-center justify-center py-2 px-6 text-teal">
            <button
              className="relative font-semibold inline-block max-w-[269.11px]"
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
