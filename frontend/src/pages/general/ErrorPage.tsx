import { FunctionComponent } from 'react';

import errorOwl from '../../../assets/error_owl.png';
import { useNavigate } from 'react-router-dom';

const ErrorPage: FunctionComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-screen bg-darkslategray flex flex-col items-center justify-center p-4 sm:p-8 text-center text-lg font-inter overflow-hidden">
      <img
        src={errorOwl}
        className="w-[130px] sm:w-[180px] md:w-[230px] h-auto object-contain mb-4 animate-pulse drop-shadow-[0_0_25px_rgba(203,246,237,0.5)]"
        alt="Error Owl"
      />

      <div className="w-full max-w-[450px] text-[20px] sm:text-[24px] md:text-[32px] text-white font-lora font-medium leading-snug mb-6 sm:mb-8 px-2">
        Could not access the page. Try again after a few minutes.
      </div>

      <div
        onClick={() => navigate(-1)}
        className="cursor-pointer rounded-xl bg-lightcyan flex items-center justify-center py-2 sm:py-3 px-6 sm:px-8 transition-transform hover:scale-105 active:scale-95 text-darkslategray text-sm sm:text-base"
      >
        <b className="relative tracking-[-0.01em]">Go Back</b>
      </div>
    </div>
  );
};

export default ErrorPage;
