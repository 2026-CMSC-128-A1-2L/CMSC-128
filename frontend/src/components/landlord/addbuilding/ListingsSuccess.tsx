import type { FunctionComponent } from 'react';

interface ListingsSuccessProps {
  onConfirmContainerClick: () => void;
}

const ListingsSuccess: FunctionComponent<ListingsSuccessProps> = ({ onConfirmContainerClick }) => {
  return (
    <div className="w-120 h-125 relative rounded-2xl bg-white overflow-hidden flex flex-col items-start p-8 box-border text-center text-2xl text-gray font-inter">
      <div className="self-stretch h-[436px] overflow-hidden shrink-0 flex flex-col items-center py-6 px-2.5 box-border gap-6">
        <div className="self-stretch flex flex-col items-start">
          <div className="self-stretch bg-white overflow-hidden flex items-center justify-center py-[5px] px-[3px]">
            <div className="h-[84px] w-[84px] rounded-full bg-[#CBF6ED] flex items-center justify-center relative">
              <div
                className="w-[50px] h-[50px]"
                style={{
                  background: 'linear-gradient(180deg, #5DC2A8 24%, #0C8873 84%)',

                  maskImage: 'url(https://api.iconify.design/game-icons:confirmed.svg)',
                  WebkitMaskImage: 'url(https://api.iconify.design/game-icons:confirmed.svg)',

                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain'
                }}
              />
            </div>

          </div>
          <div className="self-stretch overflow-hidden flex flex-col items-center justify-center p-2.5 gap-2.5">
            <b className="self-stretch relative leading-8">Building Application Successful</b>
            <div className="self-stretch relative text-sm leading-6 font-medium">
              <span>{`You have successfully finalize your application.`}<br />{``}<br />{`Your application shall be reviewed within `}</span>
              <span className="text-transparent bg-clip-text! [background:linear-gradient(180deg,#c29722,#f6b709)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">{`48 - 72 hours `}</span>
              <span>by our admins, constant notifications shall be sent to keep you posted at all time.</span>
            </div>
          </div>
        </div>
        <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start p-2.5 text-sm text-teal">
          <div className="self-stretch rounded-xl bg-lightcyan overflow-hidden flex items-center justify-center py-3 px-2.5 cursor-pointer" onClick={onConfirmContainerClick}>
            <div className="relative font-semibold">Continue</div>
          </div>
        </div>
      </div>
    </div>);
};

export default ListingsSuccess;
