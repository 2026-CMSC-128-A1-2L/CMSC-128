import InfoIcon from '../../../../assets/infoicon_icon.svg';
import LeaseTransferInput from './LeaseTransferInput';

interface ReasonContentProps {
  leaseTransferStages: number;
  setLeaseTransferStages: any;
}

export default function ReasonContent(props: ReasonContentProps) {
  const { leaseTransferStages, setLeaseTransferStages } = props;
  return (
    <>
      <div className="flex text-lora font-bold items-end px-15 gap-2 mb-2">
        <img src={InfoIcon} alt="" className="w-5 h-5 " />
        <p className=" text-[18px]">Reason for Transfer</p>
      </div>
      <div className="flex flex-col gap-3 w-full px-15 py-4  border-[#f0f0f0] border-2 rounded-num-10">
        <div className="flex flex-col gap-10  font-bold text-inter text-[14px] text-gray-100 pt-4">
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-2">
                <p>Category</p>
                <select
                  className="border-2 border-[#f0f0f0] rounded-num-10 py-3 "
                  name=""
                  id=""
                ></select>
              </div>
              <div className="flex flex-col gap-2">
                <p>Intended Transfer Date</p>
                <input className="border-2 border-[#f0f0f0] rounded-num-10 py-3 " type="date" />
              </div>
            </div>

            <div>
              <div className="flex flex-col gap-2">
                <p>Explanation</p>
                <textarea
                  className="border-2 border-[#f0f0f0] rounded-num-10 py-5 "
                  name=""
                  id=""
                ></textarea>
              </div>
            </div>
          </div>

          <div className="w-full py-0.5 bg-[#f0f0f0] rounded-full"></div>

          <div className="flex flex-col gap-4">
            <p className="font-bold text-black">LEASE INFORMATION</p>

            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-1">
                <p>Lease Start Date</p>
                <input
                  className="border-2 border-[#f0f0f0] rounded-num-10 py-3 "
                  disabled={true}
                  type="date"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>Lease End Date</p>
                <input
                  className="border-2 border-[#f0f0f0] rounded-num-10 py-3 "
                  disabled={true}
                  type="date"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>Months Remaining</p>
                <input
                  className="border-2 border-[#f0f0f0] rounded-num-10 py-3 "
                  disabled={true}
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-1">
                <p>Outstanding Balance</p>
                <input
                  className="border-2 border-[#f0f0f0] rounded-num-10 py-3 "
                  disabled={true}
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-10  font-inter font-bold py-20 justify-center">
          <button
            className="px-4 py-1 cursor-pointer text-crimson rounded-full"
            onClick={() => {
              // ideally route back to Current Dorm page
            }}
          >
            Go Back
          </button>
          <button
            className="px-4 py-1 cursor-pointer text-[#096c5b] bg-[#f1f5f9] rounded-full"
            onClick={() => {
              setLeaseTransferStages(leaseTransferStages + 1);
            }}
          >
            Proceed
          </button>
        </div>
      </div>
    </>
  );
}
