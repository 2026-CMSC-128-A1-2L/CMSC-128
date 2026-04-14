import { FunctionComponent } from 'react';
import {Icon} from '@iconify/react';


const Sidebar: FunctionComponent = () => {
  	return (
    		<div className="w-full h-[924px] relative text-left text-[24px] text-darkslategray font-inter">
      			<div className="absolute top-[0px] left-[0px] shadow-[0px_0px_4px_rgba(0,_0,_0,_0.25)] bg-white w-[300px] h-[924px]" />
      			<div className="absolute top-[60px] left-[32px] w-[248px] flex flex-col items-start gap-3">
        				<b className="self-stretch h-[46px] relative leading-8 flex items-center shrink-0">Settings</b>
        				<div className="self-stretch flex flex-col items-start gap-3 text-center text-num-18 font-lora">
          					<div className="self-stretch h-12 relative text-left">
            						<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-12 bg-white" />
            						<div className="absolute h-[97.92%] w-[67.74%] top-[0%] left-[25.81%] font-semibold flex items-center">Profile</div>
            						<div className="absolute top-[7px] left-[16px] w-8 h-[32.6px]">
              							<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] overflow-hidden">
                								<Icon icon="iconamoon:profile"/>
              							</div>
            						</div>
          					</div>
          					<div className="self-stretch h-12 relative">
            						<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-12 bg-white" />
            						<div className="absolute h-[97.92%] w-[40.32%] top-[0%] left-[19.35%] font-semibold flex items-center justify-center">General</div>
                                    <Icon icon="solar:settings-linear" className="absolute h-[66.67%] w-[12.9%] top-[16.67%] right-[80.65%] bottom-[16.67%] left-[6.45%] max-w-full overflow-hidden max-h-full"/>
          					</div>
          					<div className="self-stretch h-12 relative">
            						<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-12 bg-white" />
            						<div className="absolute h-[97.92%] w-[40.32%] top-[0%] left-[21.37%] font-semibold flex items-center justify-center">Calendar</div>
            						<Icon icon="mdi:calendar-outline" className="absolute h-[66.67%] w-[12.9%] top-[16.67%] right-[80.65%] bottom-[16.67%] left-[6.45%] max-w-full overflow-hidden max-h-full"/>
            
          					</div>
          					<div className="self-stretch h-12 relative">
            						<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-12 bg-white" />
            						<div className="absolute h-[97.92%] w-[35.89%] top-[2.08%] left-[20.56%] font-semibold flex items-center justify-center">Billings</div>
            						<Icon icon="fluent:payment-20-regular" className="absolute top-[8px] left-[16px] w-8 h-8"/>
                                    
          					</div>
          					<div className="self-stretch h-12 relative">
            						<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-12 bg-white" />
            						<div className="absolute h-[97.92%] w-[40.32%] top-[0%] left-[20.16%] font-semibold flex items-center justify-center">Security</div>
            						<Icon icon="hugeicons:security-check" className='absolute h-3/6 w-[9.68%] top-[25%] right-[82.26%] bottom-[25%] left-[8.06%] max-w-full overflow-hidden max-h-full'/>                                    
          					</div>
          					<div className="self-stretch h-12 relative">
            						<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-12 bg-white" />
            						<div className="absolute h-[97.92%] w-[49.19%] top-[0%] left-[23.39%] font-semibold flex items-center justify-center">Notifications</div>
            						<Icon icon="line-md:bell" className="absolute h-[44.79%] w-[7.26%] top-[27.08%] right-[83.47%] bottom-[28.13%] left-[9.27%] max-w-full overflow-hidden max-h-full"/>                                    
          					</div>
          					<div className="self-stretch h-12 relative">
            						<div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-12 bg-white" />
            						<div className="absolute h-[97.92%] w-[49.19%] top-[0%] left-[21.77%] font-semibold flex items-center justify-center">Preferences</div>
            						<Icon icon="pajamas:preferences" className="absolute h-[41.67%] w-[8.06%] top-[29.17%] right-[81.85%] bottom-[29.17%] left-[10.08%] max-w-full overflow-hidden max-h-full"/>                                    
          					</div>
        				</div>
      			</div>
    		</div>);
};

export default Sidebar ;
