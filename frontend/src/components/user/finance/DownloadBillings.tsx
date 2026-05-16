import { type FunctionComponent, useState, useCallback } from 'react';
import { Icon } from '@iconify/react';
import { BillingService } from '../../../service/BillingService';

interface DownloadBillingsProps {
  userId?: string;
}

const DownloadBillings: FunctionComponent<DownloadBillingsProps> = ({ userId }) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadBilling = useCallback(async () => {
    if (!userId) return;
    setIsDownloading(true);
    try {
      await BillingService.downloadBilling(userId);
    } catch (error) {
      console.error('Failed to download billing:', error);
    } finally {
      setIsDownloading(false);
    }
  }, [userId]);

  return (
    <button
      type="button"
      onClick={handleDownloadBilling}
      disabled={!userId || isDownloading}
      className={`w-[200px] rounded-xl bg-lightcyan-100 overflow-hidden shrink-0 flex items-center justify-center p-2.5 box-border gap-2.5 text-center text-sm text-teal transition-all duration-200 hover:opacity-90 hover:scale-[1.02] active:scale-95 dark:bg-[#0d3a32] dark:text-[#72cbb8] ${
        !userId || isDownloading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
      }`}
    >
      <div className="overflow-hidden flex flex-col items-start">
        <Icon icon="mdi:download" className="h-5 w-5" />
      </div>
      <div className="font-semibold">{isDownloading ? 'Downloading...' : 'Download Billings'}</div>
    </button>
  );
};

export default DownloadBillings;
