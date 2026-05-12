import { useCallback, useEffect, useMemo, useState } from 'react';
import { Icon } from '@iconify/react';
import SideBarAdmin from '../../components/admin/SideBarAdmin';
import AdminPageTransition from '../../components/admin/AdminPageTransition';
import { DocumentService } from '../../service/DocumentService';
import { UserService } from '../../service/UserService';

type VerificationDocument = {
  docId: string;
  name: string;
  status: 'accepted' | 'rejected' | 'pending';
  message?: string;
  files: string[];
};

type VerificationApplicant = {
  _id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  emails: string[];
  address?: string;
  contact?: string;
  userType?: 'Student' | 'Landlord' | 'Manager' | 'Admin';
  status: 'setup' | 'unverified' | 'verified' | 'inactive' | 'disabled';
  verificationStatus: 'pending' | 'submitted' | 'rejected' | 'approved';
  documents: VerificationDocument[];
  createdAt?: string;
  updatedAt?: string;
};

const tableHeaders = ['Name', 'Email', 'Role', 'Submitted Docs', 'Status', 'Details'];

const getDisplayName = (user: VerificationApplicant) =>
  [user.firstName, user.middleName, user.lastName].filter(Boolean).join(' ');

const formatRole = (role?: string) => role ?? 'Unassigned';

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

  const selectedApplicant = applicants.find((user) => user._id === selectedApplicantId) ?? null;

  const filteredApplicants = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return applicants;

    return applicants.filter((user) => {
      const haystack = [
        getDisplayName(user),
        user.emails?.[0],
        user.userType,
        user.address,
        user.contact,
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase();
      return haystack.includes(query);
    });
  }, [applicants, searchQuery]);

  const loadApplicants = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await UserService.getUsers<VerificationApplicant>({
        verificationStatus: 'submitted',
      });
      const users = response.data ?? [];
      setApplicants(users);
      setSelectedApplicantId((current) =>
        current && users.some((user: VerificationApplicant) => user._id === current)
          ? current
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

  const handleSelectApplicant = (userId: string) => {
    setSelectedApplicantId(userId);
    setStudentNumber('');
    setDegreeProgram('');
    setActionMessage(null);
  };

  const updateSelectedDocuments = (documents: VerificationDocument[]) => {
    if (!selectedApplicant) return;
    setApplicants((current) =>
      current.map((user) => (user._id === selectedApplicant._id ? { ...user, documents } : user)),
    );
  };

  const handleAcceptDocument = async (docId: string) => {
    if (!selectedApplicant) return;
    setActionMessage(null);
    setError(null);
    try {
      const response = await DocumentService.acceptDocument('users', selectedApplicant._id, docId);
      updateSelectedDocuments(response.data ?? []);
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
      const response = await DocumentService.rejectDocument(
        'users',
        selectedApplicant._id,
        docId,
        message,
      );
      updateSelectedDocuments(response.data ?? []);
      setActionMessage('Document rejected.');
    } catch {
      setError('Could not reject this document.');
    }
  };

  const handleApproveApplicant = async () => {
    if (!selectedApplicant) return;
    const allAccepted = selectedApplicant.documents.every((doc) => doc.status === 'accepted');
    if (!allAccepted) {
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
          ? {
              studentNumber: studentNumber.trim(),
              degreeProgram: degreeProgram.trim(),
            }
          : undefined,
      );
      setActionMessage(`${getDisplayName(selectedApplicant)} has been verified.`);
      await loadApplicants();
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
    } catch {
      setError('Could not reject this user. Reject at least one document first.');
    }
  };

  return (
    <AdminPageTransition>
      <div className="relative -mx-[calc((100vw-100%)/2)] flex w-screen flex-col min-h-screen">
        <div className="flex flex-1">
          <SideBarAdmin activeItem="applications" />
          <div className="flex-1 bg-white px-10 py-8">
            <h1 className="font-['Outfit'] text-[48px] font-bold text-black">Dashboard</h1>

            <div className="mt-6 rounded-xl bg-white p-6">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-['Poppins'] text-[36px] font-bold text-[#001d18] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
                  Verification Applications
                </h2>
                <div className="flex h-9 w-75.75 items-center gap-2 rounded-full border border-[#d0d0d0] bg-white px-4">
                  <Icon icon="solar:magnifer-outline" className="h-4 w-4 text-[#7c8db5]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Search"
                    className="flex-1 bg-transparent font-['Poppins'] text-sm text-black outline-none placeholder:text-[#7c8db5]"
                  />
                </div>
              </div>

              {error && (
                <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 font-['Poppins'] text-sm font-semibold text-red-700">
                  {error}
                </div>
              )}
              {actionMessage && (
                <div className="mb-4 rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 font-['Poppins'] text-sm font-semibold text-emerald-700">
                  {actionMessage}
                </div>
              )}

              <div className="overflow-hidden rounded-2xl shadow-[0px_0px_20px_0px_rgba(0,0,0,0.35)]">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#024338]">
                      {tableHeaders.map((header) => (
                        <th
                          key={header}
                          className="px-6 py-4 text-left font-['Poppins'] text-[18px] font-bold text-white"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {isLoading ? (
                      <tr>
                        <td colSpan={tableHeaders.length} className="px-6 py-8 text-center">
                          Loading applications...
                        </td>
                      </tr>
                    ) : filteredApplicants.length === 0 ? (
                      <tr>
                        <td colSpan={tableHeaders.length} className="px-6 py-8 text-center">
                          No submitted verification applications.
                        </td>
                      </tr>
                    ) : (
                      filteredApplicants.map((row) => (
                        <tr key={row._id} className="border-b border-[#f0f0f0]">
                          <td className="px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black">
                            {getDisplayName(row)}
                          </td>
                          <td className="px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black">
                            {row.emails?.[0] ?? 'No email'}
                          </td>
                          <td className="px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black">
                            {formatRole(row.userType)}
                          </td>
                          <td className="px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black">
                            {row.documents?.filter((doc) => doc.files.length > 0).length ?? 0}
                          </td>
                          <td className="px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black">
                            {getApplicationStatusLabel(row)}
                          </td>
                          <td className="px-6 py-3">
                            <button
                              type="button"
                              onClick={() => handleSelectApplicant(row._id)}
                              className="cursor-pointer rounded-lg bg-[#024338] px-5 py-2 font-['Poppins'] text-[16px] font-bold text-white"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {selectedApplicant && (
                <section className="mt-8 rounded-2xl border border-[#e5e7eb] bg-white p-6 shadow-sm">
                  <div className="flex items-start justify-between gap-6">
                    <div>
                      <h3 className="font-['Poppins'] text-2xl font-bold text-[#001d18]">
                        {getDisplayName(selectedApplicant)}
                      </h3>
                      <p className="mt-1 font-['Poppins'] text-sm font-semibold text-[#64748b]">
                        {selectedApplicant.emails?.[0]} • {formatRole(selectedApplicant.userType)}
                      </p>
                    </div>
                    <div className="flex gap-3">
                      <button
                        type="button"
                        onClick={handleRejectApplicant}
                        className="rounded-lg border border-red-200 px-5 py-2 font-['Poppins'] text-sm font-bold text-red-600 hover:bg-red-50"
                      >
                        Reject User
                      </button>
                      <button
                        type="button"
                        onClick={handleApproveApplicant}
                        className="rounded-lg bg-[#096c5b] px-5 py-2 font-['Poppins'] text-sm font-bold text-white hover:bg-[#075a4c]"
                      >
                        Approve User
                      </button>
                    </div>
                  </div>

                  {selectedApplicant.userType === 'Student' && (
                    <div className="mt-5 grid grid-cols-2 gap-4">
                      <label className="flex flex-col gap-2 font-['Poppins'] text-sm font-bold text-[#001d18]">
                        Student Number
                        <input
                          value={studentNumber}
                          onChange={(event) => setStudentNumber(event.target.value)}
                          placeholder="9 digits"
                          className="rounded-lg border border-[#d0d0d0] px-3 py-2 font-medium text-black outline-none focus:border-[#096c5b]"
                        />
                      </label>
                      <label className="flex flex-col gap-2 font-['Poppins'] text-sm font-bold text-[#001d18]">
                        Degree Program
                        <input
                          value={degreeProgram}
                          onChange={(event) => setDegreeProgram(event.target.value)}
                          placeholder="BS Computer Science"
                          className="rounded-lg border border-[#d0d0d0] px-3 py-2 font-medium text-black outline-none focus:border-[#096c5b]"
                        />
                      </label>
                    </div>
                  )}

                  <div className="mt-6 grid gap-4">
                    {selectedApplicant.documents?.map((doc) => (
                      <article
                        key={doc.docId}
                        className="rounded-xl border border-[#f0f0f0] bg-[#fbfbfb] p-4"
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h4 className="font-['Poppins'] text-lg font-bold text-black">
                              {doc.name}
                            </h4>
                            <p className="mt-1 font-['Poppins'] text-sm font-semibold text-[#64748b]">
                              Status: {doc.status}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {doc.files.map((fileId) => (
                                <span
                                  key={fileId}
                                  className="rounded-full bg-[#edf7f5] px-3 py-1 font-['Poppins'] text-xs font-semibold text-[#096c5b]"
                                >
                                  {fileId}
                                </span>
                              ))}
                            </div>
                            {doc.message && (
                              <p className="mt-2 font-['Poppins'] text-sm font-semibold text-red-600">
                                {doc.message}
                              </p>
                            )}
                          </div>
                          <div className="flex shrink-0 gap-2">
                            <button
                              type="button"
                              onClick={() => handleAcceptDocument(doc.docId)}
                              className="rounded-lg bg-[#096c5b] px-4 py-2 font-['Poppins'] text-sm font-bold text-white"
                            >
                              Accept
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRejectDocument(doc.docId)}
                              className="rounded-lg border border-red-200 px-4 py-2 font-['Poppins'] text-sm font-bold text-red-600"
                            >
                              Reject
                            </button>
                          </div>
                        </div>
                        <input
                          value={rejectionMessages[doc.docId] ?? ''}
                          onChange={(event) =>
                            setRejectionMessages((current) => ({
                              ...current,
                              [doc.docId]: event.target.value,
                            }))
                          }
                          placeholder="Optional rejection note"
                          className="mt-3 w-full rounded-lg border border-[#d0d0d0] px-3 py-2 font-['Poppins'] text-sm outline-none focus:border-[#096c5b]"
                        />
                      </article>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminPageTransition>
  );
}

export default Applications;
