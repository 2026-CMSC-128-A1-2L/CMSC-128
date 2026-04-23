import { FunctionComponent } from "react";
import DmsSidebar from "../../../components/general/DmsSidebar";
import oswald from "../../../assets/owl_inbox.png";

const DmsLanding: FunctionComponent = () => {
  return (
    <div className="w-full h-screen flex items-start font-inter overflow-hidden bg-white">
      <div className="sticky top-0 h-full w-fit flex-shrink-0 border-r border-whitesmoke">
        <DmsSidebar />
      </div>

      <div className="bg-white flex-1 h-full flex flex-col items-center justify-center relative">
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
      </div>
    </div>
  );
};

export default DmsLanding;
