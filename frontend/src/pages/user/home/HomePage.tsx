import { type FunctionComponent, useCallback } from "react";
import { Icon } from "@iconify/react";
import SideBar from "../../../components/user/SideBar";
import DormCard from "../../../components/user/DormCard";
import { dormData } from "../../../data/dorms";
import Banner from "../../../components/general/Banner";
import Footer from "../../../components/general/Footer";

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
            <div className="w-full h-full overflow-hidden flex items-center pb-6 box-border ">
              {/* search bar */}
              <div className="w-full rounded-num-12 bg-unavailable_action flex items-center py-3 pl-3 pr-6 box-border gap-2">
                <Icon icon="ic:outline-search" className="w-5 h-5"></Icon>
                <b className="relative text-unselected">
                  Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali
                  Subdivision)
                </b>
              </div>
            </div>

            <div className="w-full flex flex-col items-start gap-6 text-[1.5rem] text-gray">
              {/* greeting/filter button*/}
              <div className="w-full flex items-center justify-between box-border">
                <div className="w-full h-[2rem] flex-1 flex flex-col items-start justify-center">
                  <b className="relative leading-[2rem] text-teal">
                    Mabuhay, iskolar!
                  </b>
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
                        <b className="w-fit relative flex items-start">
                          Pasalo Units
                        </b>
                      </div>
                      <div
                        className="w-fit h-fit flex items-end justify-center gap-[0.25rem] pt-4 cursor-pointer text-center text-[0.75rem] text-teal-100 font-lora"
                        onClick={onViewMoreContainerClick}
                      >
                        <div className="relative [text-decoration:underline] tracking-num-0_02 font-semibold">
                          View All
                        </div>
                        <Icon
                          icon="radix-icons:arrow-top-right"
                          className="w-3 h-3"
                        ></Icon>
                      </div>
                    </div>
                    <div className="self-stretch w-fit flex items-center gap-1">
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon
                          icon="material-symbols-light:chevron-left"
                          className="w-5 h-5"
                        ></Icon>
                      </div>
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon
                          icon="material-symbols-light:chevron-right"
                          className="w-5 h-5"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-full overflow-x-auto flex py-1 box-border gap-3">
                    <div className="flex flex-wrap gap-6">
                      {dormData.map((dorm) => (
                        <DormCard
                          key={dorm.id}
                          name={dorm.name}
                          rating={dorm.rating}
                          price={dorm.price}
                          location={dorm.location}
                          image={dorm.image}
                          room_types={dorm.room_types}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* popular listings */}
                <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
                  <div className="w-full h-10 flex items-center justify-between">
                    <div className="h-full flex items-center gap-6">
                      <div className="w-fit h-full flex items-center">
                        <b className="w-fit flex items-center">
                          Popular Listings
                        </b>
                      </div>
                      <div
                        className="w-fit h-fit flex items-end justify-center gap-[0.25rem] cursor-pointer text-center text-[0.75rem] text-teal-100 font-lora"
                        onClick={onViewMoreContainerClick}
                      >
                        <div className="relative [text-decoration:underline] tracking-num-0_02 font-semibold">
                          View All
                        </div>
                        <Icon
                          icon="radix-icons:arrow-top-right"
                          className="w-3 h-3"
                        ></Icon>
                      </div>
                    </div>
                    <div className="self-stretch w-fit flex items-center gap-1">
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon
                          icon="material-symbols-light:chevron-left"
                          className="w-5 h-5"
                        ></Icon>
                      </div>
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon
                          icon="material-symbols-light:chevron-right"
                          className="w-5 h-5"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-full overflow-x-auto flex py-1 box-border gap-3">
                    <div className="flex flex-wrap gap-6">
                      {dormData.map((dorm) => (
                        <DormCard
                          key={dorm.id}
                          name={dorm.name}
                          rating={dorm.rating}
                          price={dorm.price}
                          location={dorm.location}
                          image={dorm.image}
                          room_types={dorm.room_types}
                        />
                      ))}
                    </div>
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
                        <Icon
                          icon="radix-icons:arrow-top-right"
                          className="w-3 h-3"
                        ></Icon>
                      </div>
                    </div>
                    <div className="self-stretch w-fit flex items-center gap-1">
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon
                          icon="material-symbols-light:chevron-left"
                          className="w-5 h-5"
                        ></Icon>
                      </div>
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon
                          icon="material-symbols-light:chevron-right"
                          className="w-5 h-5"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-full overflow-x-auto flex py-1 box-border gap-3">
                    <div className="flex flex-wrap gap-6">
                      {dormData.map((dorm) => (
                        <DormCard
                          key={dorm.id}
                          name={dorm.name}
                          rating={dorm.rating}
                          price={dorm.price}
                          location={dorm.location}
                          image={dorm.image}
                          room_types={dorm.room_types}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* you may like */}
                <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
                  <div className="w-full h-10 flex items-center justify-between">
                    <div className="h-full flex items-center gap-6">
                      <div className="w-fit h-full flex items-center">
                        <b className="w-fit flex items-center">
                          Listings You May Like
                        </b>
                      </div>
                      <div
                        className="w-fit h-fit flex items-end justify-center gap-[0.25rem] cursor-pointer text-center text-[0.75rem] text-teal-100 font-lora"
                        onClick={onViewMoreContainerClick}
                      >
                        <div className="relative [text-decoration:underline] tracking-num-0_02 font-semibold">
                          View All
                        </div>
                        <Icon
                          icon="radix-icons:arrow-top-right"
                          className="w-3 h-3"
                        ></Icon>
                      </div>
                    </div>
                    <div className="self-stretch w-fit flex items-center gap-1">
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon
                          icon="material-symbols-light:chevron-left"
                          className="w-5 h-5"
                        ></Icon>
                      </div>
                      <div className="rounded-num-100 bg-lightcyan-100 overflow-hidden flex items-center py-[0.437rem] px-[0.562rem]">
                        <Icon
                          icon="material-symbols-light:chevron-right"
                          className="w-5 h-5"
                        ></Icon>
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-full overflow-x-auto flex py-1 box-border gap-3">
                    <div className="flex flex-wrap gap-6">
                      {dormData.map((dorm) => (
                        <DormCard
                          key={dorm.id}
                          name={dorm.name}
                          rating={dorm.rating}
                          price={dorm.price}
                          location={dorm.location}
                          image={dorm.image}
                          room_types={dorm.room_types}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <Banner></Banner>

                {/* all listings */}
                <div className="self-stretch flex flex-col items-start justify-center gap-[1.5rem]">
                  <div className="w-full h-10 flex items-center justify-between">
                    <div className="h-full flex items-center gap-6">
                      <div className="w-fit h-full flex items-center">
                        <b className="w-fit flex items-center">All Listings</b>
                      </div>
                    </div>
                  </div>
                  <div className="h-full w-full overflow-x-auto flex py-1 box-border gap-3">
                    <div className="flex flex-wrap gap-6">
                      {dormData.map((dorm) => (
                        <DormCard
                          key={dorm.id}
                          name={dorm.name}
                          rating={dorm.rating}
                          price={dorm.price}
                          location={dorm.location}
                          image={dorm.image}
                          room_types={dorm.room_types}
                        />
                      ))}
                    </div>
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
