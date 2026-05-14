import { type FunctionComponent, useRef, useState, useCallback } from 'react';
import { Icon } from '@iconify/react';

interface DownloadBillingsProps {
  billingId?: string;
  month?: string;
}

const DownloadBillings: FunctionComponent<DownloadBillingsProps> = ({ billingId, month }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadBilling = useCallback(async () => {
    setIsDownloading(true);
    try {
      // dummy txt for billing
      const billingContent = `BILLING STATEMENT
${month || 'Current Month'} Billing

Billing ID: ${billingId || 'N/A'}
Date Generated: ${new Date().toLocaleDateString()}

Total Amount Due: ₱4,950.00

Due Date: ${new Date().toLocaleDateString()}

`;

      // Create blob and download
      const blob = new Blob([billingContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `billing_${month?.replace(/\s/g, '_') || 'current'}_${billingId || 'statement'}.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to download billing:', error);
    } finally {
      setIsDownloading(false);
    }
  }, [billingId, month]);

  return (
    <div
      onClick={handleDownloadBilling}
      className={`w-[200px] rounded-xl bg-lightcyan-100 overflow-hidden shrink-0 flex items-center justify-center p-2.5 box-border gap-2.5 cursor-pointer text-center text-sm text-teal transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95 dark:bg-[#0d3a32] dark:text-[#72cbb8] ${
        isDownloading ? 'opacity-50 cursor-wait' : ''
      }`}
    >
      <div className="overflow-hidden flex flex-col items-start">
        <Icon icon="mdi:download" className="h-5 w-5" />
      </div>
      <div className="font-semibold">{isDownloading ? 'Downloading...' : 'Download Billings'}</div>
    </div>
  );
};

export default DownloadBillings;
