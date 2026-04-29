import { Icon } from '@iconify/react';
import type { FunctionComponent, } from 'react';

const Notification: FunctionComponent = () => {
  return (
    <div className="rounded-t-none rounded-b-2xl border-whitesmoke-200 border-solid border flex flex-col py-6 px-8 gap-12 text-center text-black">
      <div className="self-stretch flex flex-col items-start gap-6">
        <div className="text-[1.5rem] font-bold">System Notifications</div>
        <div className="flex flex-col items-start py-2.5 pl-0 pr-2.5 gap-2">
          <div className="self-stretch flex flex-col items-start gap-3">
            <div className="self-stretch flex flex-col items-start gap-2">
              <b className="relative">Default System Notifications Email</b>
              <div className="self-stretch relative leading-6 font-medium text-darkslategray-100 text-left">
                Decide where you want to receive your system updates. System notifications may
                include account verification approval/rejection, maintenance updates, and new login
                attempts. You can only choose emails already linked to your ATLAS account.
              </div>
            </div>
            <div className="self-stretch overflow-hidden flex flex-col items-start py-2.5 px-0 text-left text-teal">
              <div className="rounded-num-12 bg-aliceblue border-whitesmoke-200 border-solid border flex items-center justify-center py-2 px-8 gap-2">
                <div className="relative font-semibold">dcanape@up.edu.ph</div>
                <Icon icon="tabler:chevron-down-filled" className="w-5 h-5" />
              </div>
            </div>
          </div>
          <div className="self-stretch flex items-center gap-2.5 text-left text-dimgray">
            <div className="rounded-[100px] flex items-center justify-center">
              <div className="h-4.5 w-4.5 relative rounded-sm border-teal border-solid border box-border" />
            </div>
            <div className="relative font-semibold">
              Receive SMS updates on your saved mobile number
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start gap-3">
          <div className="self-stretch flex flex-col items-start gap-2">
            <b className="relative">Customize Updates</b>
            <div className="self-stretch relative leading-6 font-medium text-darkslategray-100 text-left">
              Choose which updates you’ll to receive related to the system notifications.
            </div>
          </div>
          <div className="self-stretch overflow-hidden flex flex-col items-start py-2.5 px-0 text-left text-teal">
            <div className="rounded-num-12 bg-aliceblue border-whitesmoke-200 border-solid border flex items-center justify-center py-2 px-8 gap-2">
              <div className="relative font-semibold">New Login Attempts, Verification Updates</div>
              <Icon icon="tabler:chevron-down-filled" className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-col items-start gap-6 text-[1.5rem]">
        <div className="self-stretch flex flex-col items-start">
          <div className="flex flex-col items-start">
            <b className="relative leading-8">Listing Notifications</b>
          </div>
        </div>
        <div className="self-stretch overflow-hidden flex flex-col items-start py-2.5 pl-0 pr-2.5 gap-4 text-left text-[0.875rem]">
          <div className="self-stretch flex flex-col items-start gap-3">
            <div className="self-stretch flex flex-col items-start gap-2 text-center">
              <b className="relative">Default Listings Notifications Email</b>
              <div className="self-stretch relative leading-6 font-medium text-darkslategray-100 text-left">
                Decide where you want to receive your listing/dorm updates. Listing notifications
                include direct messages from landlord/dorm manager, rent fee reminders, your
                bookmarked listings that are posted as pasalo units, and ocular visit reminders. You
                can only choose emails already linked to your ATLAS account.
              </div>
            </div>
            <div className="self-stretch overflow-hidden flex flex-col items-start py-2.5 px-0 text-teal">
              <div className="rounded-num-12 bg-aliceblue border-whitesmoke-200 border-solid border flex items-center justify-center py-2 px-8 gap-2">
                <div className="relative font-semibold">dcanape@up.edu.ph</div>
                <Icon icon="tabler:chevron-down-filled" className="w-5 h-5" />
              </div>
            </div>
            <div className="self-stretch flex items-center gap-2.5 text-dimgray">
              <div className="rounded-[100px] flex items-center justify-center relative isolate">
                <div className="h-4.5 w-4.5 relative rounded-sm bg-darkslategray-200 z-0 shrink-0" />
                <img
                  className="h-6 w-6 absolute !!m-[0 important] top-[calc(50%-12px)] left-[calc(50%-12px)] z-1 shrink-0"
                  alt=""
                />
              </div>
              <div className="relative font-semibold">
                Receive SMS updates on your saved mobile number
              </div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-start gap-3 text-center">
            <div className="self-stretch flex flex-col items-start gap-2">
              <b className="relative">Customize Updates</b>
              <div className="self-stretch relative leading-6 font-medium text-darkslategray-100 text-left">
                Choose which updates you’ll to receive related to the listings.
              </div>
            </div>
            <div className="self-stretch overflow-hidden flex flex-col items-start py-2.5 px-0 text-left text-teal">
              <div className="rounded-num-12 bg-aliceblue border-whitesmoke-200 border-solid border flex items-center justify-center py-2 px-8 gap-2">
                <div className="relative font-semibold">Application Approval, Direct Messages</div>
                <Icon icon="tabler:chevron-down-filled" className="w-5 h-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notification;
