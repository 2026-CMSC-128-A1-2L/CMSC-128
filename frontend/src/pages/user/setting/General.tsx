import type { FunctionComponent, CSSProperties } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import info_icon from '../../../../assets/infoicon_icon.svg';
import SignInPopUp from '../../../components/general/SignInPopUp';
import { useState } from 'react';
import { useAuthStore } from '../../../store/useAuthStore';
import { UserService } from '../../../service/UserService';
import DeleteAccountPopup from '../../../components/general/DeleteAccountPopup';

const General: FunctionComponent = () => {
  const { user, isLoading } = useAuthStore();
  const [showSignIn, setShowSignIn] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const navigate = useNavigate();

  const handleDeleteConfirm = async () => {
    await UserService.deleteSelf();
    useAuthStore.getState().logout();
    navigate('/');
  };

  const fullName = user
    ? [user.firstName, user.lastName].filter(Boolean).join(' ')
    : '—';

  const createdAt = user && 'createdAt' in user
    ? new Date((user as any).createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : '—';

  const verificationStatus = user && 'verificationStatus' in user
    ? (user as any).verificationStatus as string
    : undefined;

  const isVerified = verificationStatus === 'approved';

  const verificationLabel = !user
    ? 'Signed Out'
    : verificationStatus === 'approved'
      ? 'Verified'
      : verificationStatus === 'submitted'
        ? 'Pending Review'
        : verificationStatus === 'rejected'
          ? 'Rejected'
          : 'Unverified';

  const verificationStyle: CSSProperties = !user
    ? { color: '#bdbdbd' }
    : verificationStatus === 'approved'
      ? { color: '#096c5b' }
      : verificationStatus === 'submitted'
        ? { color: '#ca8a04' }
        : {
            background: 'linear-gradient(180deg, #c00f0f, #e44f4f)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          };

  return (
    <div className="self-stretch rounded-t-none rounded-b-num-16 border-whitesmoke-200 border-solid border overflow-hidden flex flex-col items-start py-6 px-num-32 gap-6 text-center text-[24px] text-black">
      {isLoading ? (
        <div className="self-stretch flex items-center justify-center py-10 text-dimgray text-sm">
          Loading account information…
        </div>
      ) : (
        <>
          {/* Account Information */}
          <div className="self-stretch flex flex-col items-start gap-8">
            <div className="flex flex-col items-start">
              <b className="relative leading-8">Account Information</b>
            </div>
            <div className="self-stretch overflow-hidden flex items-start py-num-10 pl-num-0 pr-num-10 gap-2 text-num-14 text-dimgray">
              {/* Left column */}
              <div className="flex-1 flex flex-col items-start gap-3">
                <div className="flex flex-col items-start gap-1">
                  <b className="relative">Account Name</b>
                  <b className="relative text-black">{fullName}</b>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <b className="relative">User Type</b>
                  <b className="relative text-black">{user?.userType ?? '—'}</b>
                </div>
                <div className="flex flex-col items-start gap-1">
                  <b className="relative">University Domain</b>
                  <b className="relative text-darkslategray">
                    University of the Philippines Los Baños
                  </b>
                </div>
              </div>

              {/* Right column */}
              <div className="flex-1 flex flex-col items-start gap-3">
                <div className="flex flex-col items-start">
                  <div className="flex flex-col items-start gap-1">
                    <b className="relative">Verification Status</b>
                    <div className="self-stretch flex items-center gap-8 text-teal-100">
                      <b className="relative" style={verificationStyle}>
                        {verificationLabel}
                      </b>
                      {!user ? (
                        <>
                          <button
                            onClick={() => setShowSignIn(true)}
                            className="flex items-center gap-1 text-[12px] text-teal-100 cursor-pointer bg-transparent border-none p-0 transition-all duration-150 hover:text-teal-200 hover:gap-1.5 group"
                          >
                            <span className="relative font-medium">Sign In</span>
                            <Icon
                              icon="solar:arrow-right-up-linear"
                              className="w-4 relative max-h-full"
                            />
                          </button>
                          {showSignIn && <SignInPopUp onClose={() => setShowSignIn(false)} />}
                        </>
                      ) : (
                        !isVerified && (
                          <button
                            onClick={() => navigate('/profile-switcher')}
                            className="flex items-center gap-1 text-[12px] cursor-pointer bg-transparent border-none p-0 transition-all duration-150 hover:gap-1.5 group"
                          >
                            <span className="relative font-medium text-teal-100">Get Verified</span>
                            <Icon
                              icon="solar:arrow-right-up-linear"
                              className="w-4 relative max-h-full text-teal-100"
                            />
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex flex-col items-start gap-1 text-black">
                  <div className="flex items-center gap-1 text-dimgray">
                    <b className="relative">Linked Emails</b>
                    <Icon icon="ic:baseline-link" className="h-6 w-6 relative" />
                  </div>
                  {user?.emails?.length ? (
                    user.emails.map((email, i) => (
                      <div key={i} className="flex items-center justify-center">
                        <a
                          className="relative font-bold text-inherit [text-decoration:none] transition-all duration-150 hover:text-teal hover:underline"
                          href={`mailto:${email}`}
                          target="_blank"
                          rel="noopener"
                        >
                          {email}
                        </a>
                      </div>
                    ))
                  ) : (
                    <b className="relative text-silver">No emails linked</b>
                  )}
                </div>

                <div className="flex flex-col items-start gap-1">
                  <b className="relative">Date of Creation</b>
                  <b className="relative text-black">{createdAt}</b>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="self-stretch h-0.5 rounded-[100px] border-whitesmoke-200 border-solid border box-border overflow-hidden shrink-0 flex flex-col items-center justify-center py-num-0 px-num-10" />

          {/* Data Management */}
          <div className="self-stretch flex flex-col items-start gap-8">
            <div className="self-stretch flex flex-col items-start">
              <div className="flex flex-col items-start">
                <b className="relative leading-8">Data Management</b>
              </div>
            </div>
            <div className="self-stretch overflow-hidden flex items-start py-num-10 pl-num-0 pr-num-10 gap-2 text-num-14">
              {/* Download Personal Data */}
              <div className="flex-1 flex flex-col items-start">
                <div className="self-stretch flex flex-col items-start gap-3">
                  <div className="self-stretch flex flex-col items-start gap-3">
                    <b className="relative">Personal Data</b>
                    <div className="self-stretch flex flex-col items-start py-num-0 px-2 text-teal-200">
                      <button
                        disabled
                        className="h-8 rounded-num-16 bg-aliceblue border-solid border border-whitesmoke-200 flex items-center justify-center py-num-0 px-4 box-border opacity-50 cursor-not-allowed"
                      >
                        <b className="relative">Download Personal Data</b>
                      </button>
                    </div>
                  </div>
                  <div className="self-stretch overflow-hidden flex items-start py-num-10 px-3 gap-1 text-left">
                    <div className="self-stretch w-4 overflow-hidden shrink-0 flex flex-col items-start p-px box-border">
                      <img className="w-[13.3px] h-[13.3px] relative" alt="" src={info_icon} />
                    </div>
                    <div className="h-[68px] flex-1 relative font-medium inline-block">
                      Maintain your own records by downloading a full copy of your digital
                      footprint. This includes all information given by the user, verified documents
                      and communication logs within the ATLAS ecosystem.
                    </div>
                  </div>
                </div>
              </div>

              {/* Delete Account */}
              <div className="flex-1 flex flex-col items-start">
                <div className="self-stretch flex flex-col items-start gap-3">
                  <div className="self-stretch flex flex-col items-start gap-3">
                    <b className="relative">Account Deletion</b>
                    <div className="self-stretch flex flex-col items-start py-num-0 px-2">
                      <button
                        onClick={() => setShowDeletePopup(true)}
                        disabled={!user}
                        className={`h-8 rounded-num-16 bg-aliceblue flex items-center justify-center py-num-0 px-3 box-border border-none transition-all duration-200 hover:bg-red-50 hover:shadow-sm ${
                          !user ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                        }`}
                      >
                        <b
                          className="relative"
                          style={{
                            background: 'linear-gradient(180deg, #c00f0f, #e44f4f)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            backgroundClip: 'text',
                          }}
                        >
                          Delete Account
                        </b>
                      </button>
                    </div>
                  </div>
                  <div className="self-stretch overflow-hidden flex items-start py-num-10 px-3 gap-1 text-left">
                    <div className="self-stretch w-4 overflow-hidden shrink-0 flex flex-col items-start p-px box-border">
                      <img className="w-[13.3px] h-[13.3px] relative" alt="" src={info_icon} />
                    </div>
                    <div className="h-[68px] flex-1 relative leading-6 font-medium inline-block">
                      Deletion will result in the complete removal of all your personal data and
                      documentation from our active servers. Once processed, this data cannot be
                      recovered.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Delete Account Popup */}
      <DeleteAccountPopup
        isOpen={showDeletePopup}
        onClose={() => setShowDeletePopup(false)}
        onConfirm={handleDeleteConfirm}
        userName={fullName !== '—' ? fullName : undefined}
      />
    </div>
  );
};

export default General;