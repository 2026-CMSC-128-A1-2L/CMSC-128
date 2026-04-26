import { FunctionComponent, useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import UpdateManager from '../../../components/landlord/LandlordManagerUpdateController';
import SideBar from '../../../components/user/SideBar';
import DefaultAvatar from '../../assets/default_avatar.svg';
import check from '../../assets/Check.svg';
import x from '../../assets/X.svg';
import clock from '../../assets/Clock.svg';
import edit from '../../assets/editIcon.svg';

const ViewSpecificManager: FunctionComponent = () => {
  const [isUpdateManagerOpen, setUpdateManagerOpen] = useState(false);

  const openUpdateManager = useCallback(() => {
    setUpdateManagerOpen(true);
  }, []);

  const closeUpdateManager = useCallback(() => {
    setUpdateManagerOpen(false);
  }, []);

  const onManagersTextClick = useCallback(() => {
    // Add your code here
  }, []);

  return (
    <>
      <div className="w-full h-screen relative overflow-y-auto text-left text-num-14 text-darkslategray-100 font-lora">
        <div className="absolute fixed top-[0px] left-[0px] w-full h-screen overflow-hidden flex flex-col items-start isolate shrink-0">
          <SideBar />
        </div>
        <img
          className="w-full h-screen absolute !!m-[0 important] top-[0px] left-[0px] z-[0] shrink-0"
          alt=""
        />
        <div className="absolute h-[calc(100%_+_168px)] w-full top-[0px] right-[0px] bottom-[-168px] left-[0px] flex flex-col items-start justify-center shrink-0">
          <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start">
            <div className="self-stretch flex-1 flex items-center">
              <div className="self-stretch flex items-start justify-center gap-2.5">
                <div className="h-[924px] w-[200px] flex flex-col items-start shrink-0" />
                <div className="h-[1112px] w-[106px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 hidden flex-col items-center pt-6 pb-[30px] pl-num-32 pr-2.5" />
              </div>
              <div className="self-stretch flex-1 flex flex-col items-start justify-between gap-0">
                <div className="self-stretch flex flex-col items-start py-0 pl-num-32 pr-20">
                  <div className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-2.5 box-border">
                    <div className="flex items-center gap-1.5">
                      <div
                        className="relative font-semibold cursor-pointer"
                        onClick={onManagersTextClick}
                      >
                        Managers
                      </div>
                      <Icon icon="iconamoon:arrow-right-2" className="h-6 w-6 relative" />
                      <div className="relative font-semibold">Daphne Dhayne</div>
                    </div>
                  </div>
                  <div className="self-stretch h-[908px] rounded-[17.27px] bg-white border-whitesmoke-200 border-solid border-[1.1px] box-border flex flex-col items-start gap-[13px] text-center text-num-15_11 text-dimgray font-inter">
                    <div className="self-stretch h-[412px] rounded-[17.27px] flex flex-col items-start gap-[13px]">
                      <div className="self-stretch rounded-[17.27px] overflow-hidden flex flex-col items-start p-[34.5px]">
                        <div className="self-stretch flex flex-col items-start gap-[10.8px]">
                          <b className="relative">Manager Profile</b>
                          <div className="flex items-center justify-center text-[25.9px] text-darkslategray-200">
                            <b className="relative leading-[34.53px]">Daphne Dayne</b>
                          </div>
                          <b className="relative text-teal">dcanape@up.edu.ph</b>
                        </div>
                      </div>
                      <div className="self-stretch overflow-hidden flex items-center py-[4.3px] px-[34.5px] gap-[124.1px]">
                        <img
                          className="w-[215.8px] relative max-h-full object-cover"
                          alt=""
                          src={DefaultAvatar}
                        />
                        <div className="overflow-hidden flex flex-col items-start p-[10.8px] gap-[17.3px]">
                          <div className="flex flex-col items-start gap-[4.3px]">
                            <b className="relative">Name</b>
                            <b className="relative text-black">CANAPE, DAPHNE</b>
                          </div>
                          <div className="flex flex-col items-start gap-[4.3px]">
                            <div className="flex items-start">
                              <b className="relative">Contact number</b>
                            </div>
                            <b className="relative text-black">0936 315 4342</b>
                          </div>
                          <div className="flex flex-col items-start gap-[4.3px]">
                            <div className="flex items-start">
                              <b className="relative">Home Address</b>
                            </div>
                            <b className="relative text-black">Los Banos Laguna</b>
                          </div>
                        </div>
                        <div className="overflow-hidden flex flex-col items-start p-[10.8px] gap-[17.3px]">
                          <div className="flex flex-col items-start gap-[4.3px]">
                            <b className="relative">Managing Property</b>
                            <b className="relative text-teal">{`One Sapphire `}</b>
                          </div>
                          <div className="flex flex-col items-start gap-[4.3px]">
                            <b className="relative">Employed By</b>
                            <div className="self-stretch flex items-center text-teal">
                              <b className="relative">Quevin Custodio</b>
                            </div>
                          </div>
                          <div className="flex flex-col items-start gap-[4.3px]">
                            <b className="relative">Managing Since</b>
                            <b className="relative text-black">April 2024</b>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="self-stretch flex flex-col items-start gap-[43.2px] text-[25.9px] text-darkslategray-100">
                      <div className="self-stretch flex flex-col items-start justify-center py-0 px-[34.5px] gap-[16.2px]">
                        <div className="self-stretch flex items-center">
                          <b className="relative leading-[34.53px]">Availability</b>
                        </div>
                        <div className="w-[891px] flex items-center py-0 px-[21.6px] box-border gap-[120px] text-left text-[18px] text-teal">
                          <div className="h-[63.3px] w-[278.4px] relative shrink-0">
                            <div className="absolute top-[0px] left-[0px] w-[278.4px] flex items-center justify-between gap-5">
                              <img className="h-[34.5px] w-[34.5px] relative" alt="" src={clock} />
                              <div className="w-[216.9px] flex flex-col items-start gap-[8.6px]">
                                <b className="self-stretch h-[22.7px] relative tracking-[-0.01em] inline-block shrink-0">
                                  Ocular Visitation
                                </b>
                                <div className="flex items-center py-1 px-0 gap-[7.6px] shrink-0 text-num-14">
                                  <b className="relative">Mon - Wed:</b>
                                  <div className="w-[131.7px] relative leading-6 font-medium flex items-center shrink-0">
                                    8:00 AM - 5:00 PM
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="h-[63.3px] w-[480.2px] relative shrink-0">
                            <div className="absolute top-[0px] left-[0px] w-[480.2px] flex items-center justify-between gap-5">
                              <Icon icon="ix:inquiry" className="h-[34.5px] w-[34.5px] relative" />
                              <div className="w-[418.7px] flex flex-col items-start gap-[8.6px]">
                                <b className="self-stretch h-[22.7px] relative tracking-[-0.01em] inline-block shrink-0">
                                  General Inquiries
                                </b>
                                <div className="self-stretch flex items-center py-1 px-0 gap-[16.2px] text-num-14">
                                  <div className="flex items-center gap-[7.6px]">
                                    <b className="w-[65.8px] relative flex items-center shrink-0">
                                      Mon - Fri:
                                    </b>
                                    <div className="w-[131.7px] relative leading-6 font-medium flex items-center shrink-0">
                                      8:00 AM - 5:00 PM
                                    </div>
                                  </div>
                                  <div className="flex items-center">
                                    <b className="w-[65.8px] relative flex items-center shrink-0">
                                      Sat-Sun:
                                    </b>
                                    <div className="h-[20.5px] w-[131.7px] relative leading-6 font-medium flex items-center shrink-0">
                                      9:00 AM - 3:00 PM
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="self-stretch flex flex-col items-start justify-center py-0 px-[34.5px] gap-[16.2px]">
                        <div className="self-stretch flex items-center gap-[25.9px]">
                          <b className="relative leading-[34.53px]">Permissions</b>
                          <img
                            className="h-[19.4px] w-[19.4px] relative cursor-pointer"
                            alt=""
                            onClick={openUpdateManager}
                            src={edit}
                          />
                        </div>
                        <div className="flex flex-col items-start gap-[16.2px] text-left text-num-15_11 text-black">
                          <div className="w-[971.3px] h-[51.8px] relative">
                            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[10.79px] bg-white border-whitesmoke-200 border-solid border-[1.1px] box-border" />
                            <img
                              className="absolute h-[58.3%] w-[3.11%] top-[20.83%] right-[95.56%] bottom-[20.86%] left-[1.33%] max-w-full overflow-hidden max-h-full"
                              alt=""
                              src={check}
                            />
                            <div className="absolute h-[56.18%] w-[92.67%] top-[20.83%] left-[5.78%] leading-[25.9px] font-medium flex items-center">
                              Property Management
                            </div>
                          </div>
                          <div className="w-[971.3px] h-[51.8px] relative">
                            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[10.79px] bg-white border-whitesmoke-200 border-solid border-[1.1px] box-border" />
                            <img
                              className="absolute h-[58.3%] w-[3.11%] top-[20.83%] right-[95.56%] bottom-[20.86%] left-[1.33%] max-w-full overflow-hidden max-h-full"
                              alt=""
                              src={check}
                            />
                            <div className="absolute h-[56.18%] w-[92.67%] top-[20.83%] left-[5.78%] leading-[25.9px] font-medium flex items-center">{`Manage Billings and Financials `}</div>
                          </div>
                          <div className="w-[971.3px] h-[51.8px] relative">
                            <div className="absolute h-full w-full top-[0%] right-[0%] bottom-[0%] left-[0%] rounded-[10.79px] bg-white border-whitesmoke-200 border-solid border-[1.1px] box-border" />
                            <img
                              className="absolute h-[58.3%] w-[3.11%] top-[20.83%] right-[95.56%] bottom-[20.86%] left-[1.33%] max-w-full overflow-hidden max-h-full"
                              alt=""
                              src={x}
                            />
                            <div className="absolute h-[56.18%] w-[92.67%] top-[20.83%] left-[5.78%] leading-[25.9px] font-medium flex items-center">
                              Tenants and Occupants Management
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-20 bg-white overflow-hidden shrink-0 flex flex-col items-center justify-center text-center text-dimgray font-inter">
                  <div className="w-[1273px] bg-whitesmoke-100 overflow-hidden flex items-center py-[19px] pl-[200px] pr-20 box-border shrink-0">
                    <div className="flex-1 flex items-center gap-20">
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
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-[1440px] h-20 bg-white hidden flex-col items-start">
              <div className="w-[1273px] h-[82px] bg-whitesmoke-100 overflow-hidden shrink-0 flex items-center py-[19px] pl-[200px] pr-20 box-border" />
            </div>
          </div>
        </div>
      </div>
      <UpdateManager isOpen={isUpdateManagerOpen} onClose={closeUpdateManager} />
    </>
  );
};

export default ViewSpecificManager;
