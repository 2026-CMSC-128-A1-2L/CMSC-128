import { useCallback, useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import { motion, AnimatePresence } from 'framer-motion';
import SideBarAdmin from '../../components/admin/SideBarAdmin';
import AdminPageTransition from '../../components/admin/AdminPageTransition';
import PageBackground from '../../components/general/PageBackground';
import AdminPagination from '../../components/admin/AdminPagination';
import RemovalRequestDetailModal from '../../components/admin/RemovalRequestDetailModal';
import {
  RemovalRequestService,
  type RemovalRequestData,
} from '../../service/RemovalRequestService';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';

const tableHeaders = [
  'Landlord',
  'Tenant',
  'Facility',
  'Reasons',
  'Status',
  'Details',
];

const getLandlordName = (landlordId: RemovalRequestData['landlordId']): string => {
  if (typeof landlordId === 'string') return landlordId;
  return [landlordId.firstName, landlordId.middleName, landlordId.lastName]
    .filter(Boolean)
    .join(' ');
};

const getTenantName = (request: RemovalRequestData): string => {
  return request.tenantDisplayName ?? 'Unknown';
};

const getReasonSummary = (reasons: RemovalRequestData['reasons']): string => {
  const parts: string[] = [];
  if (reasons.backedOut) parts.push('Backed out');
  if (reasons.noDocuments) parts.push('No documents');
  if (reasons.other) parts.push(reasons.otherReason ? `Other: ${reasons.otherReason}` : 'Other');
  return parts.join(', ') || 'No reason specified';
};

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    approved: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    rejected: 'bg-red-50 text-red-600 border-red-200',
  };
  const labels: Record<string, string> = {
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-['Poppins'] text-xs font-semibold ${styles[status] ?? styles.pending}`}
    >
      {labels[status] ?? status}
    </span>
  );
};

function RemovalRequests() {
  const [requests, setRequests] = useState<RemovalRequestData[]>([]);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  const selectedRequest = requests.find((r) => r._id === selectedRequestId) ?? null;

  const filteredRequests = useMemo(() => {
    const q = debouncedSearchQuery.trim().toLowerCase();
    let result = requests;
    if (statusFilter !== 'all') {
      result = result.filter((r) => r.status === statusFilter);
    }
    if (!q) return result;
    return result.filter((r) =>
      [
        getLandlordName(r.landlordId),
        getTenantName(r),
        r.tenantEmail,
        r.facilityName,
        getReasonSummary(r.reasons),
        r.status,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q),
    );
  }, [requests, debouncedSearchQuery, statusFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery, statusFilter]);

  const totalPages = Math.ceil(filteredRequests.length / itemsPerPage);
  const paginatedRequests = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRequests.slice(start, start + itemsPerPage);
  }, [filteredRequests, currentPage]);

  const loadRequests = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await RemovalRequestService.getRequests();
      const data = (response.data ?? []) as RemovalRequestData[];
      setRequests(data);
      setSelectedRequestId((cur) =>
        cur && data.some((r) => r._id === cur) ? cur : (data[0]?._id ?? null),
      );
    } catch {
      setError('Could not load removal requests.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadRequests();
  }, [loadRequests]);

  const openModal = (requestId: string) => {
    setSelectedRequestId(requestId);
    setActionMessage(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequestId(null);
  };

  const handleApprove = async (requestId: string) => {
    setActionMessage(null);
    setError(null);
    try {
      await RemovalRequestService.approveRequest(requestId);
      setActionMessage('Removal request has been approved.');
      await loadRequests();
      closeModal();
    } catch {
      setError('Could not approve this removal request.');
    }
  };

  const handleReject = async (requestId: string) => {
    setActionMessage(null);
    setError(null);
    try {
      await RemovalRequestService.rejectRequest(requestId);
      setActionMessage('Removal request has been rejected.');
      await loadRequests();
      closeModal();
    } catch {
      setError('Could not reject this removal request.');
    }
  };

  return (
    <AdminPageTransition>
      <div className="relative -mx-[calc((100vw-100%)/2)] flex w-screen h-screen flex-col overflow-hidden bg-transparent">
        <PageBackground />
        <div className="flex flex-1 relative z-10 overflow-hidden">
          <SideBarAdmin activeItem="removalRequests" />
          <div className="flex-1 overflow-y-auto bg-transparent px-10 py-8">
            <h1 className="font-['Outfit'] text-[48px] font-bold text-black dark:text-[#d7e0ef]">
              Dashboard
            </h1>
            <div className="mt-6 rounded-xl bg-white dark:bg-[#141515] p-6 shadow-sm border border-transparent dark:border-[#303331]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-['Poppins'] text-[36px] font-bold text-[#001d18] dark:text-[#d7e0ef] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
                  Tenant Removal Requests
                </h2>
                <div className="flex h-9 w-75.75 items-center gap-2 rounded-full border border-[#d0d0d0] dark:border-[#303331] bg-white dark:bg-[#1f2022] px-4 focus-within:border-[#024338] focus-within:ring-2 focus-within:ring-[#024338]/20 transition-all duration-200">
                  <Icon
                    icon="solar:magnifer-outline"
                    className="h-4 w-4 text-[#7c8db5] dark:text-[#a4acba]"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search"
                    className="flex-1 bg-transparent font-['Poppins'] text-sm text-black dark:text-[#d7e0ef] outline-none placeholder:text-[#7c8db5] dark:placeholder:text-[#a4acba]"
                  />
                </div>
              </div>

              <div className="mb-4 flex items-center gap-2">
                {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                  <button
                    key={status}
                    type="button"
                    onClick={() => {
                      setStatusFilter(status);
                      setCurrentPage(1);
                    }}
                    className={[
                      'rounded-full border px-4 py-1.5 font-[\'Poppins\'] text-xs font-semibold transition-all duration-200 cursor-pointer',
                      statusFilter === status
                        ? status === 'all'
                          ? 'bg-[#024338] border-[#024338] text-white dark:bg-[#12342e] dark:border-[#12342e] dark:text-[#72cbb8]'
                          : status === 'pending'
                            ? 'bg-amber-50 border-amber-200 text-amber-700 dark:bg-amber-900/20 dark:border-amber-700/50 dark:text-amber-400'
                            : status === 'approved'
                              ? 'bg-emerald-50 border-emerald-200 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-700/50 dark:text-emerald-400'
                              : 'bg-red-50 border-red-200 text-red-600 dark:bg-red-900/20 dark:border-red-700/50 dark:text-red-400'
                        : 'bg-white border-[#e5e7eb] text-[#64748b] hover:border-[#024338] hover:text-[#024338] dark:bg-[#1f2022] dark:border-[#303331] dark:text-[#a4acba] dark:hover:border-[#024338] dark:hover:text-[#024338]',
                    ].join(' ')}
                  >
                    {status === 'all' ? 'All' : status.charAt(0).toUpperCase() + status.slice(1)}
                  </button>
                ))}
              </div>

              {error && (
                <div className="mb-4 rounded-xl border border-red-100 dark:border-red-900/50 bg-red-50 dark:bg-red-900/20 px-4 py-3 font-['Poppins'] text-sm font-semibold text-red-700 dark:text-red-400">
                  {error}
                </div>
              )}
              {actionMessage && (
                <div className="mb-4 rounded-xl border border-emerald-100 dark:border-emerald-900/50 bg-emerald-50 dark:bg-emerald-900/20 px-4 py-3 font-['Poppins'] text-sm font-semibold text-emerald-700 dark:text-emerald-400">
                  {actionMessage}
                </div>
              )}

              <div className="overflow-hidden rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.35)] dark:border dark:border-[#303331]">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#024338] dark:bg-[#12342e]">
                      {tableHeaders.map((h) => (
                        <th
                          key={h}
                          className="px-6 py-4 text-left font-['Poppins'] text-[18px] font-bold text-white dark:text-[#72cbb8]"
                        >
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td
                          colSpan={tableHeaders.length}
                          className="px-6 py-8 text-center font-['Poppins'] text-[#7c8db5] dark:text-[#a4acba]"
                        >
                          Loading removal requests...
                        </td>
                      </tr>
                    ) : paginatedRequests.length === 0 ? (
                      <tr>
                        <td
                          colSpan={tableHeaders.length}
                          className="px-6 py-8 text-center font-['Poppins'] text-[#7c8db5] dark:text-[#a4acba]"
                        >
                          No removal requests found.
                        </td>
                      </tr>
                    ) : (
                      <AnimatePresence>
                        {paginatedRequests.map((request, index) => (
                          <motion.tr
                            key={request._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{
                              opacity: 1,
                              y: 0,
                              transition: { delay: index * 0.05 },
                            }}
                            exit={{ opacity: 0, y: -20 }}
                            className="border-b border-[#f0f0f0] dark:border-[#303331] bg-white dark:bg-[#141515] transition-colors duration-200 hover:bg-[#f8fffe] dark:hover:bg-[#17201d]"
                          >
                            <td className="px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black dark:text-[#d7e0ef]">
                              {getLandlordName(request.landlordId)}
                            </td>
                            <td className="px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black dark:text-[#d7e0ef]">
                              {getTenantName(request)}
                            </td>
                            <td className="px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black dark:text-[#d7e0ef]">
                              {request.facilityName ?? '—'}
                            </td>
                            <td className="max-w-xs truncate px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black dark:text-[#d7e0ef]">
                              {getReasonSummary(request.reasons)}
                            </td>
                            <td className="px-6 py-3">{getStatusBadge(request.status)}</td>
                            <td className="px-6 py-3">
                              <motion.button
                                type="button"
                                onClick={() => openModal(request._id)}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="cursor-pointer rounded-lg bg-[#024338] px-5 py-2 font-['Poppins'] text-[16px] font-bold text-white transition-colors duration-200 hover:bg-[#096c5b]"
                              >
                                View
                              </motion.button>
                            </td>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    )}
                  </tbody>
                </table>
                <AdminPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredRequests.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>

            <RemovalRequestDetailModal
              isOpen={isModalOpen}
              request={selectedRequest}
              onClose={closeModal}
              onApprove={handleApprove}
              onReject={handleReject}
              getLandlordName={getLandlordName}
            />
          </div>
        </div>
      </div>
    </AdminPageTransition>
  );
}

export default RemovalRequests;
