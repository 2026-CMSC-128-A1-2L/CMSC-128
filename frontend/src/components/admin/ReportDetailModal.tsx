import { Icon } from '@iconify/react';
import AdminPopupOverlay from './AdminPopupOverlay';

type ReportData = {
  _id: string;
  userId: any;
  description: string;
  flags: string[];
  evidence: string[];
  status: string;
  createdAt?: string;
  __t?: string;
  [key: string]: any;
};

type Props = {
  isOpen: boolean;
  report: ReportData | null;
  onClose: () => void;
  onResolve: (status: 'resolved' | 'dismissed') => void;
  getReporterName: (userId: any) => string;
  getReportType: (report: ReportData) => string;
};

const SS: Record<string, string> = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  dismissed: 'bg-red-50 text-red-600 border-red-200',
};
const SL: Record<string, string> = {
  pending: 'Pending',
  resolved: 'Resolved',
  dismissed: 'Dismissed',
};

const Badge = ({ status }: { status: string }) => (
  <span
    className={`inline-flex items-center rounded-full border px-3 py-1 font-['Inter',sans-serif] text-[12px] font-semibold ${SS[status] ?? SS.pending}`}
  >
    {SL[status] ?? status}
  </span>
);

const Card = ({ children }: { children: React.ReactNode }) => (
  <div className="mb-4 rounded-[16px] border border-[#e5e7eb] dark:border-[#303331] bg-white dark:bg-[#1f2022] p-5 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
    {children}
  </div>
);

const Label = ({ children }: { children: React.ReactNode }) => (
  <p className="mb-2 font-['Inter',sans-serif] text-[13px] font-bold uppercase tracking-wide text-[#666] dark:text-[#a4acba]">
    {children}
  </p>
);

export default function ReportDetailModal({
  isOpen,
  report,
  onClose,
  onResolve,
  getReporterName,
  getReportType,
}: Props) {
  if (!isOpen || !report) return null;
  return (
    <AdminPopupOverlay onClose={onClose}>
      <div className="flex w-[612px] max-h-[90vh] flex-col overflow-hidden rounded-tl-[32px] bg-white dark:bg-[#141515] dark:border dark:border-[#303331]">
        <div className="w-full shrink-0 rounded-tl-[32px] bg-gradient-to-b from-[#096c5b] to-[#16917c] px-[57px] py-3">
          <div className="w-full py-8 pb-2">
            <h2 className="font-['Poppins',sans-serif] text-[32px] font-bold text-white">
              Report Details
            </h2>
            <p className="font-['Inter',sans-serif] text-[18px] font-bold tracking-[-0.18px] text-[#f1f5f9]">
              {getReportType(report)} Report
            </p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-12 pt-8 pb-6 bg-white dark:bg-[#141515]">
          <div className="mb-6 flex items-center gap-3">
            <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666] dark:text-[#a4acba]">
              Status:
            </span>
            <Badge status={report.status} />
          </div>
          <Card>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-[12px] bg-[#edf7f5] dark:bg-[#12342e]">
                <Icon
                  icon="solar:user-bold"
                  className="h-5 w-5 text-[#096c5b] dark:text-[#72cbb8]"
                />
              </div>
              <div>
                <Label>Reporter</Label>
                <p className="font-['Inter',sans-serif] text-[16px] font-bold text-[#001d18] dark:text-[#d7e0ef]">
                  {getReporterName(report.userId)}
                </p>
                {report.reporterFacility && (
                  <div className="mt-1 flex items-center gap-1.5">
                    <Icon
                      icon="solar:buildings-bold"
                      className="h-3.5 w-3.5 text-[#096c5b] dark:text-[#72cbb8]"
                    />
                    <span className="font-['Inter',sans-serif] text-[13px] font-medium text-[#096c5b] dark:text-[#72cbb8]">
                      {report.reporterFacility}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </Card>
          <Card>
            <Label>Description</Label>
            <p className="font-['Inter',sans-serif] text-[15px] font-medium leading-relaxed text-[#001d18] dark:text-[#d7e0ef]">
              {report.description.replace(/\[.*?\]\s*/, '')}
            </p>
          </Card>
          <Card>
            <Label>Flags</Label>
            <div className="flex flex-wrap gap-2">
              {report.flags.map((f) => (
                <span
                  key={f}
                  className="rounded-full bg-red-50 border border-red-200 px-3 py-1 font-['Inter',sans-serif] text-[12px] font-semibold text-red-700"
                >
                  {f}
                </span>
              ))}
            </div>
          </Card>
          {report.evidence.length > 0 && (
            <Card>
              <Label>Evidence</Label>
              <div className="flex flex-wrap gap-2">
                {report.evidence.map((ev) => (
                  <span
                    key={ev}
                    className="rounded-full bg-[#edf7f5] dark:bg-[#12342e] px-3 py-1 font-['Inter',sans-serif] text-[12px] font-semibold text-[#096c5b] dark:text-[#72cbb8]"
                  >
                    {ev}
                  </span>
                ))}
              </div>
            </Card>
          )}
          {report.createdAt && (
            <div className="rounded-[16px] border border-[#e5e7eb] dark:border-[#303331] bg-white dark:bg-[#1f2022] p-5 shadow-[0px_1px_4px_0px_rgba(0,0,0,0.06)]">
              <p className="mb-1 font-['Inter',sans-serif] text-[13px] font-bold uppercase tracking-wide text-[#666] dark:text-[#a4acba]">
                Filed On
              </p>
              <p className="font-['Inter',sans-serif] text-[16px] font-bold text-[#001d18] dark:text-[#d7e0ef]">
                {new Date(report.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}
        </div>
        <div className="flex shrink-0 items-center justify-center gap-4 border-t border-[#f0f0f0] dark:border-[#303331] bg-white dark:bg-[#141515] px-12 py-5">
          <button
            type="button"
            onClick={onClose}
            className="rounded-[12px] px-6 py-2 font-['Inter',sans-serif] text-[14px] font-semibold text-[#64748b] transition-opacity hover:opacity-80"
          >
            Cancel
          </button>
          {report.status === 'pending' && (
            <>
              <button
                type="button"
                onClick={() => onResolve('dismissed')}
                className="rounded-[12px] px-6 py-2 font-['Inter',sans-serif] text-[14px] font-semibold text-[#ef4444] transition-opacity hover:opacity-80"
              >
                Dismiss
              </button>
              <button
                type="button"
                onClick={() => onResolve('resolved')}
                className="rounded-[12px] bg-[#cbf6ed] dark:bg-[#12342e] px-6 py-2 font-['Inter',sans-serif] text-[14px] font-semibold text-[#096c5b] dark:text-[#72cbb8] transition-opacity hover:opacity-80"
              >
                Resolve
              </button>
            </>
          )}
        </div>
      </div>
    </AdminPopupOverlay>
  );
}
