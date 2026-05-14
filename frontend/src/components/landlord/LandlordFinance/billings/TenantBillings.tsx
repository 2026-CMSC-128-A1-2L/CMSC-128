import { type FunctionComponent, useState, useCallback, useEffect } from 'react';
import { Icon } from '@iconify/react';
import BillingRow from './BillingRow';
import AddBillingPopup from './AddBillingPopup';
import EditBillingPopup from './EditBillingPopup';
import type { Billing } from '../types/billing';
import type { TenantBilling } from '../../../../hooks/useFacilityFinance';
import { BillingService } from '../../../../service/BillingService';
import { RentalService } from '../../../../service/RentalService';
import { UnitService } from '../../../../service/UnitService';
import { ListingService } from '../../../../service/ListingService';

const TABLE_COLUMNS = [
  { label: 'Room', className: 'w-[8%]' },
  { label: 'Tenant Name', className: 'w-[22%]' },
  { label: 'Rent', className: 'w-[10%]' },
  { label: 'Utilities', className: 'w-[10%]' },
  { label: 'Misc.', className: 'w-[10%]' },
  { label: 'Total Due', className: 'w-[10%]' },
  { label: 'Amount Paid', className: 'w-[10%]' },
  { label: 'Status', className: 'w-[18%]' },
];

const MONTH_NAMES = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
];

const getAvailableMonths = () => {
  const now = new Date();
  return Array.from({ length: 3 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    return {
      name: MONTH_NAMES[d.getMonth()],
      month: d.getMonth(),
      year: d.getFullYear(),
      displayName: `${MONTH_NAMES[d.getMonth()]} ${d.getFullYear()}`,
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

interface TenantBillingsTabProps {
  facilityId: string;
  billings: TenantBilling[];
  isLoading: boolean;
  onRefresh: () => void;
}

const TenantBillingsTab: FunctionComponent<TenantBillingsTabProps> = ({
  facilityId,
  billings,
  isLoading,
  onRefresh,
}) => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<Billing | null>(null);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(getAvailableMonths()[0]);
  const [isSaving, setIsSaving] = useState(false);

  // All units for this facility
  const [allUnitOptions, setAllUnitOptions] = useState<{ value: string; label: string }[]>([]);

  const availableMonths = getAvailableMonths();

  // Fetch facility units once on mount
  useEffect(() => {
    const loadUnits = async () => {
      try {
        const listingsRes = await ListingService.getListingsByFacility(facilityId);
        const listings: any[] = Array.isArray(listingsRes.data) ? listingsRes.data : [];
        const unitPromises = listings.map((l: any) =>
          UnitService.getUnitsByListing(l._id ?? l.id).catch(() => ({ data: [] })),
        );
        const unitResults = await Promise.all(unitPromises);
        const units: { value: string; label: string }[] = unitResults.flatMap((res) => {
          const arr: any[] = Array.isArray(res.data) ? res.data : [];
          return arr.map((u: any) => ({
            value: u._id ?? u.id,
            label: `Room ${u.roomNumber ?? u.name ?? u._id}`,
          }));
        });
        setAllUnitOptions(units);
      } catch (err) {
        console.error('Failed to load facility units:', err);
      }
    };
    loadUnits();
  }, [facilityId]);

  const filteredBillings = billings.filter((b) => {
    if (!b.dueDate) return false;
    const d = new Date(b.dueDate);
    return d.getMonth() === selectedMonth.month && d.getFullYear() === selectedMonth.year;
  });

  const occupiedUnitIds = new Set(filteredBillings.map((b) => b.unitId));

  // Only show units that don't already have a billing for the selected month
  const availableUnitOptions = allUnitOptions.filter((u) => !occupiedUnitIds.has(u.value));

  const handleStatusChange = async (billingId: string, status: Billing['paymentStatus']) => {
    try {
      await BillingService.updateBilling(billingId, { paymentStatus: status } as any);
      onRefresh();
    } catch (err) {
      console.error('Failed to update billing status:', err);
    }
  };

  const handleEditClick = (billing: Billing) => {
    setSelectedBilling(billing);
    setIsEditPopupOpen(true);
  };

  const handleSaveEdit = async (updatedBilling: Billing) => {
    setIsSaving(true);
    try {
      await BillingService.updateBilling(updatedBilling._id, {
        breakdown: updatedBilling.breakdown,
        dueDate: updatedBilling.dueDate ?? undefined,
        paymentStatus: updatedBilling.paymentStatus,
      } as any);
      onRefresh();
      setIsEditPopupOpen(false);
      setSelectedBilling(null);
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
      const rentalsRes = await RentalService.getRentalByUnit(data.unitId);
      const rentals: any[] = Array.isArray(rentalsRes.data) ? rentalsRes.data : rentalsRes.data ? [rentalsRes.data] : [];
      const activeRental = rentals.find((r: any) => r.status === 'active');
      if (!activeRental) throw new Error('No active rental found for this unit.');

      const breakdown = [
        { name: 'Rent', amount: data.rent },
        { name: 'Utilities', amount: data.utilities },
        ...(data.miscFees > 0 ? [{ name: 'Misc. Fees', amount: data.miscFees }] : []),
      ];

      await BillingService.createBilling({
        rentalId: activeRental._id,
        dueDate: data.dueDate,
        breakdown,
        paymentMethod: data.paymentMethod,
      });

      onRefresh();
      setIsAddPopupOpen(false);
    } catch (err) {
      console.error('Failed to add billing:', err);
      throw err;
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <div className="flex flex-col items-end gap-4 text-left text-[18px] font-inter w-full">
        {/* Header row */}
        <div className="self-stretch flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-5 shrink-0">
          <b className="h-6 w-full sm:w-auto relative tracking-[-0.01em] flex items-center shrink-0 text-gray text-[20px] sm:text-[24px]">
            Tenant Billing Status
          </b>
          <div className="flex items-center gap-3 text-[10px] text-teal flex-wrap">
            {/* Add Billing */}
            <div
              onClick={() => setIsAddPopupOpen(true)}
              className="rounded-[10px] bg-lightcyan flex items-center py-2 px-4 sm:px-6 gap-2 sm:gap-3 shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <Icon icon="mdi:plus" className="h-3 w-3" />
              <b className="h-[17px] flex items-center shrink-0 text-[12px]">Add Billing</b>
            </div>

            {/* Month Dropdown */}
            <div className="relative">
              <div
                onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
                className="h-8 w-[130px] shadow-[0px_4px_20px_rgba(0,0,0,0.15)] rounded-[10px] bg-darkslategray-200 flex items-center justify-between px-3 cursor-pointer hover:opacity-90 transition-opacity"
              >
                <b className="text-white text-[12px] truncate">{selectedMonth.displayName}</b>
                <Icon
                  icon="mdi:chevron-down"
                  className={`w-4 h-4 text-white transition-transform shrink-0 ${isMonthDropdownOpen ? 'rotate-180' : ''}`}
                />
              </div>

              {isMonthDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setIsMonthDropdownOpen(false)} />
                  <div className="absolute top-full right-0 mt-1 w-[150px] z-20 bg-white border border-whitesmoke-200 rounded-lg shadow-lg overflow-hidden">
                    {availableMonths.map((month, index) => (
                      <div
                        key={`${month.month}-${month.year}`}
                        onClick={() => { setSelectedMonth(month); setIsMonthDropdownOpen(false); }}
                        className={`w-full px-3 py-2 text-[12px] font-semibold text-center cursor-pointer transition-colors font-inter ${
                          selectedMonth.displayName === month.displayName
                            ? 'bg-darkslategray-200 text-white'
                            : 'text-darkslategray-100 hover:bg-whitesmoke-100'
                        } ${index !== availableMonths.length - 1 ? 'border-b border-whitesmoke-200' : ''}`}
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
        <div className="w-full rounded-[12.75px] bg-white border-whitesmoke-200 border-solid border-2 box-border overflow-hidden">
          <div className="w-full overflow-x-auto overflow-y-auto max-h-[600px]">
            <table className="w-full border-collapse" style={{ minWidth: '700px' }}>
              <thead className="sticky top-0 z-10">
                <tr className="bg-darkslategray-200 rounded-t-[12.75px]">
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
                    <td colSpan={TABLE_COLUMNS.length} className="py-12 text-center text-darkslategray-100 text-[13px]">
                      Loading billings...
                    </td>
                  </tr>
                )}

                {!isLoading && filteredBillings.length === 0 && (
                  <tr>
                    <td colSpan={TABLE_COLUMNS.length} className="py-12 text-center text-darkslategray-100 text-[13px]">
                      No billings found for {selectedMonth.displayName}
                    </td>
                  </tr>
                )}

                {!isLoading && filteredBillings.map((billing) => (
                  <BillingRow
                    key={billing._id}
                    billing={toRowBilling(billing)}
                    roomNumber={billing.roomNumber ? parseInt(billing.roomNumber) || 0 : 0}
                    tenantName={billing.tenantName}
                    onStatusChange={handleStatusChange}
                    onEditClick={handleEditClick}
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
        onClose={() => { setIsEditPopupOpen(false); setSelectedBilling(null); }}
        billing={selectedBilling}
        onSave={handleSaveEdit}
      />
    </>
  );
};

export default TenantBillingsTab;