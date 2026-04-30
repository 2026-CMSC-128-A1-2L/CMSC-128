import { FunctionComponent } from 'react';

import owlLoading from '../../../assets/owl_loading.png';

const LoadingPage: FunctionComponent = () => {
  return (
    <div className="fixed inset-0 z-[9999] w-full h-screen bg-darkslategray flex flex-col items-center justify-center p-4 sm:p-8 overflow-hidden">
      <img
        src={owlLoading}
        className="w-[130px] sm:w-[180px] md:w-[230px] h-auto object-contain mb-6 sm:mb-8 animate-pulse drop-shadow-[0_0_25px_rgba(203,246,237,0.5)]"
        alt="Loading..."
      />

      <svg
        className="animate-spin h-8 w-8 sm:h-10 sm:w-10 text-white"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
    </div>
  );
};

export default LoadingPage;
