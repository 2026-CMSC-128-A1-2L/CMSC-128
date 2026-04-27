import type { FunctionComponent, } from 'react';
import SideBar from '../../../components/user/SideBar';
import Footer from '../../../components/general/Footer';
import PropertyTabs from '../../../components/user/unitdetails/PropertyTabs';
import PropertyTab from '../../../components/user/unitdetails/PropertyTab';
import General from './General';
import Security from './Security';
import Notification from './Notification';
import Preferences from './Preferences';

const Settings: FunctionComponent = () => {
  return (
    <div className="w-full h-screen relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray font-inter">
      <img
        className="w-full h-screen absolute !!m-[0 important] top-[0px] left-[0px] shrink-0 z-[0]"
        alt=""
      />
      <div className="w-full h-[1192px] overflow-hidden shrink-0 flex flex-col items-start z-[1]">
        <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start">
          <div className="self-stretch flex-1 flex items-center">
            <div className="self-stretch w-[200px] flex items-start">
              <SideBar />
            </div>
            <div className="h-[1112px] hidden flex-col items-center">
              <div className="w-[106px] h-[924px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center py-num-32 pl-num-32 pr-num-10" />
            </div>
            <div className="self-stretch w-[1240px] overflow-hidden shrink-0 flex flex-col items-start justify-between gap-0">
              <div className="self-stretch flex-1 flex flex-col items-start pt-16 pb-num-0 pl-num-32 pr-20">
                <div className="self-stretch h-[1012px] flex flex-col items-start gap-3">
                  <div className="w-[1128px] h-16 overflow-hidden shrink-0 hidden items-center p-num-10 box-border gap-2.5">
                    <div className="h-6 w-[89px] hidden items-center gap-1.5">
                      <div className="relative font-medium hidden shrink-0">View Tenants</div>
                      <img className="h-6 w-6 relative hidden shrink-0" alt="" />
                      <div className="relative font-medium hidden shrink-0">All</div>
                    </div>
                    <div className="w-[704px] rounded-xl bg-aliceblue overflow-hidden shrink-0 flex items-center py-num-10 px-6 box-border gap-2.5 text-dimgray font-inter">
                      <img className="h-6 w-6 relative" alt="" />
                      <b className="relative">
                        Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)
                      </b>
                    </div>
                  </div>

                  <PropertyTabs>
                    <PropertyTab text="General" element={<General />} />

                    <PropertyTab text="Security" element={<Security />} />
                    <PropertyTab text="Notification" element={<Notification />} />
                    <PropertyTab text="Preferences" element={<Preferences />} />
                  </PropertyTabs>

                  <div className="self-stretch h-[948px] flex flex-col items-start gap-12 text-[24px] text-black font-inter"></div>
                </div>
              </div>
              <div className="self-stretch h-20 bg-white overflow-hidden shrink-0 flex flex-col items-center justify-center text-center text-dimgray font-inter">
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
