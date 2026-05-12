import { type FunctionComponent, useState } from 'react';
import DmsSidebar from '../../../components/general/DmsSidebar';
import oswald from '../../../../assets/owl_inbox.png';
import TutorialIcon from '../../../../assets/help-chat.svg';
import TutorialBubble from '../../user/messages/DMsTutorial';

const LandlordMessages: FunctionComponent = () => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="w-full h-screen flex items-start font-inter overflow-hidden bg-white dark:bg-[#101111] dark:text-[#d7e0ef]">
      <div className="sticky top-0 h-full w-fit shrink-0 border-r border-whitesmoke dark:border-[#303331]">
        <DmsSidebar />
      </div>
      <TutorialBubble show={showHelp} onClose={() => setShowHelp(false)} />
      <div className="bg-white flex-1 h-full flex flex-col items-center justify-center relative dark:bg-[#101111]">
        <div className="flex flex-col items-center gap-4">
          <img src={oswald} alt="No conversation selected" className="w-80 h-auto object-contain" />
          <div className="flex flex-col items-center gap-1">
            <b className="text-num-18 text-darkslategray leading-tight dark:text-[#d7e0ef]">
              No conversation selected
            </b>
            <p className="text-num-14s font-medium text-dimgray dark:text-[#a4acba]">
              Select a tab to view specific message
            </p>
          </div>
        </div>
      </div>
      {/* ======= FLOATING ICON ========== */}
      <div
        className="fixed bottom-10 right-10 z-1000 cursor-pointer transition-all hover:scale-110 active:scale-95"
        onClick={() => setShowHelp(!showHelp)}
      >
        <img src={TutorialIcon} alt="Help" className="w-16 h-16 drop-shadow-lg" />
      </div>
    </div>
  );
};

export default LandlordMessages;
