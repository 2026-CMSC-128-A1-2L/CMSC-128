import { FunctionComponent, useCallback } from 'react';
import footer_logo from '../../../assets/footer_logo.svg'
import SideBar from '../../components/SideBar';
import { Icon } from '@iconify/react';

const SettingsSecurity: FunctionComponent = () => {

  const onGeneralContainerClick = useCallback(() => {
    // Add your code here
  }, []);

  return (
    <div className="w-full h-screen relative overflow-hidden flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray font-inter">
      <img className="w-full h-screen absolute !!m-[0 important] top-[0px] left-[0px] z-[0]" alt="" />
      <div className="w-full overflow-hidden flex flex-col items-start z-[1]">
        <div className="self-stretch overflow-hidden flex flex-col items-start py-num-0 pl-num-0 pr-20">
          <div className="self-stretch flex items-center gap-8 shrink-0">
            <div className="self-stretch w-[200px] flex items-start shrink-0">
              <SideBar />
            </div>
            <div className="h-[1112px] hidden flex-col items-center shrink-0">
              <div className="w-[106px] h-[924px] bg-white border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-center py-8 pl-8 pr-num-10" />
            </div>
            <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start pt-num-0 px-num-0 pb-[140px] shrink-0">
              <div className="self-stretch flex-1 flex flex-col items-start pt-16 px-num-0 pb-num-0">
                <div className="self-stretch h-[1012px] flex flex-col items-start gap-3 shrink-0">
                  <div className="w-[1128px] h-16 overflow-hidden shrink-0 hidden items-center p-num-10 box-border gap-2.5">
                    <div className="h-6 w-[89px] hidden items-center gap-1.5">
                      <div className="relative font-medium hidden shrink-0">View Tenants</div>
                      <img className="h-6 w-6 relative hidden shrink-0" alt="" />
                      <div className="relative font-medium hidden shrink-0">All</div>
                    </div>
                    <div className="w-[704px] rounded-xl bg-aliceblue overflow-hidden shrink-0 flex items-center py-num-10 px-6 box-border gap-2.5 text-dimgray font-inter">
                      <img className="h-6 w-6 relative" alt="" />
                      <b className="relative">Search for Dorms, Apartments, or Locations (e.g. UPLB, Umali Subdivision)</b>
                    </div>
                  </div>
                  <div className="self-stretch h-[948px] flex flex-col items-start gap-12 text-[24px] text-black font-inter">
                    <div className="self-stretch flex items-center">
                      <b className="relative leading-8">Settings</b>
                    </div>
                    <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start text-num-14 text-dimgray">
                      <div className="self-stretch rounded-t-num-16 rounded-b-none border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex items-center py-num-0 px-12 gap-12">
                        <div className="h-12 flex flex-col items-center justify-center pt-4 px-num-0 pb-num-0 box-border cursor-pointer" onClick={onGeneralContainerClick}>
                          <div className="flex items-center justify-center">
                            <b className="relative">General</b>
                          </div>
                          <div className="self-stretch flex-1 flex flex-col items-center justify-end" />
                        </div>
                        <div className="h-12 flex flex-col items-center justify-center pt-4 px-num-0 pb-num-0 box-border text-teal">
                          <div className="flex items-center justify-center">
                            <b className="relative">Security</b>
                          </div>
                          <div className="self-stretch flex-1 flex flex-col items-center justify-end">
                            <div className="w-full h-1 rounded bg-teal overflow-hidden shrink-0 flex items-start pt-num-10 px-num-10 pb-num-0 box-border max-w-full" />
                          </div>
                        </div>
                        <div className="h-12 flex flex-col items-center justify-center pt-4 px-num-0 pb-num-0 box-border cursor-pointer" onClick={onGeneralContainerClick}>
                          <div className="flex items-center justify-center">
                            <b className="relative">Notifications</b>
                          </div>
                          <div className="self-stretch flex-1 flex flex-col items-center justify-end" />
                        </div>
                        <div className="h-12 flex flex-col items-center justify-center pt-4 px-num-0 pb-num-0 box-border cursor-pointer" onClick={onGeneralContainerClick}>
                          <div className="flex items-center justify-center">
                            <b className="relative">Preferences</b>
                          </div>
                          <div className="self-stretch flex-1 flex flex-col items-center justify-end" />
                        </div>
                      </div>
                      <div className="self-stretch rounded-t-none rounded-b-num-16 border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex flex-col items-start py-6 px-8 gap-6 text-center text-[24px] text-black">
                        <div className="flex flex-col items-start">
                          <b className="relative leading-8">Security Settings</b>
                        </div>
                        <div className="self-stretch flex flex-col items-start gap-3 text-num-14">
                          <div className="self-stretch overflow-hidden flex items-start py-num-10 pl-num-0 pr-num-10 gap-2">
                            <div className="self-stretch flex-1 flex flex-col items-start gap-3">
                              <div className="self-stretch flex items-center gap-1">
                                <b className="relative">Linked Accounts</b>
                                <Icon icon="ic:baseline-link" className="h-6 w-6 relative" ></Icon>
                              </div>
                              <div className="self-stretch flex-1 rounded-num-16 border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex flex-col items-start justify-center py-num-10 px-6 gap-2.5 text-left">
                                <div className="flex items-center gap-2.5 text-center text-[24px] text-teal">
                                  <Icon icon="flat-color-icons:google" className="h-6 w-6 relative" ></Icon>
                                  <b className="relative leading-8">Logged in via Google</b>
                                </div>
                                <a className="self-stretch relative [text-decoration:underline] font-medium text-[inherit]" href="mailto:dcanape@up.edu.ph" target="_blank">dcanape@up.edu.ph</a>
                                <div className="relative [text-decoration:underline] font-medium">dcanape@gmail.com</div>
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col items-start gap-3 text-left">
                              <div className="self-stretch h-6 flex items-center">
                                <b className="flex-1 relative">{`Active Sessions `}</b>
                              </div>
                              <div className="self-stretch flex flex-col items-start justify-center gap-3 text-num-12">
                                <div className="self-stretch flex flex-col items-start">
                                  <div className="self-stretch h-[68px] rounded-num-16 border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start justify-center py-num-4 px-num-10">
                                    <div className="self-stretch flex items-center gap-2.5">
                                      <div className="flex-1 flex items-center gap-3">
                                        <Icon icon="wordpress:desktop" className="w-12 relative h-12" ></Icon>
                                        <div className="flex flex-col items-start justify-center py-num-4 px-num-0">
                                          <div className="flex items-center">
                                            <div className="relative font-medium">Windows PC</div>
                                            <Icon icon="ph:dot" className="h-6 w-6 relative" ></Icon>
                                            <div className="relative font-medium">Chrome</div>
                                            <Icon icon="ph:dot" className="h-6 w-6 relative" ></Icon>
                                            <div className="relative font-medium">San Pablo City</div>
                                          </div>
                                          <div className="rounded-xl bg-lightcyan flex items-center py-num-4 px-3 text-slategray">
                                            <div className="relative font-semibold">Active Now</div>
                                          </div>
                                        </div>
                                      </div>
                                      <Icon icon="qlementine-icons:menu-dots-24" className="h-6 w-6 relative" ></Icon>
                                    </div>
                                  </div>
                                </div>
                                <div className="self-stretch h-[68px] rounded-num-16 border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start justify-center py-num-4 px-num-10">
                                  <div className="self-stretch flex items-center gap-2.5">
                                    <div className="flex-1 flex items-center gap-3">
                                      <Icon icon="wordpress:desktop" className="w-12 h-12 relative" ></Icon>
                                      <div className="flex flex-col items-start justify-center py-num-4 px-num-0">
                                        <div className="flex items-center">
                                          <div className="relative font-medium">Windows PC</div>
                                          <Icon icon="ph:dot" className="h-6 w-6 relative" ></Icon>
                                          <div className="relative font-medium">Chrome</div>
                                          <Icon icon="ph:dot" className="h-6 w-6 relative" ></Icon>
                                          <div className="relative font-medium">San Pablo City</div>
                                        </div>
                                        <div className="rounded-xl bg-aliceblue flex items-center py-num-4 px-3 text-slategray">
                                          <div className="relative font-semibold">Yesterday at 11:33 PM</div>
                                        </div>
                                      </div>
                                    </div>
                                    <Icon icon="qlementine-icons:menu-dots-24" className="h-6 w-6 relative" ></Icon>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="self-stretch overflow-hidden flex items-start py-num-10 pl-num-0 pr-num-10 gap-2">
                            <div className="self-stretch w-[340px] flex flex-col items-start gap-3">
                              <div className="flex flex-col items-start">
                                <div className="flex items-center">
                                  <b className="relative">App Permissions</b>
                                </div>
                              </div>
                              <div className="self-stretch flex-1 rounded-num-16 border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex flex-col items-start justify-center py-4 px-6 gap-2.5 text-[24px] text-teal">
                                <div className="flex items-center gap-1">
                                  <img className="w-[52px] relative max-h-full object-cover" alt="" src={footer_logo} />
                                  <b className="relative leading-8">App Permissions</b>
                                </div>
                                <div className="self-stretch relative text-num-14 font-medium text-black text-left">ATLAS has access to your basic Google profile and linked accounts.</div>
                              </div>
                            </div>
                            <div className="flex-1 flex flex-col items-start gap-3">
                              <div className="self-stretch flex flex-col items-start gap-3">
                                <div className="self-stretch flex flex-col items-start">
                                  <b className="relative">Security Tip</b>
                                </div>
                                <div className="self-stretch h-[63px] rounded-num-16 bg-aliceblue overflow-hidden shrink-0 flex items-start justify-center py-num-10 px-3 box-border gap-2 text-left text-slategray">
                                  <Icon icon="flat-color-icons:info" className="h-6 w-6 relative shrink-0" ></Icon>
                                  <div className="h-[68px] flex-1 relative leading-6 font-medium inline-block shrink-0">{`To change your password or two-factor authentication, please visit your `}
                                    <span className="[text-decoration:underline]">Google Account Settings.</span>
                                  </div>
                                </div>
                              </div>
                              <div className="self-stretch flex flex-col items-start gap-2">
                                <div className="self-stretch flex flex-col items-start">
                                  <b className="relative">{`Authentication Method `}</b>
                                </div>
                                <div className="rounded-lg bg-aliceblue border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex items-start justify-center py-num-10 px-3 text-left text-teal">
                                  <div className="w-[534px] relative leading-6 font-medium inline-block shrink-0">External OAuth (Google)</div>
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
          </div>
          <div className="w-[1440px] h-20 bg-white overflow-hidden shrink-0 hidden flex-col items-center justify-center">
            <div className="w-[1273px] h-[82px] bg-whitesmoke-100 overflow-hidden shrink-0 flex items-center py-[19px] pl-[200px] pr-20 box-border" />
          </div>
        </div>
      </div>
    </div>);
};

export default SettingsSecurity;
