import { type FunctionComponent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import SideBar from '../../../components/user/SideBar';
import Footer from '../../../components/general/Footer';
import PageBackground from '../../../components/general/PageBackground';
import DownloadBillings from '../../../components/user/finance/DownloadBillings';
import SubmitReceipt from '../../../components/user/finance/SubmitReceipt';
import MonthlyExpensesChart from '../../../components/user/finance/MonthlyExpensesChart';
import { useFinance } from '../../../hooks/useFinance';
import type { BillListItem } from '../../../hooks/useFinance';

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

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
  const { dashboard, userId, isLoading, error, hasAccommodation, refetch } = useFinance();
  const navigate = useNavigate();

  const [isSubmitReceiptOpen, setIsSubmitReceiptOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<BillListItem | null>(null);

  const handlePayNow = (bill: BillListItem) => {
    setSelectedBill(bill);
    setIsSubmitReceiptOpen(true);
  };

  const handleCloseSubmitReceipt = () => {
    setIsSubmitReceiptOpen(false);
    setSelectedBill(null);
  };

  const handleSubmitReceipt = (data: {
    referenceNo: string;
    paymentMethod: string;
    receiptFile: File | null;
    accountName?: string;
  }) => {
    console.log('Receipt submitted for billing:', selectedBill?._id, data);
    handleCloseSubmitReceipt();
    refetch();
  };

  const summary = dashboard?.summary;
  const facility = dashboard?.facilityDetails;

  // Outstanding balance
  const totalDue = summary?.totalOutstanding ?? 0;
  const paymentStatus = getPaymentStatusDisplay(summary?.currentStatus ?? 'unpaid');

  // Breakdown
  const latestMonth = dashboard?.monthlyStatistics?.[0];
  const breakdown = latestMonth?.breakdown ?? [];

  const rentAmount = breakdown.find((b) => b.name === 'Monthly Rent')?.amount ?? 0;
  const electricityAmount = breakdown.find((b) => b.name === 'Electricity')?.amount ?? 0;
  const waterAmount = breakdown.find((b) => b.name === 'Water')?.amount ?? 0;
  const internetAmount = breakdown.find((b) => b.name === 'Internet')?.amount ?? 0;
  const othersAmount = breakdown.find((b) => b.name === 'Others')?.amount ?? 0;
  const breakdownTotal = breakdown.reduce((sum, b) => sum + b.amount, 0);

  // Monthly chart data
  const monthlyStats = [...(dashboard?.monthlyStatistics ?? [])].reverse(); // oldest → newest

  // Unpaid bills
  const unpaidPayments = dashboard?.unpaidPayments ?? [];

  // Paid bills
  const billingHistory = dashboard?.billingHistory ?? [];

  const layout = (content: React.ReactNode) => (
    <div className="user-finance-shell relative flex min-h-screen font-inter text-darkslategray dark:bg-[#0f1010] dark:text-[#edf6f4]">
      <PageBackground />
      <div className="sticky top-0 h-screen shrink-0 z-10">
        <SideBar />
      </div>
      <div className="relative z-10 flex flex-1 flex-col min-w-0 overflow-y-auto">{content}</div>
    </div>
  );

  if (isLoading)
    return layout(
      <div className="flex-1 flex items-center justify-center py-20">
        <div>Loading finance data…</div>
      </div>,
    );

  if (!isLoading && !hasAccommodation && !error) {
    return layout(
      <div className="flex-1 flex flex-col items-center justify-center gap-6 py-20 px-6 text-center">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-lightcyan-100 p-6 dark:bg-[#0d241f]">
            <Icon
              icon="mdi-light:home-off"
              className="w-16 h-16 text-teal dark:text-[#72cbb8]"
            />
          </div>
          <div className="flex flex-col gap-2 max-w-sm">
            <b className="text-xl text-black dark:text-[#edf6f4]">
              No accommodation yet
            </b>
            <p className="text-sm text-dimgray leading-relaxed">
              You don't have an active dorm or accommodation. Browse available
              listings and find a place that fits you.
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-2 px-6 py-3 rounded-xl bg-lightcyan-100 text-teal font-semibold hover:opacity-90 transition-opacity dark:bg-[#0d3a32] dark:text-[#72cbb8]"
        >
          <Icon icon="mdi-light:home" className="w-5 h-5" />
          Browse Listings
        </button>
      </div>,
    );
  }

  if (error) {
    const hasNoAccommodation = error.toLowerCase().includes('no active rental');

    if (hasNoAccommodation) {
      return layout(
        <div className="flex-1 flex flex-col items-center justify-center gap-6 py-20 px-6 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="rounded-full bg-lightcyan-100 p-6 dark:bg-[#0d241f]">
              <Icon icon="mdi-light:home-off" className="w-16 h-16 text-teal dark:text-[#72cbb8]" />
            </div>
            <div className="flex flex-col gap-2 max-w-sm">
              <b className="text-xl text-black dark:text-[#edf6f4]">No accommodation yet</b>
              <p className="text-sm text-dimgray leading-relaxed">
                You don't have an active dorm or accommodation. Browse available listings and find a
                place that fits you.
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/home')}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-lightcyan-100 text-teal font-semibold hover:opacity-90 transition-opacity dark:bg-[#0d3a32] dark:text-[#72cbb8]"
          >
            <Icon icon="mdi-light:home" className="w-5 h-5" />
            Browse Listings
          </button>
        </div>,
      );
    }

    // Actual unexpected error — show retry
    return layout(
      <div className="flex-1 flex flex-col items-center justify-center py-20 gap-4">
        <p className="text-crimson font-semibold">{error}</p>
        <button
          onClick={refetch}
          className="px-4 py-2 rounded-xl bg-lightcyan-100 text-teal font-semibold hover:opacity-90"
        >
          Retry
        </button>
      </div>,
    );
  }

  return (
    <>
      {layout(
        <>
          <div className="flex-1 flex flex-col px-4 sm:px-6 lg:px-8 pt-8 md:pt-12 lg:pt-16 pb-0">
            {/* Header */}
            <div className="flex flex-col gap-3 mb-6">
              <div className="flex items-center justify-between gap-5 flex-wrap">
                <b className="text-2xl text-black font-inter dark:text-[#edf6f4]">Finance</b>
              </div>
              <div className="h-0.5 rounded-full bg-whitesmoke-200 dark:bg-[#242626]" />
            </div>

            {/* Property info */}
            <div className="flex flex-col gap-1 px-2 mb-6 text-darkslategray dark:text-[#72cbb8]">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
                <b className="text-xl md:text-2xl font-inter">{facility?.name ?? '—'}</b>
                <DownloadBillings userId={userId!} />
              </div>
              {facility?.address && (
                <div className="flex items-start gap-2 px-2">
                  <Icon icon="mdi-light:map-marker" className="h-5 w-5 shrink-0 mt-0.5" />
                  <b className="text-sm break-words">{facility.address}</b>
                </div>
              )}
            </div>

            {/* Three column layout */}
            <div className="flex flex-col lg:flex-row items-stretch gap-4 text-teal font-inter">
              {/* Left — Total Due + Breakdown */}
              <div className="w-full lg:w-[300px] shrink-0 flex flex-col gap-2.5">
                <div className="rounded-2xl bg-lightcyan-200 p-3 md:p-4 flex flex-col gap-2.5 dark:bg-[#0d241f] dark:text-[#72cbb8]">
                  <b className="text-sm md:text-base">Total Due</b>
                  <div className="flex gap-2.5 text-xl md:text-2xl">
                    <b>Php</b>
                    <b>{totalDue.toFixed(2)}</b>
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-black dark:text-[#edf6f4]">
                  <div className="py-2 px-2">
                    <b className="text-lg tracking-tight">Cost Breakdown</b>
                  </div>
                  <div className="rounded-2xl border border-whitesmoke-200 p-2.5 md:p-3 flex flex-col gap-2.5 text-xs md:text-sm text-center dark:border-[#303331] dark:bg-[#101111]">
                    <div className="flex justify-center gap-2.5">
                      <b className="flex-1">Description</b>
                      <b className="flex-1">Amount</b>
                    </div>
                    {breakdown.length > 0 ? (
                      <div className="flex flex-col gap-2 font-lora text-left text-[10px] md:text-xs">
                        {breakdown.map(({ name, amount }) => (
                          <div key={name} className="flex justify-between py-2">
                            <span className="flex-1 font-semibold tracking-wide">{name}</span>
                            <span className="flex-1 font-semibold tracking-wide">
                              Php {amount.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-col gap-2 font-lora text-left text-[10px] md:text-xs">
                        {(
                          [
                            ['Monthly Rent', rentAmount],
                            ['Electricity', electricityAmount],
                            ['Water', waterAmount],
                            ['Internet', internetAmount],
                            ['Others', othersAmount],
                          ] as [string, number][]
                        ).map(([label, amt]) => (
                          <div key={label} className="flex justify-between py-2">
                            <span className="flex-1 font-semibold tracking-wide">{label}</span>
                            <span className="flex-1 font-semibold tracking-wide">
                              Php {amt.toFixed(2)}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-between gap-2.5 text-teal pt-2 border-t border-whitesmoke-200 dark:border-[#303331] dark:text-[#72cbb8]">
                      <b className="flex-1">Total</b>
                      <b className="flex-1">Php {(breakdownTotal || totalDue).toFixed(2)}</b>
                    </div>
                  </div>
                </div>
              </div>

              {/* Middle */}
              <div className="flex-1 flex flex-col gap-2.5">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="flex-1 rounded-2xl bg-white border border-whitesmoke-200 p-3 md:p-4 flex flex-col gap-2.5 dark:bg-[#101111] dark:border-[#303331] dark:text-[#72cbb8]">
                    <b className="text-sm md:text-base">Outstanding Balance</b>
                    <div className="flex gap-2.5 text-xl md:text-2xl">
                      <b>Php</b>
                      <b>{(summary?.totalOutstanding ?? 0).toFixed(2)}</b>
                    </div>
                  </div>
                  <div className="flex-1 rounded-2xl bg-white border border-whitesmoke-200 p-3 md:p-4 flex flex-col gap-2.5 dark:bg-[#101111] dark:border-[#303331] dark:text-[#72cbb8]">
                    <b className="text-sm md:text-base">Payment Status</b>
                    <b
                      className={`text-xl md:text-2xl leading-8 bg-clip-text text-transparent ${paymentStatus.gradient}`}
                    >
                      {paymentStatus.text}
                    </b>
                  </div>
                </div>

                <div className="w-full overflow-x-auto">
                  <MonthlyExpensesChart monthlyStats={monthlyStats} />
                </div>

                {/* Upcoming / unpaid payments */}
                <div className="flex flex-col gap-2.5 p-2 md:p-2.5 font-inter text-sm dark:text-[#72cbb8]">
                  <b className="text-base md:text-lg tracking-tight">Upcoming Payments</b>
                  <div className="h-0.5 border border-whitesmoke-200 dark:border-[#303331]" />

                  {unpaidPayments.length === 0 ? (
                    <p className="text-dimgray text-center py-4">No upcoming payments 🎉</p>
                  ) : (
                    unpaidPayments.map((bill, idx) => (
                      <div
                        key={bill._id}
                        className="rounded-lg border border-whitesmoke-200 flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 px-3 gap-3 transition-all duration-200 hover:shadow-md dark:bg-[#101111] dark:border-[#303331] dark:hover:bg-[#141515]"
                      >
                        <div className="flex items-center gap-2.5">
                          <div
                            className={`h-5 w-5 rounded-[4px] shrink-0 ${
                              idx === 0
                                ? 'bg-gradient-to-b from-[#024338] to-[#096c5b]'
                                : 'bg-gradient-to-b from-[#c29722] to-[#f6b709]'
                            }`}
                          />
                          <div className="flex flex-col gap-1">
                            <div className="font-semibold">
                              {formatDate(bill.dueDate)}
                              {idx === 0 ? ' (Current)' : ''}
                            </div>
                            <div className="text-[11px] font-semibold font-lora text-dimgray">
                              Php {bill.totalAmount.toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handlePayNow(bill)}
                          className="w-full sm:w-[90px] rounded-xl bg-lightcyan-100 py-2.5 px-3 text-teal font-semibold hover:opacity-90 transition-opacity whitespace-nowrap text-center dark:bg-[#0d3a32] dark:text-[#72cbb8]"
                        >
                          Pay Now
                        </button>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Right — Billing History */}
              <div className="w-full lg:w-[180px] shrink-0 rounded-2xl border border-whitesmoke-200 flex flex-col py-2.5 gap-2 dark:border-[#303331] dark:bg-[#101111] dark:text-[#72cbb8]">
                <div className="rounded-2xl bg-white p-3 dark:bg-[#101111]">
                  <b className="text-base md:text-xl">Billing History</b>
                </div>
                <div className="flex flex-col gap-2.5 px-0">
                  <b className="text-sm md:text-base px-2">Past Bills</b>
                  <div className="flex flex-col gap-2 px-2 md:px-3 text-xs">
                    {billingHistory.length === 0 ? (
                      <p className="text-dimgray text-center py-4">No past bills</p>
                    ) : (
                      billingHistory.map((bill) => (
                        <div
                          key={bill._id}
                          className="rounded-lg border border-whitesmoke-200 flex flex-col py-2 px-3 gap-1 transition-all duration-200 hover:shadow-sm dark:border-[#303331] dark:bg-[#101111] dark:hover:bg-[#141515]"
                        >
                          <div className="font-semibold">{formatDate(bill.dueDate)}</div>
                          <div className="text-[10px] font-semibold font-lora text-dimgray">
                            Php {bill.totalAmount.toFixed(2)}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>,
      )}

      {/* Submit Receipt modal */}
      {selectedBill && (
        <SubmitReceipt
          isOpen={isSubmitReceiptOpen}
          onClose={handleCloseSubmitReceipt}
          billingId={selectedBill._id}
          dueDate={formatDate(selectedBill.dueDate)}
          dueAmount={selectedBill.totalAmount}
          onSubmit={handleSubmitReceipt}
        />
      )}
    </>
  );
};

export default TenantFinancePage;
