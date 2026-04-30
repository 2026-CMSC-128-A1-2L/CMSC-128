import { type FunctionComponent, useCallback, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import SideBar from '../../../components/user/SideBar';
import DormCard from '../../../components/user/DormCard';
import { dormData } from '../../../data/dorms';
import Banner from '../../../components/general/Banner';
import FilterTab from '../../../components/user/Filter/FilterTab';
import { Link } from 'react-router-dom';
import LoadingPage from '../../general/LoadingPage';

const HomePage: FunctionComponent = () => {
  const onViewMoreContainerClick = useCallback(() => {}, []);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const toggleFilter = () => setIsFilterOpen(!isFilterOpen);
  const [searchTerm, setSearchTerm] = useState('');
  const [testLoading, setTestLoading] = useState(false); // change to true for testing ng loading

  useEffect(() => {
    const timer = setTimeout(() => setTestLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (testLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="w-full flex items-start text-left text-[0.875rem] text-dimgray font-inter gap-8 ">
      <div className="sticky top-0 h-screen w-fit shrink-0">
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
              <div
                className={`
                w-full flex items-center transition-all duration-300
                bg-[#f8f9fa] rounded-num-12 py-3 pl-3 pr-4 border border-transparent
                focus-within:bg-white 
                focus-within:shadow-[0_8px_10px_rgb(0,0,0,0.06)]
                focus-within:transform focus-within:-translate-y-[1px]
                `}
              >
                <Icon icon="ic:outline-search" className="w-5 h-5 text-unselected shrink-0" />
                <input
                  type="text"
                  placeholder="Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)"
                  value={searchTerm}
                  maxLength={50}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-transparent border-none outline-none text-num-14 font-semibold text-darkgreen placeholder:text-unselected placeholder:font-normal"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="text-unselected hover:text-darkgreen"
                  >
                    <Icon icon="material-symbols:close-rounded" className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
            <div className="w-full flex flex-col items-start gap-6 text-[1.5rem] text-gray">
              {/* greeting/filter button*/}
              <div className="w-full flex items-center justify-between box-border">
                <div className="w-full h-8 flex-1 flex flex-col items-start justify-center">
                  <b className="relative leading-8 text-teal">Mabuhay, iskolar!</b>
                </div>
                <div className="w-fit h-fit flex items-center">
                  <div
                    onClick={toggleFilter}
                    className="h-10 w-10 rounded-full bg-whitesmoke-100 flex items-center justify-center cursor-pointer hover:bg-lightcyan/45 transition-colors"
                  >
                    <Icon icon="mage:filter" className="w-6 h-6" />
                  </div>

                  {isFilterOpen && (
                    <div className="fixed inset-0 z-100 flex justify-end">
                      <div
                        className="absolute inset-0 bg-preview/45 backdrop"
                        onClick={toggleFilter}
                      />

                      <div className="relative z-10 w-full max-w-[500px] h-full bg-white animate-in slide-in-from-right duration-500 overflow-y-auto">
                        <div className="p-4 flex justify-between items-center border-b">
                          <h2 className="text-xl font-bold">Filters</h2>
                          <button
                            onClick={toggleFilter}
                            className="p-2 hover:bg-gray-100 rounded-full"
                          >
                            <Icon icon="material-symbols:close" className="w-6 h-6" />
                          </button>
                        </div>
                        <FilterTab />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full flex flex-col items-start gap-10">
                {/* pasalo units */}
                <div className="w-full flex flex-col items-start justify-center gap-6 dark:text-white">
                  {/* header */}
                  <div className="w-full h-fit flex items-center justify-between">
                    <div className="h-full flex items-center gap-2">
                      <div className="w-44 h-full flex items-start gap-2">
                        <b className="w-fit relative flex items-start">Pasalo Units</b>
                        <Icon icon="material-symbols-light:info-outline" className="w-5 h-5"></Icon>
                      </div>
                      <div
                        className="w-fit h-fit flex items-end justify-center gap-1 pt-4 cursor-pointer text-center text-[0.75rem] text-teal-100 font-lora"
                        onClick={onViewMoreContainerClick}
                      >
                        <div className="relative [text-decoration:underline] tracking-num-0.02 font-semibold">
                          View All
                        </div>
                        <Icon icon="radix-icons:arrow-top-right" className="w-3 h-3"></Icon>
                      </div>
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <button
                        // onClick={() => scrollTo(current - 1)}
                        // disabled={current === 0}
                        className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#f0f0f0] bg-white transition-opacity hover:opacity-70 disabled:opacity-30"
                        aria-label="Previous property"
                      >
                        <Icon
                          icon="solar:arrow-left-bold"
                          className="h-[16px] w-[16px] text-[#2f3136]"
                        />
                      </button>
                      <button
                        // onClick={() => scrollTo(current + 1)}
                        // disabled={current === total - 1}
                        className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e0f7f4] transition-opacity hover:opacity-70 disabled:opacity-30"
                        aria-label="Next property"
                      >
                        <Icon
                          icon="solar:arrow-right-bold"
                          className="h-[16px] w-[16px] text-[#096c5b]"
                        />
                      </button>
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
                <div className="self-stretch flex flex-col items-start justify-center gap-6">
                  <div className="w-full h-10 flex items-center justify-between">
                    <div className="h-full flex items-center gap-6">
                      <div className="w-fit h-full flex items-center">
                        <b className="w-fit flex items-center">Popular Listings</b>
                      </div>
                      <div
                        className="w-fit h-fit flex items-end justify-center gap-1 cursor-pointer text-center text-[0.75rem] text-teal-100 font-lora"
                        onClick={onViewMoreContainerClick}
                      >
                        <div className="relative [text-decoration:underline] tracking-num-0.02 font-semibold">
                          View All
                        </div>
                        <Icon icon="radix-icons:arrow-top-right" className="w-3 h-3"></Icon>
                      </div>
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <button
                        // onClick={() => scrollTo(current - 1)}
                        // disabled={current === 0}
                        className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#f0f0f0] bg-white transition-opacity hover:opacity-70 disabled:opacity-30"
                        aria-label="Previous property"
                      >
                        <Icon
                          icon="solar:arrow-left-bold"
                          className="h-[16px] w-[16px] text-[#2f3136]"
                        />
                      </button>
                      <button
                        // onClick={() => scrollTo(current + 1)}
                        // disabled={current === total - 1}
                        className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e0f7f4] transition-opacity hover:opacity-70 disabled:opacity-30"
                        aria-label="Next property"
                      >
                        <Icon
                          icon="solar:arrow-right-bold"
                          className="h-[16px] w-[16px] text-[#096c5b]"
                        />
                      </button>
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
                <div className="self-stretch flex flex-col items-start justify-center gap-6">
                  <div className="w-full h-10 flex items-center justify-between">
                    <div className="h-full flex items-center gap-6">
                      <div className="w-fit h-full flex items-center">
                        <b className="w-fit flex items-center">Near Campus</b>
                      </div>
                      <div
                        className="w-fit h-fit flex items-end justify-center gap-1 cursor-pointer text-center text-[0.75rem] text-teal-100 font-lora"
                        onClick={onViewMoreContainerClick}
                      >
                        <div className="relative [text-decoration:underline] tracking-num-0.02 font-semibold">
                          View All
                        </div>
                        <Icon icon="radix-icons:arrow-top-right" className="w-3 h-3"></Icon>
                      </div>
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <button
                        // onClick={() => scrollTo(current - 1)}
                        // disabled={current === 0}
                        className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#f0f0f0] bg-white transition-opacity hover:opacity-70 disabled:opacity-30"
                        aria-label="Previous property"
                      >
                        <Icon
                          icon="solar:arrow-left-bold"
                          className="h-[16px] w-[16px] text-[#2f3136]"
                        />
                      </button>
                      <button
                        // onClick={() => scrollTo(current + 1)}
                        // disabled={current === total - 1}
                        className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e0f7f4] transition-opacity hover:opacity-70 disabled:opacity-30"
                        aria-label="Next property"
                      >
                        <Icon
                          icon="solar:arrow-right-bold"
                          className="h-[16px] w-[16px] text-[#096c5b]"
                        />
                      </button>
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
                <div className="self-stretch flex flex-col items-start justify-center gap-6">
                  <div className="w-full h-10 flex items-center justify-between">
                    <div className="h-full flex items-center gap-6">
                      <div className="w-fit h-full flex items-center">
                        <b className="w-fit flex items-center">Listings You May Like</b>
                      </div>
                      <div
                        className="w-fit h-fit flex items-end justify-center gap-1 cursor-pointer text-center text-[0.75rem] text-teal-100 font-lora"
                        onClick={onViewMoreContainerClick}
                      >
                        <div className="relative [text-decoration:underline] tracking-num-0.02 font-semibold">
                          View All
                        </div>
                        <Icon icon="radix-icons:arrow-top-right" className="w-3 h-3"></Icon>
                      </div>
                    </div>
                    <div className="flex items-center gap-[8px]">
                      <button
                        // onClick={() => scrollTo(current - 1)}
                        // disabled={current === 0}
                        className="flex h-[32px] w-[32px] items-center justify-center rounded-full border border-[#f0f0f0] bg-white transition-opacity hover:opacity-70 disabled:opacity-30"
                        aria-label="Previous property"
                      >
                        <Icon
                          icon="solar:arrow-left-bold"
                          className="h-[16px] w-[16px] text-[#2f3136]"
                        />
                      </button>
                      <button
                        // onClick={() => scrollTo(current + 1)}
                        // disabled={current === total - 1}
                        className="flex h-[32px] w-[32px] items-center justify-center rounded-full bg-[#e0f7f4] transition-opacity hover:opacity-70 disabled:opacity-30"
                        aria-label="Next property"
                      >
                        <Icon
                          icon="solar:arrow-right-bold"
                          className="h-[16px] w-[16px] text-[#096c5b]"
                        />
                      </button>
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
                <div className="self-stretch flex flex-col items-start justify-center gap-6">
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

      <div className="w-[3.563rem] h-[3.563rem] absolute !!m-[0 important] top-220 left-[81.438rem] overflow-hidden shrink-0 z-1" />
    </div>
  );
};

export default HomePage;
