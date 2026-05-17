import { useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import SideBarAdmin from "../../components/admin/SideBarAdmin";
import AdminPageTransition from "../../components/admin/AdminPageTransition";
import AdminPagination from "../../components/admin/AdminPagination";
import FacilityReviewModal from "../../components/admin/FacilityReviewModal";
import PageBackground from "../../components/general/PageBackground";
import { FacilityService } from "../../service/FacilityService";
import { useDebouncedValue } from "../../hooks/useDebouncedValue";
import { motion, AnimatePresence } from "framer-motion";

type FacilityDocument = {
  docId: string;
  name: string;
  status: "accepted" | "rejected" | "pending";
  message?: string;
  files: string[];
};
type FacilityForReview = {
  _id: string;
  id?: string;
  name: string;
  landlordId:
    | string
    | { _id: string; firstName: string; middleName?: string; lastName: string };
  location: { text: string; coordinates?: { lat: number; long: number } };
  type: string;
  status: "pending" | "approved" | "rejected" | "submitted";
  capacity: number;
  description: string;
  documents?: FacilityDocument[];
  media?: { sourceType: string; value: string }[];
  createdAt?: string;
  updatedAt?: string;
};

const tableHeaders = [
  "Facility Name",
  "Type",
  "Location",
  "Capacity",
  "Status",
  "Details",
];

const getStatusBadge = (status: string) => {
  const styles: Record<string, string> = {
    pending: "bg-gray-50 text-gray-500 border-gray-200",
    submitted: "bg-amber-50 text-amber-700 border-amber-200",
    approved: "bg-emerald-50 text-emerald-700 border-emerald-200",
    rejected: "bg-red-50 text-red-700 border-red-200",
  };
  const labels: Record<string, string> = {
    pending: "Pending",
    submitted: "For Review",
    approved: "Approved",
    rejected: "Rejected",
  };
  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 font-['Poppins'] text-xs font-semibold ${styles[status] ?? styles.pending}`}
    >
      {labels[status] ?? status}
    </span>
  );
};

const formatFacilityType = (type: string) => {
  const labels: Record<string, string> = {
    "on-campus": "On-Campus",
    "off-campus": "Off-Campus",
    "partner housing": "Partner Housing",
  };
  return labels[type] ?? type;
};

function Listings() {
  const [facilities, setFacilities] = useState<FacilityForReview[]>([]);
  const [selectedFacilityId, setSelectedFacilityId] = useState<string | null>(
    null,
  );
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebouncedValue(searchQuery, 300);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const itemsPerPage = 10;

  const selectedFacility =
    facilities.find((f) => (f._id ?? f.id) === selectedFacilityId) ?? null;

  const filteredFacilities = useMemo(() => {
    const q = debouncedSearchQuery.trim().toLowerCase();
    if (!q) return facilities;
    return facilities.filter((f) =>
      [f.name, f.location.text, f.type, f.description]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(q),
    );
  }, [facilities, debouncedSearchQuery]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchQuery]);

  const totalPages = Math.ceil(filteredFacilities.length / itemsPerPage);
  const paginatedFacilities = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredFacilities.slice(start, start + itemsPerPage);
  }, [filteredFacilities, currentPage]);

  const loadFacilities = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await FacilityService.getFacilities();
      const all = (response.data ?? []) as FacilityForReview[];
      const submitted = all.filter((f) => f.status === "submitted");
      setFacilities(submitted);
      setSelectedFacilityId((cur) =>
        cur && submitted.some((f) => (f._id ?? f.id) === cur)
          ? cur
          : (submitted[0]?._id ?? null),
      );
    } catch {
      setError("Could not load facilities.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadFacilities();
  }, [loadFacilities]);

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedFacilityId(null);
  };

  const handleApprove = async () => {
    if (!selectedFacility) return;
    setActionMessage(null);
    setError(null);
    try {
      const id = selectedFacility._id ?? selectedFacility.id;
      await FacilityService.approveFacility(id!);
      setActionMessage(`"${selectedFacility.name}" has been approved.`);
      closeModal();
      await loadFacilities();
    } catch {
      setError("Could not approve this facility.");
    }
  };

  const handleReject = async () => {
    if (!selectedFacility) return;
    setActionMessage(null);
    setError(null);
    try {
      const id = selectedFacility._id ?? selectedFacility.id;
      await FacilityService.rejectFacility(id!);
      setActionMessage(`"${selectedFacility.name}" has been rejected.`);
      closeModal();
      await loadFacilities();
    } catch {
      setError("Could not reject this facility.");
    }
  };

  return (
    <AdminPageTransition>
      <div className="relative -mx-[calc((100vw-100%)/2)] flex w-screen h-screen flex-col overflow-hidden bg-transparent">
        <PageBackground />
        <div className="flex flex-1 relative z-10 overflow-hidden">
          <SideBarAdmin activeItem="listings" />
          <div className="flex-1 overflow-y-auto bg-transparent px-10 py-8">
            <h1 className="font-['Outfit'] text-[48px] font-bold text-black dark:text-[#d7e0ef]">
              Dashboard
            </h1>
            <div className="mt-6 rounded-xl bg-white dark:bg-[#141515] p-6 shadow-sm border border-transparent dark:border-[#303331]">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="font-['Poppins'] text-[36px] font-bold text-[#001d18] dark:text-[#d7e0ef] drop-shadow-[0px_4px_4px_rgba(0,0,0,0.1)]">
                  Listings for Review
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
                          Loading facilities...
                        </td>
                      </tr>
                    ) : paginatedFacilities.length === 0 ? (
                      <tr>
                        <td
                          colSpan={tableHeaders.length}
                          className="px-6 py-8 text-center font-['Poppins'] text-[#7c8db5] dark:text-[#a4acba]"
                        >
                          No facilities pending review.
                        </td>
                      </tr>
                    ) : (
                      <AnimatePresence>
                        {paginatedFacilities.map((facility, index) => (
                          <motion.tr
                            key={facility._id ?? facility.id}
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
                              {facility.name}
                            </td>
                            <td className="px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black dark:text-[#d7e0ef]">
                              {formatFacilityType(facility.type)}
                            </td>
                            <td className="max-w-xs truncate px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black dark:text-[#d7e0ef]">
                              {facility.location.text}
                            </td>
                            <td className="px-6 py-3 font-['Poppins'] text-[16px] font-medium text-black dark:text-[#d7e0ef]">
                              {facility.capacity}
                            </td>
                            <td className="px-6 py-3">
                              {getStatusBadge(facility.status)}
                            </td>
                            <td className="px-6 py-3">
                              <motion.button
                                type="button"
                                onClick={() => {
                                  setSelectedFacilityId(
                                    facility._id ?? facility.id ?? null,
                                  );
                                  setActionMessage(null);
                                  setIsModalOpen(true);
                                }}
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
                  totalItems={filteredFacilities.length}
                  itemsPerPage={itemsPerPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>

            <FacilityReviewModal
              isOpen={isModalOpen}
              facility={selectedFacility}
              onClose={closeModal}
              onApprove={handleApprove}
              onReject={handleReject}
              formatType={formatFacilityType}
            />
          </div>
        </div>
      </div>
    </AdminPageTransition>
  );
}

export default Listings;
