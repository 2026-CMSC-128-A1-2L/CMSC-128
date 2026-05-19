import { useEffect, useMemo, useState } from 'react';
import CurrentDormInfoCard from '../../../../components/CurrentDormInfoCard';
import StepIndicator from '../../../../components/StepIndicator';
import DormitoryImg from '../../../../../assets/image.png';
import SideBar from '../../../../components/user/SideBar';
import BreadcrumbHeader from '../../../../components/general/Breadcrumb';
import ReasonContent from '../../../../components/user/lease-transfer/ReasonContent';
import DocumentsContent from '../../../../components/user/lease-transfer/DocumentsContent';
import FinalizeContent from '../../../../components/user/lease-transfer/FinalizeContent';
import { FileService } from '../../../../service/FileService';
import { TransferService } from '../../../../service/TransferService';
import { UserService } from '../../../../service/UserService';

type RentalSummary = {
  status?: string;
  facilityId?:
    | string
    | {
        name?: string;
        location?: { text?: string };
        media?: { value?: string }[];
        allowTransfer?: boolean;
      };
  unitId?:
    | string
    | {
        _id?: string;
        id?: string;
        roomNumber?: string;
        price?: number;
      };
  expectedMoveInDate?: string;
  expectedMoveOutDate?: string;
  actualMoveInDate?: string;
  actualMoveOutDate?: string;
};

const StepIndicatorStages = ['Reason', 'Documents', 'Finalize'];

const getDataArray = <T,>(response: unknown): T[] => {
  if (Array.isArray(response)) return response as T[];
  if (response && typeof response === 'object' && 'data' in response) {
    const data = (response as { data?: unknown }).data;
    return Array.isArray(data) ? (data as T[]) : [];
  }
  return [];
};

const getEntityId = (value: unknown) => {
  if (typeof value === 'string') return value;
  if (!value || typeof value !== 'object') return undefined;
  const id = (value as { id?: unknown; _id?: unknown }).id ?? (value as { _id?: unknown })._id;
  return typeof id === 'string' ? id : id ? String(id) : undefined;
};

const formatDate = (date?: string | Date | null) => {
  if (!date) return undefined;
  const parsedDate = new Date(date);
  if (Number.isNaN(parsedDate.getTime())) return undefined;
  return parsedDate.toISOString().slice(0, 10);
};

const mapReasonCategory = (value: string) => {
  const normalized = value.toLowerCase();
  if (normalized.includes('academic') || normalized.includes('graduating')) return 'academic';
  if (normalized.includes('financial')) return 'financial';
  if (normalized.includes('medical')) return 'medical';
  if (normalized.includes('relocation') || normalized.includes('changing')) return 'relocation';
  if (normalized.includes('personal')) return 'personal';
  return 'other';
};

const mapDepositHandling = (value: string) => {
  const normalized = value.toLowerCase();
  if (normalized.includes('refund')) return 'refunded';
  if (normalized.includes('forfeit')) return 'forfeited';
  return 'transferred';
};

const mapAdvanceRentStatus = (value: string) => {
  const normalized = value.toLowerCase();
  if (normalized.includes('forfeit') || normalized.includes('not paid')) return 'forfeited';
  if (normalized.includes('transfer')) return 'transferred';
  return 'credited';
};

const getErrorMessage = (error: unknown) => {
  if (error && typeof error === 'object' && 'response' in error) {
    const data = (error as { response?: { data?: { message?: string } } }).response?.data;
    if (data?.message) return data.message;
  }
  return 'Unable to submit your pasalo request. Please try again.';
};

export default function LeaseTransfer() {
  const [leaseTransferStages, setLeaseTransferStages] = useState(1);
  const [currentRental, setCurrentRental] = useState<RentalSummary | null>(null);
  const [isLoadingRental, setIsLoadingRental] = useState(true);
  const [submitError, setSubmitError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [reasonForm, setReasonForm] = useState({
    category: '',
    intendedDate: '',
    explanation: '',
  });

  const [detailsForm, setDetailsForm] = useState({
    transferFee: '',
    depositHandling: '',
    advanceRentStatus: '',
  });

  const [uploadedFiles, setUploadedFiles] = useState<{
    leaseAgreement: File | null;
    requestLetter: File | null;
  }>({
    leaseAgreement: null,
    requestLetter: null,
  });

  useEffect(() => {
    let cancelled = false;

    const loadCurrentRental = async () => {
      setIsLoadingRental(true);
      try {
        const response = await UserService.getMyRentals();
        if (cancelled) return;
        const rentals = getDataArray<RentalSummary>(response);
        setCurrentRental(
          rentals.find((rental) => rental.status === 'active') ??
            rentals.find((rental) => rental.status === 'inactive') ??
            null,
        );
      } catch {
        if (!cancelled) setCurrentRental(null);
      } finally {
        if (!cancelled) setIsLoadingRental(false);
      }
    };

    void loadCurrentRental();
    return () => {
      cancelled = true;
    };
  }, []);

  const dormInfo = useMemo(() => {
    const facility = typeof currentRental?.facilityId === 'object' ? currentRental.facilityId : null;
    const unit = typeof currentRental?.unitId === 'object' ? currentRental.unitId : null;
    const moveIn = formatDate(currentRental?.actualMoveInDate ?? currentRental?.expectedMoveInDate);
    const moveOut = formatDate(
      currentRental?.actualMoveOutDate ?? currentRental?.expectedMoveOutDate,
    );

    return {
      name: facility?.name ?? 'Current Dorm',
      address: facility?.location?.text ?? 'Address unavailable',
      image: facility?.media?.[0]?.value ?? DormitoryImg,
      roomNumber: unit?.roomNumber ?? 'Assigned Unit',
      allowTransfer: Boolean(facility?.allowTransfer),
      tags: [
        unit?.price ? `PHP ${unit.price.toLocaleString()} / month` : 'Current lease',
        moveIn && moveOut ? `Contract: ${moveIn} - ${moveOut}` : 'Contract active',
      ],
      unitId: getEntityId(currentRental?.unitId),
    };
  }, [currentRental]);

  const handleSubmit = async () => {
    if (!dormInfo.unitId) {
      setSubmitError('No current unit was found for your pasalo request.');
      return false;
    }
    if (!dormInfo.allowTransfer) {
      setSubmitError('Pasalo is not available for this property.');
      return false;
    }

    setIsSubmitting(true);
    setSubmitError('');

    try {
      const documents = [];
      if (uploadedFiles.leaseAgreement) {
        const leaseFile = await FileService.uploadFile(uploadedFiles.leaseAgreement);
        documents.push({
          docId: 'lease-agreement',
          name: 'Current Lease Agreement',
          fileIds: [leaseFile.key],
        });
      }
      if (uploadedFiles.requestLetter) {
        const requestLetter = await FileService.uploadFile(uploadedFiles.requestLetter);
        documents.push({
          docId: 'transfer-request-letter',
          name: 'Transfer Request Letter',
          fileIds: [requestLetter.key],
        });
      }

      await TransferService.createTransferRequest({
        unitId: dormInfo.unitId,
        reasonCategory: mapReasonCategory(reasonForm.category),
        intendedTransferDate: reasonForm.intendedDate
          ? new Date(reasonForm.intendedDate)
          : undefined,
        description: reasonForm.explanation,
        transferFee: Number(detailsForm.transferFee),
        depositHandling: mapDepositHandling(detailsForm.depositHandling),
        advanceRentStatus: mapAdvanceRentStatus(detailsForm.advanceRentStatus),
        documents,
        termsAccepted: true,
      });

      return true;
    } catch (error) {
      setSubmitError(getErrorMessage(error));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex">
      <div className="sticky top-0 left-0 h-screen w-[200px] hidden md:block shrink-0 z-10">
        <SideBar />
      </div>
      <div className="flex flex-col max-w-[1128px] md:ml-10 py-10">
        <BreadcrumbHeader
          routes={[
            { name: 'Home', url: '/home' },
            { name: 'User Profile', url: '/profile-switcher' },
            { name: 'Current Dorm', url: '/profile-switcher' },
            { name: 'Pasalo Unit' },
          ]}
        />
        <div className="flex flex-col items-center max-w-[1128px] bg-white border border-whitesmoke-200 rounded-2xl overflow-hidden shadow-sm">
          {isLoadingRental ? (
            <div className="w-full py-20 text-center font-bold text-[#096c5b]">
              Loading current dorm...
            </div>
          ) : currentRental ? (
            <>
              <CurrentDormInfoCard
                LandlordName="Landlord"
                ManagerName="Manager"
                DormitoryName={dormInfo.name}
                DormitoryAddress={dormInfo.address}
                RoomNumber={dormInfo.roomNumber}
                DormitoryImage={dormInfo.image}
                DormitoryTags={dormInfo.tags}
              />
              <StepIndicator currentStep={leaseTransferStages} steps={StepIndicatorStages} />

              {!dormInfo.allowTransfer && (
                <div className="mx-25 mt-8 rounded-xl border border-[#f0f0f0] bg-[#f8fafc] px-8 py-5 text-center text-sm font-bold text-gray-500">
                  Pasalo is not available for this property.
                </div>
              )}

              {dormInfo.allowTransfer && (
                <div className="w-full px-25 my-15">
                  {leaseTransferStages === 1 && (
                    <ReasonContent
                      leaseTransferStages={leaseTransferStages}
                      setLeaseTransferStages={setLeaseTransferStages}
                      reasonForm={reasonForm}
                      setReasonForm={setReasonForm}
                    />
                  )}

                  {leaseTransferStages === 2 && (
                    <DocumentsContent
                      leaseTransferStages={leaseTransferStages}
                      setLeaseTransferStages={setLeaseTransferStages}
                      detailsForm={detailsForm}
                      setDetailsForm={setDetailsForm}
                      uploadedFiles={uploadedFiles}
                      setUploadedFiles={setUploadedFiles}
                    />
                  )}

                  {leaseTransferStages === 3 && (
                    <FinalizeContent
                      leaseTransferStages={leaseTransferStages}
                      setLeaseTransferStages={setLeaseTransferStages}
                      DormitoryName={dormInfo.name}
                      RoomNumber={dormInfo.roomNumber}
                      formData={reasonForm}
                      financialsDocsData={detailsForm}
                      isSubmitting={isSubmitting}
                      submitError={submitError}
                      onSubmit={handleSubmit}
                    />
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="w-full py-20 text-center font-bold text-gray-500">
              No current dorm rental was found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
