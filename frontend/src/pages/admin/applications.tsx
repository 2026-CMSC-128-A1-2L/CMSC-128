import { useCallback, useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import SideBarAdmin from '../../components/admin/SideBarAdmin';
import AdminPageTransition from '../../components/admin/AdminPageTransition';
import PageBackground from '../../components/general/PageBackground';
import AdminPagination from '../../components/admin/AdminPagination';
import ApplicantReviewModal, {
  type VerificationApplicant,
  type VerificationDocument,
  getDisplayName,
  formatRole,
} from '../../components/admin/ApplicantReviewModal';
import { DocumentService } from '../../service/DocumentService';
import { UserService } from '../../service/UserService';

const tableHeaders = ['Name', 'Email', 'Role', 'Submitted Docs', 'Status', 'Details'];

const getApplicationStatusLabel = (user: VerificationApplicant) => {
  if (user.verificationStatus === 'submitted') return 'For Review';
  if (user.verificationStatus === 'rejected') return 'Rejected';
  if (user.verificationStatus === 'approved') return 'Approved';
  return 'Pending';
};

function Applications() {
  const [applicants, setApplicants] = useState<VerificationApplicant[]>([]);
  const [selectedApplicantId, setSelectedApplicantId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [rejectionMessages, setRejectionMessages] = useState<Record<string, string>>({});
  const [studentNumber, setStudentNumber] = useState('');
  const [degreeProgram, setDegreeProgram] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  const selectedApplicant = applicants.find((u) => u._id === selectedApplicantId) ?? null;

  const filteredApplicants = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return applicants;
    return applicants.filter((u) =>
      [getDisplayName(u), u.emails?.[0], u.userType, u.address, u.contact]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
        .includes(q),
    );
  }, [applicants, searchQuery]);

  const totalPages = Math.ceil(filteredApplicants.length / itemsPerPage);
  const paginatedApplicants = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredApplicants.slice(start, start + itemsPerPage);
  }, [filteredApplicants, currentPage]);

  const loadApplicants = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await UserService.getUsers<VerificationApplicant>({
        verificationStatus: 'submitted',
      });
      const users = response.data ?? [];
      setApplicants(users);
      setSelectedApplicantId((cur) =>
        cur && users.some((u: VerificationApplicant) => u._id === cur)
          ? cur
          : (users[0]?._id ?? null),
      );
    } catch {
      setError('Could not load verification applications.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadApplicants();
  }, [loadApplicants]);

  const openModal = (userId: string) => {
    setSelectedApplicantId(userId);
    setStudentNumber('');
    setDegreeProgram('');
    setActionMessage(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedApplicantId(null);
  };

  const updateDocs = (documents: VerificationDocument[]) => {
    if (!selectedApplicant) return;
    setApplicants((cur) =>
      cur.map((u) => (u._id === selectedApplicant._id ? { ...u, documents } : u)),
    );
  };

  const handleAcceptDocument = async (docId: string) => {
    if (!selectedApplicant) return;
    setActionMessage(null);
    setError(null);
    try {
      const res = await DocumentService.acceptDocument('users', selectedApplicant._id, docId);
      updateDocs(res.data ?? []);
      setActionMessage('Document accepted.');
    } catch {
      setError('Could not accept this document.');
    }
  };

  const handleRejectDocument = async (docId: string) => {
    if (!selectedApplicant) return;
    const message = rejectionMessages[docId]?.trim() || 'Please resubmit a clearer document.';
    setActionMessage(null);
    setError(null);
    try {
      const res = await DocumentService.rejectDocument(
        'users',
        selectedApplicant._id,
        docId,
        message,
      );
      updateDocs(res.data ?? []);
      setActionMessage('Document rejected.');
    } catch {
      setError('Could not reject this document.');
    }
  };

  const handleApproveApplicant = async () => {
    if (!selectedApplicant) return;
    if (!selectedApplicant.documents.every((d) => d.status === 'accepted')) {
      setError('Accept all submitted documents before approving the user.');
      return;
    }
    if (selectedApplicant.userType === 'Student') {
      if (!/^[0-9]{9}$/.test(studentNumber.trim()) || !degreeProgram.trim()) {
        setError('Enter the student number and degree program before approving a student.');
        return;
      }
    }
    setActionMessage(null);
    setError(null);
    try {
      await UserService.approveUser(
        selectedApplicant._id,
        selectedApplicant.userType === 'Student'
          ? { studentNumber: studentNumber.trim(), degreeProgram: degreeProgram.trim() }
          : undefined,
      );
      setActionMessage(`${getDisplayName(selectedApplicant)} has been verified.`);
      await loadApplicants();
      closeModal();
    } catch {
      setError('Could not approve this user.');
    }
  };

  const handleRejectApplicant = async () => {
    if (!selectedApplicant) return;
    setActionMessage(null);
    setError(null);
    try {
      await UserService.rejectUser(selectedApplicant._id);
      setActionMessage(`${getDisplayName(selectedApplicant)} has been rejected.`);
      await loadApplicants();
      closeModal();
    } catch {
      setError('Could not reject this user. Reject at least one document first.');
    }
  };

  return (
    <AdminPageTransition>
      <div className="relative -mx-[calc((100vw-100%)/2)] flex w-screen h-screen flex-col overflow-hidden bg-transparent">
        <PageBackground />
        <div className="flex flex-1 relative z-10 overflow-hidden">
          <SideBarAdmin activeItem="applications" />
          <div className="flex-1 overflow-y-auto bg-transparent px-10 py-8">
            <h1 className="font-['Outfit'] text-[48px] font-bold text-black dark:text-[#d7e0ef]">
              Dashboard
            </h1>

            <div className="mt-6 rounded-xl bg-white dark:bg-[#141515] p-6 shadow-sm border border-transparent dark:border-[#303331]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-['Poppins'] text-[36px] font-bold text-[#001d18] dark:text-[#d7e0ef] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
                  Verification Applications
                </h2>
                <div className="flex h-9 w-75.75 items-center gap-2 rounded-full border border-[#d0d0d0] dark:border-[#303331] bg-white dark:bg-[#1f2022] px-4">
                  <Icon
                    icon="solar:magnifer-outline"
                    className="h-4 w-4 text-[#7c8db5] dark:text-[#a4acba]"
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="Search"
                    className="flex-1 bg-transparent font-['Poppins'] text-sm text-black dark:text-[#d7e0ef] outline-none placeholder:text-[#7c8db5] dark:placeholder:text-[#a4acba]"
                  />
                </div>
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
                          className="px-6 py-8 text-center dark:text-[#a4acba]"
                        >
                          Loading applications...
                        </td>
                      </tr>
                    ) : paginatedApplicants.length === 0 ? (
                      <tr>
                        <td
                          colSpan={tableHeaders.length}
                          className="px-6 py-8 text-center dark:text-[#a4acba]"
                        >
                          No submitted verification applications.
                        </td>
                      </tr>
                    ) : (
                      paginatedApplicants.map((row) => (
                        <tr
                          key={row._id}
                          className="border-b border-[#f0f0f0] dark:border-[#303331] bg-white dark:bg-[#141515]"
                        >
                          <td className="px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black dark:text-[#d7e0ef]">
                            {getDisplayName(row)}
                          </td>
                          <td className="px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black dark:text-[#d7e0ef]">
                            {row.emails?.[0] ?? 'No email'}
                          </td>
                          <td className="px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black dark:text-[#d7e0ef]">
                            {formatRole(row.userType)}
                          </td>
                          <td className="px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black dark:text-[#d7e0ef]">
                            {row.documents?.filter((d) => d.files.length > 0).length ?? 0}
                          </td>
                          <td className="px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black dark:text-[#d7e0ef]">
                            {getApplicationStatusLabel(row)}
                          </td>
                          <td className="px-6 py-3">
                            <button
                              type="button"
                              onClick={() => openModal(row._id)}
                              className="cursor-pointer rounded-lg bg-[#024338] px-5 py-2 font-['Poppins'] text-[16px] font-bold text-white transition-colors duration-200 hover:bg-[#096c5b]"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
                <AdminPagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  totalItems={filteredApplicants.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>

              <ApplicantReviewModal
                isOpen={isModalOpen}
                applicant={selectedApplicant}
                studentNumber={studentNumber}
                degreeProgram={degreeProgram}
                rejectionMessages={rejectionMessages}
                error={error}
                onClose={closeModal}
                onStudentNumberChange={setStudentNumber}
                onDegreeProgramChange={setDegreeProgram}
                onRejectionMessageChange={(docId, val) =>
                  setRejectionMessages((cur) => ({ ...cur, [docId]: val }))
                }
                onAcceptDocument={handleAcceptDocument}
                onRejectDocument={handleRejectDocument}
                onApproveUser={handleApproveApplicant}
                onRejectUser={handleRejectApplicant}
              />
            </div>
          </div>
        </div>
      </div>
    </AdminPageTransition>
  );
}

export default Applications;
