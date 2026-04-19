import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';
import pic from '../../assets/sapphire.jpg';

const DormCard: FunctionComponent = () => {
  return (
    <div className="w-66 h-52 relative rounded-[15.31px] bg-white pb-1 border-whitesmoke border-solid border-[1px] box-border overflow-hidden flex flex-col items-start text-left text-[1.077rem] text-black font-inter">
      <img className="w-66 h-30" src={pic} alt="" />
      <div className="w-full flex flex-col items-center py-1 px-2 gap-2">
        <div className="w-full flex flex-col items-start gap-0.5">
          <div className="w-full h-fit flex items-start gap-1">
            <b className="w-full relative  flex items-center">Two Sapphire Place</b>
            <div className="w-fit h-fit flex items-center gap-1 text-[0.718rem] font-lora">
              <Icon icon="material-symbols-light:star" className="w-5 h-5" />
              <div className="relative font-semibold">4.1</div>
            </div>
          </div>
          <b className="relative text-[0.75rem] text-transparent !bg-clip-text [background:linear-gradient(180deg,_#5dc2a8_27.88%,_#0c8873_84.13%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
            ₱3,500.00 - ₱7,500.00/month
          </b>
        </div>

        <div className="w-full relative flex flex-col items-start">
          <div className="w-full relative flex items-center gap-[0.237rem] text-left text-[0.5rem] text-dimgray font-lora">
            <Icon icon="material-symbols-light:location-on" className="w-3 h-3"></Icon>
            <div className="flex-1 relative tracking-[0.04em] font-semibold">
              Sapphire St., Los Banos
            </div>
          </div>
          <div className="w-full relative flex items-center gap-1 text-left text-[0.5rem] text-teal font-lora">
            <div className="relative font-semibold">{`Offers: `}</div>
            <div className="flex-1 flex items-center gap-1 text-[0.479rem]">
              <div className="flex-1 flex items-center gap-1">
                <div className="relative rounded w-fit h-full overflow-hidden flex items-center py-0.75 pl-1 pr-1.5 border-whitesmoke border-solid border-[1px] box-border gap-0.75 text-left text-[0.5rem] text-teal font-lora">
                  <Icon icon="heroicons:wifi-16-solid" className="w-2.5 h-2.5" />
                  <div className="relative font-semibold">Free Wi-Fi</div>
                </div>

                <div className="relative rounded w-fit h-full overflow-hidden flex items-center py-0.75 pl-1 pr-1.5 border-whitesmoke border-solid border-[1px] box-border gap-0.75 text-left text-[0.5rem] text-teal font-lora">
                  <Icon icon="material-symbols-light:laundry-rounded" className="w-2.5 h-2.5" />
                  <div className="relative font-semibold">Laundry Service</div>
                </div>

                <div className="self-stretch rounded-[100px] bg-lightcyan overflow-hidden flex flex-col items-center justify-center py-[0rem] px-[0.25rem]">
                  <div className="relative font-semibold">8+</div>
                </div>
              </div>
              <Icon icon="carbon:chevron-down-outline" className="w-5 h-5"></Icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DormCard;
