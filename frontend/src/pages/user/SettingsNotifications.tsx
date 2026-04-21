import { Icon } from '@iconify/react';
import { type FunctionComponent, useCallback } from 'react';
import SideBar from '../../components/SideBar';
import Footer from '../../components/Footer';

const Tab = (props: { active: boolean; text: string }) => {
  return (
    <div className={`flex flex-col h-12 pt-4 box-border ` + (props.active ? 'text-teal' : '')}>
      <div className="flex font-bold">{props.text}</div>
      <div className="self-stretch flex-1 flex flex-col items-center justify-end">
        <div className={`w-full h-1.25 rounded ` + (props.active ? 'bg-teal' : '')} />
      </div>
    </div>
  );
};
const SettingsNotifications: FunctionComponent = () => {
  const onGeneralContainerClick = useCallback(() => {
    // Add your code here
  }, []);

  return (
    <div className="flex flex-row text-darkslategray-100 font-lora">
      <SideBar />
      <div className="w-full flex flex-col gap-20">
        <div className="pl-8 pr-20 pt-16 flex flex-col gap-[3rem] text-[1.5rem] text-black font-inter box-border">
          <b>Settings</b>
          <div className="flex-1 flex flex-col text-[0.875rem] text-dimgray">
            <div className="rounded-t-2xl rounded-b-none border-whitesmoke-200 border-solid border flex px-12 gap-12">
              <Tab text="General" active={false} />
              <Tab text="Security" active={false} />
              <Tab text="Notifications" active={true} />
              <Tab text="Preferences" active={false} />
            </div>
            <div className="rounded-t-none rounded-b-2xl border-whitesmoke-200 border-solid border flex flex-col py-6 px-8 gap-12 text-center text-black">
              <div className="self-stretch flex flex-col items-start gap-6">
                <div className="text-[1.5rem] font-bold">System Notifications</div>
                <div className="flex flex-col items-start py-[0.625rem] pl-[0rem] pr-[0.625rem] gap-[0.5rem]">
                  <div className="self-stretch flex flex-col items-start gap-[0.75rem]">
                    <div className="self-stretch flex flex-col items-start gap-[0.5rem]">
                      <b className="relative">Default System Notifications Email</b>
                      <div className="self-stretch relative leading-[1.5rem] font-medium text-darkslategray-100 text-left">
                        Decide where you want to receive your system updates. System notifications
                        may include account verification approval/rejection, maintenance updates,
                        and new login attempts. You can only choose emails already linked to your
                        ATLAS account.
                      </div>
                    </div>
                    <div className="self-stretch overflow-hidden flex flex-col items-start py-[0.625rem] px-[0rem] text-left text-teal">
                      <div className="rounded-num-12 bg-aliceblue border-whitesmoke-200 border-solid border-[1px] flex items-center justify-center py-[0.5rem] px-[2rem] gap-[0.5rem]">
                        <div className="relative font-semibold">dcanape@up.edu.ph</div>
                        <Icon icon="tabler:chevron-down-filled" className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex items-center gap-[0.625rem] text-left text-dimgray">
                    <div className="rounded-[100px] flex items-center justify-center">
                      <div className="h-[1.125rem] w-[1.125rem] relative rounded-sm border-teal border-solid border-[1px] box-border" />
                    </div>
                    <div className="relative font-semibold">
                      Receive SMS updates on your saved mobile number
                    </div>
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start gap-[0.75rem]">
                  <div className="self-stretch flex flex-col items-start gap-[0.5rem]">
                    <b className="relative">Customize Updates</b>
                    <div className="self-stretch relative leading-[1.5rem] font-medium text-darkslategray-100 text-left">
                      Choose which updates you’ll to receive related to the system notifications.
                    </div>
                  </div>
                  <div className="self-stretch overflow-hidden flex flex-col items-start py-[0.625rem] px-[0rem] text-left text-teal">
                    <div className="rounded-num-12 bg-aliceblue border-whitesmoke-200 border-solid border-[1px] flex items-center justify-center py-[0.5rem] px-[2rem] gap-[0.5rem]">
                      <div className="relative font-semibold">
                        New Login Attempts, Verification Updates
                      </div>
                      <Icon icon="tabler:chevron-down-filled" className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start gap-[1.5rem] text-[1.5rem]">
                <div className="self-stretch flex flex-col items-start">
                  <div className="flex flex-col items-start">
                    <b className="relative leading-[2rem]">Listing Notifications</b>
                  </div>
                </div>
                <div className="self-stretch overflow-hidden flex flex-col items-start py-[0.625rem] pl-[0rem] pr-[0.625rem] gap-[1rem] text-left text-[0.875rem]">
                  <div className="self-stretch flex flex-col items-start gap-[0.75rem]">
                    <div className="self-stretch flex flex-col items-start gap-[0.5rem] text-center">
                      <b className="relative">Default Listings Notifications Email</b>
                      <div className="self-stretch relative leading-[1.5rem] font-medium text-darkslategray-100 text-left">
                        Decide where you want to receive your listing/dorm updates. Listing
                        notifications include direct messages from landlord/dorm manager, rent fee
                        reminders, your bookmarked listings that are posted as pasalo units, and
                        ocular visit reminders. You can only choose emails already linked to your
                        ATLAS account.
                      </div>
                    </div>
                    <div className="self-stretch overflow-hidden flex flex-col items-start py-[0.625rem] px-[0rem] text-teal">
                      <div className="rounded-num-12 bg-aliceblue border-whitesmoke-200 border-solid border-[1px] flex items-center justify-center py-[0.5rem] px-[2rem] gap-[0.5rem]">
                        <div className="relative font-semibold">dcanape@up.edu.ph</div>
                        <Icon icon="tabler:chevron-down-filled" className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="self-stretch flex items-center gap-[0.625rem] text-dimgray">
                      <div className="rounded-[100px] flex items-center justify-center relative isolate">
                        <div className="h-[1.125rem] w-[1.125rem] relative rounded-sm bg-darkslategray-200 z-[0] shrink-0" />
                        <img
                          className="h-[1.5rem] w-[1.5rem] absolute !!m-[0 important] top-[calc(50%_-_12px)] left-[calc(50%_-_12px)] z-[1] shrink-0"
                          alt=""
                        />
                      </div>
                      <div className="relative font-semibold">
                        Receive SMS updates on your saved mobile number
                      </div>
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start gap-[0.75rem] text-center">
                    <div className="self-stretch flex flex-col items-start gap-[0.5rem]">
                      <b className="relative">Customize Updates</b>
                      <div className="self-stretch relative leading-[1.5rem] font-medium text-darkslategray-100 text-left">
                        Choose which updates you’ll to receive related to the listings.
                      </div>
                    </div>
                    <div className="self-stretch overflow-hidden flex flex-col items-start py-[0.625rem] px-[0rem] text-left text-teal">
                      <div className="rounded-num-12 bg-aliceblue border-whitesmoke-200 border-solid border-[1px] flex items-center justify-center py-[0.5rem] px-[2rem] gap-[0.5rem]">
                        <div className="relative font-semibold">
                          Application Approval, Direct Messages
                        </div>
                        <Icon icon="tabler:chevron-down-filled" className="w-5 h-5" />
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
  );
};

export default SettingsNotifications;
