import {
  useCallback,
  useMemo,
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmReport from '../../../components/user/Profile/ConfirmReport';
import FileUploadCard from '../../general/FileUploadCard';
import { ReportService } from '../../../service/ReportService';

interface FinalizeContentProps {
  reportStages: number;
  setReportStages: Dispatch<SetStateAction<number>>;
  reportJsonData: string;
  listingId?: string;
}

type ReportField = {
  label: string;
  id: number;
  is_checked: boolean;
  category: string;
};

type ReportPayload = {
  'text-report'?: string;
  'report-fields-data'?: ReportField[];
};

const getErrorMessage = (error: unknown) => {
  if (error && typeof error === 'object' && 'response' in error) {
    const response = (error as { response?: { data?: { message?: unknown; error?: unknown } } })
      .response;
    const message = response?.data?.message ?? response?.data?.error;
    if (typeof message === 'string') return message;
  }
  return 'Could not submit your report. Please try again.';
};

export default function FinalizeContent(props: FinalizeContentProps) {
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [evidenceFiles, setEvidenceFiles] = useState<(File | null)[]>([null, null]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const closePopup = () => {
    setShowSuccessPopup(false);
    navigate('/profile-switcher');
  };

  const { reportStages, setReportStages, reportJsonData, listingId } = props;
  const reportPreview = useMemo<ReportPayload>(() => {
    try {
      return JSON.parse(reportJsonData) as ReportPayload;
    } catch {
      return {};
    }
  }, [reportJsonData]);
  const selectedReportFields =
    reportPreview['report-fields-data']?.filter((field) => field.is_checked) ?? [];
  const groupedSelectedFields = selectedReportFields.reduce<Record<string, ReportField[]>>(
    (groups, field) => {
      groups[field.category] = [...(groups[field.category] ?? []), field];
      return groups;
    },
    {},
  );
  const additionalMessage = reportPreview['text-report']?.trim();
  const flags = selectedReportFields.map((field) => field.label);
  const reportFlags = flags.length > 0 ? flags : ['Other'];
  const reportDescription =
    additionalMessage || `Issue reported: ${reportFlags.join(', ')}`.slice(0, 200);

  const handleEvidenceChange = (index: number) => (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setEvidenceFiles((current) =>
      current.map((item, itemIndex) => (itemIndex === index ? file : item)),
    );
  };

  const onUserProfileTextClick = useCallback(async () => {
    if (!listingId) {
      setSubmitError('Current dorm listing could not be found.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      await ReportService.reportListing(listingId, {
        description: reportDescription,
        flags: reportFlags,
        evidence: evidenceFiles
          .filter((file): file is File => Boolean(file))
          .map((file) => file.name),
      });
      setShowSuccessPopup(true);
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    } finally {
      setIsSubmitting(false);
    }
  }, [evidenceFiles, listingId, reportDescription, reportFlags]);

  return (
    <div className="flex flex-col max-w-[714px] md:w-[714px] text-black font-inter py-12 gap-5">
      {showSuccessPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <ConfirmReport onClose={closePopup} />
        </div>
      )}

      <section className="flex flex-col gap-4 rounded-[14px] border border-gainsboro bg-white p-5 shadow-sm">
        <div>
          <h2 className="text-[20px] font-bold leading-none text-[#024338]">Report Preview</h2>
          <p className="mt-1 text-[13px] font-medium text-[#62728b]">
            Review the details before submitting your report.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-[15px] font-bold text-black">Selected Tags</p>
          {selectedReportFields.length > 0 ? (
            <div className="flex flex-col gap-3">
              {Object.entries(groupedSelectedFields).map(([category, fields]) => (
                <div key={category} className="flex flex-col gap-2">
                  <p className="text-[13px] font-bold text-[#00695c]">{category}</p>
                  <div className="flex flex-wrap gap-2">
                    {fields.map((field) => (
                      <span
                        key={field.id}
                        className="rounded-full border border-[#00a897] bg-[#eafffb] px-4 py-1.5 text-[13px] font-bold text-[#00695c]"
                      >
                        {field.label}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[13px] font-medium text-[#62728b]">No report tags selected.</p>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[15px] font-bold text-black">Additional Message</p>
          <div className="min-h-[86px] rounded-[12px] bg-[#eef3f8] px-4 py-3 text-[14px] font-medium leading-6 text-[#2f3b4f]">
            {additionalMessage || 'No additional message provided.'}
          </div>
        </div>
      </section>

      <div className="mt-2">
        <p className="mb-3 text-[18px] font-bold text-[#024338]">Photos</p>
      </div>
      <FileUploadCard
        title="Review Photo 1"
        fileName={evidenceFiles[0]?.name}
        onFileChange={handleEvidenceChange(0)}
      />
      <FileUploadCard
        title="Review Photo 2"
        fileName={evidenceFiles[1]?.name}
        onFileChange={handleEvidenceChange(1)}
      />

      {submitError && (
        <div className="rounded-[12px] border border-red-100 bg-red-50 px-4 py-3 text-[13px] font-bold text-red-700">
          {submitError}
        </div>
      )}

      <div className="flex justify-center gap-10 font-inter font-bold py-8">
        <button
          type="button"
          className="px-4 py-1 w-fit font-bold text-[14px] cursor-pointer text-crimson rounded-full"
          onClick={() => {
            setReportStages(reportStages - 1);
          }}
        >
          Go Back
        </button>
        <button
          type="button"
          className="px-4 py-1 w-fit font-bold text-[14px] cursor-pointer text-[#096c5b] bg-[#f1f5f9] rounded-full"
          onClick={onUserProfileTextClick}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Proceed'}
        </button>
      </div>
    </div>
  );
}
