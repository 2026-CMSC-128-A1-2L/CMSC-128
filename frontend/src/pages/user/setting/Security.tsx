import type { FunctionComponent } from 'react';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import footer_logo from '../../../../assets/footer_logo.svg';
import SignInPopUp from '../../../components/general/SignInPopUp';
import { SettingsPanelSkeleton } from '../../../components/general/Skeleton';

type UserData = {
  emails: string[];
  status: string;
};

const Security: FunctionComponent = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/users/me', { credentials: 'include' });
        if (!res.ok) throw new Error('Not authenticated');
        const json = await res.json();
        setUser(json.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  // todo: active sessions API

  return (
    <div className="self-stretch rounded-t-none rounded-b-num-16 border-whitesmoke-200 border-solid border overflow-hidden flex flex-col items-start py-6 px-8 gap-6 text-center text-[24px] text-black">
      <div className="flex flex-col items-start">
        <b className="relative leading-8">Security Settings</b>
      </div>

      {loading ? (
        <SettingsPanelSkeleton />
      ) : (
        <div className="self-stretch flex flex-col items-start gap-3 text-num-14">
          <div className="self-stretch overflow-hidden flex items-start py-num-10 pl-num-0 pr-num-10 gap-2">
            {/* Linked Accounts */}
            <div className="self-stretch flex-1 flex flex-col items-start gap-3">
              <div className="self-stretch flex items-center gap-1">
                <b className="relative">Linked Accounts</b>
                <Icon icon="ic:baseline-link" className="h-6 w-6 relative" />
              </div>
              <div className="self-stretch flex-1 rounded-num-16 border-whitesmoke-200 border-solid border overflow-hidden flex flex-col items-start justify-center py-num-10 px-6 gap-2.5 text-left">
                {!user ? (
                  <div className="flex flex-col gap-2">
                    <div className="text-silver font-medium text-num-14">Not signed in</div>
                    <button
                      onClick={() => setShowSignIn(true)}
                      className="flex items-center gap-1 text-[12px] text-teal-100 cursor-pointer bg-transparent border-none p-0 transition-all duration-150 hover:text-teal-200 hover:gap-1.5"
                    >
                      <span className="font-medium">Sign In</span>
                      <Icon
                        icon="solar:arrow-right-up-linear"
                        className="w-4 relative max-h-full"
                      />
                    </button>
                    {showSignIn && <SignInPopUp onClose={() => setShowSignIn(false)} />}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-2.5 text-center text-[24px] text-teal">
                      <Icon icon="flat-color-icons:google" className="h-6 w-6 relative" />
                      <b className="relative leading-8">Logged in via Google</b>
                    </div>
                    {user.emails.length > 0 ? (
                      user.emails.map((email, i) => (
                        <a
                          key={i}
                          className="self-stretch relative [text-decoration:underline] font-medium text-inherit transition-all duration-150 hover:text-teal"
                          href={`mailto:${email}`}
                          target="_blank"
                          rel="noopener"
                        >
                          {email}
                        </a>
                      ))
                    ) : (
                      <span className="text-silver font-medium">No emails linked</span>
                    )}
                  </>
                )}
              </div>
            </div>

            {/* Active Sessions */}
            <div className="flex-1 flex flex-col items-start gap-3 text-left">
              <div className="self-stretch h-6 flex items-center">
                <b className="flex-1 relative">Active Sessions</b>
              </div>
              <div className="self-stretch flex flex-col items-start justify-center gap-3 text-num-12">
                <div className="self-stretch flex flex-col items-start">
                  <div className="self-stretch h-[68px] rounded-num-16 border-whitesmoke-200 border-solid border box-border overflow-hidden shrink-0 flex flex-col items-start justify-center py-num-4 px-num-10 transition-all duration-200 hover:border-teal-100 hover:bg-azure hover:shadow-sm cursor-pointer">
                    <div className="self-stretch flex items-center gap-2.5">
                      <div className="flex-1 flex items-center gap-3">
                        <Icon icon="wordpress:desktop" className="w-12 relative h-12" />
                        <div className="flex flex-col items-start justify-center py-num-4 px-num-0">
                          <div className="flex items-center">
                            <div className="relative font-medium">Windows PC</div>
                            <Icon icon="ph:dot" className="h-6 w-6 relative" />
                            <div className="relative font-medium">Chrome</div>
                            <Icon icon="ph:dot" className="h-6 w-6 relative" />
                            <div className="relative font-medium">San Pablo City</div>
                          </div>
                          <div className="rounded-xl bg-lightcyan flex items-center py-num-4 px-3 text-slategray">
                            <div className="relative font-semibold">Active Now</div>
                          </div>
                        </div>
                      </div>
                      <Icon
                        icon="qlementine-icons:menu-dots-24"
                        className="h-6 w-6 relative cursor-pointer text-dimgray transition-all duration-150 hover:text-teal hover:scale-110"
                      />
                    </div>
                  </div>
                </div>
                <div className="self-stretch h-[68px] rounded-num-16 border-whitesmoke-200 border-solid border box-border overflow-hidden shrink-0 flex flex-col items-start justify-center py-num-4 px-num-10 transition-all duration-200 hover:border-teal-100 hover:bg-azure hover:shadow-sm cursor-pointer">
                  <div className="self-stretch flex items-center gap-2.5">
                    <div className="flex-1 flex items-center gap-3">
                      <Icon icon="wordpress:desktop" className="w-12 h-12 relative" />
                      <div className="flex flex-col items-start justify-center py-num-4 px-num-0">
                        <div className="flex items-center">
                          <div className="relative font-medium">Windows PC</div>
                          <Icon icon="ph:dot" className="h-6 w-6 relative" />
                          <div className="relative font-medium">Chrome</div>
                          <Icon icon="ph:dot" className="h-6 w-6 relative" />
                          <div className="relative font-medium">San Pablo City</div>
                        </div>
                        <div className="rounded-xl bg-aliceblue flex items-center py-num-4 px-3 text-slategray">
                          <div className="relative font-semibold">Yesterday at 11:33 PM</div>
                        </div>
                      </div>
                    </div>
                    <Icon icon="qlementine-icons:menu-dots-24" className="h-6 w-6 relative" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="self-stretch overflow-hidden flex items-start py-num-10 pl-num-0 pr-num-10 gap-2">
            {/* App Permissions */}
            <div className="self-stretch w-[340px] flex flex-col items-start gap-3">
              <div className="flex flex-col items-start">
                <div className="flex items-center">
                  <b className="relative">App Permissions</b>
                </div>
              </div>
              <div className="self-stretch flex-1 rounded-num-16 border-whitesmoke-200 border-solid border overflow-hidden flex flex-col items-start justify-center py-4 px-6 gap-2.5 text-[24px] text-teal">
                <div className="flex items-center gap-1">
                  <img
                    className="w-[52px] relative max-h-full object-cover"
                    alt=""
                    src={footer_logo}
                  />
                  <b className="relative leading-8">App Permissions</b>
                </div>
                <div className="self-stretch relative text-num-14 font-medium text-black text-left">
                  ATLAS has access to your basic Google profile and linked accounts.
                </div>
              </div>
            </div>

            {/* Security Tip + Auth Method */}
            <div className="flex-1 flex flex-col items-start gap-3">
              <div className="self-stretch flex flex-col items-start gap-3">
                <div className="self-stretch flex flex-col items-start">
                  <b className="relative">Security Tip</b>
                </div>
                <div className="self-stretch h-[63px] rounded-num-16 bg-aliceblue overflow-hidden shrink-0 flex items-start justify-center py-num-10 px-3 box-border gap-2 text-left text-slategray">
                  <Icon icon="flat-color-icons:info" className="h-6 w-6 relative shrink-0" />
                  <div className="h-[68px] flex-1 relative leading-6 font-medium inline-block shrink-0">
                    {`To change your password or two-factor authentication, please visit your `}
                    <a
                      href="https://myaccount.google.com/security"
                      target="_blank"
                      rel="noopener"
                      className="[text-decoration:underline] text-inherit transition-all duration-150 hover:text-teal"
                    >
                      Google Account Settings.
                    </a>
                  </div>
                </div>
              </div>
              <div className="self-stretch flex flex-col items-start gap-2">
                <div className="self-stretch flex flex-col items-start">
                  <b className="relative">Authentication Method</b>
                </div>
                <div className="self-stretch rounded-lg bg-aliceblue border-whitesmoke-200 border-solid border overflow-hidden flex items-start py-num-10 px-3 text-left text-teal">
                  <div className="w-[534px] relative leading-6 font-medium inline-block shrink-0">
                    External OAuth (Google)
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Security;
