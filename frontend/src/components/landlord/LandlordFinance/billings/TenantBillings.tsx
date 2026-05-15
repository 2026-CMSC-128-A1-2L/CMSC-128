import { type FunctionComponent, useState, useEffect, useCallback } from 'react';
import { Icon } from '@iconify/react';
import BillingRow from './BillingRow';
import AddBillingPopup from './AddBillingPopup';
import EditBillingPopup from './EditBillingPopup';
import type { Billing } from '../types/billing';

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

// Mock data by month - replace with API call
const fetchBillingsByMonth = async (month: string, year: number): Promise<Billing[]> => {
  const mockData: Record<string, Billing[]> = {
    'March 2026': [
      {
        _id: '1',
        userId: 'user1',
        unitId: 'unit1',
        facilityId: 'facility1',
        dueDate: '2026-03-31',
        paymentDate: '2026-03-15',
        paidAmount: 4500,
        totalAmount: 4500,
        paymentStatus: 'paid',
        documents: [],
        breakdown: [
          { name: 'Rent', amount: 3000 },
          { name: 'Utilities', amount: 1500 },
          { name: 'Misc. Fees', amount: 0 },
        ],
        createdAt: '2026-03-01',
        updatedAt: '2026-03-15',
      },
      {
        _id: '2',
        userId: 'user2',
        unitId: 'unit2',
        facilityId: 'facility1',
        dueDate: '2026-03-31',
        paymentDate: null,
        paidAmount: 1850,
        totalAmount: 4850,
        paymentStatus: 'partially_paid',
        documents: [],
        breakdown: [
          { name: 'Rent', amount: 3000 },
          { name: 'Utilities', amount: 1700 },
          { name: 'Misc. Fees', amount: 150 },
        ],
        createdAt: '2026-03-01',
        updatedAt: '2026-03-10',
      },
      {
        _id: '3',
        userId: 'user3',
        unitId: 'unit3',
        facilityId: 'facility1',
        dueDate: '2026-03-31',
        paymentDate: null,
        paidAmount: null,
        totalAmount: 4300,
        paymentStatus: 'unpaid',
        documents: [],
        breakdown: [
          { name: 'Rent', amount: 3000 },
          { name: 'Utilities', amount: 1300 },
          { name: 'Misc. Fees', amount: 0 },
        ],
        createdAt: '2026-03-01',
        updatedAt: '2026-03-01',
      },
      {
        _id: '4',
        userId: 'user4',
        unitId: 'unit4',
        facilityId: 'facility1',
        dueDate: '2026-03-31',
        paymentDate: null,
        paidAmount: null,
        totalAmount: 4500,
        paymentStatus: 'unpaid',
        documents: [],
        breakdown: [
          { name: 'Rent', amount: 3000 },
          { name: 'Utilities', amount: 1450 },
          { name: 'Misc. Fees', amount: 50 },
        ],
        createdAt: '2026-03-01',
        updatedAt: '2026-03-01',
      },
    ],
    'February 2026': [
      {
        _id: '5',
        userId: 'user1',
        unitId: 'unit1',
        facilityId: 'facility1',
        dueDate: '2026-02-28',
        paymentDate: '2026-02-20',
        paidAmount: 4500,
        totalAmount: 4500,
        paymentStatus: 'paid',
        documents: [],
        breakdown: [
          { name: 'Rent', amount: 3000 },
          { name: 'Utilities', amount: 1500 },
          { name: 'Misc. Fees', amount: 0 },
        ],
        createdAt: '2026-02-01',
        updatedAt: '2026-02-20',
      },
      {
        _id: '6',
        userId: 'user2',
        unitId: 'unit2',
        facilityId: 'facility1',
        dueDate: '2026-02-28',
        paymentDate: '2026-02-25',
        paidAmount: 4500,
        totalAmount: 4500,
        paymentStatus: 'paid',
        documents: [],
        breakdown: [
          { name: 'Rent', amount: 3000 },
          { name: 'Utilities', amount: 1500 },
          { name: 'Misc. Fees', amount: 0 },
        ],
        createdAt: '2026-02-01',
        updatedAt: '2026-02-25',
      },
    ],
    'January 2026': [
      {
        _id: '7',
        userId: 'user1',
        unitId: 'unit1',
        facilityId: 'facility1',
        dueDate: '2026-01-31',
        paymentDate: '2026-01-25',
        paidAmount: 4500,
        totalAmount: 4500,
        paymentStatus: 'paid',
        documents: [],
        breakdown: [
          { name: 'Rent', amount: 3000 },
          { name: 'Utilities', amount: 1500 },
          { name: 'Misc. Fees', amount: 0 },
        ],
        createdAt: '2026-01-01',
        updatedAt: '2026-01-25',
      },
    ],
  };

  const key = `${month} ${year}`;
  return mockData[key] || [];
};

const getAvailableMonths = () => {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const availableMonths = [];

  for (let i = 0; i <= 2; i++) {
    let monthIndex = currentMonth - i;
    let year = currentYear;
    if (monthIndex < 0) {
      monthIndex += 12;
      year -= 1;
    }
    availableMonths.push({
      name: months[monthIndex],
      month: monthIndex,
      year,
      displayName: `${months[monthIndex]} ${year}`,
      startDate: new Date(year, monthIndex, 1),
      endDate: new Date(year, monthIndex + 1, 0),
    });
  }

  return availableMonths;
};

const getAvailableRooms = () => {
  const existingRoomNumbers = [1, 2, 3, 4];
  const ALL_ROOMS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return ALL_ROOMS.filter((room) => !existingRoomNumbers.includes(room));
};

const getRoomNumber = (billing: Billing): number => {
  const roomMap: Record<string, number> = { unit1: 1, unit2: 2, unit3: 3, unit4: 4 };
  return roomMap[billing.unitId] || 0;
};

const getTenantName = (billing: Billing): string => {
  const nameMap: Record<string, string> = {
    unit1: 'Daphne Canape',
    unit2: 'Quevin Custodio',
    unit3: 'Nathaniel Cunanan',
    unit4: 'Alan Vender',
  };
  return nameMap[billing.unitId] || '';
};

const TenantBillingsTab: FunctionComponent = () => {
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [isAddPopupOpen, setIsAddPopupOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [selectedBilling, setSelectedBilling] = useState<Billing | null>(null);
  const [billings, setBillings] = useState<Billing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(getAvailableMonths()[0]);

  const loadBillings = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchBillingsByMonth(selectedMonth.name, selectedMonth.year);
      setBillings(data);
    } catch (error) {
      console.error('Failed to load billings:', error);
    } finally {
      setIsLoading(false);
    }
  }, [selectedMonth]);

  useEffect(() => {
    loadBillings();
  }, [loadBillings]);

  const handleStatusChange = async (billingId: string, status: Billing['paymentStatus']) => {
    setBillings((prev) =>
      prev.map((b) => (b._id === billingId ? { ...b, paymentStatus: status } : b)),
    );
  };

  const handleEditClick = (billing: Billing) => {
    setSelectedBilling(billing);
    setIsEditPopupOpen(true);
  };

  const handleSaveEdit = async (updatedBilling: Billing) => {
    setBillings((prev) => prev.map((b) => (b._id === updatedBilling._id ? updatedBilling : b)));
    setIsEditPopupOpen(false);
    setSelectedBilling(null);
  };

  const handleAddSubmit = async (data: {
    room: string;
    fullName: string;
    rent: number;
    utilities: number;
    miscFees: number;
  }) => {
    console.log('Add billing:', data);
    setIsAddPopupOpen(false);
    await loadBillings();
  };

  const availableMonths = getAvailableMonths();
  const availableRooms = getAvailableRooms();

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
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsMonthDropdownOpen(false)}
                  />
                  <div className="absolute top-full right-0 mt-1 w-[150px] z-20 bg-white border border-whitesmoke-200 rounded-lg shadow-lg overflow-hidden">
                    {availableMonths.map((month, index) => (
                      <div
                        key={`${month.month}-${month.year}`}
                        onClick={() => {
                          setSelectedMonth(month);
                          setIsMonthDropdownOpen(false);
                        }}
                        className={`w-full px-3 py-2 text-[12px] font-semibold text-center cursor-pointer transition-colors font-inter ${
                          selectedMonth.displayName === month.displayName
                            ? 'bg-darkslategray-200 text-white'
                            : 'text-darkslategray-100 hover:bg-whitesmoke-100 hover:text-darkslategray-200'
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
                    <td
                      colSpan={TABLE_COLUMNS.length}
                      className="py-12 text-center text-darkslategray-100 text-[13px]"
                    >
                      Loading billings...
                    </td>
                  </tr>
                )}

                {!isLoading && billings.length === 0 && (
                  <tr>
                    <td
                      colSpan={TABLE_COLUMNS.length}
                      className="py-12 text-center text-darkslategray-100 text-[13px]"
                    >
                      No billings found for {selectedMonth.displayName}
                    </td>
                  </tr>
                )}

                {!isLoading &&
                  billings.map((billing) => (
                    <BillingRow
                      key={billing._id}
                      billing={billing}
                      roomNumber={getRoomNumber(billing)}
                      tenantName={getTenantName(billing)}
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
        availableRooms={availableRooms}
        selectedMonth={selectedMonth.displayName}
        onSubmit={handleAddSubmit}
      />

      <EditBillingPopup
        isOpen={isEditPopupOpen}
        onClose={() => {
          setIsEditPopupOpen(false);
          setSelectedBilling(null);
        }}
        billing={selectedBilling}
        onSave={handleSaveEdit}
      />
    </>
  );
};

export default TenantBillingsTab;
