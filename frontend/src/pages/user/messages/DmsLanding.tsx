import { type FunctionComponent, useState } from "react";
import DmsSidebar from "../../../components/general/DmsSidebar";
import oswald from "../../../../assets/owl_inbox.png";
import TutorialIcon from "../../../../assets/help-chat.svg";
import TutorialBubble from "../messages/DMsTutorial";
import { Outlet, useLocation } from "react-router-dom";

const DmsLanding: FunctionComponent = () => {
  const [showHelp, setShowHelp] = useState(false);
  const location = useLocation();
  const isBaseRoute = location.pathname === "/direct-messages" || location.pathname === "/direct-messages/";

  return (
    <div className="w-full h-screen flex items-start font-inter overflow-hidden relative">
      <div className="sticky top-0 h-full w-fit shrink-0 border-r border-whitesmoke z-10 bg-transparent">
        <DmsSidebar />
      </div>
      <TutorialBubble show={showHelp} onClose={() => setShowHelp(false)} />

      <div className="bg-transparent flex-1 h-full flex flex-col items-center justify-center relative overflow-y-auto overflow-x-hidden z-10">
        {isBaseRoute ? (
          <div className="flex flex-col items-center gap-4">
            <img
              src={oswald}
              alt="No conversation selected"
              className="w-80 h-auto object-contain"
            />
            <div className="flex flex-col items-center gap-1">
              <b className="text-num-18 text-darkslategray leading-tight">
                No conversation selected
              </b>
              <p className="text-num-14s font-medium text-dimgray">
                Select a tab to view specific message
              </p>
            </div>
          </div>
        ) : (
          <Outlet />
        )}
      </div>
      {/* ======= FLOATING ICON ========== */}
      <div
        className="fixed bottom-10 right-10 z-[1000] cursor-pointer transition-all hover:scale-110 active:scale-95"
        onClick={() => setShowHelp(!showHelp)}
      >
        <img
          src={TutorialIcon}
          alt="Help"
          className="w-16 h-16 drop-shadow-lg"
        />
      </div>
    </div>
  );
};

export default DmsLanding;
