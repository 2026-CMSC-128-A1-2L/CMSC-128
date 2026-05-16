import type { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import PageBackground from '../general/PageBackground';
import RightArrow from '../../../assets/iconamoon_arrow-right-2.svg';
import SideBarLandlord, { type SideBarLandlordItemKey } from './SideBarLandlord';
import LandlordFooter from './LandlordFooter';

export type BreadcrumbItem = {
  label: string;
  to?: string;
};

type LandlordLayoutProps = {
  activeSidebarItem?: SideBarLandlordItemKey;
  breadcrumbs?: BreadcrumbItem[];
  activeTab?: string;
  children: ReactNode;
};

const LandlordLayout = ({ activeSidebarItem, breadcrumbs = [], children }: LandlordLayoutProps) => {
  const navigate = useNavigate();
  const normalizedBreadcrumbs =
    breadcrumbs.length >= 2 && breadcrumbs[0]?.label !== 'Home'
      ? [{ label: 'Home', to: '/landlord-homepage' }, ...breadcrumbs]
      : breadcrumbs;
  const shouldShowBreadcrumbs = normalizedBreadcrumbs.length >= 3;

  return (
    <div className="landlord-shell relative flex h-screen w-screen flex-col overflow-hidden">
      <PageBackground />
      <div className="relative z-10 flex flex-1 overflow-hidden">
        <SideBarLandlord
          activeItem={activeSidebarItem}
          onProfileClick={() => navigate('/landlord/profile/switcher')}
          onAddListing={() => navigate('/landlord/properties/new')}
        />

        <div className="flex min-w-0 flex-1 flex-col overflow-hidden pl-[68px] md:pl-0">
          <main className="flex min-w-0 flex-1 flex-col overflow-y-auto">
            <div className="flex h-[64px] shrink-0 items-end gap-[10px] px-4 pb-[10px] pt-[10px] font-inter text-num-12 font-semibold sm:px-6 md:px-8 lg:px-[32px]">
              {shouldShowBreadcrumbs && (
                <nav aria-label="Breadcrumb">
                  <ol className="flex h-[24px] items-center">
                    {normalizedBreadcrumbs.map((item, idx) => {
                      const isLast = idx === normalizedBreadcrumbs.length - 1;
                      return (
                        <li
                          key={`${item.to ?? item.label}-${item.label}`}
                          className="flex items-center pb-2"
                        >
                          {!isLast && item.to ? (
                            <Link
                              to={item.to}
                              className="whitespace-nowrap text-black transition-colors hover:text-darkslategray dark:text-[#edf6f4] dark:hover:text-[#72cbb8]"
                            >
                              {item.label}
                            </Link>
                          ) : (
                            <span
                              className={`whitespace-nowrap ${
                                isLast
                                  ? 'text-darkslategray dark:text-[#d7e0ef]'
                                  : 'text-black dark:text-[#edf6f4]'
                              }`}
                              aria-current={isLast ? 'page' : undefined}
                            >
                              {item.label}
                            </span>
                          )}
                          {!isLast && (
                            <img
                              src={RightArrow}
                              alt="Separator"
                              className="mx-2 h-[24px] w-[24px]"
                            />
                          )}
                        </li>
                      );
                    })}
                  </ol>
                </nav>
              )}
            </div>

            <div className="flex-1 px-4 pb-8 pt-0 sm:px-6 md:px-8 lg:px-[32px] dark:text-[#d7e0ef]">
              {children}
            </div>
          </main>

          <div className="relative z-10 shrink-0">
            <LandlordFooter />
          </div>
        </div>
      </div>
      {/* mali to eh, nagpapakita sa lahat ng pages eh*/}
      {/*Tutorial*/}
      {/* <div
        className="fixed bottom-10 right-10 z-[9999] cursor-pointer transition-all hover:scale-110 active:scale-95"
        onClick={() => setShowHelp(!showHelp)}
      >
        <div
          className="w-16 h-16 drop-shadow-lg"
          style={{
            background: "linear-gradient(135deg, #096C5B, #16917C)",
            WebkitMask:
              "url('https://api.iconify.design/iconoir/chat-bubble-question-solid.svg') no-repeat center / contain",
            mask: "url('https://api.iconify.design/iconoir/chat-bubble-question-solid.svg') no-repeat center / contain",
          }}
        />
      </div> */}
      {/* <TutorialBubble show={showHelp} onClose={() => setShowHelp(false)} /> */}
    </div>
  );
};

export default LandlordLayout;
