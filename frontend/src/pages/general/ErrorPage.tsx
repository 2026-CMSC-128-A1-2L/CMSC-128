import { FunctionComponent } from 'react';



import errorOwl from '../../../assets/error_owl.png';
import { useNavigate } from 'react-router-dom';

const ErrorPage: FunctionComponent = () => {
    const navigate = useNavigate();

    return (
        <div className="w-full h-screen bg-darkslategray flex flex-col items-center justify-center p-4 text-center text-lg font-inter">
            <img src={errorOwl} className="w-[180px] sm:w-[230px] h-auto object-contain mb-4 animate-pulse drop-shadow-[0_0_25px_rgba(203,246,237,0.5)]" alt="Error Owl" />
            
            <div className="max-w-[450px] text-[24px] sm:text-[32px] text-white font-lora font-medium leading-snug mb-8">
                Could not access the page. Try again after a few minutes.
            </div>
            
            <div 
                onClick={() => navigate(-1)}
                className="cursor-pointer rounded-xl bg-lightcyan flex items-center justify-center py-3 px-8 transition-transform hover:scale-105 active:scale-95 text-darkslategray"
            >
                <b className="relative tracking-[-0.01em]">Go Back</b>
            </div>
        </div>
    );
};

export default ErrorPage;
