import { FunctionComponent, useState, useCallback } from "react";
import AddManager from "../../../components/landlord/LandlordManagerAddController.tsx";
import ReportManager from "../../../components/landlord/LandlordManagerReportController.tsx";
import SideBar from "../../../components/user/SideBar.tsx";
import DefaultAvatar from "../../assets/default_avatar.svg";
import { Icon } from "@iconify/react";
import dots from "../../assets/3dotsmenu.png";

const Managers: FunctionComponent = () => {
  const [isAddManagerOpen, setAddManagerOpen] = useState(false);
  const [isReportManagerOpen, setReportManagerOpen] = useState(false);

  const openAddManager = useCallback(() => {
    setAddManagerOpen(true);
  }, []);

  const closeAddManager = useCallback(() => {
    setAddManagerOpen(false);
  }, []);

  const openReportManager = useCallback(() => {
    setReportManagerOpen(true);
  }, []);

  const closeReportManager = useCallback(() => {
    setReportManagerOpen(false);
  }, []);

  const onTenantContainerClick = useCallback(() => {
    // Add your code here
  }, []);

  return (
    <>
      <div className="w-full h-screen relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-dimgray font-inter">
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
              <div className="h-[1112px] w-[106px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 hidden flex-col items-center pt-num-24 pb-[30px] pl-num-32 pr-num-10" />
              <div className="w-full flex-1 overflow-hidden flex flex-col items-start justify-between gap-0">
                <div className="self-stretch flex flex-col items-start pt-16 pb-0 pl-num-32 pr-20">
                  <div className="self-stretch h-[1012px] overflow-hidden shrink-0 flex flex-col items-start py-0 pl-0 pr-20 box-border">
                    <div className="w-[980px] h-[948px] flex flex-col items-center gap-8">
                      <div className="self-stretch flex flex-col items-start gap-3">
                        <div className="self-stretch flex flex-col items-start gap-[5px]">
                          <b className="self-stretch h-6 relative flex items-center shrink-0">
                            View All Managers
                          </b>
                          <div className="self-stretch flex items-center text-[24px] text-black">
                            <b className="h-6 flex-1 relative leading-8 flex items-center">
                              Property Manager List
                            </b>
                          </div>
                        </div>
                        <div className="self-stretch h-0.5 rounded-[100px] bg-whitesmoke-200 overflow-hidden shrink-0 flex flex-col items-start pt-1 px-0 pb-0 box-border" />
                      </div>
                      <div className="self-stretch h-[639px] overflow-hidden shrink-0 flex flex-col items-start px-0  box-border gap-12 text-num-18 text-teal">
                        <div className="w-[940px] flex flex-col items-start py-0 pl-num-10 pr-0 box-border gap-2.5 shrink-0">
                          <div className="self-stretch flex items-start gap-2.5">
                            <b className="relative tracking-num--0_01">{`One Sapphire Place `}</b>
                            <Icon
                              icon="mdi-light:plus"
                              className="h-6 w-6 relative cursor-pointer"
                              onClick={openAddManager}
                            />
                          </div>
                          <div className="flex items-start gap-56 text-black">
                            <div
                              className="w-[350px] flex flex-col items-start justify-center cursor-pointer"
                              onClick={onTenantContainerClick}
                            >
                              <div className="w-[331px] h-[100px] overflow-hidden shrink-0 flex items-center justify-center py-num-10 px-num-16 box-border gap-2.5">
                                <div className="flex items-center gap-2.5 shrink-0">
                                  <img
                                    className="h-[77.2px] w-[81.9px] relative object-cover"
                                    alt=""
                                    src={DefaultAvatar}
                                  />
                                  <div className="h-num-78 w-[212px] flex flex-col items-center justify-between py-num-8 px-1 box-border gap-0">
                                    <b className="self-stretch h-[37.6px] relative tracking-num--0_01 flex items-center shrink-0">
                                      Daphne Dayne
                                    </b>
                                    <b className="self-stretch h-[29.7px] relative text-num-14 flex text-dimgray items-center shrink-0">
                                      dcanape@up.edu.ph
                                    </b>
                                  </div>
                                </div>
                                <img
                                  id="hi"
                                  className="h-num-7 w-5 relative object-cover cursor-pointer shrink-0"
                                  alt=""
                                  onClick={openReportManager}
                                  src={dots}
                                />
                              </div>
                            </div>
                            <div className="w-[350px] flex flex-col items-start justify-center">
                              <div className="w-[331px] h-[100px] overflow-hidden shrink-0 flex items-center justify-center py-num-10 px-num-16 box-border gap-2.5">
                                <div className="flex items-center gap-2.5 shrink-0">
                                  <img
                                    className="h-[77.2px] w-[81.9px] relative object-cover"
                                    alt=""
                                    src={DefaultAvatar}
                                  />
                                  <div className="h-num-78 w-[212px] flex flex-col items-center justify-between py-num-8 px-1 box-border gap-0">
                                    <b className="self-stretch h-[37.6px] relative tracking-num--0_01 flex items-center shrink-0">
                                      AJ De Castro
                                    </b>
                                    <b className="self-stretch h-[29.7px] relative text-num-14 flex text-dimgray items-center shrink-0">
                                      ajdecastro@gmail.com
                                    </b>
                                  </div>
                                </div>
                                <img
                                  className="h-num-70 w-5 relative object-cover shrink-0"
                                  alt=""
                                  src={dots}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-start py-0 px-num-10 gap-2.5 shrink-0">
                          <div className="flex items-start gap-2.5">
                            <b className="relative tracking-num--0_01">
                              Two Sapphire Place
                            </b>
                            <Icon
                              icon="mdi-light:plus"
                              className="h-6 w-6 relative"
                            />
                          </div>
                          <div className="flex items-center text-black">
                            <div className="w-[350px] flex flex-col items-start justify-center">
                              <div className="w-[331px] h-[100px] overflow-hidden shrink-0 flex items-center justify-center py-num-10 px-num-16 box-border gap-2.5">
                                <div className="flex items-center gap-2.5 shrink-0">
                                  <img
                                    className="h-[77.2px] w-[81.9px] relative object-cover"
                                    alt=""
                                    src={DefaultAvatar}
                                  />
                                  <div className="h-num-78 w-[212px] flex flex-col items-center justify-between py-num-8 px-1 box-border gap-0">
                                    <b className="self-stretch h-[37.6px] relative tracking-num--0_01 flex items-center shrink-0">
                                      AJ De Castro
                                    </b>
                                    <b className="self-stretch h-[29.7px] relative text-num-14 flex text-dimgray items-center shrink-0">
                                      ajdecastro@gmail.com
                                    </b>
                                  </div>
                                </div>
                                <img
                                  className="h-num-70 w-5 relative object-cover shrink-0"
                                  alt=""
                                  src={dots}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-start py-0 px-num-10 shrink-0">
                          <div className="flex items-start gap-2.5">
                            <b className="relative tracking-num--0_01">
                              Three Sapphire Place
                            </b>
                            <Icon
                              icon="mdi-light:plus"
                              className="h-6 w-6 relative"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-20 bg-white overflow-hidden shrink-0 flex flex-col items-center justify-center text-center">
                  <div className="w-[1273px] bg-whitesmoke-100 overflow-hidden flex items-center py-[19px] pl-[200px] pr-20 box-border shrink-0">
                    <div className="flex-1 flex items-center gap-20">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <img
                            className="w-12 relative max-h-full object-cover"
                            alt=""
                          />
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
          </div>
        </div>
      </div>
      <AddManager isOpen={isAddManagerOpen} onClose={closeAddManager} />
      <ReportManager
        isOpen={isReportManagerOpen}
        onClose={closeReportManager}
      />
    </>
  );
};

export default Managers;
