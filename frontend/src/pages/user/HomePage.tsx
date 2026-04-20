import { FunctionComponent, useCallback } from 'react';
import { Icon } from '@iconify/react';
import SideBar from '../../components/SideBar';
import DormCard from '../../components/DormCard';
import pic1 from '../../../assets/promotion-1.jpg';
import pic2 from '../../../assets/promotion-2.jpg';
import pic3 from '../../../assets/accent.svg';
import Footer from '../../components/Footer';

const HomePage: FunctionComponent = () => {
  const onViewMoreContainerClick = useCallback(() => {
    // Add your code here
  }, []);

  return (
    <div className="w-full flex items-start text-left text-[0.875rem] text-dimgray font-inter gap-8">
      <div className="sticky top-0 h-screen w-fit flex-shrink-0">
        <SideBar></SideBar>
      </div>
      {/* right frame */}
      <div className="w-full h-fit flex items-start pt-15 pr-20 pb-20">
        {/* right frame content */}
        <div className="h-fit w-full flex flex-col items-start gap-80">
          <div className="w-full flex flex-col items-start">
            {/* search bar container */}
            <div className="w-full h-full overflow-hidden flex items-center pb-6 box-border">
              {/* search bar */}
              <div className="w-full rounded-num-12 bg-aliceblue overflow-hidden shrink-0 flex items-center py-3 pl-3 pr-6 box-border gap-2">
                <Icon icon="ic:outline-search" className="w-5 h-5"></Icon>
                <b className="relative">
                  Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)
                </b>
              </div>
            </div>

            <div className="w-full flex flex-col items-start gap-6 text-[1.5rem] text-gray">
              {/* greeting/filter button*/}
              <div className="w-full flex items-center justify-between box-border">
                <div className="w-full h-[2rem] flex-1 flex flex-col items-start justify-center">
                  <b className="relative leading-[2rem]">Mabuhay, iskolar!</b>
                </div>
                <div className="w-fit h-fit flex    items-center">
                  <div className="h-10 w-10 rounded-num-100 bg-whitesmoke-100 flex items-center box-border">
                    <Icon icon="mage:filter" className="w-6 h-6"></Icon>
                  </div>
                </div>
              </div>

              <div className="w-full flex flex-col items-start gap-10">
                {/* pasalo units */}
                <div className="w-full flex flex-col items-start justify-center gap-[1.5rem]">
                  {/* header */}
                  <div className="w-full h-fit flex items-center justify-between">
                    <div className="h-full flex items-center gap-2">
                      <div className="w-44 h-full flex flex-col items-start">
                        <div className="w-44 h-full flex flex-col items-end">
                          <Icon
                            icon="material-symbols-light:info-outline"
                            className="w-5 h-5"
                          ></Icon>
                        </div>
                        <b className="w-fit relative flex items-start">Pasalo Units</b>
                      </div>
                      <div
                        className="w-fit h-fit flex items-end justify-center gap-[0.25rem] pt-4 cursor-pointer text-center text-[0.75rem] text-teal-100 font-lora"
                        onClick={onViewMoreContainerClick}
                      >
                        <div className="relative [text-decoration:underline] tracking-num-0_02 font-semibold">
                          View All
                        </div>
                        <Icon icon="radix-icons:arrow-top-right" className="w-3 h-3"></Icon>
                      </div>
                    </div>
                    <div className="self-stretch w-fit flex items-center gap-1">
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon icon="material-symbols-light:chevron-left" className="w-5 h-5"></Icon>
                      </div>
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon
                          icon="material-symbols-light:chevron-right"
                          className="w-5 h-5"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-full overflow-x-auto flex justify-between py-1 box-border ">
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                  </div>
                </div>

                {/* popular listings */}
                <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
                  <div className="w-full h-10 flex items-center justify-between">
                    <div className="h-full flex items-center gap-6">
                      <div className="w-fit h-full flex items-center">
                        <b className="w-fit flex items-center">Popular Listings</b>
                      </div>
                      <div
                        className="w-fit h-fit flex items-end justify-center gap-[0.25rem] cursor-pointer text-center text-[0.75rem] text-teal-100 font-lora"
                        onClick={onViewMoreContainerClick}
                      >
                        <div className="relative [text-decoration:underline] tracking-num-0_02 font-semibold">
                          View All
                        </div>
                        <Icon icon="radix-icons:arrow-top-right" className="w-3 h-3"></Icon>
                      </div>
                    </div>
                    <div className="self-stretch w-fit flex items-center gap-1">
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon icon="material-symbols-light:chevron-left" className="w-5 h-5"></Icon>
                      </div>
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon
                          icon="material-symbols-light:chevron-right"
                          className="w-5 h-5"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-full overflow-x-auto flex justify-between py-1 box-border ">
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                  </div>
                </div>

                {/* near campus */}
                <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
                  <div className="w-full h-10 flex items-center justify-between">
                    <div className="h-full flex items-center gap-6">
                      <div className="w-fit h-full flex items-center">
                        <b className="w-fit flex items-center">Near Campus</b>
                      </div>
                      <div
                        className="w-fit h-fit flex items-end justify-center gap-[0.25rem] cursor-pointer text-center text-[0.75rem] text-teal-100 font-lora"
                        onClick={onViewMoreContainerClick}
                      >
                        <div className="relative [text-decoration:underline] tracking-num-0_02 font-semibold">
                          View All
                        </div>
                        <Icon icon="radix-icons:arrow-top-right" className="w-3 h-3"></Icon>
                      </div>
                    </div>
                    <div className="self-stretch w-fit flex items-center gap-1">
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon icon="material-symbols-light:chevron-left" className="w-5 h-5"></Icon>
                      </div>
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon
                          icon="material-symbols-light:chevron-right"
                          className="w-5 h-5"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-full overflow-x-auto flex justify-between py-1 box-border ">
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                  </div>
                </div>

                {/* you may like */}
                <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
                  <div className="w-full h-10 flex items-center justify-between">
                    <div className="h-full flex items-center gap-6">
                      <div className="w-fit h-full flex items-center">
                        <b className="w-fit flex items-center">Listings You May Like</b>
                      </div>
                      <div
                        className="w-fit h-fit flex items-end justify-center gap-[0.25rem] cursor-pointer text-center text-[0.75rem] text-teal-100 font-lora"
                        onClick={onViewMoreContainerClick}
                      >
                        <div className="relative [text-decoration:underline] tracking-num-0_02 font-semibold">
                          View All
                        </div>
                        <Icon icon="radix-icons:arrow-top-right" className="w-3 h-3"></Icon>
                      </div>
                    </div>
                    <div className="self-stretch w-fit flex items-center gap-1">
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon icon="material-symbols-light:chevron-left" className="w-5 h-5"></Icon>
                      </div>
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon
                          icon="material-symbols-light:chevron-right"
                          className="w-5 h-5"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-full overflow-x-auto flex justify-between py-1 box-border ">
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                  </div>
                </div>

                {/* promotional card */}
                <div className="w-full overflow-hidden flex flex-col items-start text-darkslategray font-inter">
                  <div className="w-full overflow-hidden flex flex-col items-start relative isolate">
                    {/* main bg*/}
                    <div className="w-full h-96 rounded-num-12 bg-teal-200/25 flex flex-col md:flex-row items-center py-20 px-10 md:px-20 gap-30">
                      <img
                        className="absolute top-1/2 left-40 opacity-70 -translate-y-1/2 -translate-x-1/4 w-[550px] h-[550px] object-contain z-0 pointer-events-none"
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
                          className="absolute top-15 left-20 w-120 rotate-4 shadow-[0px_10px_30px_rgba(0,0,0,0.2)] rounded-num-12 z-20 object-contain"
                          src={pic1}
                          alt="promotion-1"
                        />
                      </div>

                      {/* right frame */}
                      <div className="w-full md:w-[45%] flex flex-col items-start gap-8 z-10">
                        <div className="flex flex-col gap-4">
                          <div className="w-full relative flex items-center text-left text-[3rem] text-darkslategray font-inter">
                            <b className="flex-1 relative">{`Built for students, by students. `}</b>
                          </div>
                          <b className="w-full relative text-[1.125rem] inline-block font-inter text-teal text-left">
                            {`Discover a community-backed way to find your next home in Los Baños with transparency and ease. `}
                          </b>
                        </div>

                        <div className="flex items-center gap-6 text-teal-100 font-lora">
                          {/* Search */}
                          <div className="flex flex-col items-center gap-2">
                            {/* <img src={searchIcon} className="w-10 h-10" alt="" /> */}
                            <span className="text-[1rem] font-semibold">Search</span>
                          </div>

                          {/* <img src={arrowIcon} className="w-6 h-4 opacity-60" alt="" /> */}

                          {/* Book */}
                          <div className="flex flex-col items-center gap-2">
                            {/* <img src={bookIcon} className="w-10 h-10" alt="" /> */}
                            <span className="text-[1rem] font-semibold">Book</span>
                          </div>

                          {/* <img src={arrowIcon} className="w-6 h-4 opacity-60" alt="" /> */}

                          {/* Move In */}
                          <div className="flex flex-col items-center gap-2">
                            {/* <img src={moveInIcon} className="w-10 h-10" alt="" /> */}
                            <span className="text-[1rem] font-semibold">Move In</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* all listings */}
                <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
                  <div className="w-full h-10 flex items-center justify-between">
                    <div className="h-full flex items-center gap-6">
                      <div className="w-fit h-full flex items-center">
                        <b className="w-fit flex items-center">All Listings</b>
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-full overflow-x-auto flex justify-between py-1 box-border ">
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                    <DormCard></DormCard>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer></Footer> */}
      </div>

      <div className="w-[3.563rem] h-[3.563rem] absolute !!m-[0 important] top-[55rem] left-[81.438rem] overflow-hidden shrink-0 z-[1]" />
    </div>
  );
};

export default HomePage;
