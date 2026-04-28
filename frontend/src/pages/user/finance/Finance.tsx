<<<<<<< HEAD
import { FunctionComponent, useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import SideBar from '../../../components/user/SideBar';
import Footer from '../../../components/general/Footer';
import PaymentMethodsDropdown from '../../../components/user/finance/PaymentMethodsDropdown';
import SubmitReceipt from '../../../components/user/finance/SubmitReceipt';
import MonthlyExpensesChart from '../../../components/user/finance/MonthlyExpensesChart';
=======
import { type FunctionComponent, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import SideBar from "../../../components/user/SideBar";
import Footer from "../../../components/general/Footer";
import PaymentMethodsDropdown from "../../../components/user/finance/PaymentMethodsDropdown";
import SubmitReceipt from "../../../components/user/finance/SubmitReceipt";
import MonthlyExpensesChart from "../../../components/user/finance/MonthlyExpensesChart";
>>>>>>> af025055f14b35dfeb8093ed004226db6b313833
import type {
  TenantBilling,
  UpcomingPayment,
} from '../../../components/user/finance/types/tenantFinance';

// Mock data - replace with API calls
const fetchCurrentBilling = async (): Promise<TenantBilling | null> => {
  return {
    _id: 'billing_1',
    userId: 'user_1',
    unitId: 'unit_1',
    facilityId: 'facility_1',
    dueDate: '2026-04-15',
    paymentDate: null,
    paidAmount: null,
    totalAmount: 4950,
    paymentStatus: 'unpaid',
    breakdown: [
      { name: 'Monthly Rent', amount: 3000 },
      { name: 'Electricity', amount: 800 },
      { name: 'Water', amount: 350 },
      { name: 'Internet', amount: 500 },
      { name: 'Others', amount: 300 },
    ],
    createdAt: '2026-03-01',
    updatedAt: '2026-03-01',
  };
};

const fetchUpcomingPayments = async (): Promise<UpcomingPayment[]> => {
  return [
    {
      id: '1',
      dueDate: 'April 15, 2026',
      amount: 4950,
      billingId: 'billing_1',
    },
    { id: '2', dueDate: 'May 15, 2026', amount: 4950, billingId: 'billing_2' },
  ];
};

const getPaymentStatusDisplay = (status: string): { text: string; gradient: string } => {
  switch (status) {
    case 'paid':
      return {
        text: 'PAID',
        gradient: 'bg-gradient-to-b from-[#5dc2a8] to-[#0c8873] bg-clip-text text-transparent',
      };
    case 'overdue':
      return {
        text: 'OVERDUE',
        gradient: 'bg-gradient-to-b from-[#c00f0f] to-[#e44f4f] bg-clip-text text-transparent',
      };
    case 'partially_paid':
      return {
        text: 'PARTIAL',
        gradient: 'bg-gradient-to-t from-[#ffc273] to-[#fa7900] bg-clip-text text-transparent',
      };
    default:
      return {
        text: 'PENDING',
        gradient: 'bg-gradient-to-b from-[#c29722] to-[#f6b709] bg-clip-text text-transparent',
      };
  }
};

const TenantFinancePage: FunctionComponent = () => {
  const [currentBilling, setCurrentBilling] = useState<TenantBilling | null>(null);
  const [upcomingPayments, setUpcomingPayments] = useState<UpcomingPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitReceiptOpen, setIsSubmitReceiptOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<UpcomingPayment | null>(null);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const [billing, payments] = await Promise.all([
          fetchCurrentBilling(),
          fetchUpcomingPayments(),
        ]);
        setCurrentBilling(billing);
        setUpcomingPayments(payments);
      } catch (error) {
        console.error('Failed to load finance data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, []);

  const handlePayNow = (payment: UpcomingPayment) => {
    setSelectedPayment(payment);
    setIsSubmitReceiptOpen(true);
  };

  const handleCloseSubmitReceipt = () => {
    setIsSubmitReceiptOpen(false);
    setSelectedPayment(null);
  };

  const handleSubmitReceipt = (data: {
    referenceNo: string;
    paymentMethod: string;
    receiptFile: File | null;
  }) => {
    console.log('Submitting receipt for payment:', selectedPayment, data);
    handleCloseSubmitReceipt();
  };

  const paymentStatus = currentBilling
    ? getPaymentStatusDisplay(currentBilling.paymentStatus)
    : {
        text: 'PENDING',
        gradient: 'bg-gradient-to-b from-[#c29722] to-[#f6b709] bg-clip-text text-transparent',
      };

  const totalDue = currentBilling?.totalAmount || 0;
  const outstandingBalance = currentBilling?.paidAmount
    ? currentBilling.totalAmount - currentBilling.paidAmount
    : totalDue;

  const rentAmount =
    currentBilling?.breakdown.find((b) => b.name === 'Monthly Rent')?.amount || 3000;
  const electricityAmount =
    currentBilling?.breakdown.find((b) => b.name === 'Electricity')?.amount || 800;
  const waterAmount = currentBilling?.breakdown.find((b) => b.name === 'Water')?.amount || 350;
  const internetAmount =
    currentBilling?.breakdown.find((b) => b.name === 'Internet')?.amount || 500;
  const othersAmount = currentBilling?.breakdown.find((b) => b.name === 'Others')?.amount || 300;

  if (isLoading) {
    return (
      <div className="w-full min-h-screen relative overflow-y-auto flex items-start isolate gap-8">
        <SideBar />
        <div className="w-full flex flex-col items-start pr-4 lg:pr-20">
          <div className="flex-1 flex items-center justify-center py-20">
            <div className="text-center">Loading finance data...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full min-h-screen relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-[31.85px] text-darkslategray-200">
        <div className="w-full h-full absolute top-0 left-0 z-0 bg-gradient-to-b from-whitesmoke-100 to-white" />

        <div className="w-full overflow-hidden shrink-0 flex flex-col items-start z-1">
          <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-0 pl-0 pr-4 lg:pr-20">
            <div className="w-full flex-1 flex flex-col lg:flex-row items-start shrink-0">
              <SideBar />

              <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start justify-between gap-0 text-[14px] text-darkslategray-100 font-lora">
                <div className="self-stretch flex flex-col items-start pt-8 md:pt-12 lg:pt-16 pb-0 pl-4 md:pl-6 lg:pl-8 pr-4 lg:pr-20 box-border">
                  <div className="self-stretch flex flex-col items-start gap-3 shrink-0">
                    {/* Header */}
                    <div className="self-stretch flex flex-col items-center text-[24px] text-black font-inter">
                      <div className="self-stretch flex flex-col items-start justify-center gap-3">
                        <div className="self-stretch flex items-center justify-between gap-5 flex-wrap">
                          <div className="flex flex-col items-center justify-end">
                            <div className="flex items-center gap-10">
                              <b className="relative leading-8 shrink-0">Finance</b>
                            </div>
                          </div>
                        </div>
                        <div className="self-stretch h-0.5 rounded-[100px] bg-whitesmoke-200 overflow-hidden shrink-0" />
                      </div>

                      {/* Property Header */}
                      <div className="self-stretch flex flex-col items-start gap-6 md:gap-8 text-[14px] font-lora mt-6">
                        <div className="self-stretch flex flex-col items-start justify-center py-0 px-2 md:px-3 box-border gap-1">
                          <div className="self-stretch flex flex-col md:flex-row items-start md:items-center justify-between gap-3 md:gap-5 text-[20px] md:text-[24px] font-inter">
                            <b className="relative leading-8">One Sapphire Place</b>
                            <PaymentMethodsDropdown />
                          </div>
                          <div className="self-stretch flex items-start py-0 px-2 md:px-[11px] gap-2">
                            <Icon
                              icon="mdi-light:map-marker"
                              className="h-5 w-5 relative shrink-0"
                            />
                            <b className="flex-1 text-sm md:text-base break-words">
                              Lot 3, Block 17, Sapphire St, Umali Subd, Los Baños, Philippines, 4030
                            </b>
                          </div>
                          <div className="self-stretch flex items-center py-0 px-2 md:px-[11px] gap-2">
                            <Icon icon="mdi-light:phone" className="h-5 w-5 relative shrink-0" />
                            <b className="flex-1 text-sm md:text-base">0969 014 8776</b>
                          </div>
                        </div>

                        {/* Three Column Layout */}
                        <div className="self-stretch flex flex-col lg:flex-row items-stretch gap-4 md:gap-3 text-teal font-inter">
                          {/* Left Column - Total Due and Cost Breakdown */}
                          <div className="w-full lg:w-[300px] rounded-[16px] overflow-hidden shrink-0 flex flex-col items-start gap-2.5">
                            {/* Total Due Card */}
                            <div className="self-stretch rounded-[16px] bg-lightcyan-200 overflow-hidden flex flex-col items-start p-3 md:p-4 gap-2.5">
                              <b className="relative text-sm md:text-base">Total Due</b>
                              <div className="flex items-start gap-2.5 text-[20px] md:text-[24px]">
                                <b className="relative leading-8">Php</b>
                                <b className="relative leading-8">{totalDue.toFixed(2)}</b>
                              </div>
                            </div>

                            {/* Cost Breakdown */}
                            <div className="self-stretch flex flex-col items-start gap-1 text-[16px] md:text-[18px] text-black">
                              <div className="self-stretch overflow-hidden flex flex-col items-start py-2 px-2">
                                <b className="self-stretch relative tracking-[-0.01em]">
                                  Cost Breakdown
                                </b>
                              </div>
                              <div className="self-stretch rounded-[16px] border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex flex-col items-start p-2.5 md:p-3 gap-2.5 text-center text-[12px] md:text-[14px]">
                                <div className="self-stretch flex items-start justify-center gap-2.5">
                                  <b className="flex-1 relative">Description</b>
                                  <b className="flex-1 relative">Amount</b>
                                </div>
                                <div className="self-stretch flex flex-col items-start gap-2 text-[10px] md:text-[12px] font-lora w-full">
                                  <div className="self-stretch flex items-start justify-between py-2 px-0">
                                    <div className="flex-1 tracking-[0.02em] font-semibold">
                                      Monthly Rent
                                    </div>
                                    <div className="flex-1 tracking-[0.02em] font-semibold text-left">
                                      Php {rentAmount.toFixed(2)}
                                    </div>
                                  </div>
                                  <div className="self-stretch flex items-start justify-between py-2 px-0">
                                    <div className="flex-1 tracking-[0.02em] font-semibold">
                                      Electricity
                                    </div>
                                    <div className="flex-1 tracking-[0.02em] font-semibold text-left">
                                      Php {electricityAmount.toFixed(2)}
                                    </div>
                                  </div>
                                  <div className="self-stretch flex items-start justify-between py-2 px-0">
                                    <div className="flex-1 tracking-[0.02em] font-semibold">
                                      Water
                                    </div>
                                    <div className="flex-1 tracking-[0.02em] font-semibold text-left">
                                      Php {waterAmount.toFixed(2)}
                                    </div>
                                  </div>
                                  <div className="self-stretch flex items-start justify-between py-2 px-0">
                                    <div className="flex-1 tracking-[0.02em] font-semibold">
                                      Internet
                                    </div>
                                    <div className="flex-1 tracking-[0.02em] font-semibold text-left">
                                      Php {internetAmount.toFixed(2)}
                                    </div>
                                  </div>
                                  <div className="self-stretch flex items-start justify-between py-2 px-0">
                                    <div className="flex-1 tracking-[0.02em] font-semibold">
                                      Others
                                    </div>
                                    <div className="flex-1 tracking-[0.02em] font-semibold text-left">
                                      Php {othersAmount.toFixed(2)}
                                    </div>
                                  </div>
                                </div>
                                <div className="self-stretch flex items-start justify-between gap-2.5 text-teal pt-2 border-t border-whitesmoke-200">
                                  <b className="flex-1 relative">Total</b>
                                  <b className="flex-1 relative">Php {totalDue.toFixed(2)}</b>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Middle Column - Right Side content */}
                          <div className="flex-1 rounded-[16px] overflow-hidden flex flex-col items-center gap-2.5">
                            {/* Outstanding Balance and Payment Status Row */}
                            <div className="self-stretch flex flex-col sm:flex-row items-stretch gap-2">
                              <div className="flex-1 rounded-[16px] bg-white border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex flex-col items-start p-3 md:p-4 gap-2.5">
                                <b className="relative text-sm md:text-base">Outstanding Balance</b>
                                <div className="flex items-start gap-2.5 text-[20px] md:text-[24px]">
                                  <b className="relative leading-8">Php</b>
                                  <b className="relative leading-8">
                                    {outstandingBalance.toFixed(2)}
                                  </b>
                                </div>
                              </div>
                              <div className="flex-1 rounded-[16px] bg-white border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex flex-col items-start p-3 md:p-4 gap-2.5">
                                <b className="relative text-sm md:text-base">Payment Status</b>
                                <div className="flex items-start text-[20px] md:text-[24px]">
                                  <div
                                    className={`relative leading-8 font-extrabold bg-clip-text text-transparent ${paymentStatus.gradient}`}
                                  >
                                    {paymentStatus.text}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Monthly Expenses Chart */}
                            <div className="self-stretch w-full overflow-x-auto">
                              <MonthlyExpensesChart />
                            </div>

                            {/* Upcoming Payments */}
                            <div className="self-stretch overflow-hidden flex flex-col items-start p-2 md:p-2.5 gap-2.5 text-left text-[14px] font-inter">
                              <b className="self-stretch text-[16px] md:text-[18px] tracking-[-0.01em]">
                                Upcoming Payments
                              </b>
                              <div className="self-stretch h-0.5 border-whitesmoke-200 border-solid border-[1px]" />

                              {upcomingPayments.map((payment) => (
                                <div
                                  key={payment.id}
                                  className="self-stretch rounded-lg border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 px-3 gap-3"
                                >
                                  <div className="self-stretch flex items-center gap-2.5">
                                    <div className="h-5 w-5 rounded-[4px] bg-gradient-to-b from-[#c29722] to-[#f6b709] overflow-hidden shrink-0" />
                                    <div className="overflow-hidden flex flex-col items-start gap-1">
                                      <div className="font-semibold shrink-0 text-sm md:text-base">
                                        {payment.dueDate}
                                      </div>
                                      <div className="text-[11px] md:text-[12px] tracking-[0.02em] font-semibold font-lora text-dimgray shrink-0">
                                        Php {payment.amount.toFixed(2)}
                                      </div>
                                    </div>
                                  </div>
                                  <button
                                    onClick={() => handlePayNow(payment)}
                                    className="w-full sm:w-[90px] rounded-[12px] bg-lightcyan-100 overflow-hidden shrink-0 flex items-center justify-center py-2.5 px-3 cursor-pointer text-center text-teal hover:opacity-90 transition-opacity whitespace-nowrap"
                                  >
                                    <div className="font-semibold text-sm">Pay Now</div>
                                  </button>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Rightmost Column - Overview with Billing History */}
                          <div className="w-full lg:w-[180px] rounded-[16px] border-whitesmoke-200 border-solid border-[1px] box-border overflow-hidden shrink-0 flex flex-col items-start py-2.5 px-0 gap-2 text-center text-[20px] md:text-[24px]">
                            <div className="self-stretch rounded-[16px] bg-white overflow-hidden flex flex-col items-start p-3">
                              <div className="self-stretch relative leading-8 font-extrabold text-base md:text-xl">
                                Overview
                              </div>
                            </div>
                            <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-1 px-0 gap-2.5 text-[14px] text-darkslategray-100">
                              <b className="self-stretch relative text-sm md:text-base">
                                Billing History
                              </b>
                              <div className="self-stretch flex-1 overflow-hidden flex flex-col items-start py-0 px-2 md:px-3 gap-2 text-left text-[11px] md:text-[12px]">
                                <div className="self-stretch rounded-lg border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex items-center py-2 px-3">
                                  <div className="self-stretch overflow-hidden flex flex-col items-start gap-1">
                                    <div className="font-semibold">January 15, 2026</div>
                                    <div className="text-[9px] md:text-[10px] tracking-[0.04em] font-semibold font-lora text-dimgray">
                                      Php 4500.00
                                    </div>
                                  </div>
                                </div>
                                <div className="self-stretch rounded-lg border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex items-center py-2 px-3">
                                  <div className="self-stretch overflow-hidden flex flex-col items-start gap-1">
                                    <div className="font-semibold">February 15, 2026</div>
                                    <div className="text-[9px] md:text-[10px] tracking-[0.04em] font-semibold font-lora text-dimgray">
                                      Php 4500.00
                                    </div>
                                  </div>
                                </div>
                                <div className="self-stretch rounded-lg border-whitesmoke-200 border-solid border-[1px] overflow-hidden flex items-center py-2 px-3">
                                  <div className="self-stretch overflow-hidden flex flex-col items-start gap-1">
                                    <div className="font-semibold">March 15, 2026</div>
                                    <div className="text-[9px] md:text-[10px] tracking-[0.04em] font-semibold font-lora text-dimgray">
                                      Php 4500.00
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer  */}
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Submit Receipt Popup */}
      {selectedPayment && (
        <SubmitReceipt
          isOpen={isSubmitReceiptOpen}
          onClose={handleCloseSubmitReceipt}
          dueDate={selectedPayment.dueDate}
          dueAmount={selectedPayment.amount}
          onSubmit={handleSubmitReceipt}
        />
      )}
    </>
  );
};

export default TenantFinancePage;
