import { useState } from "react";

const CurrentDormToVerificationSwitch = () => {
  const [activeTab, setActiveTab] = useState<"dorm" | "verification">("dorm");

  return (
    <div className="flex flex-col items-center justify-center w-full py-4">
      <div className="relative flex flex-row items-center gap-2 p-1 bg-transparent rounded-full">
        
        {/* sliding*/}
        <div
          className={`absolute h-[48px] w-[240px] bg-[#064e3b] rounded-full shadow-md transition-all duration-300 ease-in-out z-0 ${
            activeTab === "dorm" 
              ? "left-0" 
              : "left-[248px]"
          }`}
        />

        {/* current dorm */}
        <div
          onClick={() => setActiveTab("dorm")}
          className={`relative z-10 w-[240px] h-[48px] flex items-center justify-center cursor-pointer transition-colors duration-300 ${
            activeTab === "dorm" ? "text-white" : "text-slategray hover:text-teal-800"
          }`}
        >
          <div className="text-[14px] font-bold tracking-wider uppercase">
            Current Dorm
          </div>
        </div>

        {/* verification status */}
        <div
          onClick={() => setActiveTab("verification")}
          className={`relative z-10 w-[240px] h-[48px] flex items-center justify-center cursor-pointer transition-colors duration-300 ${
            activeTab === "verification" ? "text-white" : "text-slategray hover:text-teal-800"
          }`}
        >
          <div className="text-[14px] font-bold tracking-wider uppercase whitespace-nowrap">
            Verification Status
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentDormToVerificationSwitch;