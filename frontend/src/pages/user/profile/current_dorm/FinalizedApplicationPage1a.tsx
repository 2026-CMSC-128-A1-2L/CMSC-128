import { type FunctionComponent, useCallback, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Verified from '../../../../../assets/verified_badge.svg';
import DefaultAvatar from '../../../../../assets/default_avatar.svg';
import Sidebar from '../../../../components/user/SideBar';
import Footer from '../../../../components/general/Footer';
import CancelApplication1 from '../../../../components/user/Profile/CancelApplication1';
import CancelApplication2 from '../../../../components/user/Profile/CancelApplication2';
import FinalizeApplication from '../../../../components/user/Profile/FinalizeApplication';
import { ApplicationService } from '../../../../service/ApplicationService';
import { FileService } from '../../../../service/FileService';
import { UserService } from '../../../../service/UserService';

const documentRequirements = {
  id: 'official-id',
  consent: 'parental-consent',
  contract: 'tenancy-contract',
} as const;

type VerificationStatus = 'pending' | 'submitted' | 'rejected' | 'approved';
type AccountStatus = 'setup' | 'unverified' | 'verified' | 'inactive' | 'disabled' | 'legacy';
type UserRole = 'Admin' | 'Manager' | 'Landlord' | 'Student';

type ProfileUser = {
  _id?: string;
  email?: string;
  emails?: string[];
  firstName?: string;
  middleName?: string | null;
  lastName?: string;
  profilePicture?: string | null;
  address?: string;
  contact?: string;
  status?: AccountStatus;
  userType?: UserRole;
  verificationStatus?: VerificationStatus;
  studentNumber?: string;
};

type RentalSummary = {
  status?: string;
  facilityId?: string | { name?: string; id?: string; _id?: string };
  unitId?: string | { roomNumber?: string; id?: string; _id?: string };
  expectedMoveInDate?: string;
  expectedMoveOutDate?: string;
  actualMoveInDate?: string;
  actualMoveOutDate?: string;
};

type BillingSummary = {
  paymentStatus?: string;
  totalAmount?: number;
  dueDate?: string;
};

const getDataArray = <T,>(response: unknown): T[] => {
  if (Array.isArray(response)) return response as T[];

  if (response && typeof response === 'object' && 'data' in response) {
    const data = (response as { data?: unknown }).data;
    return Array.isArray(data) ? (data as T[]) : [];
  }

  return [];
};

const formatName = (user: ProfileUser | null) => {
  if (!user) return 'Profile';
  return [user.firstName, user.middleName, user.lastName].filter(Boolean).join(' ') || 'Profile';
};

const formatFormalName = (user: ProfileUser | null) => {
  if (!user) return 'Not provided';

  const lastName = user.lastName?.trim();
  const givenNames = [user.firstName, user.middleName].filter(Boolean).join(' ');

  if (lastName && givenNames) {
    return `${lastName.toUpperCase()}, ${givenNames.toUpperCase()}`;
  }

  return formatName(user).toUpperCase();
};

const redactContact = (number?: string) => {
  if (!number) return '- - - - -';
  if (number.length < 4) return number;
  return `${number.slice(0, 2)}${'*'.repeat(Math.max(number.length - 4, 0))}${number.slice(-2)}`;
};

const redactStudentNumber = (studentNumber?: string) => {
  if (!studentNumber) return 'Not available';
  if (studentNumber.length <= 4) return studentNumber;
  return `${studentNumber.slice(0, 4)}${'*'.repeat(Math.max(studentNumber.length - 4, 0))}`;
};

const verificationLabel = (user: ProfileUser | null) => {
  if (!user) return 'Loading';

  if (user.status === 'verified' || user.verificationStatus === 'approved') return 'Verified';
  if (user.verificationStatus === 'submitted') return 'For Review';
  if (user.verificationStatus === 'rejected') return 'Rejected';
  if (user.status === 'setup') return 'Setup Required';

  return 'Unverified';
};

const roleLabel = (role?: UserRole) => {
  if (role === 'Student') return 'Student';
  return role ?? 'Unassigned';
};

const getFacilityName = (rental?: RentalSummary) => {
  if (!rental?.facilityId) return 'No active dorm yet';
  if (typeof rental.facilityId === 'object') return rental.facilityId.name ?? 'Assigned dorm';
  return 'Assigned dorm';
};

const getContractDuration = (rental?: RentalSummary) => {
  const start = rental?.actualMoveInDate ?? rental?.expectedMoveInDate;
  const end = rental?.actualMoveOutDate ?? rental?.expectedMoveOutDate;

  if (!start || !end) return '- - - - -';

  const startDate = new Date(start);
  const endDate = new Date(end);

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return '- - - - -';
  }

  return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
};

const formatRentFee = (billing?: BillingSummary) => {
  if (!billing?.totalAmount) return '- - - - -';
  return `₱${billing.totalAmount.toLocaleString()}`;
};

const FinalizedApplicationPage1a: FunctionComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const applicationId = searchParams.get('applicationId') ?? '';

  const [user, setUser] = useState<ProfileUser | null>(null);
  const [profileImage, setProfileImage] = useState<string>(DefaultAvatar);
  const [isProfileLoading, setIsProfileLoading] = useState(true);
  const [profileError, setProfileError] = useState<string | null>(null);
  const [currentRental, setCurrentRental] = useState<RentalSummary | undefined>();
  const [latestBilling, setLatestBilling] = useState<BillingSummary | undefined>();

  const [isIdUploaded, setIsIdUploaded] = useState(false);
  const [isConsentUploaded, setIsConsentUploaded] = useState(false);
  const [isContractUploaded, setIsContractUploaded] = useState(false);
  const [fileNames, setFileNames] = useState<Record<string, string>>({});
  const [isSubmitPopupVisible, setIsSubmitPopupVisible] = useState(false);
  const [cancelStage, setCancelStage] = useState<null | 'confirming' | 'success'>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadingDoc, setUploadingDoc] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadedCount = [isIdUploaded, isConsentUploaded, isContractUploaded].filter(
    Boolean,
  ).length;
  const allUploaded = uploadedCount === 3;

  const email = user?.email ?? user?.emails?.[0] ?? 'No email connected';
  const isVerified = user?.status === 'verified' || user?.verificationStatus === 'approved';
  const isStudent = user?.userType === 'Student';

  useEffect(() => {
    let cancelled = false;

    const loadProfile = async () => {
      setIsProfileLoading(true);
      setProfileError(null);

      try {
        const [selfResponse, rentalsResponse, billingsResponse] = await Promise.allSettled([
          UserService.getSelf(),
          UserService.getMyRentals(),
          UserService.getMyBillings(),
        ]);

        if (cancelled) return;

        if (selfResponse.status === 'fulfilled') {
          const fetchedUser = selfResponse.value.data as ProfileUser;

          setUser(fetchedUser);
          setProfileImage(fetchedUser.profilePicture || DefaultAvatar);
        } else {
          throw selfResponse.reason;
        }

        if (rentalsResponse.status === 'fulfilled') {
          const rentals = getDataArray<RentalSummary>(rentalsResponse.value);

          setCurrentRental(
            rentals.find((rental) => rental.status === 'active') ??
              rentals.find((rental) => rental.status === 'inactive') ??
              rentals[0],
          );
        }

        if (billingsResponse.status === 'fulfilled') {
          const billings = getDataArray<BillingSummary>(billingsResponse.value);
          setLatestBilling(billings[0]);
        }
      } catch {
        if (!cancelled) {
          setProfileError('Could not load your profile information.');
        }
      } finally {
        if (!cancelled) {
          setIsProfileLoading(false);
        }
      }
    };

    void loadProfile();

    return () => {
      cancelled = true;
    };
  }, []);

  const onSubmitTextClick = useCallback(async () => {
    if (!allUploaded || !applicationId) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await ApplicationService.finalizeApplication(applicationId);
      setIsSubmitPopupVisible(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not submit your finalized application.');
    } finally {
      setIsSubmitting(false);
    }
  }, [allUploaded, applicationId]);

  const uploadDocument = useCallback(
    async (docId: string, file: File, onUploaded: () => void) => {
      if (!applicationId) {
        setError('Missing application id. Please open this page from your applications list.');
        return;
      }

      setUploadingDoc(docId);
      setError(null);

      try {
        const uploadedFile = await FileService.uploadFile(file);
        await ApplicationService.addApplicationDocument(applicationId, docId, uploadedFile.key);
        setFileNames((prev) => ({ ...prev, [docId]: file.name }));
        onUploaded();
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Could not upload this document.');
      } finally {
        setUploadingDoc(null);
      }
    },
    [applicationId],
  );

  const onCancelClick = useCallback(() => {
    setCancelStage('confirming');
  }, []);

  const handleConfirmCancellation = useCallback(() => {
    setCancelStage('success');
  }, []);

  const handleFinalClose = useCallback(() => {
    setIsIdUploaded(false);
    setIsConsentUploaded(false);
    setIsContractUploaded(false);
    setCancelStage(null);
  }, []);

  const handleGoBack = useCallback(() => {
    setCancelStage(null);
  }, []);

  return (
    <div className="w-full h-screen relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray-100 font-lora">
      <img
        className="w-[1440px] h-[1024px] absolute !!m-[0 important] top-0 left-0 shrink-0 z-0"
        alt=""
      />

      <div className="w-[1440px] h-[1512px] overflow-hidden shrink-0 flex flex-col items-start z-1">
        <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-num-0 pl-num-0 pr-20">
          <div className="w-[1440px] flex-1 flex items-center shrink-0">
            <div className="self-stretch w-[200px] flex items-start">
              <Sidebar />
            </div>

            <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start justify-between gap-0">
              <div className="self-stretch flex-1 flex flex-col items-start py-num-0 pl-num-32 pr-20">
                <div className="self-stretch h-[1012px] flex flex-col items-start">
                  <div className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-num-10 box-border gap-2.5">
                    <div className="h-6 flex items-center gap-1.5">
                      <div className="relative font-semibold">User Profile</div>
                      <Icon icon="iconamoon:arrow-right-2" className="h-6 w-6 relative" />
                      <div className="relative font-semibold" data-scroll-to="currentDormText">
                        Current Dorm
                      </div>
                    </div>
                  </div>

                  <div className="self-stretch h-[1236px] rounded-num-16 bg-white/45 flex flex-col items-start gap-3 shrink-0 text-center text-dimgray font-inter">
                    <div className="self-stretch h-[382px] rounded-num-16 flex flex-col items-start gap-3">
                      <div className="self-stretch rounded-num-16 overflow-hidden flex flex-col items-start p-num-32">
                        <div className="self-stretch flex flex-col items-start gap-2.5">
                          <b className="relative">{roleLabel(user?.userType)} Profile</b>

                          <div className="flex items-center justify-center gap-2.5 text-[24px] text-darkslategray-200">
                            <b className="relative leading-8">
                              {isProfileLoading ? 'Loading profile...' : formatName(user)}
                            </b>

                            {isVerified && (
                              <img className="h-6 w-6 relative" alt="Verified" src={Verified} />
                            )}
                          </div>

                          <b className="relative text-teal">{email}</b>

                          {profileError && (
                            <span className="text-xs font-semibold text-red-500">
                              {profileError}
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="self-stretch overflow-hidden flex items-start justify-between py-1 px-num-32 gap-5">
                        <img
                          className="w-[200px] relative max-h-full object-cover"
                          alt="Profile"
                          src={profileImage}
                          onError={() => setProfileImage(DefaultAvatar)}
                        />

                        <div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
                          <div className="flex flex-col items-start gap-1">
                            <b className="relative">Name</b>
                            <b className="relative text-black uppercase">
                              {formatFormalName(user)}
                            </b>
                          </div>

                          <div className="flex flex-col items-start gap-1">
                            <div className="flex items-start gap-2">
                              <b className="relative">Contact number</b>
                              <Icon icon="iconamoon:edit" className="w-5 relative" />
                            </div>
                            <b className="relative text-black">{redactContact(user?.contact)}</b>
                          </div>

                          <div className="flex flex-col items-start gap-1">
                            <div className="flex items-start gap-2">
                              <b className="relative">Home Address</b>
                              <Icon icon="iconamoon:edit" className="w-5 relative" />
                            </div>
                            <b className="relative text-black">{user?.address || '- - - - -'}</b>
                          </div>
                        </div>

                        <div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
                          <div className="flex flex-col items-start gap-1">
                            <b className="relative">User Role</b>
                            <b className="relative text-black">{roleLabel(user?.userType)}</b>
                          </div>

                          <div className="flex flex-col items-start gap-1">
                            <b className="relative">Student Number</b>
                            <b className="relative text-black">
                              {isStudent
                                ? redactStudentNumber(user?.studentNumber)
                                : 'Not applicable'}
                            </b>
                          </div>

                          <div className="flex flex-col items-start gap-1">
                            <b className="relative">Verification Status</b>
                            <b className="relative text-teal">{verificationLabel(user)}</b>
                          </div>
                        </div>

                        <div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
                          <div className="flex flex-col items-start gap-1">
                            <b className="relative">Current Dorm</b>
                            <b className="relative text-black">{getFacilityName(currentRental)}</b>
                            <div className="flex items-center gap-1 text-num-12">
                              <div className="relative font-medium text-transparent bg-clip-text! [background:linear-gradient(180deg,#c29722,#f6b709)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                Pending
                              </div>
                              <Icon icon="solar:arrow-right-up-linear" className="w-4" />
                            </div>
                          </div>

                          <div className="flex flex-col items-start gap-1">
                            <b className="relative">Rent Fee</b>
                            <b className="relative text-black">{formatRentFee(latestBilling)}</b>
                          </div>

                          <div className="flex flex-col items-start gap-1">
                            <b className="relative">Contract Duration</b>
                            <b className="relative text-black">
                              {getContractDuration(currentRental)}
                            </b>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="self-stretch flex flex-col items-start gap-3 text-darkslategray-100">
                      <div className="self-stretch flex flex-col items-center justify-center gap-12 text-white">
                        <div className="w-[520px] h-12 relative text-white">
                          <div className="absolute h-full w-full rounded-[99.72px] bg-white flex items-center justify-center p-1 box-border gap-1">
                            <div className="flex-1 h-full rounded-[99.72px] bg-darkslategray-200 flex items-center justify-center font-semibold">
                              CURRENT DORM
                            </div>
                            <div className="flex-1 h-full flex items-center justify-center text-slategray font-semibold">
                              VERIFICATION STATUS
                            </div>
                          </div>
                        </div>

                        <div className="self-stretch h-8 flex items-center justify-center gap-6 text-[24px] text-darkslategray-100">
                          <b className="relative leading-8">Finalize Your Application</b>

                          <button
                            type="button"
                            className={`relative text-num-12 font-medium cursor-pointer border-b border-solid transition-all 
                              ${
                                uploadedCount === 0
                                  ? 'opacity-30 pointer-events-none border-slategray text-slategray'
                                  : 'text-transparent bg-clip-text! [background:linear-gradient(180deg,#c00f0f,#e44f4f)] border-[#c00f0f] hover:opacity-80'
                              }`}
                            onClick={uploadedCount > 0 ? onCancelClick : undefined}
                          >
                            Cancel
                          </button>
                        </div>
                      </div>

                      <div className="self-stretch flex items-center py-num-0 px-num-32 gap-6 text-[24px] cursor-pointer">
                        <div className="flex-1 flex items-center gap-6">
                          <div className="flex items-center gap-3">
                            <Icon
                              icon="material-symbols:info-outline"
                              className="h-6 w-6 relative"
                            />
                            <b className="relative leading-8">Required Documents</b>
                          </div>

                          <b className="relative text-num-14 text-dimgray">
                            {uploadedCount} out of 3 Documents Uploaded
                          </b>
                        </div>

                        <div className="w-24">
                          {!allUploaded ? (
                            <div className="h-8 w-full rounded-2xl bg-aliceblue flex items-center justify-center py-0 px-3 box-border text-center text-sm text-slategray font-inter">
                              <b className="relative">Submit</b>
                            </div>
                          ) : (
                            <button
                              type="button"
                              className="h-8 w-full relative rounded-2xl bg-lightcyan flex items-center justify-center py-0 px-3 box-border text-center text-sm text-teal font-inter cursor-pointer"
                              onClick={onSubmitTextClick}
                              disabled={isSubmitting}
                            >
                              <b className="relative cursor-pointer">
                                {isSubmitting ? 'Submitting' : 'Submit'}
                              </b>
                            </button>
                          )}
                        </div>
                      </div>

                      {error && (
                        <div className="self-stretch px-num-32 text-left text-sm font-bold text-red-500">
                          {error}
                        </div>
                      )}

                      <div className="self-stretch flex flex-col items-center justify-center py-num-0 px-num-32 text-left">
                        {!isIdUploaded ? (
                          <div className="w-[916px] rounded-num-16 bg-white border-whitesmoke border-solid border box-border overflow-hidden flex flex-col items-start justify-center py-num-10 px-num-32 gap-2.5">
                            <div className="self-stretch flex items-center justify-between pr-6">
                              <div className="flex-1 flex items-center gap-4">
                                <b className="relative">Official University ID</b>
                                <div className="h-8 w-24 rounded-num-16 bg-white flex items-center justify-center text-center">
                                  <b className="relative text-transparent bg-clip-text! [background:linear-gradient(180deg,#c00f0f,#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                    Required
                                  </b>
                                </div>
                              </div>
                              <div className="w-[72px] flex items-center gap-6">
                                <Icon icon="iconamoon:eye" className="h-6 w-6 relative" />
                                <Icon
                                  icon="qlementine-icons:menu-dots-16"
                                  className="h-6 w-6 relative"
                                />
                              </div>
                            </div>

                            <label className="w-[852px] h-[88px] rounded-num-16 border-dimgray border-dashed border box-border overflow-hidden shrink-0 flex items-center py-num-12 px-4 text-black cursor-pointer">
                              <input
                                type="file"
                                accept="image/png,image/jpeg"
                                className="hidden"
                                disabled={uploadingDoc === documentRequirements.id}
                                onChange={(event) => {
                                  const file = event.target.files?.[0];
                                  if (file) {
                                    void uploadDocument(documentRequirements.id, file, () =>
                                      setIsIdUploaded(true),
                                    );
                                  }
                                }}
                              />
                              <div className="h-16 flex items-center gap-6">
                                <Icon icon="icons8:upload-2" className="h-16 w-16 relative" />
                                <div className="flex flex-col items-start justify-center gap-2">
                                  <b className="relative">
                                    {uploadingDoc === documentRequirements.id
                                      ? 'Uploading...'
                                      : 'Upload the document'}
                                  </b>
                                  <div className="relative text-num-12 tracking-[0.02em] font-semibold font-lora text-slategray">
                                    .jpg or .png less than 500KB
                                  </div>
                                </div>
                              </div>
                            </label>
                          </div>
                        ) : (
                          <div className="w-[916px] rounded-2xl bg-white border-whitesmoke border-solid border box-border overflow-hidden flex flex-col items-start justify-center py-2.5 px-8 gap-2.5 font-inter text-sm text-darkslategray">
                            <div className="self-stretch flex items-center justify-between pr-6">
                              <div className="flex-1 flex items-center gap-4">
                                <b className="relative">Official University ID</b>
                                <div className="h-8 w-24 rounded-2xl bg-aliceblue flex items-center justify-center text-slategray">
                                  <b className="relative">Uploaded</b>
                                </div>
                              </div>
                              <div className="flex items-center gap-6">
                                <Icon icon="iconamoon:eye" className="h-6 w-6 relative" />
                                <Icon
                                  icon="qlementine-icons:menu-dots-16"
                                  className="h-6 w-6 relative"
                                />
                              </div>
                            </div>

                            <div className="w-[852px] h-[88px] flex items-center py-3 gap-2.5 text-black">
                              <Icon icon="bi:file-earmark-image" className="w-16 h-16 relative" />
                              <div className="flex flex-col items-start justify-center gap-2">
                                <b className="relative">
                                  {fileNames[documentRequirements.id] ?? 'id.png'}
                                </b>
                                <div className="relative text-xs tracking-[0.02em] font-semibold font-lora text-slategray">
                                  Submitted: 02 April 2026
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="self-stretch flex flex-col items-center justify-center py-num-0 px-num-32 mt-4 text-left">
                        {!isConsentUploaded ? (
                          <div className="w-[916px] rounded-num-16 bg-white border-whitesmoke border-solid border box-border overflow-hidden flex flex-col items-start justify-center py-num-10 px-num-32 gap-2.5">
                            <div className="self-stretch flex items-center justify-between pr-6">
                              <div className="flex-1 flex items-center gap-6">
                                <b className="relative">Parental Consent Form</b>
                                <div className="h-8 w-24 rounded-num-16 bg-white flex items-center justify-center text-center">
                                  <b className="relative text-transparent bg-clip-text! [background:linear-gradient(180deg,#c00f0f,#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                    Required
                                  </b>
                                </div>
                                <div className="flex items-center gap-1 text-num-12 text-teal">
                                  <b>Download Form</b>
                                  <Icon icon="material-symbols:download-rounded" />
                                </div>
                              </div>
                              <div className="flex items-center gap-6">
                                <Icon icon="iconamoon:eye" className="h-6 w-6 relative" />
                                <Icon
                                  icon="qlementine-icons:menu-dots-16"
                                  className="h-6 w-6 relative"
                                />
                              </div>
                            </div>

                            <label className="w-[852px] h-[88px] rounded-num-16 border-dimgray border-dashed border box-border flex items-center py-num-12 px-4 text-black cursor-pointer">
                              <input
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                disabled={uploadingDoc === documentRequirements.consent}
                                onChange={(event) => {
                                  const file = event.target.files?.[0];
                                  if (file) {
                                    void uploadDocument(documentRequirements.consent, file, () =>
                                      setIsConsentUploaded(true),
                                    );
                                  }
                                }}
                              />
                              <div className="h-16 flex items-center gap-6">
                                <Icon icon="icons8:upload-2" className="h-16 w-16 relative" />
                                <div className="flex flex-col items-start justify-center gap-2">
                                  <b className="relative">
                                    {uploadingDoc === documentRequirements.consent
                                      ? 'Uploading...'
                                      : 'Upload the document'}
                                  </b>
                                  <div className="relative text-num-12 tracking-[0.02em] font-semibold font-lora text-slategray">
                                    .pdf less than 500KB
                                  </div>
                                </div>
                              </div>
                            </label>
                          </div>
                        ) : (
                          <div className="w-[916px] rounded-2xl bg-white border-whitesmoke border-solid border box-border overflow-hidden flex flex-col items-start justify-center py-2.5 px-8 gap-2.5 font-inter text-sm text-darkslategray">
                            <div className="self-stretch flex items-center justify-between pr-6">
                              <div className="flex-1 flex items-center gap-6">
                                <b className="relative">Parental Consent Form</b>
                                <div className="h-8 w-24 rounded-2xl bg-aliceblue flex items-center justify-center text-slategray">
                                  <b className="relative">Uploaded</b>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-teal">
                                  <b>Download Consent Form</b>
                                  <Icon
                                    icon="material-symbols:download-rounded"
                                    className="h-5 w-5"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center gap-6">
                                <Icon icon="iconamoon:eye" className="h-6 w-6 relative" />
                                <Icon
                                  icon="qlementine-icons:menu-dots-16"
                                  className="h-6 w-6 relative"
                                />
                              </div>
                            </div>

                            <div className="w-[852px] h-[88px] flex items-center py-3 gap-2.5 text-black">
                              <Icon icon="bi:file-earmark-pdf" className="w-16 h-16 relative" />
                              <div className="flex flex-col items-start justify-center gap-2">
                                <b className="relative">
                                  {fileNames[documentRequirements.consent] ?? 'consent_form.pdf'}
                                </b>
                                <div className="relative text-xs tracking-[0.02em] font-semibold font-lora text-slategray">
                                  Submitted: 02 April 2026
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="self-stretch flex flex-col items-center justify-center py-num-0 px-num-32 mt-4 text-left">
                        {!isContractUploaded ? (
                          <div className="w-[916px] rounded-num-16 bg-white border-whitesmoke border-solid border box-border overflow-hidden flex flex-col items-start justify-center py-num-10 px-num-32 gap-2.5">
                            <div className="self-stretch flex items-center justify-between pr-6 gap-5">
                              <div className="w-[492px] flex items-center gap-6">
                                <b className="relative">Tenancy Contract</b>
                                <div className="h-8 w-24 rounded-num-16 bg-white flex items-center justify-center text-center">
                                  <b className="relative text-transparent bg-clip-text! [background:linear-gradient(180deg,#c00f0f,#e44f4f)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                    Required
                                  </b>
                                </div>
                                <div className="flex items-center gap-1 text-num-12 text-teal">
                                  <b>Download Contract</b>
                                  <Icon icon="material-symbols:download-rounded" />
                                </div>
                              </div>
                              <div className="flex items-center gap-6">
                                <Icon icon="iconamoon:eye" className="h-6 w-6 relative" />
                                <Icon
                                  icon="qlementine-icons:menu-dots-16"
                                  className="h-6 w-6 relative"
                                />
                              </div>
                            </div>

                            <label className="w-[852px] h-[88px] rounded-num-16 border-dimgray border-dashed border flex items-center py-num-12 px-4 text-black cursor-pointer">
                              <input
                                type="file"
                                accept="application/pdf"
                                className="hidden"
                                disabled={uploadingDoc === documentRequirements.contract}
                                onChange={(event) => {
                                  const file = event.target.files?.[0];
                                  if (file) {
                                    void uploadDocument(documentRequirements.contract, file, () =>
                                      setIsContractUploaded(true),
                                    );
                                  }
                                }}
                              />
                              <div className="h-16 flex items-center gap-6">
                                <Icon icon="icons8:upload-2" className="h-16 w-16 relative" />
                                <div className="flex flex-col items-start justify-center gap-2">
                                  <b className="relative">
                                    {uploadingDoc === documentRequirements.contract
                                      ? 'Uploading...'
                                      : 'Upload the document'}
                                  </b>
                                  <div className="relative text-num-12 tracking-[0.02em] font-semibold font-lora text-slategray">
                                    .pdf less than 500KB
                                  </div>
                                </div>
                              </div>
                            </label>
                          </div>
                        ) : (
                          <div className="w-[916px] rounded-2xl bg-white border-whitesmoke border-solid border box-border overflow-hidden flex flex-col items-start justify-center py-2.5 px-8 gap-2.5 font-inter text-sm text-darkslategray">
                            <div className="self-stretch flex items-center justify-between pr-6 gap-5">
                              <div className="w-[492px] flex items-center gap-6">
                                <b className="relative">Tenancy Contract</b>
                                <div className="h-8 w-24 rounded-2xl bg-aliceblue flex items-center justify-center text-slategray">
                                  <b className="relative">Uploaded</b>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-teal">
                                  <b>Download Tenancy Contract</b>
                                  <Icon
                                    icon="material-symbols:download-rounded"
                                    className="h-5 w-5"
                                  />
                                </div>
                              </div>
                              <div className="flex items-center gap-6">
                                <Icon icon="iconamoon:eye" className="h-6 w-6 relative" />
                                <Icon
                                  icon="qlementine-icons:menu-dots-16"
                                  className="h-6 w-6 relative"
                                />
                              </div>
                            </div>

                            <div className="w-[852px] h-[88px] flex items-center py-3 gap-2.5 text-black">
                              <Icon icon="bi:file-earmark-pdf" className="w-16 h-16 relative" />
                              <div className="flex flex-col items-start justify-center gap-2">
                                <b className="relative">
                                  {fileNames[documentRequirements.contract] ??
                                    'tenancy_contract.pdf'}
                                </b>
                                <div className="relative text-xs tracking-[0.02em] font-semibold font-lora text-slategray">
                                  Submitted: 02 April 2026
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="self-stretch h-20 bg-white overflow-hidden shrink-0 flex flex-col items-center justify-center">
                <Footer />
              </div>
            </div>
          </div>
        </div>

        {isSubmitPopupVisible && (
          <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 backdrop-blur-sm">
            <FinalizeApplication
              onContinue={() => {
                setIsSubmitPopupVisible(false);
                navigate('/applications');
              }}
            />
          </div>
        )}
      </div>

      {cancelStage && (
        <div className="fixed inset-0 z-999 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          {cancelStage === 'confirming' && (
            <CancelApplication1 onConfirm={handleConfirmCancellation} onBack={handleGoBack} />
          )}

          {cancelStage === 'success' && <CancelApplication2 onClose={handleFinalClose} />}
        </div>
      )}
    </div>
  );
};

export default FinalizedApplicationPage1a;
