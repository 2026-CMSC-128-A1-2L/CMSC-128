import { type FunctionComponent, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import BillingRow from './BillingRow';
import AddBillingPopup from './AddBillingPopup';
import EditBillingPopup from './EditBillingPopup';
import ReceiptViewerPopup, { type ReceiptDocument } from './ReceiptViewerPopup';
import type { Billing } from '../types/billing';
import type { TenantBilling } from '../../../../hooks/useFacilityFinance';
import { BillingService } from '../../../../service/BillingService';
import { UnitService } from '../../../../service/UnitService';

const TABLE_COLUMNS = [
  { label: 'Room', className: 'w-[7%]' },
  { label: 'Tenant Name', className: 'w-[18%]' },
  { label: 'Rent', className: 'w-[9%]' },
  { label: 'Utilities', className: 'w-[9%]' },
  { label: 'Misc.', className: 'w-[9%]' },
  { label: 'Total Due', className: 'w-[9%]' },
  { label: 'Amount Paid', className: 'w-[9%]' },
  { label: 'Receipt', className: 'w-[8%]' },
  { label: 'Status', className: 'w-[14%]' },
];

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const getAvailableMonths = () => {
  const now = new Date();

  return Array.from({ length: 3 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const month = d.getMonth();
    const year = d.getFullYear();

    return {
      name: MONTH_NAMES[month],
      month,
      year,
      displayName: `${MONTH_NAMES[month]} ${year}`,
      startDate: new Date(year, month, 1),
      endDate: new Date(year, month + 1, 0),
    };
  });
};


const toRowBilling = (b: TenantBilling): Billing => ({
  _id: b._id,
  userId: b.userId,
  unitId: b.unitId,
  facilityId: b.facilityId,
  dueDate: b.dueDate,
  paymentDate: b.paymentDate,
  paidAmount: b.paidAmount,
  totalAmount: b.totalAmount,
  paymentStatus: b.paymentStatus,
  documents: b.documents,
  breakdown: b.breakdown,
  createdAt: b.createdAt,
  updatedAt: b.updatedAt,
});

/**
 * Normalise whatever shape `billing.documents` comes in as
 * into a flat array of ReceiptDocument objects.
 *
 * The backend can return:
 *   - A raw string file key            → { file: key }
 *   - An object { file, paymentMethod, submittedAt, … }
 *   - An object { key, … }             → treat key as file
 */
const normaliseDocuments = (documents: any[]): ReceiptDocument[] => {
  if (!Array.isArray(documents)) return [];

  const result: ReceiptDocument[] = [];

  for (const d of documents) {
    if (!d) continue;

    // bare string key
    if (typeof d === 'string') {
      if (d) result.push({ file: d });
      continue;
    }

    // Confirmed backend shape: { files: string[], message, status, ... }
    // files[] is an array of file key strings
    if (Array.isArray(d.files)) {
      for (const fileKey of d.files) {
        if (fileKey) {
          result.push({
            file: fileKey,
            paymentMethod: d.message?.match(/payment method:\s*(\S+)/i)?.[1] ?? undefined,
            submittedAt: d.submittedAt ?? d.createdAt ?? undefined,
          });
        }
      }
      continue;
    }

    // Fallback: single-file object shapes
    const fileKey: string =
      d.file ?? d.key ?? d.fileKey ?? d.fileId ?? d.path ?? d.url ?? '';
    if (fileKey) {
      result.push({
        file: fileKey,
        paymentMethod: d.paymentMethod ?? d.method ?? undefined,
        submittedAt: d.submittedAt ?? d.createdAt ?? undefined,
      });
    }
  }

  return result;
};

interface TenantBillingsTabProps {
  facilityId: string;
  billings: TenantBilling[];
  unitRentalMap: Map<string, string>;
  isLoading: boolean;
  onRefresh: () => void;
  facilityListings?: { id: string }[];
}

const TenantBillingsTab: FunctionComponent<TenantBillingsTabProps> = ({
  facilityId,
  billings,
  unitRentalMap,
  isLoading,
  onRefresh,
  facilityListings = [],
}) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [isReceiptPopupOpen, setIsReceiptPopupOpen] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<Billing | null>(null);
  const [selectedBillingMeta, setSelectedBillingMeta] = useState<{ roomNumber: string; tenantName: string } | null>(null);
  const [receiptBilling, setReceiptBilling] = useState<{
    billing: Billing;
    roomNumber: string | number;
    tenantName: string;
    documents: ReceiptDocument[];
  } | null>(null);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(getAvailableMonths()[0]);
  const [isSaving, setIsSaving] = useState(false);
  const [allUnitOptions, setAllUnitOptions] = useState<{ value: string; label: string }[]>([]);
  const [localRentalMap, setLocalRentalMap] = useState<Map<string, string>>(new Map());

  const availableMonths = getAvailableMonths();

  const mergedRentalMap = new Map([...unitRentalMap, ...localRentalMap]);

  useEffect(() => {
    const loadUnits = async () => {
      try {
        const unitPromises = facilityListings.map((l) =>
          UnitService.getUnitsByListing(l.id).catch(() => ({ data: [] }))
        );
        const unitResults = await Promise.all(unitPromises);

        const units: { value: string; label: string }[] = [];
        const rentalMapFromUnits = new Map<string, string>();

        unitResults.forEach((res: any) => {
          let arr: any[] = [];
          if (res.data && Array.isArray(res.data)) arr = res.data;
          else if (Array.isArray(res)) arr = res;
          else if (res.data?.data && Array.isArray(res.data.data)) arr = res.data.data;

          arr.forEach((u: any) => {
            const unitId = u._id ?? u.id;
            const activeRental = (u.currentRentals ?? []).find(
              (r: any) => r.status === 'active'
            );
            if (activeRental) {
              rentalMapFromUnits.set(unitId, activeRental._id);
            }
            units.push({
              value: unitId,
              label: u.roomNumber ?? u.name ?? unitId,
            });
          });
        });

        setAllUnitOptions(units);
        setLocalRentalMap((prev) => new Map([...prev, ...rentalMapFromUnits]));
      } catch (err) {
        console.error('Failed to load facility units:', err);
      }
    };
    if (facilityListings.length > 0) loadUnits();
  }, [facilityListings]);
     

  const filteredBillings = billings.filter((b) => {
    if (!b.dueDate) return false;
    const d = new Date(b.dueDate);
    return d.getMonth() === selectedMonth.month && d.getFullYear() === selectedMonth.year;
  });

  const occupiedUnitIds = new Set(filteredBillings.map((b) => b.unitId));

  const availableUnitOptions = allUnitOptions.filter(
    (u) => !occupiedUnitIds.has(u.value) && mergedRentalMap.has(u.value)
  );

  const handleStatusChange = async (billingId: string, status: Billing['paymentStatus']) => {
    try {
      await BillingService.updateBilling(billingId, { paymentStatus: status } as any);
      onRefresh();
    } catch (err) {
      console.error('Failed to update billing status:', err);
    }
  };

  const handleEditClick = (billing: Billing, roomNumber: string, tenantName: string) => {
    setSelectedBilling(billing);
    setSelectedBillingMeta({ roomNumber, tenantName });
    setIsEditPopupOpen(true);
  };

  const handleReceiptClick = async (billing: Billing, roomNumber: string | number, tenantName: string) => {
    try {
      // Use getBillingDetail which correctly flattens documents[].files[] into ReceiptDocument[]
      const detail = await BillingService.getBillingDetail(billing._id);
      setReceiptBilling({ billing, roomNumber, tenantName, documents: detail.documents });
    } catch {
      // Fall back to normalising cached documents
      const docs = normaliseDocuments(billing.documents ?? []);
      setReceiptBilling({ billing, roomNumber, tenantName, documents: docs });
    }
    setIsReceiptPopupOpen(true);
  };

  const handleVerifyReceipt = async (billingId: string, approved: boolean) => {
    try {
      await BillingService.updateBilling(billingId, {
        paymentStatus: approved ? 'paid' : 'unpaid',
      } as any);
      await onRefresh();
      setIsReceiptPopupOpen(false);
      setReceiptBilling(null);
    } catch (err) {
      console.error('Failed to verify billing payment:', err);
    }
  };

  const handleSaveEdit = async (updatedBilling: Billing) => {
    setIsSaving(true);
    try {
      await BillingService.updateBilling(updatedBilling._id, {
        breakdown: updatedBilling.breakdown,
        dueDate: updatedBilling.dueDate ?? undefined,
        paymentStatus: updatedBilling.paymentStatus,
        paidAmount: updatedBilling.paidAmount,
      } as any);
      await onRefresh();
      setIsEditPopupOpen(false);
      setSelectedBilling(null);
      setSelectedBillingMeta(null);
    } catch (err) {
      console.error('Failed to save billing edit:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddSubmit = async (data: {
    unitId: string;
    rent: number;
    utilities: number;
    miscFees: number;
    dueDate: string;
    paymentMethod: { method: 'gcash' | 'bank_transfer'; qr: [] }[];
  }) => {
    setIsSaving(true);
    try {
      const rentalId = mergedRentalMap.get(data.unitId);
      if (!rentalId) {
        throw new Error('No active rental found for this unit. Please ensure the tenant has an active rental agreement before adding a billing.');
      }

      const breakdown = [
        { name: 'Rent', amount: data.rent },
        { name: 'Utilities', amount: data.utilities },
        ...(data.miscFees > 0 ? [{ name: 'Misc. Fees', amount: data.miscFees }] : []),
      ];

      await BillingService.createBilling({
        rentalId: rentalId,
        dueDate: data.dueDate,
        breakdown,
        paymentMethod: data.paymentMethod,
      });

      onRefresh();
      setIsAddPopupOpen(false);
    } catch (err) {
      console.error('Failed to add billing:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to add billing';
      alert(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-end gap-4 text-left text-[18px] font-inter w-full">
        {/* Header row */}
        <div className="self-stretch flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-5 shrink-0">
          <b className="h-6 w-full sm:w-auto relative tracking-[-0.01em] flex items-center shrink-0 text-gray text-[20px] sm:text-[24px] dark:text-[#edf6f4]">
            Tenant Billing Status
          </b>
          <div className="flex items-center gap-3 text-[10px] text-teal flex-wrap">
            <div
              onClick={() => setIsAddPopupOpen(true)}
              className="rounded-[10px] bg-lightcyan flex items-center py-2 px-4 sm:px-6 gap-2 sm:gap-3 shrink-0 cursor-pointer hover:opacity-90 transition-opacity dark:bg-[#12342e] dark:text-[#72cbb8]"
            >
              <Icon icon="mdi:plus" className="h-3 w-3" />
              <b className="h-[17px] flex items-center shrink-0 text-[12px]">Add Billing</b>
            </div>

            <div className="relative">
              <div
                onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
                className="h-8 w-[130px] shadow-[0px_4px_20px_rgba(0,0,0,0.15)] rounded-[10px] bg-darkslategray-200 flex items-center justify-between px-3 cursor-pointer hover:opacity-90 transition-opacity dark:bg-[#114f43]"
              >
                <b className="text-white text-[12px] truncate">{selectedMonth.displayName}</b>
                <Icon
                  icon="mdi:chevron-down"
                  className={`w-4 h-4 text-white transition-transform shrink-0 ${isMonthDropdownOpen ? 'rotate-180' : ''}`}
                />
              </div>

              {isMonthDropdownOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsMonthDropdownOpen(false)}
                  />
                  <div className="absolute top-full right-0 mt-1 w-[150px] z-20 bg-white border border-whitesmoke-200 rounded-lg shadow-lg overflow-hidden dark:bg-[#141515] dark:border-[#343737]">
                    {availableMonths.map((month, index) => (
                      <div
                        key={`${month.month}-${month.year}`}
                        onClick={() => {
                          setSelectedMonth(month);
                          setIsMonthDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-[12px] font-semibold text-center cursor-pointer transition-colors font-inter ${
                          selectedMonth.displayName === month.displayName
                            ? 'bg-darkslategray-200 text-white dark:bg-[#114f43]'
                            : 'text-darkslategray-100 hover:bg-whitesmoke-100 dark:text-[#d7e0ef] dark:hover:bg-[#1b1d1d]'
                        } ${index !== availableMonths.length - 1 ? 'border-b border-whitesmoke-200 dark:border-[#343737]' : ''}`}
                      >
                        {month.displayName}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="w-full rounded-[12.75px] bg-white border-whitesmoke-200 border-solid border-2 box-border overflow-hidden dark:bg-[#101111] dark:border-[#343737]">
          <div className="w-full overflow-x-auto overflow-y-auto max-h-[600px]">
            <table className="w-full border-collapse" style={{ minWidth: '780px' }}>
              <thead className="sticky top-0 z-10">
                <tr className="bg-darkslategray-200 rounded-t-[12.75px] dark:bg-[#114f43]">
                  {TABLE_COLUMNS.map(({ label, className }) => (
                    <th
                      key={label}
                      className={`${className} h-12 px-3 text-[12px] sm:text-[13px] text-white font-inter font-bold text-center whitespace-nowrap first:rounded-tl-[12.75px] last:rounded-tr-[12.75px]`}
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {isLoading && (
                  <tr>
                    <td
                      colSpan={TABLE_COLUMNS.length}
                      className="py-12 text-center text-darkslategray-100 text-[13px] dark:text-[#a4acba]"
                    >
                      Loading billings...
                    </td>
                  </tr>
                )}

                {!isLoading && filteredBillings.length === 0 && (
                  <tr>
                    <td
                      colSpan={TABLE_COLUMNS.length}
                      className="py-12 text-center text-darkslategray-100 text-[13px] dark:text-[#a4acba]"
                    >
                      No billings found for {selectedMonth.displayName}
                    </td>
                  </tr>
                )}

                {!isLoading && filteredBillings.map((billing) => (
                  <BillingRow
                    key={billing._id}
                    billing={toRowBilling(billing)}
                    roomNumber={billing.roomNumber ? parseInt(billing.roomNumber) || billing.roomNumber : 0}
                    tenantName={billing.tenantName}
                    onStatusChange={handleStatusChange}
                    onEditClick={(b) => handleEditClick(b, billing.roomNumber, billing.tenantName)}
                    onReceiptClick={handleReceiptClick}
                    isOpen={openDropdownId === billing._id}
                    onToggle={(id) => setOpenDropdownId(openDropdownId === id ? null : id)}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddBillingPopup
        isOpen={isAddPopupOpen}
        onClose={() => setIsAddPopupOpen(false)}
        facilityId={facilityId}
        occupiedUnitIds={occupiedUnitIds}
        availableUnitOptions={availableUnitOptions}
        selectedMonth={selectedMonth}
        onSubmit={handleAddSubmit}
        isSaving={isSaving}
      />

      <EditBillingPopup
        isOpen={isEditPopupOpen}
        onClose={() => {
          setIsEditPopupOpen(false);
          setSelectedBilling(null);
          setSelectedBillingMeta(null);
        }}
        billing={selectedBilling}
        roomNumber={selectedBillingMeta?.roomNumber}
        tenantName={selectedBillingMeta?.tenantName}
        onSave={handleSaveEdit}
      />

      {/* Receipt Viewer */}
      <ReceiptViewerPopup
        isOpen={isReceiptPopupOpen}
        onClose={() => {
          setIsReceiptPopupOpen(false);
          setReceiptBilling(null);
        }}
        documents={receiptBilling?.documents ?? []}
        tenantName={receiptBilling?.tenantName}
        roomNumber={receiptBilling?.roomNumber}
        totalAmount={receiptBilling?.billing.totalAmount}
        billingId={receiptBilling?.billing._id ?? ''}
        onVerify={handleVerifyReceipt}
      />
    </>
  );
};

export default TenantBillingsTab;