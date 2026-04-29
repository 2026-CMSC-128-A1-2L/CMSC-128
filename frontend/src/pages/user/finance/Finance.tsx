import { type FunctionComponent, useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import SideBar from "../../../components/user/SideBar";
import Footer from "../../../components/general/Footer";
import PaymentMethodsDropdown from "../../../components/user/finance/PaymentMethodsDropdown";
import SubmitReceipt from "../../../components/user/finance/SubmitReceipt";
import MonthlyExpensesChart from "../../../components/user/finance/MonthlyExpensesChart";
import type {
  TenantBilling,
  UpcomingPayment,
} from "../../../components/user/finance/types/tenantFinance";

// Mock data - replace with API calls
const fetchCurrentBilling = async (): Promise<TenantBilling | null> => {
  return {
    _id: "billing_1",
    userId: "user_1",
    unitId: "unit_1",
    facilityId: "facility_1",
    dueDate: "2026-04-15",
    paymentDate: null,
    paidAmount: null,
    totalAmount: 4950,
    paymentStatus: "unpaid",
    breakdown: [
      { name: "Monthly Rent", amount: 3000 },
      { name: "Electricity", amount: 800 },
      { name: "Water", amount: 350 },
      { name: "Internet", amount: 500 },
      { name: "Others", amount: 300 },
    ],
    createdAt: "2026-03-01",
    updatedAt: "2026-03-01",
  };
};

const fetchUpcomingPayments = async (): Promise<UpcomingPayment[]> => {
  return [
    {
      id: "1",
      dueDate: "April 15, 2026",
      amount: 4950,
      billingId: "billing_1",
    },
    { id: "2", dueDate: "May 15, 2026", amount: 4950, billingId: "billing_2" },
  ];
};

const getPaymentStatusDisplay = (
  status: string,
): { text: string; gradient: string } => {
  switch (status) {
    case "paid":
      return {
        text: "PAID",
        gradient:
          "bg-gradient-to-b from-[#5dc2a8] to-[#0c8873] bg-clip-text text-transparent",
      };
    case "overdue":
      return {
        text: "OVERDUE",
        gradient:
          "bg-gradient-to-b from-[#c00f0f] to-[#e44f4f] bg-clip-text text-transparent",
      };
    case "partially_paid":
      return {
        text: "PARTIAL",
        gradient:
          "bg-gradient-to-t from-[#ffc273] to-[#fa7900] bg-clip-text text-transparent",
      };
    default:
      return {
        text: "PENDING",
        gradient:
          "bg-gradient-to-b from-[#c29722] to-[#f6b709] bg-clip-text text-transparent",
      };
  }
};

const TenantFinancePage: FunctionComponent = () => {
  const [currentBilling, setCurrentBilling] = useState<TenantBilling | null>(
    null,
  );
  const [upcomingPayments, setUpcomingPayments] = useState<UpcomingPayment[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitReceiptOpen, setIsSubmitReceiptOpen] = useState(false);
  const [selectedPayment, setSelectedPayment] =
    useState<UpcomingPayment | null>(null);

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
        console.error("Failed to load finance data:", error);
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
    console.log("Submitting receipt for payment:", selectedPayment, data);
    handleCloseSubmitReceipt();
  };

  const paymentStatus = currentBilling
    ? getPaymentStatusDisplay(currentBilling.paymentStatus)
    : {
        text: "PENDING",
        gradient:
          "bg-gradient-to-b from-[#c29722] to-[#f6b709] bg-clip-text text-transparent",
      };

  const totalDue = currentBilling?.totalAmount || 0;
  const outstandingBalance = currentBilling?.paidAmount
    ? currentBilling.totalAmount - currentBilling.paidAmount
    : totalDue;

  const rentAmount =
    currentBilling?.breakdown.find((b) => b.name === "Monthly Rent")?.amount ||
    3000;
  const electricityAmount =
    currentBilling?.breakdown.find((b) => b.name === "Electricity")?.amount ||
    800;
  const waterAmount =
    currentBilling?.breakdown.find((b) => b.name === "Water")?.amount || 350;
  const internetAmount =
    currentBilling?.breakdown.find((b) => b.name === "Internet")?.amount || 500;
  const othersAmount =
    currentBilling?.breakdown.find((b) => b.name === "Others")?.amount || 300;

  const layout = (content: React.ReactNode) => (
    <div className="flex min-h-screen font-inter text-darkslategray">
      <div className="sticky top-0 h-screen shrink-0 z-10">
        <SideBar />
      </div>
      <div className="flex flex-1 flex-col min-w-0 overflow-y-auto">
        {content}
      </div>
    </div>
  );

  if (isLoading)
    return layout(
      <div className="flex-1 flex items-center justify-center py-20">
        <div>Loading finance data...</div>
      </div>,
    );

  return (
    <>
      {layout(
        <>
          <div className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 lg:pt-16 pb-0">
            {/* Header */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center justify-between gap-5 flex-wrap">
                <b className="text-2xl text-black font-inter">Finance</b>
              </div>
              <div className="h-0.5 rounded-full bg-whitesmoke-200" />
            </div>

            {/* Property info */}
            <div className="flex flex-col gap-1 px-2 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <b className="text-xl md:text-2xl font-inter">
                  One Sapphire Place
                </b>
                <PaymentMethodsDropdown />
              </div>
              <div className="flex items-start gap-2 px-2">
                <Icon
                  icon="mdi-light:map-marker"
                  className="h-5 w-5 shrink-0 mt-0.5"
                />
                <b className="text-sm break-words">
                  Lot 3, Block 17, Sapphire St, Umali Subd, Los Baños,
                  Philippines, 4030
                </b>
              </div>
              <div className="flex items-center gap-2 px-2">
                <Icon icon="mdi-light:phone" className="h-5 w-5 shrink-0" />
                <b className="text-sm">0969 014 8776</b>
              </div>
            </div>

            {/* Three column layout */}
            <div className="flex flex-col lg:flex-row items-stretch gap-4 text-teal font-inter">
              {/* Left — Total Due + Breakdown */}
              <div className="w-full lg:w-[300px] shrink-0 flex flex-col gap-2.5">
                <div className="rounded-2xl bg-lightcyan-200 p-3 md:p-4 flex flex-col gap-2.5">
                  <b className="text-sm md:text-base">Total Due</b>
                  <div className="flex gap-2.5 text-xl md:text-2xl">
                    <b>Php</b>
                    <b>{totalDue.toFixed(2)}</b>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-black">
                  <div className="py-2 px-2">
                    <b className="text-lg tracking-tight">Cost Breakdown</b>
                  </div>
                  <div className="rounded-2xl border border-whitesmoke-200 p-2.5 md:p-3 flex flex-col gap-2.5 text-xs md:text-sm text-center">
                    <div className="flex justify-center gap-2.5">
                      <b className="flex-1">Description</b>
                      <b className="flex-1">Amount</b>
                    </div>
                    <div className="flex flex-col gap-2 font-lora text-left text-[10px] md:text-xs">
                      {[
                        ["Monthly Rent", rentAmount],
                        ["Electricity", electricityAmount],
                        ["Water", waterAmount],
                        ["Internet", internetAmount],
                        ["Others", othersAmount],
                      ].map(([label, amt]) => (
                        <div
                          key={label as string}
                          className="flex justify-between py-2"
                        >
                          <span className="flex-1 font-semibold tracking-wide">
                            {label}
                          </span>
                          <span className="flex-1 font-semibold tracking-wide">
                            Php {(amt as number).toFixed(2)}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between gap-2.5 text-teal pt-2 border-t border-whitesmoke-200">
                      <b className="flex-1">Total</b>
                      <b className="flex-1">Php {totalDue.toFixed(2)}</b>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle */}
              <div className="flex-1 flex flex-col gap-2.5">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 rounded-2xl bg-white border border-whitesmoke-200 p-3 md:p-4 flex flex-col gap-2.5">
                    <b className="text-sm md:text-base">Outstanding Balance</b>
                    <div className="flex gap-2.5 text-xl md:text-2xl">
                      <b>Php</b>
                      <b>{outstandingBalance.toFixed(2)}</b>
                    </div>
                  </div>
                  <div className="flex-1 rounded-2xl bg-white border border-whitesmoke-200 p-3 md:p-4 flex flex-col gap-2.5">
                    <b className="text-sm md:text-base">Payment Status</b>
                    <b
                      className={`text-xl md:text-2xl leading-8 bg-clip-text text-transparent ${paymentStatus.gradient}`}
                    >
                      {paymentStatus.text}
                    </b>
                  </div>
                </div>
                <div className="w-full overflow-x-auto">
                  <MonthlyExpensesChart />
                </div>
                <div className="flex flex-col gap-2.5 p-2 md:p-2.5 font-inter text-sm">
                  <b className="text-base md:text-lg tracking-tight">
                    Upcoming Payments
                  </b>
                  <div className="h-0.5 border border-whitesmoke-200" />
                  {upcomingPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="rounded-lg border border-whitesmoke-200 flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 px-3 gap-3"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className="h-5 w-5 rounded-[4px] bg-gradient-to-b from-[#c29722] to-[#f6b709] shrink-0" />
                        <div className="flex flex-col gap-1">
                          <div className="font-semibold">{payment.dueDate}</div>
                          <div className="text-[11px] font-semibold font-lora text-dimgray">
                            Php {payment.amount.toFixed(2)}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => handlePayNow(payment)}
                        className="w-full sm:w-[90px] rounded-xl bg-lightcyan-100 py-2.5 px-3 text-teal font-semibold hover:opacity-90 transition-opacity whitespace-nowrap text-center"
                      >
                        Pay Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Overview */}
              <div className="w-full lg:w-[180px] shrink-0 rounded-2xl border border-whitesmoke-200 flex flex-col py-2.5 gap-2">
                <div className="rounded-2xl bg-white p-3">
                  <b className="text-base md:text-xl">Overview</b>
                </div>
                <div className="flex flex-col gap-2.5 px-0">
                  <b className="text-sm md:text-base px-2">Billing History</b>
                  <div className="flex flex-col gap-2 px-2 md:px-3 text-xs">
                    {[
                      ["January 15, 2026", 4500],
                      ["February 15, 2026", 4500],
                      ["March 15, 2026", 4500],
                    ].map(([date, amt]) => (
                      <div
                        key={date as string}
                        className="rounded-lg border border-whitesmoke-200 flex flex-col py-2 px-3 gap-1"
                      >
                        <div className="font-semibold">{date}</div>
                        <div className="text-[10px] font-semibold font-lora text-dimgray">
                          Php {(amt as number).toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>,
      )}
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
