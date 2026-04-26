import type { FunctionComponent, ReactElement } from "react";
import search_icon from "../../../assets/sidebar_search.svg";
import AtlasLogoText from "../../../assets/logo_atlas_text.svg?react";
import dark_icon from "../../../assets/sidebar_darkmode.svg";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const SidebarItem = ({
  value,
  active,
  children,
}: {
  value: string;
  active: boolean;
  children: ReactElement[];
}) => {
  const textColor = active ? "teal" : "gray";
  const bar = active ? "bg-teal" : "";

  return (
    <div
      className={`relative flex items-center gap-6 text-${textColor} -left-6`}
    >
      <div className={`h-12 w-1.25 rounded-sm ${bar}`} />
      <div className="h-11 flex-1 rounded-num-12 flex items-center">
        <div className="flex-1 flex items-center gap-2">
          {active ? children[0] : children[1]}
          <div className="font-semibold">{value}</div>
        </div>
      </div>
    </div>
  );
};

const SideBar: FunctionComponent = () => {
  return (
    <div className="w-50 h-full border-whitesmoke border-solid border-r box-border flex flex-col items-center py-8 px-num-0 gap-8 text-left text-darkslategray font-inter">
      <AtlasLogoText className="fill-darkslategray w-32 h-auto" />
      <div className="mx-4 flex flex-col items-center gap-8 shrink-0 text-num-14 text-gray font-inter w-full">
        <div className="w-full h-10 rounded-full bg-whitesmoke overflow-hidden shrink-0 flex items-center py-1 px-3 box-border text-num-8">
          <div className="flex-1 overflow-hidden flex items-start">
            <div className="relative font-semibold">Search</div>
          </div>
          <Icon icon="material-symbols:search" className="w-6 h-6" />
        </div>
        <div className="w-full h-num-300 flex flex-col items-start gap-3 overflow-y-auto">
          <Link to="/home">
            <SidebarItem value="Home" active={true}>
              <Icon icon="mdi:home" className="w-7 h-7" />
              <Icon icon="mdi:home-outline" className="w-7 h-7" />
            </SidebarItem>
          </Link>

          <Link to="/direct-messages">
            <SidebarItem value="Messages" active={false}>
              <Icon icon="material-symbols:mail" className="w-7 h-7" />
              <Icon icon="material-symbols:mail-outline" className="w-7 h-7" />
            </SidebarItem>
          </Link>

          <Link to="/bookmark">
            <SidebarItem value="Bookmarks" active={false}>
              <Icon icon="material-symbols:bookmark" className="w-7 h-7" />
              <Icon
                icon="material-symbols:bookmark-outline"
                className="w-7 h-7"
              />
            </SidebarItem>
          </Link>

          <Link to="/my-calendar">
            <SidebarItem value="My Calendar" active={false}>
              <Icon icon="mdi:calendar" className="w-7 h-7" />
              <Icon icon="mdi:calendar-outline" className="w-7 h-7" />
            </SidebarItem>
          </Link>

          <Link to="/finance">
            <SidebarItem value="Finance" active={false}>
              <Icon icon="majesticons:creditcard" className="w-7 h-7" />
              <Icon icon="majesticons:creditcard-line" className="w-7 h-7" />
            </SidebarItem>
          </Link>

          <Link to="/settings">
            <SidebarItem value="Settings" active={false}>
              <Icon icon="tabler:settings" className="w-7 h-7" />
              <Icon icon="tabler:settings" className="w-7 h-7" />
            </SidebarItem>
          </Link>
        </div>
        <div className="w-full flex flex-col items-start gap-3 border-t border-whitesmoke pt-4">
          <div className="w-full flex items-center py-num-0 pl-num-0 pr-num-20 box-border gap-6">
            <div className="h-11 w-1 rounded-sm bg-white overflow-hidden shrink-0 flex flex-col items-start py-num-10 pl-num-10 pr-num-0 box-border" />
            <div className="flex-1 rounded-num-12 flex items-center">
              <div className="flex-1 flex items-center gap-4">
                <Icon icon="bi:moon-stars" className="h-6 w-6" />
                <div className="flex-1 relative font-semibold text-num-12">Dark Mode</div>
              </div>
            </div>
          </div>
          <div className="w-full flex flex-col items-start py-num-0 px-num-20">
            <div className="w-full h-px bg-whitesmoke shrink-0" />
          </div>
          <div className="w-full overflow-hidden flex items-center py-num-10 pl-8 pr-num-20 gap-2">
            <Icon icon="bi:person-circle" className="w-7 h-7 rounded-full" />

            <div className="overflow-hidden flex flex-col items-start justify-center gap-1">
              <div className="w-fit flex items-center">
                <b className="relative text-num-12">Sign In</b>
              </div>
              <div className="flex items-start text-num-8 text-silver">
                <b className="relative">to continue</b>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
