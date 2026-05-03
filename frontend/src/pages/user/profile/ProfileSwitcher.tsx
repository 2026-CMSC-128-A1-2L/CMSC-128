// pages/user/ProfileSwitcher.tsx
import { useState, useCallback } from "react";
import CurrentDorm from "./current_dorm/CurrentDorm";
import CurrentDormCard from "./current_dorm/CurrentDormCard";
import UserVerif from "./verification/UserVerif";
import Sidebar from "../../../components/user/SideBar";
import Footer from "../../../components/general/Footer";
import Switch from "../../../components/user/CurrentDormToVerificationSwitch";
import ProfileInfo from "../../../components/user/ProfileInfo";
import { Icon } from "@iconify/react";

const ProfileSwitcher = () => {
  const [activeTab, setActiveTab] = useState<"dorm" | "verification">("dorm");

  const onArrowUpClick = useCallback(() => {
    const anchor = document.querySelector(
      "[data-scroll-to='searchBarContainer']",
    );
    if (anchor) {
      anchor.scrollIntoView({ block: "start", behavior: "smooth" });
    }
  }, []);

  const propertyImageSrc = undefined;
  const propertyName = undefined;
  const unitNumber = undefined;
  const contractDuration = undefined;
  const leaseEndDate = undefined;
  const verified = true;

  return (
    <div className="w-full h-screen relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray-100 font-inter">
      <div className="w-full max-w-[1440px] h-auto overflow-hidden shrink-0 flex flex-col items-start">
        <div className="gap-8 flex-1 flex items-center">
          <div className="sticky top-0 left-0 h-full w-[200px] hidden md:block z-10">
            <Sidebar />
          </div>

          <div className="w-full flex flex-col items-start justify-between gap-20">
            <div className="self-stretch flex flex-col items-start py-num-0 pr-20">
              <div
                className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-num-10 box-border gap-2.5"
                data-scroll-to="searchBarContainer"
              >
                <div className="h-6 flex items-center gap-1.5">
                  <div className="relative font-semibold">User Profile</div>
                  <Icon
                    icon="iconamoon:arrow-right-2"
                    className="h-6 w-6 relative"
                  />
                  <div className="relative font-semibold">
                    {activeTab === "dorm"
                      ? "Current Dorm"
                      : "Verification Status"}
                  </div>
                </div>
              </div>

              <div className="self-stretch min-h-[800px] rounded-2xl bg-white flex flex-col items-start gap-3 text-center text-dimgray font-inter pb-10">
                <ProfileInfo />

                <div className="self-stretch flex flex-col items-start gap-12">
                  <Switch activeTab={activeTab} setActiveTab={setActiveTab} />

                  <div className="self-stretch w-full">
                    {activeTab === "dorm" ? (
                      <CurrentDormCard
                        propertyImageSrc={propertyImageSrc}
                        propertyName={propertyName}
                        unitNumber={unitNumber}
                        contractDuration={contractDuration}
                        leaseEndDate={leaseEndDate}
                        verified={verified}
                      />
                    ) : (
                      <UserVerif verificationStep={0} />
                    )}
                  </div>
                </div>
              </div>
              {/* ======= SCROLL UP ICON ======= */}
              <div
                className="fixed bottom-32 right-10 w-[60px] h-[60px] rounded-[30px] [background:linear-gradient(183.48deg,#096c5b,#16917c)] flex items-center justify-center cursor-pointer z-1000 shadow-lg transition-all hover:scale-110 active:scale-95"
                onClick={onArrowUpClick}
              >
                <Icon
                  icon="mdi:arrow-up"
                  className="w-[27.7px] h-[27.7px] text-white"
                />
              </div>
              {/* ======= SCROLL UP ICON ======= */}
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSwitcher;
