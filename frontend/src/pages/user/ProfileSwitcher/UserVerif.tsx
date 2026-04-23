import { FunctionComponent, useState, useCallback } from "react";
import { Icon } from "@iconify/react";
import ProgressBar from "../../../components/ProgressBar";
import TutorialBubble from "../../../components/Tutorials";
import TutorialIcon from "../../../assets/help-chat.svg";
import Footer from "../../../components/Footer";

interface UserVerifProps {
  verificationStep: number;
}

const UserVerif: FunctionComponent<UserVerifProps> = ({ verificationStep }) => {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div
      className="relative self-stretch flex flex-col items-start gap-12 shrink-0"
      data-scroll-to="searchBarContainer"
    >
      <div className="self-stretch flex flex-col items-center justify-center text-darkslategray-200 font-poppins">
        <ProgressBar currentStep={verificationStep} />
      </div>

      <TutorialBubble show={showHelp} onClose={() => setShowHelp(false)} />

      {/* header */}
      <div className="self-stretch flex items-center py-num-0 px-num-32 gap-6 shrink-0 text-[24px]">
        <div className="flex-1 flex items-center">
          <div className="flex items-center gap-2 text-[#2F3136]">
            <Icon icon="material-symbols:info-outline" className="w-6 h-6" />
            <b className="relative leading-8 ">Submit Documents</b>
            <b className="relative text-num-14 text-dimgray">
              0 out of 3 Documents Uploaded
            </b>
          </div>
        </div>
        <div className="h-8 w-24 rounded-num-16 bg-aliceblue flex items-center justify-center py-num-0 px-num-12 box-border text-num-14 text-slategray">
          <div className="h-8 w-24 rounded-num-16 bg-white flex items-center justify-center py-num-0 px-num-12 box-border shrink-0">
            <b className="relative">Submit</b>
          </div>
        </div>
      </div>

      {/* document 1: University ID */}
      <div className="self-stretch flex flex-col items-center justify-center py-num-0 px-num-32 shrink-0 text-left">
        <div className="w-[916px] rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden flex flex-col items-start justify-center py-num-10 px-num-32 gap-2.5">
          <div className="self-stretch flex items-center justify-between py-num-0 pl-num-0 pr-6 gap-0">
            <div className="flex-1 flex items-center gap-4">
              <b className="relative">{`Official University ID `}</b>
              <b className="relative text-dimgray">(For Old UP Students)</b>
              <div className="h-8 w-24 rounded-num-16 bg-white flex items-center justify-center py-num-0 px-num-12 box-border text-center">
                <b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                  Missing
                </b>
              </div>
            </div>
            <div className="w-[72px] flex items-center gap-6">
              <Icon icon="mdi:pencil" className="w-6 h-6" />
              <Icon icon="mdi:delete" className="w-6 h-6" />
            </div>
          </div>
          <div className="w-[852px] rounded-num-16 border-dimgray border-dashed border-[1px] box-border overflow-hidden flex items-center py-num-12 px-4 text-black">
            <div className="h-16 flex items-center gap-6">
              <Icon icon="mdi:cloud-upload" className="w-16 h-16" />
              <div className="flex flex-col items-start justify-center gap-2">
                <b className="relative">Upload the document</b>
                <div className="relative text-[12px] tracking-[0.02em] font-semibold font-lora text-slategray">
                  .jpg or .png less than 500KB
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* document 2: Form 5 */}
      <div className="self-stretch flex flex-col items-center justify-center py-num-0 px-num-32 shrink-0 text-left">
        <div className="w-[916px] rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden flex flex-col items-start justify-center py-num-10 px-num-32 gap-2.5">
          <div className="self-stretch flex items-center justify-between py-num-0 pl-num-0 pr-6 gap-0">
            <div className="flex-1 flex items-center gap-4">
              <b className="relative">Form 5</b>
              <b className="relative text-dimgray">(For Old UP Students)</b>
              <div className="h-8 w-24 rounded-num-16 bg-white flex items-center justify-center py-num-0 px-num-12 box-border text-center">
                <b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                  Missing
                </b>
              </div>
            </div>
            <div className="w-[72px] flex items-center gap-6">
              <Icon icon="mdi:pencil" className="w-6 h-6" />
              <Icon icon="mdi:delete" className="w-6 h-6" />
            </div>
          </div>
          <div className="w-[852px] h-[88px] rounded-num-16 border-dimgray border-dashed border-[1px] box-border overflow-hidden shrink-0 flex items-center py-num-12 px-4 text-black">
            <div className="h-16 flex items-center gap-6">
              <Icon icon="mdi:cloud-upload" className="w-16 h-16" />
              <div className="flex flex-col items-start justify-center gap-2">
                <b className="relative">Upload the document</b>
                <div className="relative text-[12px] tracking-[0.02em] font-semibold font-lora text-slategray">
                  .pdf less than 500KB
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* document 3: Notice of Admission */}
      <div className="self-stretch flex flex-col items-center justify-center py-num-0 px-num-32 shrink-0 text-left">
        <div className="w-[916px] rounded-num-16 bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden flex flex-col items-start justify-center py-num-10 px-num-32 gap-2.5">
          <div className="self-stretch flex items-center justify-between py-num-0 pl-num-0 pr-6 gap-0">
            <div className="flex-1 flex items-center gap-4">
              <b className="relative">Notice of Admission</b>
              <b className="relative text-dimgray">
                (For Incoming Freshman UP Students)
              </b>
              <div className="h-8 w-24 rounded-num-16 bg-white flex items-center justify-center py-num-0 px-num-12 box-border text-center">
                <b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                  Missing
                </b>
              </div>
            </div>
            <div className="w-[72px] flex items-center gap-6">
              <Icon icon="mdi:pencil" className="w-6 h-6" />
              <Icon icon="mdi:delete" className="w-6 h-6" />
            </div>
          </div>
          <div className="w-[852px] h-[88px] rounded-num-16 border-dimgray border-dashed border-[1px] box-border overflow-hidden shrink-0 flex items-center py-num-12 px-4 text-black">
            <div className="h-16 flex items-center gap-6">
              <Icon icon="mdi:cloud-upload" className="w-16 h-16" />
              <div className="flex flex-col items-start justify-center gap-2">
                <b className="relative">Upload the document</b>
                <div className="relative text-[12px] tracking-[0.02em] font-semibold font-lora text-slategray">
                  .pdf less than 500KB
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ======= FLOATING ICON FOR TUTORIAL ======= */}
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

export default UserVerif;
