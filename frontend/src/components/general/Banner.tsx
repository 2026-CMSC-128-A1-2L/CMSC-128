import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react'; // Ensure this is imported
import pic1 from '../../../assets/promotion-1.jpg';
import pic2 from '../../../assets/promotion-2.jpg';
import pic3 from '../../../assets/accent.svg';

const Banner: FunctionComponent = () => {
  return (
    <div className="w-full overflow-hidden flex flex-col items-start text-darkslategray font-inter">
      <div className="w-full overflow-hidden flex flex-col items-start relative isolate">
        {/* main bg */}
        <div className="w-full h-96 rounded-num-12 bg-teal-200/25 flex flex-col md:flex-row items-center py-20 px-10 md:px-20 gap-30">
          <img
            className="absolute top-1/2 left-40 opacity-75 -translate-y-1/2 -translate-x-1/4 w-140 h-140"
            src={pic3}
            alt="background accent"
          />

          {/* left frame */}
          <div className="w-full flex-1 relative h-[25rem] z-10">
            <img
              className="absolute top-30 -left-5 w-120 -rotate-5 rounded-num-12 shadow-lg z-10"
              src={pic2}
              alt="promotion-2"
            />
            <img
              className="absolute top-15 left-15 w-120 rotate-4 shadow-[0px_10px_30px_rgba(0,0,0,0.2)] rounded-num-12 z-20 object-contain"
              src={pic1}
              alt="promotion-1"
            />
          </div>

          {/* right frame */}
          <div className="w-full md:w-[45%] flex flex-col pl-10 items-center gap-4">
            <div className="flex flex-col gap-1">
              <div className="w-full relative flex items-center text-left text-num-32 text-darkslategray font-inter">
                <b className="flex-1 relative">{`Built for students, by students. `}</b>
              </div>
              <b className="w-full relative text-[1.125rem] inline-block font-inter text-teal text-left">
                {`Discover a community-backed way to find your next home in Los Baños with transparency and ease. `}
              </b>
            </div>
            <div className="w-full flex flex-col items-center gap-4">
              {/* flow */}
              <div className="flex items-center justify-center gap-6 text-teal-100 font-lora">
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="ic:twotone-search" className="h-8 w-8" />
                  <span className="text-num-14 font-bold">Search</span>
                </div>
                <Icon icon="gg:arrow-right" className="h-6 w-6 opacity-40" />

                <div className="flex flex-col items-center gap-2">
                  <Icon icon="boxicons:calendar" className="h-8 w-8" />
                  <span className="text-num-14 font-bold">Book</span>
                </div>
                <Icon icon="gg:arrow-right" className="h-6 w-6 opacity-40" />

                <div className="flex flex-col items-center gap-2">
                  <Icon icon="solar:home-linear" className="h-8 w-8" />
                  <span className="text-num-14 font-bold">Move In</span>
                </div>
              </div>

              <button className="rounded-[45px] [background:linear-gradient(99.18deg,_#5dc2a8_27.88%,_#0c8873_88.15%)] hover:brightness-110 transition-all flex items-center justify-center py-4 px-6 gap-2 text-white shadow-lg">
                <b className="text-[1.2rem]">Find my spot!</b>
                <Icon icon="si:arrow-right-duotone" className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
