import { FunctionComponent, useCallback } from 'react';
import { Icon } from '@iconify/react';
import info_icon from '../../../assets/infoicon_icon.svg';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';

const SettingsGen: FunctionComponent = () => {
  const onSecurityContainerClick = useCallback(() => {
    // Add your code here
  }, []);

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
                  <div className="self-stretch h-[948px] flex flex-col items-start gap-12 text-[24px] text-black font-inter">
                    <div className="self-stretch flex flex-col items-start justify-center gap-[5px]">
                      <b className="relative leading-8">Settings</b>
                      <div className="self-stretch h-0.5 rounded-[100px] bg-whitesmoke-200 overflow-hidden shrink-0 flex flex-col items-start pt-1 px-num-0 pb-num-0 box-border" />
                    </div>
                    <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start text-num-14 text-dimgray">
                      <div className="self-stretch rounded-t-num-16 rounded-b-none border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex items-center py-num-0 px-12 gap-12">
                        <div className="h-12 flex flex-col items-center justify-center pt-4 px-num-0 pb-num-0 box-border text-teal-200">
                          <div className="flex items-center justify-center">
                            <b className="relative">General</b>
                          </div>
                          <div className="self-stretch flex-1 flex flex-col items-center justify-end">
                            <div className="w-full h-1 rounded bg-teal-200 overflow-hidden shrink-0 flex items-start pt-num-10 px-num-10 pb-num-0 box-border max-w-full" />
                          </div>
                        </div>
                        <div
                          className="h-12 flex flex-col items-center justify-center pt-4 px-num-0 pb-num-0 box-border cursor-pointer"
                          onClick={onSecurityContainerClick}
                        >
                          <div className="flex items-center justify-center">
                            <b className="relative">Security</b>
                          </div>
                          <div className="self-stretch flex-1 flex flex-col items-center justify-end" />
                        </div>
                        <div
                          className="h-12 flex flex-col items-center justify-center pt-4 px-num-0 pb-num-0 box-border cursor-pointer"
                          onClick={onSecurityContainerClick}
                        >
                          <div className="flex items-center justify-center">
                            <b className="relative">Notifications</b>
                          </div>
                          <div className="self-stretch flex-1 flex flex-col items-center justify-end" />
                        </div>
                        <div
                          className="h-12 flex flex-col items-center justify-center pt-4 px-num-0 pb-num-0 box-border cursor-pointer"
                          onClick={onSecurityContainerClick}
                        >
                          <div className="flex items-center justify-center">
                            <b className="relative">Preferences</b>
                          </div>
                          <div className="self-stretch flex-1 flex flex-col items-center justify-end" />
                        </div>
                      </div>
                      <div className="self-stretch rounded-t-none rounded-b-num-16 border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex flex-col items-start py-6 px-num-32 gap-6 text-center text-[24px] text-black">
                        <div className="self-stretch flex flex-col items-start gap-8">
                          <div className="flex flex-col items-start">
                            <b className="relative leading-8">Account Information</b>
                          </div>
                          <div className="self-stretch overflow-hidden flex items-start py-num-10 pl-num-0 pr-num-10 gap-2 text-num-14 text-dimgray">
                            <div className="flex-1 flex flex-col items-start gap-3">
                              <div className="flex flex-col items-start gap-1">
                                <b className="relative">Account Name</b>
                                <b className="relative text-black">Daphne Dayne</b>
                              </div>
                              <div className="flex flex-col items-start gap-1">
                                <b className="relative">User Type</b>
                                <b className="relative text-black">Student</b>
                              </div>
                              <div className="flex flex-col items-start gap-1">
                                <b className="relative">University Domain</b>
                                <b className="relative text-darkslategray">
                                  University of the Philippines Los Baños
                                </b>
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col items-start gap-3">
                              <div className="flex flex-col items-start">
                                <div className="flex flex-col items-start gap-1">
                                  <b className="relative">Verification Status</b>
                                  <div className="self-stretch flex items-center gap-8 text-teal-100">
                                    <b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                      Unverified
                                    </b>
                                    <div className="flex items-center gap-1 text-[12px]">
                                      <div className="relative font-medium">Get Verified</div>

                                      <Icon
                                        icon="solar:arrow-right-up-linear"
                                        className="w-4 relative max-h-full"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex flex-col items-start gap-1 text-black">
                                <div className="flex items-center gap-1 text-dimgray">
                                  <b className="relative">Linked Emails</b>
                                  <Icon icon="ic:baseline-link" className="h-6 w-6 relative" />
                                </div>
                                <div className="flex items-center justify-center">
                                  <a
                                    className="relative font-bold text-[inherit] [text-decoration:none]"
                                    href="mailto:dcanape@up.edu.ph"
                                    target="_blank"
                                  >
                                    dcanape@up.edu.ph
                                  </a>
                                </div>
                                <div className="flex items-center justify-center">
                                  <b className="relative">dcanape@gmail.com</b>
                                </div>
                              </div>
                              <div className="flex flex-col items-start gap-1">
                                <b className="relative">Date of Creation</b>
                                <b className="relative text-black">April 2, 2026</b>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch h-0.5 rounded-[100px] border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center justify-center py-num-0 px-num-10" />
                        <div className="self-stretch flex flex-col items-start gap-8">
                          <div className="self-stretch flex flex-col items-start">
                            <div className="flex flex-col items-start">
                              <b className="relative leading-8">Data Management</b>
                            </div>
                          </div>
                          <div className="self-stretch overflow-hidden flex items-start py-num-10 pl-num-0 pr-num-10 gap-2 text-num-14">
                            <div className="flex-1 flex flex-col items-start">
                              <div className="self-stretch flex flex-col items-start gap-3">
                                <div className="self-stretch flex flex-col items-start gap-3">
                                  <b className="relative">Personal Data</b>
                                  <div className="self-stretch flex flex-col items-start py-num-0 px-2 text-teal-200">
                                    <div className="h-8 rounded-num-16 bg-aliceblue flex items-center justify-center py-num-0 px-4 box-border">
                                      <b className="relative">Download Personal Data</b>
                                    </div>
                                  </div>
                                </div>
                                <div className="self-stretch overflow-hidden flex items-start py-num-10 px-3 gap-1 text-left">
                                  <div className="self-stretch w-4 overflow-hidden shrink-0 flex flex-col items-start p-px box-border">
                                    <img
                                      className="w-[13.3px] h-[13.3px] relative"
                                      alt=""
                                      src={info_icon}
                                    />
                                  </div>
                                  <div className="h-[68px] flex-1 relative font-medium inline-block">{`Maintain your own records by downloading a full copy of your digital footprint. This includes all information given by the user, verified documents and communication logs within the ATLAS ecosystem. `}</div>
                                </div>
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col items-start">
                              <div className="self-stretch flex flex-col items-start gap-3">
                                <div className="self-stretch flex flex-col items-start gap-3">
                                  <b className="relative">Account Deletion</b>
                                  <div className="self-stretch flex flex-col items-start py-num-0 px-2">
                                    <div className="h-8 rounded-num-16 bg-aliceblue flex items-center justify-center py-num-0 px-3 box-border">
                                      <div className="h-8 rounded-num-16 bg-aliceblue flex items-center justify-center py-num-0 px-3 box-border">
                                        <b className="relative text-transparent !bg-clip-text [background:linear-gradient(180deg,_#c00f0f,_#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                          Delete Account
                                        </b>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="self-stretch overflow-hidden flex items-start py-num-10 px-3 gap-1 text-left">
                                  <div className="self-stretch w-4 overflow-hidden shrink-0 flex flex-col items-start p-px box-border">
                                    <img
                                      className="w-[13.3px] h-[13.3px] relative"
                                      alt=""
                                      src={info_icon}
                                    />
                                  </div>
                                  <div className="h-[68px] flex-1 relative leading-6 font-medium inline-block">
                                    Deletion will results in the complete removal of all you
                                    personal data and documentation from our active servers. Once
                                    processed, this data cannot be recovered.
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
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

export default SettingsGen;
