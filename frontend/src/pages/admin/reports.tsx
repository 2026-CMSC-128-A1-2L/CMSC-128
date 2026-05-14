import { useCallback, useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import SideBarAdmin from '../../components/admin/SideBarAdmin';
import AdminPageTransition from '../../components/admin/AdminPageTransition';
import AdminPagination from '../../components/admin/AdminPagination';
import ReportDetailModal from '../../components/admin/ReportDetailModal';
import { ReportService } from '../../service/ReportService';

type ReportUser = { _id: string; firstName: string; middleName?: string; lastName: string; emails?: string[] };
type ReportData = {
  _id: string; userId: string | ReportUser; description: string; flags: string[];
  evidence: string[]; status: 'pending' | 'resolved' | 'dismissed';
  __t?: 'ListingReport' | 'UserReport'; listingId?: string; facilityId?: string;
  userReported?: string | ReportUser; createdAt?: string; updatedAt?: string;
};

const tableHeaders = ['Reporter', 'Description', 'Type', 'Status', 'Details'];

const getReporterName = (userId: string | ReportUser): string => {
  if (typeof userId === 'string') return userId;
  return [userId.firstName, userId.middleName, userId.lastName].filter(Boolean).join(' ');
};

const getReportType = (report: ReportData): string => {
  if (report.__t === 'ListingReport') return 'Listing';
  if (report.__t === 'UserReport') return 'User';
  return 'General';
};

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    resolved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    dismissed: 'bg-red-50 text-red-600 border-red-200',
  };
  const labels: Record<string, string> = { pending: 'Pending', resolved: 'Resolved', dismissed: 'Dismissed' };
  return (
    <span className={`inline-flex items-center rounded-full border px-3 py-1 font-['Poppins'] text-xs font-semibold ${styles[status] ?? styles.pending}`}>
      {labels[status] ?? status}
    </span>
  );
};

function Reports() {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [selectedReportId, setSelectedReportId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  const selectedReport = reports.find((r) => r._id === selectedReportId) ?? null;

  const filteredReports = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return reports;
    return reports.filter((r) =>
      [getReporterName(r.userId), r.description, getReportType(r), r.status]
        .filter(Boolean).join(' ').toLowerCase().includes(q),
    );
  }, [reports, searchQuery]);

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const paginatedReports = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredReports.slice(start, start + itemsPerPage);
  }, [filteredReports, currentPage]);

  const loadReports = useCallback(async () => {
    setIsLoading(true); setError(null);
    try {
      const response = await ReportService.getReports();
      const data = (response.data ?? []) as ReportData[];
      setReports(data);
      setSelectedReportId((cur) => (cur && data.some((r) => r._id === cur) ? cur : (data[0]?._id ?? null)));
    } catch { setError('Could not load reports.'); }
    finally { setIsLoading(false); }
  }, []);

  useEffect(() => { loadReports(); }, [loadReports]);

  const closeModal = () => { setIsModalOpen(false); setSelectedReportId(null); };

  const handleResolve = async (status: 'resolved' | 'dismissed') => {
    if (!selectedReport) return;
    setActionMessage(null); setError(null);
    try {
      await ReportService.resolveReport(selectedReport._id, { status });
      setActionMessage(`Report has been ${status}.`);
      await loadReports(); closeModal();
    } catch { setError(`Could not ${status === 'resolved' ? 'resolve' : 'dismiss'} this report.`); }
  };

  return (
    <AdminPageTransition>
      <div className="relative -mx-[calc((100vw-100%)/2)] flex w-screen flex-col min-h-screen">
        <div className="flex flex-1">
          <SideBarAdmin activeItem="reports" />
          <div className="flex-1 bg-white px-10 py-8">
            <h1 className="font-['Outfit'] text-[48px] font-bold text-black">Dashboard</h1>
            <div className="mt-6 rounded-xl bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-['Poppins'] text-[36px] font-bold text-[#001d18] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">Reports</h2>
                <div className="flex h-9 w-75.75 items-center gap-2 rounded-full border border-[#d0d0d0] bg-white px-4">
                  <Icon icon="solar:magnifer-outline" className="h-4 w-4 text-[#7c8db5]" />
                  <input type="text" value={searchQuery} onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }} placeholder="Search" className="flex-1 bg-transparent font-['Poppins'] text-sm text-black outline-none placeholder:text-[#7c8db5]" />
                </div>
              </div>

              {error && <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 font-['Poppins'] text-sm font-semibold text-red-700">{error}</div>}
              {actionMessage && <div className="mb-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 font-['Poppins'] text-sm font-semibold text-emerald-700">{actionMessage}</div>}

              <div className="overflow-hidden rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.35)]">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#024338]">
                      {tableHeaders.map((h) => (
                        <th key={h} className="px-6 py-4 text-left font-['Poppins'] text-[18px] font-bold text-white">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr><td colSpan={tableHeaders.length} className="px-6 py-8 text-center font-['Poppins'] text-[#7c8db5]">Loading reports...</td></tr>
                    ) : paginatedReports.length === 0 ? (
                      <tr><td colSpan={tableHeaders.length} className="px-6 py-8 text-center font-['Poppins'] text-[#7c8db5]">No reports found.</td></tr>
                    ) : (
                      paginatedReports.map((report) => (
                        <tr key={report._id} className="border-b border-[#f0f0f0] transition-colors duration-200 hover:bg-[#f8fffe]">
                          <td className="px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black">{getReporterName(report.userId)}</td>
                          <td className="max-w-xs truncate px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black">{report.description.replace(/\[.*?\]\s*/, '').slice(0, 60)}...</td>
                          <td className="px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black">{getReportType(report)}</td>
                          <td className="px-6 py-3">{getStatusBadge(report.status)}</td>
                          <td className="px-6 py-3">
                            <button type="button" onClick={() => { setSelectedReportId(report._id); setActionMessage(null); setIsModalOpen(true); }} className="cursor-pointer rounded-lg bg-[#024338] px-5 py-2 font-['Poppins'] text-[16px] font-bold text-white transition-colors duration-200 hover:bg-[#096c5b]">View</button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <AdminPagination currentPage={currentPage} totalPages={totalPages} totalItems={filteredReports.length} itemsPerPage={itemsPerPage} onPageChange={setCurrentPage} />
              </div>
            </div>

            <ReportDetailModal
              isOpen={isModalOpen}
              report={selectedReport}
              onClose={closeModal}
              onResolve={handleResolve}
              getReporterName={getReporterName}
              getReportType={getReportType}
            />
          </div>
        </div>
      </div>
    </AdminPageTransition>
  );
}

export default Reports;
