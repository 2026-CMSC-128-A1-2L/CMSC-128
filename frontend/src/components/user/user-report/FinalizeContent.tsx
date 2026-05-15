import { useCallback, useMemo, useState, type Dispatch, type SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import ConfirmReport from '../../../components/user/Profile/ConfirmReport';
import FileUploadCard from '../../general/FileUploadCard';

interface FinalizeContentProps {
  reportStages: number;
  setReportStages: Dispatch<SetStateAction<number>>;
  reportJsonData: string;
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

export default function FinalizeContent(props: FinalizeContentProps) {
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const onUserProfileTextClick = useCallback(() => {
    setShowSuccessPopup(true);
  }, []);

  const closePopup = () => {
    setShowSuccessPopup(false);
    navigate('/profile-switcher');
  };

  const { reportStages, setReportStages, reportJsonData } = props;
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
      <FileUploadCard title="Review Photo 1" />
      <FileUploadCard title="Review Photo 2" />

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
        >
          Proceed
        </button>
      </div>
    </div>
  );
}
