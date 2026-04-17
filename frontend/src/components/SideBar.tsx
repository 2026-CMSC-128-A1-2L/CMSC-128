import { FunctionComponent } from 'react';
import search_icon from '../../assets/sidebar_search.svg';
import atlas from '../../assets/sidebar_logo.svg'
import dark_icon from '../../assets/sidebar_darkmode.svg';
import { Icon } from '@iconify/react';

const SideBar: FunctionComponent = () => {
  return (
    <div className="w-full h-[884px] relative bg-white border-whitesmoke border-solid border-[1px] box-border flex flex-col items-center py-8 px-num-0 gap-8 text-left text-[31.85px] text-darkslategray font-buhun-retro-two-free">
      <div className="w-32 h-[60px] overflow-hidden shrink-0 flex flex-col items-center justify-center">
        <div className="self-stretch h-14 relative">
          <div className="absolute top-[18.46px] left-[48.76px] flex items-center w-[79.2px] h-[27.1px]">TLAS</div>
          <img className="absolute top-[0.13px] left-[0px] w-[58.2px] h-[55.7px]" alt="" src={atlas} />

        </div>
      </div>
      <div className="self-stretch h-[758px] flex flex-col items-start gap-8 shrink-0 text-num-14 text-gray font-inter">
        <div className="self-stretch flex flex-col items-start py-num-0 pl-8 pr-num-20 text-[10px] text-dimgray">
          <div className="self-stretch h-11 rounded-[100px] bg-whitesmoke overflow-hidden shrink-0 flex items-center py-1 px-3 box-border">
            <div className="flex-1 overflow-hidden flex items-start py-num-10 px-num-0">
              <div className="relative font-semibold">Search</div>
            </div>
            <img className="w-7 rounded-[100px] max-h-full" alt="" src={search_icon} />
          </div>
        </div>
        <div className="self-stretch h-[426px] flex flex-col items-start gap-3">
          <div className="w-num-180 flex items-center py-num-0 pl-num-0 pr-num-20 box-border gap-6 text-teal">
            <div className="h-11 w-2 rounded-num-4 bg-teal overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-num-0 box-border" />
            <div className="h-11 flex-1 rounded-num-12 flex items-center">
              <div className="flex-1 flex items-center gap-2">
                <Icon
                  icon="mdi:home-outline"
                  className="w-7 h-7 rounded-[100px]"
                />
                <div className="flex-1 relative font-semibold">Home</div>
              </div>
            </div>
          </div>
          <div className="w-num-180 h-11 hidden items-center py-num-0 pl-num-0 pr-num-20 box-border" />
          <div className="w-num-180 flex items-center py-num-0 pl-num-0 pr-num-20 box-border gap-6">
            <div className="h-11 w-2 rounded-num-4 bg-white overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-num-0 box-border" />
            <div className="self-stretch flex-1 rounded-num-12 flex items-center">
              <div className="flex-1 flex items-center gap-2">
                <Icon
                  icon="material-symbols:mail-outline"
                  className="w-7 h-7 rounded-[100px]"
                />

                <div className="relative font-semibold">Messages</div>
              </div>
            </div>
          </div>
          <div className="w-num-180 flex items-center py-num-0 pl-num-0 pr-num-20 box-border gap-6">
            <div className="h-11 w-2 rounded-num-4 bg-white overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-num-0 box-border" />
            <div className="self-stretch flex-1 rounded-num-12 flex items-center">
              <div className="flex-1 flex items-center gap-2">
                <Icon
                  icon="material-symbols:bookmark-outline"
                  className="w-7 h-7 rounded-[100px]"
                />

                <div className="flex-1 relative font-semibold">Bookmarks</div>
              </div>
            </div>
          </div>
          <div className="w-num-180 flex items-center py-num-0 pl-num-0 pr-num-20 box-border gap-6">
            <div className="h-11 w-2 rounded-num-4 bg-white overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-num-0 box-border" />
            <div className="self-stretch flex-1 rounded-num-12 flex items-center">
              <div className="flex-1 flex items-center gap-2">
                <Icon
                  icon="mdi:calendar-outline"
                  className="w-7 h-7 rounded-[100px]"
                />

                <div className="flex-1 relative font-semibold">My Calendar</div>
              </div>
            </div>
          </div>
          <div className="w-num-180 flex items-center py-num-0 pl-num-0 pr-num-20 box-border gap-6">
            <div className="h-11 w-2 rounded-num-4 bg-white overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-num-0 box-border" />
            <div className="self-stretch flex-1 rounded-num-12 flex items-center">
              <div className="flex-1 flex items-center gap-2.5">
                <Icon
                  icon="majesticons:creditcard-line"
                  className="w-7 h-7 rounded-[100px]"
                />

                <div className="flex-1 relative font-semibold">Finance</div>
              </div>
            </div>
          </div>
          <div className="w-num-180 flex items-center py-num-0 pl-num-0 pr-num-20 box-border gap-6">
            <div className="h-11 w-2 rounded-num-4 bg-white overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-num-0 box-border" />
            <div className="self-stretch flex-1 rounded-num-12 flex items-center">
              <div className="flex-1 flex items-center gap-2">
                <Icon
                  icon="tabler:settings"
                  className="w-7 h-7 rounded-[100px]"
                />

                <div className="flex-1 relative font-semibold">Settings</div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start gap-3">
          <div className="w-num-180 flex items-center py-num-0 pl-num-0 pr-num-20 box-border gap-6">
            <div className="h-11 w-2 rounded-num-4 bg-white overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-num-0 box-border" />
            <div className="self-stretch flex-1 rounded-num-12 flex items-center">
              <div className="flex-1 flex items-center gap-4">
                <img className="h-[24.4px] w-[24.4px]" alt="" src={dark_icon} />
                <div className="flex-1 relative font-semibold">Dark Mode</div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start py-num-0 px-num-20">
            <div className="self-stretch h-[1px] bg-whitesmoke shrink-0" />
          </div>
          <div className="self-stretch overflow-hidden flex items-center py-num-10 pl-8 pr-num-20 gap-2">
            <Icon
              icon="bi:person-circle"
              className="w-7 h-7 rounded-[100px]"
            />

            <div className="overflow-hidden flex flex-col items-start justify-center gap-1">
              <div className="w-[76px] flex items-center">
                <b className="relative inline-block max-w-[196px]">Sign In</b>
              </div>
              <div className="self-stretch flex items-start text-[10px] text-silver">
                <b className="relative">to continue</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>);
};

export default SideBar


