import CurrentDormInfoCard from "../../../../components/CurrentDormInfoCard";
import StepIndicator from "../../../../components/StepIndicator";
import DormitoryImg from "../../../../../assets/image.png";
import SideBar from "../../../../components/user/SideBar";
import BreadcrumbHeader from "../../../../components/general/Breadcrumb";
import InfoContent from "../../../../components/user/user-report/InfoContent";
import ReviewContent from "../../../../components/user/user-report/ReviewContent";
import FinalizeContent from "../../../../components/user/user-report/FinalizeContent";
import { useState } from "react";

export default function Reportv2() {
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

  const StepIndicatorStages = ["Information", "Reviewing", "Finalize"];

  const [reportStages, setReportStages] = useState(1);
  const [reportJsonData, setReportJsonData] = useState("");

  return (
    <div className="flex">
        <SideBar />
        <div className="flex flex-col max-w-[1128px] ml-5 md:ml-10 py-10">
          <BreadcrumbHeader
            routes={[
              { name: "User Profile", url: "/profile-switcher" },
              { name: "Current Dorm", url: "/current-dorm" },
              { name: "Report" },
            ]}
          />
          <div className="flex flex-col items-center max-w-[1128px] bg-white border border-whitesmoke-200 rounded-2xl overflow-hidden shadow-sm">
            <CurrentDormInfoCard
              LandlordName={LandlordName}
              ManagerName={ManagerName}
              DormitoryName={DormitoryName}
              DormitoryAddress={DormitoryAddress}
              RoomNumber={RoomNumber}
              DormitoryImage={DormitoryImage}
              DormitoryTags={DormitoryTags}
            />
            <StepIndicator
              currentStep={reportStages}
              steps={StepIndicatorStages}
            />

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
        </div>
      </div>
  );
}
