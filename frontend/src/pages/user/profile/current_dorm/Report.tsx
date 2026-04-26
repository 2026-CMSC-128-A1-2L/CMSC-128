import { useState } from "react";
import SideBar from "../../../../components/user/SideBar";
import Header from "../../../../components/user-report/Header";
import CurrentDormInfoCard from "../../../../components/CurrentDormInfoCard";
import StepIndicator from "../../../../components/StepIndicator";
import InfoContent from "../../../../components/user-report/InfoContent";
import ReviewContent from "../../../../components/user-report/ReviewContent";
import FinalizeContent from "../../../../components/user-report/FinalizeContent";

// Assets
import DormitoryImg from "../../../../../assets/image.png";
// Note: Ensure these icons are imported from your assets folder or a library like Lucide/Heroicons
import ArrowRightIcon from "../../../../../assets/rightArrow.svg";
// import LocationIcon from "../../../../../assets/location.svg";
// import UserIcon from "../../../../../assets/user.svg";
import SearchIcon from "../../../../../assets/search.svg";

export default function Reportv2() {
  // 1. State Management
  const [reportStages, setReportStages] = useState(1);
  const [reportJsonData, setReportJsonData] = useState("");

  // 2. Mock Data
  const LandlordName = "Quevin Custodio";
  const ManagerName = "Nathaniel Cunanan";
  const DormitoryName = "One Sapphire Place";
  const DormitoryAddress = "Batong Malake, Los Banos, Laguna";
  const RoomNumber = "Room 31";
  const DormitoryImage = DormitoryImg;
  const DormitoryTags = [
    "Single Room",
    "~18 sqm",
    "Contract: April 2026 - April 2027",
  ];
  const StepIndicatorStages = ["Information", "Reporting", "Finalize"];

  // 3. Handlers
  const onUserProfileTextClick = () => {
    console.log("Navigating to Profile...");
  };

  return (
    <div className="w-full min-h-screen relative overflow-y-auto flex flex-col items-start isolate bg-aliceblue text-left text-num-14 text-darkslategray-100 font-lora">
      <div className="w-full flex items-start z-[1]">
        {/* Sidebar Section */}
        <div className="sticky top-0 h-screen w-[200px] shrink-0">
          <SideBar />
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col items-start py-0 pl-10 pr-20 gap-6">
          {/* Header / Breadcrumbs Section */}
          <div className="self-stretch flex flex-col items-start gap-4 pt-8">
            <div className="h-6 flex items-center gap-1.5">
              <div
                className="relative font-semibold cursor-pointer hover:text-teal"
                onClick={onUserProfileTextClick}
              >
                User Profile
              </div>
              <img className="h-4 w-4 opacity-50" alt="" src={ArrowRightIcon} />
              <div
                className="relative font-semibold cursor-pointer hover:text-teal"
                onClick={onUserProfileTextClick}
              >
                Current Dorm
              </div>
              <img className="h-4 w-4 opacity-50" alt="" src={ArrowRightIcon} />
              <div className="relative font-semibold text-teal">Report</div>
            </div>

            {/* Search Bar - Optional/Hidden as per your code */}
            <div className="w-[704px] rounded-xl bg-white border border-whitesmoke-200 overflow-hidden hidden items-center py-2.5 px-6 gap-2.5 text-dimgray font-inter">
              <img className="h-5 w-5" alt="" src={SearchIcon} />
              <b className="text-sm font-medium">
                Search for Dorms, Apartments, or Locations...
              </b>
            </div>
          </div>

          {/* Main Form Card */}
          <div className="self-stretch bg-white rounded-2xl border border-whitesmoke-200 shadow-sm flex flex-col items-start py-num-32 px-num-0 gap-8 mb-10">
            {/* Top Card: Dormitory Information */}
            <div className="self-stretch flex flex-col items-center">
              <CurrentDormInfoCard
                LandlordName={LandlordName}
                ManagerName={ManagerName}
                DormitoryName={DormitoryName}
                DormitoryAddress={DormitoryAddress}
                RoomNumber={RoomNumber}
                DormitoryImage={DormitoryImage}
                DormitoryTags={DormitoryTags}
              />
            </div>

            {/* Progress Indicator */}
            <div className="self-stretch px-20">
              <StepIndicator
                currentStep={reportStages}
                steps={StepIndicatorStages}
              />
            </div>

            {/* Informational Text */}
            {reportStages === 1 && (
              <div className="self-stretch px-20 text-center text-darkslategray-100 font-inter">
                <p className="relative font-medium leading-relaxed">
                  Your safety and comfort are our top priorities. If something
                  isn't right, let us know. This simple three-step process helps
                  us understand the issue clearly so we can take the necessary
                  steps to resolve it quickly and keep our community secure.
                </p>
              </div>
            )}

            {/* Dynamic Step Content */}
            <div className="self-stretch px-10">
              {reportStages === 1 && (
                <InfoContent
                  reportStages={reportStages}
                  setReportStages={setReportStages}
                />
              )}
              {reportStages === 2 && (
                <ReviewContent
                  reportStages={reportStages}
                  setReportStages={setReportStages}
                  reportJsonData={reportJsonData}
                  setReportJsonData={setReportJsonData}
                />
              )}
              {reportStages === 3 && (
                <FinalizeContent
                  reportStages={reportStages}
                  setReportStages={setReportStages}
                  reportJsonData={reportJsonData}
                />
              )}
            </div>

            {/* FAQ/Footer Section (Only shown on Step 1) */}
            {reportStages === 1 && (
              <div className="self-stretch flex flex-col items-center gap-6 mt-4 px-10">
                <div className="w-full max-w-[714px]">
                  <b className="text-lg block mb-4">
                    Frequently Asked Questions:
                  </b>
                  <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="bg-whitesmoke-200 p-4 rounded flex justify-between items-center cursor-pointer hover:bg-gainsboro transition-colors"
                      >
                        <b className="text-sm">What will happen next?</b>
                        <span className="text-lg">›</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
