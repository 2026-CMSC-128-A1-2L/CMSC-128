import { FunctionComponent, useCallback, useState } from 'react';
import { Icon } from '@iconify/react';

import SideNav        from '../../components/landlord/LandlordFinance/SideNav';
import Footer         from '../../components/Footer';
import SideBar from '../../components/SideBar';

// Tabs
import OverviewTab        from '../../components/landlord/LandlordFinance/overview/Overview';
import TenantBillingsTab  from '../../components/landlord/LandlordFinance/billings/TenantBillings';

type TabType = 'overview' | 'billings';

const FinancePage: FunctionComponent = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const onFinanceClick = useCallback(() => {
    // Navigate back to Finance list — add routing logic here
  }, []);

  return (
    <div className="w-full min-h-screen relative flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray-100 font-lora">
      {/* Background */}
      <img className="w-full h-full absolute top-0 left-0 object-cover z-[0]" alt="" />

      <div className="w-full overflow-hidden shrink-0 flex flex-col items-start z-[1]">
        <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-0 pl-0 pr-4 lg:pr-20">
          <div className="w-full flex-1 flex flex-col lg:flex-row items-start">

            {/* Left sidebar placeholder */}
            <SideBar />

            {/* Main content */}
            <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start justify-between gap-0">
              <div className="self-stretch flex flex-col items-start pt-4 sm:pt-6 md:pt-8 pb-0 pl-4 sm:pl-6 md:pl-8 pr-4 sm:pr-6 md:pr-20">
                <div className="self-stretch flex flex-col items-start">

                  <div className="h-16 overflow-hidden shrink-0 flex items-center p-2.5 box-border">
                    <div className="h-6 flex items-center gap-1.5 text-num-14 text-darkslategray-100 font-lora flex-wrap">
                      <div className="relative font-medium cursor-pointer hover:text-teal-200 transition-colors" onClick={onFinanceClick}>Finance</div>
                      <Icon icon="iconamoon:arrow-right-2" className="h-4 w-4 sm:h-5 sm:w-5 md:h-6 md:w-6 relative" />
                      <div className="relative font-medium">One Sapphire Place</div>
                    </div>
                  </div>

                  <div className="self-stretch flex flex-col items-center text-[20px] sm:text-[22px] md:text-[24px] text-gray font-inter">
                    <div className="w-full overflow-hidden flex flex-col items-center p-2.5 box-border max-w-full">
                      <div className="w-full flex flex-col items-center max-w-full">

                        {/* Page title + divider */}
                        <div className="self-stretch flex flex-col items-start justify-center gap-3">
                          <div className="self-stretch flex items-center justify-between gap-5 flex-wrap">
                            <div className="h-8 flex flex-col items-center justify-end">
                              <b className="relative leading-8 shrink-0">Finance</b>
                            </div>
                          </div>
                          <div className="self-stretch h-0.5 rounded-[100px] bg-whitesmoke-200 overflow-hidden shrink-0" />
                        </div>

                        {/* Property info + tabs */}
                        <div className="self-stretch flex flex-col items-start gap-4 text-num-14 font-lora mt-4">
                          <div className="self-stretch min-h-[120px] flex flex-col items-start justify-center py-0 px-2 box-border gap-1 text-num-14 text-darkslategray-100 font-lora">
                            <b className="self-stretch relative text-[20px] sm:text-[22px] md:text-[24px] leading-8 font-inter break-words">One Sapphire Place</b>
                            <div className="self-stretch flex items-start sm:items-center py-0 px-4 gap-2 flex-col sm:flex-row">
                              <Icon icon="mdi-light:map-marker" className="h-5 w-5 relative shrink-0" />
                              <b className="flex-1 relative text-sm sm:text-base break-words">Lot 3, Block 17, Sapphire St, Umali Subd, Los Baños, Philippines, 4030</b>
                            </div>
                            <div className="self-stretch flex items-start sm:items-center py-0 px-4 gap-2 flex-col sm:flex-row">
                              <Icon icon="mdi-light:phone" className="h-5 w-5 relative shrink-0" />
                              <b className="flex-1 relative text-sm sm:text-base">0969 014 8776</b>
                            </div>
                          </div>

                          <div className="self-stretch flex flex-col lg:flex-row items-start gap-4 lg:gap-8 text-center text-[16px]">
                            <SideNav activeTab={activeTab} onTabChange={setActiveTab} />

                            <div className="flex-1 w-full overflow-x-auto">
                              {activeTab === 'overview'
                                ? <OverviewTab />
                                : <TenantBillingsTab />
                              }
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <Footer />
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;