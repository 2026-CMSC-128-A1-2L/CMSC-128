import { FunctionComponent, useCallback, useState } from 'react';
import SideBar from '../../../components/user/SideBar';
import { Icon } from '@iconify/react';
import PropertyTabs from '../../../components/user/unitdetails/PropertyTabs';
import ImageCarousel from '../../../components/user/unitdetails/ImageCarousel';
import pic from '../../../../assets/landing_contact.webp';
import pic2 from '../../../../assets/landing_listing.webp';
import pic3 from '../../../../assets/landing_contact.webp';
import AboutDetails from '../../../components/user/unitdetails/AboutDetails';
import AmenetiesDetails from '../../../components/user/unitdetails/AmenetiesDetails';
import RulesDetails from '../../../components/user/unitdetails/RulesDetails';
import LocationDetails from '../../../components/user/unitdetails/LocationDetails';
import ReviewDetails from '../../../components/user/unitdetails/ReviewDetails';
import PropertyTab from '../../../components/user/unitdetails/PropertyTab';
import { Link } from 'react-router-dom';
const UnitDetails: FunctionComponent = () => {
  const gallery = [`${pic}`, `${pic2}`, `${pic3}`];

  const onArrowUpClick = useCallback(() => {
    const anchor = document.querySelector("[data-scroll-to='searchBarContainer']");
    if (anchor) {
      anchor.scrollIntoView({ block: 'start', behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="w-full h-[1024px] relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray-100 font-lora">
      <div className="w-[1440px] overflow-hidden shrink-0 flex flex-col items-start justify-center z-[0]">
        <div className="w-[1440px] h-[2100px] overflow-hidden shrink-0 flex flex-col items-start justify-center py-0 pl-0 pr-20 box-border">
          <div className="w-[1440px] flex-1 flex items-center py-0 pl-0 pr-20 box-border shrink-0">
            <div className="fixed top-0 left-0 h-full w-[200px] hidden md:block z-10">
              <SideBar />
            </div>
            <div className="w-[200px] shrink-0 hidden md:block" />
            <div className="self-stretch w-[1238px] overflow-hidden shrink-0 flex flex-col items-center justify-between gap-2.5">
              <div className="self-stretch flex flex-col items-start pt-8 pb-0 pl-8 pr-20">
                <div className="self-stretch flex flex-col items-start gap-3">
                  <div
                    className="self-stretch overflow-hidden flex flex-col items-start justify-center p-2.5 gap-2.5"
                    data-scroll-to="searchBarContainer"
                  >
                    <div className="h-6 flex items-center py-0 px-1 box-border gap-1.5">
                      <div className="relative font-semibold shrink-0">Home</div>
                      <Icon icon="iconamoon:arrow-right-2" className="w-6 h-6 rounded-[100px]" />
                      <div className="relative font-semibold shrink-0">{`Pasalo Units `}</div>
                      <Icon icon="iconamoon:arrow-right-2" className="w-6 h-6 rounded-[100px]" />
                      <div className="w-[141px] flex items-center justify-center shrink-0">
                        <div className="relative font-semibold">Women’s Dormitory</div>
                      </div>
                    </div>
                    <div className="w-[704px] rounded-xl bg-aliceblue overflow-hidden flex items-center py-2.5 px-6 box-border gap-2.5 text-dimgray font-inter">
                      <Icon icon="material-symbols:search" className="w-6 h-6 rounded-[100px]" />
                      <b className="relative">
                        Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)
                      </b>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-center gap-[28.5px] text-[32px] text-black font-inter">
                    <div className="self-stretch flex items-center gap-[25px]">
                      <div className="flex-1 flex flex-col items-start gap-[25px]">
                        <ImageCarousel images={gallery} />
                        <div className="self-stretch flex flex-col items-center">
                          <div className="w-[820.2px] flex items-start justify-between py-0 px-2 box-border gap-5 shrink-0">
                            <div className="flex items-center gap-[5.3px]">
                              <b className="h-[43px] w-[316px] relative leading-8 flex items-center shrink-0">
                                Women’s Dormitory
                              </b>
                              <b className="h-num-42_8 w-[125.7px] relative text-[24px] leading-8 flex items-center shrink-0 opacity-[0.3]">
                                - 1 pax
                              </b>
                            </div>
                            <div className="flex items-center gap-[17.8px] text-center text-num-10_7 text-teal-200 font-poppins">
                              <div className="rounded-[3.57px] border-teal-200 border-solid border-[0.9px] flex items-center justify-center py-[10.7px] px-[28.5px]">
                                <div className="relative">VISIT</div>
                              </div>
                              <div className="rounded-[3.57px] border-teal-200 border-solid border-[0.9px] flex items-center justify-center py-[10.7px] px-[28.5px]">
                                <div className="relative">SAVE</div>
                              </div>
                            </div>
                          </div>
                          <div className="w-[797.9px] h-num-42_8 relative text-num-10_7 tracking-num-0_02 font-semibold font-lora whitespace-pre-wrap flex items-center shrink-0 mt-[-5.3px]">
                            University of the Philippines Los Banos | 0.5 km from UPLB Main Gate |
                            Listed 3 days ago
                          </div>
                        </div>
                        <div className="w-[363.7px] h-[57.1px] relative text-center text-[24px] text-white">
                          <div className="absolute top-[0px] left-[0px] shadow-[0px_6.240437030792236px_17.83px_rgba(0,_0,_0,_0.15)] rounded-num-8_91 bg-darkslategray-200 w-[363.7px] h-[57.1px]" />
                          <b className="absolute top-[0.72px] left-[11px] flex items-center w-[341px] h-[55px]">
                            <span className="w-full">
                              <span className="leading-8 whitespace-pre-wrap">
                                ₱750.00 - ₱1,000.00
                              </span>
                              <span className="text-[18px] tracking-num--0_01 text-teal-100">
                                / month
                              </span>
                            </span>
                          </b>
                        </div>
                      </div>
                      <div className="h-[615px] w-full relative bg-white border-whitesmoke-300 border-solid border-[1px] box-border flex flex-col items-center justify-center py-0 pl-5 pr-2 gap-[25px] text-left text-[14.26px] text-black font-inter">
                        <div className="w-[259.4px] flex items-center justify-between pr-3 shrink-0 text-[21.4px]">
                          <div className="flex items-center gap-[11px]">
                            <Icon icon="ri:grid-fill" className="h-6 w-6" />
                            <b className="h-[16.9px] w-[90.3px] relative leading-[28.53px] flex items-center shrink-0">
                              Apply
                            </b>
                          </div>
                          <div className="h-[19.6px] w-[58.8px] shadow-[0px_0px_2.51px_rgba(0,_0,_0,_0.25)] rounded-[6.27px] bg-whitesmoke-100 flex items-center justify-center py-[5px] px-4 box-border text-center text-[10.04px] text-gray font-lora">
                            <div className="h-[9.8px] w-[26.7px] relative font-medium flex items-center justify-center shrink-0">
                              Reset
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start gap-[21.4px] shrink-0 text-gray font-lora">
                          <div className="flex flex-col items-start gap-[7px] shrink-0">
                            <div className="w-[151.1px] h-[13.4px] relative font-medium flex items-center shrink-0">
                              Rooms Available
                            </div>
                            <div className="w-num-259_3 flex items-center justify-between gap-[8.9px] text-center text-num-10_7 text-black">
                              <div className="h-[28.5px] w-[125.2px] shadow-[0px_0px_3.57px_rgba(0,_0,_0,_0.25)] rounded-num-8_91 bg-white flex items-center justify-center pt-1 pb-[5px] pl-[11px] pr-3 box-border">
                                <div className="relative tracking-num-0_02 font-semibold">
                                  1 Pax
                                </div>
                              </div>
                              <div className="h-[28.5px] w-[125.2px] shadow-[0px_0px_3.57px_rgba(0,_0,_0,_0.25)] rounded-num-8_91 bg-white flex items-center justify-center pt-1 px-2.5 pb-[5px] box-border">
                                <div className="relative tracking-num-0_02 font-semibold">
                                  2 Pax
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-start gap-[7px] shrink-0">
                            <div className="w-[151.1px] h-[13.4px] relative font-medium flex items-center shrink-0">
                              Lease Duration
                            </div>
                            <div className="w-num-259_3 h-[28.5px] relative text-num-10_7 text-silver">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_3.57px_rgba(0,_0,_0,_0.25)] rounded-num-8_91 bg-white" />
                              <Icon
                                icon="mdi:chevron-down"
                                className="absolute h-[80.6%] w-[50.13%] top-[7.66%] right-[3.8%] bottom-[35.74%] left-[68.08%] overflow-hidden"
                              />
                              <div className="absolute h-[62.46%] w-[50.02%] top-[18.77%] left-[4.14%] tracking-num-0_02 font-semibold flex items-center">
                                Choose lease duration
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-col items-start gap-[7px] shrink-0">
                            <div className="w-[164.5px] h-[13.4px] relative font-medium flex items-center shrink-0">
                              Preferred Move-in Date
                            </div>
                            <div className="w-num-259_3 h-[29.4px] relative text-num-10_7 text-silver">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_3.57px_rgba(0,_0,_0,_0.25)] rounded-num-8_91 bg-white" />
                              <div className="absolute h-[60.54%] w-[50.02%] top-[21.23%] left-[4.14%] tracking-num-0_02 font-semibold flex items-center">
                                Choose date
                              </div>
                              <Icon
                                icon="mdi:calendar"
                                className="absolute h-[80.6%] w-[50.13%] top-[7.66%] right-[3.8%] bottom-[35.74%] left-[68.08%] overflow-hidden"
                              />
                            </div>
                          </div>
                          <div className="flex flex-col items-start gap-[7px] shrink-0 text-[14.3px]">
                            <div className="w-[276.3px] h-[13.4px] relative font-medium flex items-center shrink-0">
                              <span className="w-full">
                                <span>{`Message to Landlord `}</span>
                                <span className="text-num-10_7 text-silver">(optional)</span>
                              </span>
                            </div>
                            <div className="w-num-259_3 h-[57.1px] relative text-num-10_7 text-silver">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_3.57px_rgba(0,_0,_0,_0.25)] rounded-num-8_91 bg-white" />
                              <img
                                className="absolute h-[10.86%] w-[2.08%] top-[79.63%] right-[2.39%] bottom-[9.52%] left-[95.53%] rounded-[0.89px] max-w-full overflow-hidden max-h-full"
                                alt=""
                              />

                              <div className="absolute h-[31.17%] w-[86.54%] top-[10.93%] left-[4.14%] tracking-num-0_02 font-semibold flex items-center">
                                Introduce yourself or ask a question..
                              </div>
                            </div>
                          </div>
                          <div className="w-num-259_3 h-[114.1px] shadow-[0px_0px_3.57px_rgba(0,_0,_0,_0.25)] rounded-num-8_91 bg-whitesmoke-200 flex flex-col items-start py-[15px] pl-[21px] pr-[19px] box-border gap-0.5 shrink-0 text-num-10_7 text-dimgray font-poppins">
                            <div className="flex items-center gap-[31px]">
                              <div className="h-num-17_8 w-[83.2px] relative flex items-center shrink-0">
                                Monthly Rent
                              </div>
                              <div className="h-num-17_8 w-num-104_6 relative text-right flex items-center justify-end shrink-0">
                                ₱1000.00
                              </div>
                            </div>
                            <div className="flex items-center gap-[31px]">
                              <div className="h-num-17_8 w-[83.2px] relative flex items-center shrink-0">
                                Est. Utilities
                              </div>
                              <div className="h-num-17_8 w-num-104_6 relative text-right flex items-center justify-end shrink-0">
                                ₱500.00
                              </div>
                            </div>
                            <div className="flex items-center gap-[21px]">
                              <div className="h-num-17_8 w-[93px] relative flex items-center shrink-0">
                                Security Deposit
                              </div>
                              <div className="h-num-17_8 w-num-104_6 relative text-right flex items-center justify-end shrink-0">
                                ₱2000.00
                              </div>
                            </div>
                            <div className="w-[220.2px] flex flex-col items-start gap-1.5 text-gray">
                              <img
                                className="w-[219.5px] h-[0.9px] relative rounded-[0.89px] max-h-full"
                                alt=""
                              />
                              <div className="self-stretch flex items-center gap-[11px]">
                                <b className="h-num-17_8 w-num-104_6 relative flex items-center shrink-0">
                                  Est. Move-in Cost
                                </b>
                                <b className="h-num-17_8 w-num-104_6 relative flex text-right items-center justify-end shrink-0">
                                  ₱3500.00
                                </b>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-num-259_3 flex flex-col items-center gap-[8.9px] shrink-0 text-white font-poppins">
                          <Link to="/applications">
                            <div className="w-full h-[42.8px] relative rounded-[8.91px] bg-darkslategray-200 flex items-center py-[0.9px] pl-[46.4px] pr-[55.3px] box-border gap-[2.7px] text-left text-[14.26px] text-white font-poppins">
                              <div className="h-[41px] w-[140px] relative font-medium flex items-center shrink-0">{`Submit Application `}</div>
                              <Icon icon="formkit:arrowright" className="h-6 w-6" />
                            </div>{' '}
                          </Link>

                          <div className="self-stretch h-[26.7px] relative text-num-10_7 font-lora text-dimgray text-center flex items-center justify-center shrink-0">
                            Landlord will respond within 24–48 hrs.
                            <br />
                            Your info is kept private until approved.
                          </div>
                        </div>
                      </div>{' '}
                    </div>
                    <div className="self-stretch flex items-start gap-[23.2px] text-center text-num-14_26 text-darkslategray-200 font-lora">
                      <div className="flex-1 flex flex-col items-start gap-[29.4px]">
                        <div className="self-stretch flex flex-col items-start gap-[10.7px] shrink-0">
                          <div className="self-stretch flex items-center gap-[10.7px]">
                            <div className="h-num-42_8 w-[118.6px] relative">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-8_91 bg-lightcyan border-teal-200 border-solid border-[0.9px] box-border" />
                              <div className="absolute h-[56.31%] w-[81.2%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">
                                2 Slots Left
                              </div>
                            </div>
                            <div className="h-num-42_8 w-[118.6px] relative">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-8_91 border-teal-200 border-solid border-[0.9px] box-border" />
                              <div className="absolute h-[56.31%] w-[81.2%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">
                                Transient
                              </div>
                            </div>
                            <div className="h-num-42_8 w-[118.6px] relative">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-8_91 border-teal-200 border-solid border-[0.9px] box-border" />
                              <div className="absolute h-[56.31%] w-[81.2%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">
                                ~18 sqm
                              </div>
                            </div>
                            <div className="h-num-42_8 w-[140.9px] relative">
                              <div className="absolute top-[0px] left-[0px] w-[140.9px] h-num-42_8">
                                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-8_91 border-teal-200 border-solid border-[0.9px] box-border" />
                                <div className="absolute h-[56.31%] w-[81.19%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">
                                  Female Only
                                </div>
                              </div>
                            </div>
                            <div className="h-num-42_8 w-[126.6px] relative">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-8_91 border-teal-200 border-solid border-[0.9px] box-border" />
                              <div className="absolute h-[56.31%] w-[81.2%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">
                                Min. 6 Months
                              </div>
                            </div>
                            <div className="h-num-42_8 w-[126.6px] relative">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-8_91 border-teal-200 border-solid border-[0.9px] box-border" />
                              <div className="absolute h-[56.31%] w-[81.2%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">
                                2 Floors
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch flex items-center gap-[10.7px]">
                            <div className="h-num-42_8 w-[140.9px] relative">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-8_91 border-teal-200 border-solid border-[0.9px] box-border" />
                              <div className="absolute h-[56.31%] w-[81.19%] top-[20.83%] left-[9.77%] font-medium flex items-center justify-center">
                                Semi-Furnished
                              </div>
                            </div>
                            <div className="h-num-42_8 w-[145.3px] relative">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-8_91 border-teal-200 border-solid border-[0.9px] box-border" />
                              <div className="absolute h-[56.31%] w-[81.21%] top-[20.83%] left-[9.78%] font-medium flex items-center justify-center">
                                Shared Bathroom
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="w-[816px] h-[697px] flex flex-col items-start shrink-0">
                          <PropertyTabs>
                            <PropertyTab text="ABOUT" element={<AboutDetails />} />
                            <PropertyTab text="AMENTITIES" element={<AmenetiesDetails />} />
                            <PropertyTab text="RULES" element={<RulesDetails />} />
                            <PropertyTab text="LOCATION" element={<LocationDetails />} />
                            <PropertyTab text="REVIEWS" element={<ReviewDetails />} />
                          </PropertyTabs>
                        </div>
                      </div>
                      <div className="flex flex-col items-start gap-[21.4px] text-black font-inter">
                        <div className="w-num-291_5 h-[285.3px] relative shadow-[0px_0px_3.57px_rgba(0,_0,_0,_0.25)]">
                          <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-num-8_91 bg-white" />
                          <div className="absolute top-[191.67px] left-[0px] w-num-291_5 flex flex-col items-start py-0 px-[17.8px] box-border gap-2 text-white font-poppins">
                            <div className="self-stretch h-[32.1px] relative">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%]">
                                <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_3.57px_rgba(0,_0,_0,_0.25)] rounded-num-8_91 bg-darkslategray-200" />
                              </div>
                              <Link to="/direct-messages">
                                <div className="absolute h-[49.84%] w-[51.74%] top-[25%] right-[24.31%] bottom-[25.16%] left-[23.95%]">
                                  <div className="absolute h-full w-[81.19%] top-[0%] left-[18.79%] font-medium flex items-center justify-center">
                                    Send Message
                                  </div>
                                  <Icon
                                    icon="material-symbols:mail-outline"
                                    className="absolute h-[95.38%] w-[13.44%] top-[11.15%] right-[86.56%] bottom-[-0.52%] left-[0%] max-w-full overflow-hidden max-h-full"
                                  />
                                </div>
                              </Link>
                            </div>
                            <div className="w-[256.7px] h-[32.1px] relative">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_3.57px_rgba(0,_0,_0,_0.15)] rounded-num-8_91 bg-darkslategray-200" />
                              <div className="absolute h-[69.47%] w-[50.02%] top-[13.89%] right-[19.77%] bottom-[16.64%] left-[30.21%]">
                                <div className="absolute h-full w-full top-[0%] left-[0%] font-medium flex items-center justify-center">
                                  Contact Details
                                </div>
                              </div>

                              <Icon
                                icon="ic:outline-phone"
                                className="absolute h-[44.55%] w-[5.92%] top-[27.77%] right-[69.77%] bottom-[27.68%] left-[24.31%] max-w-full overflow-hidden max-h-full"
                              />
                            </div>
                          </div>
                          <div className="absolute top-[126.59px] left-[0px] w-num-291_5 flex items-center justify-center py-0 px-[8.9px] box-border gap-[7.1px] text-[16.05px] text-teal-100">
                            <div className="h-[53.5px] w-[124.8px] relative">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] [filter:drop-shadow(0px_0px_3.57px_rgba(0,_0,_0,_0.25))] rounded-num-8_91 border-teal-100 border-solid border-[0.9px] box-border" />
                              <div className="absolute top-[8.91px] left-[15.16px] w-[94.5px] flex flex-col items-center">
                                <div className="self-stretch h-[23.4px] relative tracking-num--0_01 font-semibold flex items-center justify-center shrink-0">
                                  3
                                </div>
                                <div className="self-stretch h-num-14_7 relative text-num-10_7 tracking-num-0_02 font-semibold font-lora text-darkslategray-100 flex items-center justify-center shrink-0">
                                  Active Units
                                </div>
                              </div>
                            </div>
                            <div className="h-[53.5px] w-[124.8px] relative">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] [filter:drop-shadow(0px_0px_3.57px_rgba(0,_0,_0,_0.25))] rounded-num-8_91 border-teal-100 border-solid border-[0.9px] box-border" />
                              <div className="absolute top-[8.91px] left-[15.16px] w-[94.5px] flex flex-col items-center">
                                <b className="self-stretch h-[23.4px] relative tracking-num--0_01 flex items-center justify-center shrink-0">
                                  5 yrs
                                </b>
                                <div className="self-stretch h-num-14_7 relative text-num-10_7 tracking-num-0_02 font-semibold font-lora text-darkslategray-100 flex items-center justify-center shrink-0">
                                  On Platform
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-[59.73px] left-[0.09px] w-num-291_5 flex items-start py-0 px-[17.8px] box-border gap-[8.9px] text-left font-lora">
                            <img
                              className="h-[53.5px] w-[53.5px] relative shadow-[0px_0px_3.57px_rgba(0,_0,_0,_0.25)] rounded-[50%] object-cover"
                              alt=""
                            />
                            <div className="w-[112.4px] flex flex-col items-start gap-[2.7px]">
                              <div className="self-stretch h-[12.7px] relative font-medium flex items-center shrink-0">
                                Cynthia Villar
                              </div>
                              <div className="self-stretch h-[19.6px] relative text-num-10_7 tracking-num-0_02 font-semibold text-darkslategray-100 flex items-center shrink-0">
                                member since 2021
                              </div>
                            </div>
                          </div>
                          <div className="absolute top-[16.94px] left-[0px] w-num-291_5 flex items-center py-0 px-[17.8px] box-border gap-[11.6px] text-left text-[21.4px]">
                            <Icon
                              icon="material-symbols:wifi-home-outline-rounded"
                              className="h-6 w-6"
                            />
                            <b className="h-[14.3px] w-[118.6px] relative leading-[28.53px] flex items-center shrink-0">
                              LANDLORD
                            </b>
                          </div>
                        </div>
                        <div className="self-stretch flex flex-col items-start gap-[19.6px] text-left text-[21.4px]">
                          <div className="self-stretch flex items-center py-0 px-[8.9px] gap-[39.2px]">
                            <div className="w-[191.7px] flex items-center justify-center">
                              <b className="relative leading-[28.53px]">You may also like</b>
                            </div>
                            <div className="h-[28.5px] w-[28.5px] relative flex items-center justify-center">
                              <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] shadow-[0px_0px_3.57px_rgba(0,_0,_0,_0.25)] rounded-[50%] bg-white" />
                              <Icon
                                icon="iconamoon:arrow-right-2"
                                className="h-6 w-6 relative z-10"
                              />
                            </div>
                          </div>
                          <div className="self-stretch flex flex-col items-center justify-center gap-[10.7px] text-num-10_7 font-lora">
                            <Link to="/unit">
                              <div className="w-num-249_6 h-[196.1px] relative shadow-[0px_0px_3.57px_rgba(0,_0,_0,_0.25)]">
                                <div className="absolute top-[0px] left-[0.88px] shadow-[0px_0px_3.57px_rgba(0,_0,_0,_0.25)] rounded-num-8_91 bg-whitesmoke-300 w-[247.8px] h-[196.1px]" />
                                <div className="absolute top-[124.81px] left-[0px] w-num-249_6 h-[71.3px]">
                                  <div className="absolute top-[0px] left-[0px] rounded-t-num-0 rounded-b-num-8_91 bg-whitesmoke-300 w-num-249_6 h-[71.3px] opacity-[0.15]" />
                                  <img
                                    className="absolute top-[45.47px] left-[222.18px] w-[18.3px] h-[18.4px]"
                                    alt=""
                                  />
                                  <div className="absolute top-[11.59px] left-[223.06px] tracking-num-0_02 font-semibold flex items-center w-[15.9px] h-[12.5px]">
                                    4.3
                                  </div>
                                  <div className="absolute top-[31.23px] left-[12.97px] w-[171.4px] h-num-14_7">
                                    <img
                                      className="absolute top-[0px] left-[0px] w-[14.7px] h-num-14_7"
                                      alt=""
                                    />
                                    <div className="absolute top-[0.89px] left-[18.65px] tracking-num-0_02 font-semibold flex items-center w-[152.8px] h-[12.4px]">
                                      569Q+3J2, Los Baños, Laguna
                                    </div>
                                  </div>
                                  <b className="absolute top-[11.59px] left-[13.37px] text-[16.05px] tracking-num--0_01 flex font-inter items-center w-[184.5px] h-[14.3px]">
                                    Westbrook Residences
                                  </b>
                                </div>
                                <img
                                  className="absolute top-[8.02px] left-[219.31px] w-[25.2px] h-[25.2px]"
                                  alt=""
                                />
                                <img
                                  className="absolute top-[0px] left-[0.89px] rounded-t-num-8_91 rounded-b-num-0 w-[248.3px] h-[123.7px] object-cover"
                                  alt=""
                                />
                              </div>
                            </Link>
                            <Link to="/unit">
                              <div className="w-num-249_6 h-[198.8px] relative [filter:drop-shadow(0px_0px_3.57px_rgba(0,_0,_0,_0.25))]">
                                <div className="absolute top-[0px] left-[0.88px] shadow-[0px_0px_3.57px_rgba(0,_0,_0,_0.25)] rounded-num-8_91 bg-whitesmoke-300 w-[247.8px] h-[196.1px]" />
                                <div className="absolute top-[127.48px] left-[0px] w-num-249_6 h-[71.3px]">
                                  <div className="absolute top-[0px] left-[0px] rounded-t-num-0 rounded-b-num-8_91 bg-white w-num-249_6 h-[71.3px] opacity-[0.15]" />
                                  <img
                                    className="absolute top-[42.79px] left-[222.18px] w-[18.3px] h-[18.4px]"
                                    alt=""
                                  />
                                  <div className="absolute top-[8.92px] left-[223.06px] tracking-num-0_02 font-semibold flex items-center w-[15.9px] h-[12.5px]">
                                    4.8
                                  </div>
                                  <div className="absolute top-[28.55px] left-[12.97px] w-[183.2px] h-num-14_7">
                                    <img
                                      className="absolute top-[0px] left-[0px] w-[14.7px] h-num-14_7"
                                      alt=""
                                    />
                                    <div className="absolute top-[0.87px] left-[18.23px] tracking-num-0_02 font-semibold flex items-center w-[164.9px] h-[12.5px]">
                                      10247 Ruby St, Los Baños, Laguna
                                    </div>
                                  </div>
                                  <b className="absolute top-[8.92px] left-[13.28px] text-[16.05px] tracking-num--0_01 flex font-inter items-center w-[160.2px] h-[14.3px]">
                                    Ruby Residences
                                  </b>
                                </div>
                                <img
                                  className="absolute top-[0px] left-[0.89px] rounded-t-num-8_91 rounded-b-num-0 w-[247.8px] h-[124.8px] object-cover"
                                  alt=""
                                />
                                <img
                                  className="absolute top-[8.02px] left-[219.31px] w-[25.2px] h-[25.2px]"
                                  alt=""
                                />
                              </div>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch h-20 bg-white overflow-hidden shrink-0 flex flex-col items-center justify-center text-center text-dimgray font-inter">
                <div className="w-[1273px] bg-whitesmoke-100 overflow-hidden flex items-center py-[19px] pl-[200px] pr-20 box-border shrink-0">
                  <div className="w-[1070px] flex items-center gap-20 shrink-0">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <img className="w-12 relative max-h-full object-cover" alt="" />
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1">
                            <img className="h-5 w-5 relative" alt="" />
                            <b className="relative">2026</b>
                          </div>
                          <div className="flex items-center justify-center">
                            <b className="relative">ATLAS Team</b>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center">
                        <b className="relative">{`All Rights Reserved `}</b>
                      </div>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center gap-2.5">
                        <b className="relative">Browse Dorms</b>
                        <b className="relative">List your property</b>
                      </div>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2.5">
                      <b className="relative">About</b>
                      <b className="relative">Contact Us</b>
                    </div>
                    <div className="flex flex-col items-center justify-center gap-2.5">
                      <b className="relative">Privacy Policy</b>
                      <b className="relative">Terms of Use</b>
                      <b className="relative">Data Privacy (RA 10173)</b>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="w-[60px] h-[60px] !!m-[0 important] absolute top-[890px] left-[1281px] rounded-[30px] [background:linear-gradient(183.48deg,_#096c5b,_#16917c)] shrink-0 flex items-start p-[16.2px] box-border cursor-pointer z-[1]"
        onClick={onArrowUpClick}
      >
        <img className="h-[27.7px] w-[27.7px] relative" alt="" />
      </div>
    </div>
  );
};

export default UnitDetails;
