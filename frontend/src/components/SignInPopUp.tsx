
import { FunctionComponent, useCallback } from 'react';
import logo from "../../assets/footer_logo.svg"

// Define the Props so your parent component can control it
interface SignInPopUpProps {
  onClose: () => void;
}

const SignInPopUp: FunctionComponent<SignInPopUpProps> = ({ onClose }) => {
  const onGoogleContainerClick = useCallback(() => {
    console.log("Google Sign In Logic Goes Here");
  }, []);

  return (
    // Backdrop: fixed to cover screen, z-index high, centered content
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Dark Overlay - clicking this closes the popup */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* The Actual Popup Card */}
      <div className="w-full max-w-[500px] relative shadow-2xl rounded-num-16 bg-white overflow-hidden flex flex-col items-center justify-center py-12 px-6 md:px-12 gap-6 text-left text-num-18 text-dimgray font-inter animate-fade-in border-num-4">

        {/* Logo / Image Placeholder */}
        <div className="flex flex-col items-center justify-center">
          {/* Replace with actual logo <img src="..." /> */}
          <img src={logo} className="w-20 h-20" />
        </div>

        {/* Header Text */}
        <div className="self-stretch flex flex-col items-center justify-center text-teal text-center">
          <b className="relative leading-8 text-num-24">
            <span className="text-gray">Built for</span>
            <span>{` `}</span>
            <span className="bg-gradient-to-b from-[#5dc2a8] to-[#0c8873] bg-clip-text text-transparent">
              students
            </span>
            <span>,</span>
          </b>
          <b className="relative text-num-36 font-lora">
            <span className="text-gray">by</span>
            <span>{` `}</span>
            <span className="bg-gradient-to-b from-[#5dc2a8] to-[#0c8873] bg-clip-text text-transparent">
              students
            </span>

            <span>.</span>
          </b>
        </div>

        {/* Google Button */}
        <div className="self-stretch p-2.5">
          <div
            className="self-stretch rounded-num-12 bg-aliceblue border-whitesmoke-300 border-solid border-[1px] flex items-center justify-center py-3 px-4 gap-3 cursor-pointer hover:bg-lightcyan transition-colors"
            onClick={onGoogleContainerClick}
          >
            <img className="h-6 w-6 relative" alt="G" src="https://www.svgrepo.com/show/475656/google-color.svg" />
            <b className="relative tracking-num--0_01 text-gray">Sign in with Google</b>
          </div>
        </div>

        {/* Footer / Legal */}
        <div className="text-center text-num-12">
          <p className="m-0 leading-6 font-medium text-gray-100">
            Signing up for an ATLAS account means you agree to the
          </p>
          <div className="flex items-center justify-center gap-1 text-teal-200">
            <span className="font-semibold cursor-pointer underline">Privacy Policy</span>
            <span className="text-dimgray">and</span>
            <span className="font-semibold cursor-pointer underline">Terms of Service.</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInPopUp;
