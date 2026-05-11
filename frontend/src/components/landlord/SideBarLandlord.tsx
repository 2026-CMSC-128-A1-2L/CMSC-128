import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEventHandler,
} from "react";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import AtlasLogo from "../../../assets/logo_atlas_text.svg?react";
import AtlasLogoMin from "../../../assets/atlas logo (for white bg).png";
import SideBarLandlordButton from "./SideBarLandlordButton";
import { useTheme } from "../../pages/utilities/DarkMode";

export type SideBarLandlordItemKey =
  | "dashboard"
  | "messages"
  | "properties"
  | "managers"
  | "tenants"
  | "visits"
  | "finance"
  | "settings";

type UserInfo = {
  name: string;
  verified?: boolean;
  avatarUrl?: string;
};

type SideBarLandlordProps = {
  activeItem?: SideBarLandlordItemKey;
  hoveredItem?: SideBarLandlordItemKey;
  onItemClick?: (item: SideBarLandlordItemKey) => void;
  onAddListing?: MouseEventHandler<HTMLButtonElement>;
  onToggleDarkMode?: MouseEventHandler<HTMLButtonElement>;
  onProfileClick?: MouseEventHandler<HTMLButtonElement>;
  onSignOut?: MouseEventHandler<HTMLButtonElement>;
  user?: UserInfo;
  className?: string;
};

const navItems: Array<{
  key: SideBarLandlordItemKey;
  label: string;
  icon: string;
  route: string;
}> = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: "solar:home-2-outline",
    route: "/landlord/dashboard",
  },
  {
    key: "messages",
    label: "Messages",
    icon: "ic:outline-mail",
    route: "/landlord/messages",
  },
  {
    key: "properties",
    label: "Properties",
    icon: "fluent:pen-16-regular",
    route: "/landlord/properties",
  },
  {
    key: "managers",
    label: "Managers",
    icon: "hugeicons:id",
    route: "/landlord/managers",
  },
  {
    key: "tenants",
    label: "My Tenants",
    icon: "tabler:user-search",
    route: "/landlord/tenants",
  },
  {
    key: "visits",
    label: "Visits",
    icon: "solar:calendar-outline",
    route: "/landlord/visits",
  },
  {
    key: "finance",
    label: "Finance",
    icon: "solar:card-outline",
    route: "/landlord/finance",
  },
  {
    key: "settings",
    label: "Settings",
    icon: "solar:settings-outline",
    route: "/landlord/settings",
  },
];

const defaultUser: UserInfo = {
  name: "Quevin",
  verified: true,
};

const isSmallScreen = () =>
  typeof window !== "undefined" && window.innerWidth < 768;

const SideBarLandlord = ({
  activeItem,
  hoveredItem,
  onItemClick,
  onAddListing,
  onToggleDarkMode,
  onProfileClick,
  onSignOut,
  user = defaultUser,
  className = "",
}: SideBarLandlordProps) => {
  const navigate = useNavigate();
  const { isDark, toggle } = useTheme();
  const [internalHover, setInternalHover] = useState<SideBarLandlordItemKey>();
  const [collapsed, setCollapsed] = useState(() => isSmallScreen());
  const [isMobile, setIsMobile] = useState(() => isSmallScreen());
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [profileMenuPlacement, setProfileMenuPlacement] = useState<
    "top" | "bottom"
  >("top");
  const profileMenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const small = isSmallScreen();
      setIsMobile(small);
      if (small) {
        setCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleItemClick = (item: (typeof navItems)[number]) => {
    if (isMobile) setCollapsed(true);
    onItemClick ? onItemClick(item.key) : navigate(item.route);
  };

  const resolveProfileMenuPlacement = useCallback(() => {
    if (!profileMenuRef.current) return;
    const menuHeight = 76;
    const menuGap = 8;
    const viewportPadding = 8;
    const profileRect = profileMenuRef.current.getBoundingClientRect();
    const canOpenBelow =
      profileRect.bottom + menuGap + menuHeight <=
      window.innerHeight - viewportPadding;
    setProfileMenuPlacement(canOpenBelow ? "bottom" : "top");
  }, []);

  const handleProfileButtonClick: MouseEventHandler<HTMLButtonElement> = () => {
    if (!isProfileMenuOpen) resolveProfileMenuPlacement();
    setIsProfileMenuOpen((prev) => !prev);
  };

  const handleViewProfileClick: MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    setIsProfileMenuOpen(false);
    onProfileClick?.(event);
  };

  const handleSignOutClick: MouseEventHandler<HTMLButtonElement> = (event) => {
    setIsProfileMenuOpen(false);
    onSignOut?.(event);
  };

  useEffect(() => {
    if (!isProfileMenuOpen) return;
    const handleDocumentClick = (event: MouseEvent) => {
      if (profileMenuRef.current?.contains(event.target as Node)) return;
      setIsProfileMenuOpen(false);
    };
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsProfileMenuOpen(false);
    };
    const handleResize = () => resolveProfileMenuPlacement();
    window.addEventListener("mousedown", handleDocumentClick);
    window.addEventListener("keydown", handleEscapeKey);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("mousedown", handleDocumentClick);
      window.removeEventListener("keydown", handleEscapeKey);
      window.removeEventListener("resize", handleResize);
    };
  }, [isProfileMenuOpen, resolveProfileMenuPlacement]);

  useEffect(() => {
    if (collapsed) setIsProfileMenuOpen(false);
  }, [collapsed]);

  const handleBackdropClick = () => {
    if (isMobile && !collapsed) setCollapsed(true);
  };

  const w = collapsed ? "w-[68px]" : "w-[200px]";
  const positionClass = isMobile
    ? "fixed top-0 left-0 z-40 h-screen"
    : "relative h-full min-h-screen";

  return (
    <>
      {isMobile && !collapsed && (
        <div
          className="fixed inset-0 z-30 bg-black/30 backdrop-blur-sm"
          aria-hidden="true"
          onClick={handleBackdropClick}
        />
      )}

      <aside
        className={[
          "flex shrink-0 flex-col items-center gap-[32px] border border-solid border-[#f0f0f0] pt-[24px] pb-[30px] transition-[width] duration-200",
          isMobile && !collapsed ? "bg-white" : "bg-transparent",
          positionClass,
          w,
          className,
        ].join(" ")}
      >
        {/* Toggle button */}
        <button
          type="button"
          onClick={() => setCollapsed((c) => !c)}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          className="absolute -right-[12px] top-[24px] z-50 flex h-[24px] w-[24px] items-center justify-center rounded-full border border-[#f0f0f0] bg-white shadow-sm text-[#666] transition-colors hover:text-[#096c5b]"
        >
          <Icon
            icon={
              collapsed
                ? "material-symbols:chevron-right-rounded"
                : "material-symbols:chevron-left-rounded"
            }
            className="h-[16px] w-[16px]"
          />
        </button>

        {/* Logo */}
        <div className="flex h-[40px] items-center justify-center overflow-hidden">
          {collapsed ? (
            <img
              className="h-[28px] w-[28px]"
              src={AtlasLogoMin}
              aria-label="Atlas"
            />
          ) : (
            <AtlasLogo className="h-full w-[128px]" aria-label="Atlas" />
          )}
        </div>

        <div className="flex w-full flex-col gap-[32px]">
          {/* Add listing button */}
          <div
            className={
              collapsed ? "flex justify-center" : "pl-[32px] pr-[16px]"
            }
          >
            {collapsed ? (
              <button
                type="button"
                onClick={onAddListing}
                aria-label="Add new listing"
                className="flex h-[36px] w-[36px] items-center justify-center rounded-full bg-[#096c5b] text-white transition-colors hover:bg-[#075a4c]"
              >
                <Icon
                  icon="material-symbols:add-rounded"
                  className="h-[20px] w-[20px]"
                />
              </button>
            ) : (
              <button
                type="button"
                onClick={onAddListing}
                className="flex w-full cursor-pointer items-center overflow-hidden rounded-[100px] bg-[#f0f0f0] pl-[17px] pr-[12px] transition-colors duration-200 ease-in-out hover:bg-[#e6e6e6]"
              >
                <span className="flex flex-1 items-start overflow-hidden py-[10px]">
                  <span className="font-['Inter',sans-serif] text-[10px] font-semibold leading-normal whitespace-nowrap text-[#666]">
                    Add New Listing
                  </span>
                </span>
                <span className="flex h-[32px] w-[32px] items-center justify-center rounded-[100px] bg-[#096c5b] text-white transition-colors duration-200 ease-in-out">
                  <Icon
                    icon="material-symbols:add-rounded"
                    className="h-[24px] w-[24px]"
                    aria-hidden="true"
                  />
                </span>
              </button>
            )}
          </div>

          {/* Nav */}
          <nav className="flex flex-col gap-[12px]">
            {navItems.map((item) => {
              const effective = hoveredItem ?? internalHover;
              const state =
                item.key === activeItem
                  ? "clicked"
                  : item.key === effective
                    ? "hovered"
                    : "default";

              return (
                <div
                  key={item.key}
                  onMouseEnter={() => setInternalHover(item.key)}
                  onMouseLeave={() =>
                    setInternalHover((p) => (p === item.key ? undefined : p))
                  }
                  className="relative transition-colors duration-150 hover:bg-[#F0FAF6]"
                  title={collapsed ? item.label : undefined}
                >
                  {/* Left active bar */}
                  <span
                    aria-hidden="true"
                    className={[
                      "absolute left-0 top-1/2 -translate-y-1/2 w-[3px] rounded-r-[3px] bg-[#096c5b] transition-all duration-200",
                      state === "clicked"
                        ? "h-[24px] opacity-100"
                        : "h-0 opacity-0",
                    ].join(" ")}
                  />

                  {collapsed ? (
                    <button
                      type="button"
                      onClick={() => handleItemClick(item)}
                      aria-label={item.label}
                      className={[
                        "flex h-[44px] w-full items-center justify-center",
                        state === "clicked" ? "text-[#096c5b]" : "text-[#666]",
                      ].join(" ")}
                    >
                      <Icon icon={item.icon} className="h-[20px] w-[20px]" />
                    </button>
                  ) : (
                    <SideBarLandlordButton
                      icon={item.icon}
                      label={item.label}
                      state={state}
                      onClick={() => handleItemClick(item)}
                    />
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        {/* Footer */}
        <div className="flex flex-1 w-full flex-col justify-end gap-[12px]">
          {/* Dark mode */}
          <button
            type="button"
            onClick={onToggleDarkMode}
            aria-label="Toggle dark mode"
            className={[
              "flex cursor-pointer items-center transition-colors hover:bg-[#F0FAF6]",
              collapsed
                ? "h-[44px] w-full justify-center"
                : "w-[180px] gap-[24px] pr-[20px]",
            ].join(" ")}
          >
            {!collapsed && (
              <span
                aria-hidden="true"
                className="h-[44px] w-[8px] shrink-0 rounded-[4px] bg-white"
              />
            )}
            <span
              className={[
                "flex h-[44px] items-center gap-[16px] rounded-[12px] px-[4px]",
                collapsed ? "" : "flex-1",
              ].join(" ")}
            >
              <Icon
                icon="gg:dark-mode"
                className="h-[24px] w-[24px] shrink-0 text-[#001d18]"
                aria-hidden="true"
              />
              {!collapsed && (
                <span className="font-['Inter',sans-serif] text-[14px] font-semibold leading-normal text-[#001d18]">
                  Dark Mode
                </span>
              )}
            </span>
          </button>

          <div className="flex w-full flex-col items-start px-[20px]">
            <div className="h-[2px] w-full rounded-[100px] bg-[#f0f0f0]" />
          </div>

          {/* Profile with dropdown */}
          <div ref={profileMenuRef} className="relative w-full">
            {isProfileMenuOpen && !collapsed && (
              <div
                className={[
                  "absolute left-[20px] z-30 flex h-[68px] w-[171px] flex-col gap-[7px] rounded-[9px] border border-solid border-[#f0f0f0] bg-[#f7f7f7] px-[11px] py-[9px] shadow-[0_4px_18px_rgba(0,0,0,0.1)]",
                  profileMenuPlacement === "bottom"
                    ? "top-full mt-[8px]"
                    : "bottom-full mb-[8px]",
                ].join(" ")}
              >
                <button
                  type="button"
                  onClick={handleViewProfileClick}
                  className="h-[21px] w-full cursor-pointer rounded-[9px] bg-[#cbf6ed] text-center font-['Inter',sans-serif] text-[11px] font-medium text-[#096c5b] transition-colors duration-150 hover:brightness-95"
                >
                  View Profile
                </button>
                <button
                  type="button"
                  onClick={handleSignOutClick}
                  className="h-[21px] w-full cursor-pointer rounded-[9px] border border-solid border-[#f0f0f0] bg-white bg-gradient-to-b from-[#c00f0f] to-[#e44f4f] bg-clip-text text-center font-['Inter',sans-serif] text-[11px] font-medium text-transparent transition-colors duration-150 hover:bg-[#f9f9f9]"
                >
                  Log Out
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={handleProfileButtonClick}
              aria-haspopup="menu"
              aria-expanded={isProfileMenuOpen}
              aria-label={`${user.name} profile`}
              className={[
                "flex cursor-pointer items-center overflow-hidden py-[10px] transition-colors duration-200 ease-in-out hover:bg-[#F0FAF6]",
                collapsed
                  ? "w-full justify-center"
                  : "w-full gap-[8px] pl-[32px] pr-[20px]",
              ].join(" ")}
            >
              <span className="flex h-[36px] w-[36px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#e5e7eb] text-[#9ca3af]">
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <Icon
                    icon="solar:user-bold"
                    className="h-[22px] w-[22px]"
                    aria-hidden="true"
                  />
                )}
              </span>
              {!collapsed && (
                <span className="flex flex-col items-start justify-center gap-[4px] overflow-hidden">
                  <span className="font-['Inter',sans-serif] text-[14px] font-bold leading-normal whitespace-nowrap text-[#096c5b]">
                    {user.name}
                  </span>
                  {user.verified && (
                    <span className="flex items-center gap-[4px]">
                      <span className="bg-gradient-to-b from-[#5dc2a8] to-[#0c8873] bg-clip-text font-['Inter',sans-serif] text-[10px] font-bold leading-normal whitespace-nowrap text-transparent">
                        Verified
                      </span>
                      <Icon
                        icon="material-symbols:verified"
                        className="h-[10px] w-[10px] text-[#0c8873]"
                        aria-hidden="true"
                      />
                    </span>
                  )}
                </span>
              )}
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default SideBarLandlord;
