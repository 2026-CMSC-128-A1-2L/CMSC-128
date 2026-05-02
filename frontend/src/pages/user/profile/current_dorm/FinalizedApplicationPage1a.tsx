import { type FunctionComponent, useCallback, useState } from 'react';
import { Icon } from '@iconify/react';
import Verified from '../../../../../assets/verified_badge.svg';
import Photo from '../../../../../assets/photo.svg';
import Sidebar from '../../../../components/user/SideBar';
import Footer from '../../../../components/general/Footer';
import CancelApplication1 from '../../../../components/user/Profile/CancelApplication1';
import CancelApplication2 from '../../../../components/user/Profile/CancelApplication2';
import FinalizeApplication from '../../../../components/user/Profile/FinalizeApplication';

const FinalizedApplicationPage1a: FunctionComponent = () => {
  // States for each requirement
  const [isIdUploaded, setIsIdUploaded] = useState(false);
  const [isConsentUploaded, setIsConsentUploaded] = useState(false);
  const [isContractUploaded, setIsContractUploaded] = useState(false);
  const [isSubmitPopupVisible, setIsSubmitPopupVisible] = useState(false);
  const [cancelStage, setCancelStage] = useState<null | 'confirming' | 'success'>(null);

  // Calculate total uploaded count
  const uploadedCount = [isIdUploaded, isConsentUploaded, isContractUploaded].filter(
    Boolean,
  ).length;
  const allUploaded = uploadedCount === 3;

  const onSubmitTextClick = useCallback(() => {
    if (allUploaded) {
      setIsSubmitPopupVisible(true);
    }
  }, [allUploaded]);

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
                  {/* Breadcrumbs */}
                  <div className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-num-10 box-border gap-2.5">
                    <div className="h-6 flex items-center gap-1.5">
                      <div className="relative font-semibold">User Profile</div>
                      <Icon icon="iconamoon:arrow-right-2" className="h-6 w-6 relative" />
                      <div className="relative font-semibold" data-scroll-to="currentDormText">
                        Current Dorm
                      </div>
                    </div>
                  </div>

                  {/* Profile Section (All Info Restored) */}
                  <div className="self-stretch h-[1236px] rounded-num-16 bg-white/45 flex flex-col items-start gap-3 shrink-0 text-center text-dimgray font-inter">
                    <div className="self-stretch h-[382px] rounded-num-16 flex flex-col items-start gap-3">
                      <div className="self-stretch rounded-num-16 overflow-hidden flex flex-col items-start p-num-32">
                        <div className="self-stretch flex flex-col items-start gap-2.5">
                          <b className="relative">Student Profile</b>
                          <div className="flex items-center justify-center gap-2.5 text-[24px] text-darkslategray-200">
                            <b className="relative leading-8">Daphne Dayne</b>
                            <img className="h-6 w-6 relative" alt="" src={Verified} />
                          </div>
                          <b className="relative text-teal">dcanape@up.edu.ph</b>
                        </div>
                      </div>
                      <div className="self-stretch overflow-hidden flex items-start justify-between py-1 px-num-32 gap-5">
                        <img
                          className="w-[200px] relative max-h-full object-cover"
                          alt=""
                          src={Photo}
                        />

                        <div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
                          <div className="flex flex-col items-start gap-1">
                            <b className="relative">Name</b>
                            <b className="relative text-black uppercase">Canape, Daphne</b>
                          </div>
                          <div className="flex flex-col items-start gap-1">
                            <div className="flex items-start gap-2">
                              <b className="relative">Contact number</b>
                              <Icon icon="iconamoon:edit" className="w-5 relative" />
                            </div>
                            <b className="relative text-black">- - - - -</b>
                          </div>
                          <div className="flex flex-col items-start gap-1">
                            <div className="flex items-start gap-2">
                              <b className="relative">Home Address</b>
                              <Icon icon="iconamoon:edit" className="w-5 relative" />
                            </div>
                            <b className="relative text-black">- - - - -</b>
                          </div>
                        </div>

                        <div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
                          <div className="flex flex-col items-start gap-1">
                            <b className="relative">User Role</b>
                            <b className="relative text-black">Tenant</b>
                          </div>
                          <div className="flex flex-col items-start gap-1">
                            <b className="relative">Student Number</b>
                            <b className="relative text-black">2023*****</b>
                          </div>
                          <div className="flex flex-col items-start gap-1">
                            <b className="relative">Verification Status</b>
                            <b className="relative text-teal">Verified</b>
                          </div>
                        </div>

                        <div className="overflow-hidden flex flex-col items-start p-num-10 gap-4">
                          <div className="flex flex-col items-start gap-1">
                            <b className="relative">Current Dorm</b>
                            <b className="relative text-black">One Sapphire Place</b>
                            <div className="flex items-center gap-1 text-num-12">
                              <div className="relative font-medium text-transparent bg-clip-text! [background:linear-gradient(180deg,#c29722,#f6b709)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                                Pending
                              </div>
                              <Icon icon="solar:arrow-right-up-linear" className="w-4" />
                            </div>
                          </div>
                          <div className="flex flex-col items-start gap-1">
                            <b className="relative">Rent Fee</b>
                            <b className="relative text-black">- - - - -</b>
                          </div>
                          <div className="flex flex-col items-start gap-1">
                            <b className="relative">Contract Duration</b>
                            <b className="relative text-black">- - - - -</b>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="self-stretch flex flex-col items-start gap-3 text-darkslategray-100">
                      {/* Sub-Header Section */}
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
                          <div
                            className={`relative text-num-12 font-medium cursor-pointer border-b border-solid transition-all 
                              ${
                                uploadedCount === 0
                                  ? 'opacity-30 pointer-events-none border-slategray text-slategray'
                                  : 'text-transparent bg-clip-text! [background:linear-gradient(180deg,#c00f0f,#e44f4f)] border-[#c00f0f] hover:opacity-80'
                              }`}
                            onClick={uploadedCount > 0 ? onCancelClick : undefined}
                          >
                            Cancel
                          </div>
                        </div>
                      </div>

                      {/* Required Documents Header & Conditional Submit Button */}
                      <div className="self-stretch flex items-center py-num-0 px-num-32 gap-6 text-[24px]">
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

                        {/* Submit Button Logic */}
                        <div className="w-24">
                          {!allUploaded ? (
                            <div className="h-8 w-full rounded-2xl bg-aliceblue flex items-center justify-center py-0 px-3 box-border text-center text-sm text-slategray font-inter">
                              <b className="relative">Submit</b>
                            </div>
                          ) : (
                            //pag naka on na sya
                            <div className="h-8 w-full relative rounded-2xl bg-lightcyan flex items-center justify-center py-0 px-3 box-border text-center text-sm text-teal font-inter">
                              <b className="relative cursor-pointer" onClick={onSubmitTextClick}>
                                Submit
                              </b>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Document 1: Official University ID */}
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
                            <div
                              className="w-[852px] h-[88px] rounded-num-16 border-dimgray border-dashed border box-border overflow-hidden shrink-0 flex items-center py-num-12 px-4 text-black cursor-pointer"
                              onClick={() => setIsIdUploaded(true)}
                            >
                              <div className="h-16 flex items-center gap-6">
                                <Icon icon="icons8:upload-2" className="h-16 w-16 relative" />
                                <div className="flex flex-col items-start justify-center gap-2">
                                  <b className="relative">Upload the document</b>
                                  <div className="relative text-num-12 tracking-[0.02em] font-semibold font-lora text-slategray">
                                    .jpg or .png less than 500KB
                                  </div>
                                </div>
                              </div>
                            </div>
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
                                <b className="relative">id.png</b>
                                <div className="relative text-xs tracking-[0.02em] font-semibold font-lora text-slategray">
                                  Submitted: 02 April 2026
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Document 2: Parental Consent Form */}
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
                            <div
                              className="w-[852px] h-[88px] rounded-num-16 border-dimgray border-dashed border box-border flex items-center py-num-12 px-4 text-black cursor-pointer"
                              onClick={() => setIsConsentUploaded(true)}
                            >
                              <div className="h-16 flex items-center gap-6">
                                <Icon icon="icons8:upload-2" className="h-16 w-16 relative" />
                                <div className="flex flex-col items-start justify-center gap-2">
                                  <b className="relative">Upload the document</b>
                                  <div className="relative text-num-12 tracking-[0.02em] font-semibold font-lora text-slategray">
                                    .pdf less than 500KB
                                  </div>
                                </div>
                              </div>
                            </div>
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
                                <b className="relative">consent_form.pdf</b>
                                <div className="relative text-xs tracking-[0.02em] font-semibold font-lora text-slategray">
                                  Submitted: 02 April 2026
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Document 3: Tenancy Contract */}
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
                            <div
                              className="w-[852px] h-[88px] rounded-num-16 border-dimgray border-dashed border flex items-center py-num-12 px-4 text-black cursor-pointer"
                              onClick={() => setIsContractUploaded(true)}
                            >
                              <div className="h-16 flex items-center gap-6">
                                <Icon icon="icons8:upload-2" className="h-16 w-16 relative" />
                                <div className="flex flex-col items-start justify-center gap-2">
                                  <b className="relative">Upload the document</b>
                                  <div className="relative text-num-12 tracking-[0.02em] font-semibold font-lora text-slategray">
                                    .pdf less than 500KB
                                  </div>
                                </div>
                              </div>
                            </div>
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
                                <b className="relative">tenancy_contract.pdf</b>
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
            <FinalizeApplication onContinue={() => setIsSubmitPopupVisible(false)} />
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
