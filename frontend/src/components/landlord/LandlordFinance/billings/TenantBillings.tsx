import { FunctionComponent, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import BillingRow from './BillingRow';
import AddBillingPopup from './AddBillingPopup';
import EditBillingPopup from './EditBillingPopup';
import type { Billing } from '../types/billing';

const TABLE_COLUMNS = [
  { label: 'Room', className: 'w-[8%] min-w-[60px]' },
  { label: 'Tenant Name', className: 'w-[18%] min-w-[140px]' },
  { label: 'Rent', className: 'w-[9%] min-w-[80px]' },
  { label: 'Utilities', className: 'w-[9%] min-w-[80px]' },
  { label: 'Misc.', className: 'w-[9%] min-w-[80px]' },
  { label: 'Total Due', className: 'w-[9%] min-w-[80px]' },
  { label: 'Amount Paid', className: 'w-[10%] min-w-[80px]' },
  { label: 'Status', className: 'w-[18%] min-w-[120px]' },
];

// Mock data - replace with API call
const fetchBillings = async (month: Date): Promise<Billing[]> => {
  const mockBillings: Billing[] = [
    {
      _id: '1',
      userId: 'user1',
      unitId: 'unit1',
      facilityId: 'facility1',
      dueDate: '2024-03-31',
      paymentDate: '2024-03-15',
      paidAmount: 4500,
      totalAmount: 4500,
      paymentStatus: 'paid',
      documents: [],
      breakdown: [
        { name: 'Rent', amount: 3000 },
        { name: 'Utilities', amount: 1500 },
        { name: 'Misc. Fees', amount: 0 },
      ],
      createdAt: '2024-03-01',
      updatedAt: '2024-03-15',
    },
    {
      _id: '2',
      userId: 'user2',
      unitId: 'unit2',
      facilityId: 'facility1',
      dueDate: '2024-03-31',
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
      createdAt: '2024-03-01',
      updatedAt: '2024-03-10',
    },
    {
      _id: '3',
      userId: 'user3',
      unitId: 'unit3',
      facilityId: 'facility1',
      dueDate: '2024-03-31',
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
      createdAt: '2024-03-01',
      updatedAt: '2024-03-01',
    },
    {
      _id: '4',
      userId: 'user4',
      unitId: 'unit4',
      facilityId: 'facility1',
      dueDate: '2024-03-31',
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
      createdAt: '2024-03-01',
      updatedAt: '2024-03-01',
    },
  ];

  return mockBillings;
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
      year: year,
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
  const roomMap: Record<string, number> = {
    unit1: 1,
    unit2: 2,
    unit3: 3,
    unit4: 4,
  };
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

  useEffect(() => {
    const loadBillings = async () => {
      setIsLoading(true);
      try {
        const data = await fetchBillings(selectedMonth.startDate);
        setBillings(data);
      } catch (error) {
        console.error('Failed to load billings:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadBillings();
  }, [selectedMonth]);

  const handleStatusChange = async (billingId: string, status: Billing['paymentStatus']) => {
    console.log(`Billing ${billingId} status changed to ${status}`);
    setBillings((prev) =>
      prev.map((b) => (b._id === billingId ? { ...b, paymentStatus: status } : b)),
    );
  };

  const handleAddBilling = () => {
    setIsAddPopupOpen(true);
  };

  const handleCloseAddPopup = () => {
    setIsAddPopupOpen(false);
  };

  const handleEditClick = (billing: Billing) => {
    setSelectedBilling(billing);
    setIsEditPopupOpen(true);
  };

  const handleCloseEditPopup = () => {
    setIsEditPopupOpen(false);
    setSelectedBilling(null);
  };

  const handleSaveEdit = async (updatedBilling: Billing) => {
    setBillings((prev) => prev.map((b) => (b._id === updatedBilling._id ? updatedBilling : b)));
    handleCloseEditPopup();
  };

  const handleAddSubmit = async (data: {
    room: string;
    fullName: string;
    rent: number;
    utilities: number;
    miscFees: number;
  }) => {
    console.log('Add billing:', data);
    handleCloseAddPopup();
  };

  const handleMonthSelect = (month: any) => {
    setSelectedMonth(month);
    setIsMonthDropdownOpen(false);
  };

  const availableMonths = getAvailableMonths();
  const availableRooms = getAvailableRooms();

  return (
    <>
      <div className="flex flex-col items-end gap-4 text-left text-[18px] font-inter w-full">
        <div className="self-stretch flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-5 shrink-0">
          <b className="h-6 w-full sm:w-auto relative tracking-[-0.01em] flex items-center shrink-0 text-gray text-[20px] sm:text-[24px]">
            Tenant Billing Status
          </b>
          <div className="flex items-center gap-3 text-[10px] text-teal flex-wrap">
            {/* Add Billing */}
            <div
              onClick={handleAddBilling}
              className="rounded-[10px] bg-lightcyan flex items-center py-2 px-4 sm:px-6 gap-2 sm:gap-3 shrink-0 cursor-pointer hover:opacity-90 transition-opacity"
            >
              <Icon icon="mdi:plus" className="h-3 w-3" />
              <b className="h-[17px] flex items-center shrink-0 text-[12px] sm:text-[12px]">
                Add Billing
              </b>
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
                        onClick={() => handleMonthSelect(month)}
                        className={`w-full px-3 py-2 text-[12px] font-semibold text-center cursor-pointer transition-colors font-inter ${
                          selectedMonth.displayName === month.displayName
                            ? 'bg-darkslategray-200 text-white'
                            : 'text-darkslategray-100 hover:bg-gray-100'
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

        <div className="w-full rounded-[12.75px] bg-white border-whitesmoke-200 border-solid border-[2px] box-border overflow-hidden relative">
          <div className="w-full overflow-x-hidden">
            <div className="w-full h-12 rounded-t-[12.75px] bg-darkslategray-200 flex items-center px-6 gap-4 text-[12px] sm:text-[14px] text-white font-inter">
              {TABLE_COLUMNS.map(({ label, className }) => (
                <div key={label} className={`${className} flex-shrink-0`}>
                  <b className="flex items-center justify-center">{label}</b>
                </div>
              ))}
            </div>

            {/* Table body */}
            <div className="w-full overflow-y-auto max-h-[600px] overflow-x-hidden">
              {/* Loading state */}
              {isLoading && (
                <div className="w-full py-12 text-center text-darkslategray-100">
                  Loading billings...
                </div>
              )}

              {/* No data state */}
              {!isLoading && billings.length === 0 && (
                <div className="w-full py-12 text-center text-darkslategray-100">
                  No billings found for {selectedMonth.displayName}
                </div>
              )}

              {/* Tenant rows */}
              {!isLoading &&
                billings.map((billing) => (
                  <div key={billing._id} className="relative">
                    <BillingRow
                      billing={billing}
                      roomNumber={getRoomNumber(billing)}
                      tenantName={getTenantName(billing)}
                      onStatusChange={handleStatusChange}
                      onEditClick={handleEditClick}
                      isOpen={openDropdownId === billing._id}
                      onToggle={(id) => setOpenDropdownId(openDropdownId === id ? null : id)}
                    />
                  </div>
                ))}

              <div className="h-[200px]" />
            </div>
          </div>
        </div>
      </div>

      {/* Popups */}
      <AddBillingPopup
        isOpen={isAddPopupOpen}
        onClose={handleCloseAddPopup}
        availableRooms={availableRooms}
        selectedMonth={selectedMonth.displayName}
        onSubmit={handleAddSubmit}
      />

      <EditBillingPopup
        isOpen={isEditPopupOpen}
        onClose={handleCloseEditPopup}
        billing={selectedBilling}
        onSave={handleSaveEdit}
      />
    </>
  );
};

export default TenantBillingsTab;
