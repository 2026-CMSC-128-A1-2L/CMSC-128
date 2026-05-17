import type { FunctionComponent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

interface NotificationToastProps {
  show: boolean;
  message: string;
  onClose?: () => void;
}

const NotificationToast: FunctionComponent<NotificationToastProps> = ({ show, message, onClose }) => {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: '-50%' }}
          animate={{ opacity: 1, y: 20, x: '-50%' }}
          exit={{ opacity: 0, y: -20, x: '-50%' }}
          className="fixed top-0 left-1/2 z-[10000] flex items-center gap-3 rounded-full bg-white px-6 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-whitesmoke-200 dark:bg-[#1f2022] dark:border-[#303331] dark:text-[#d7e0ef]"
        >
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-lightcyan dark:bg-[#12342e]">
            <Icon icon="material-symbols:check-rounded" className="h-4 w-4 text-teal dark:text-[#72cbb8]" />
          </div>
          <span className="text-sm font-semibold">{message}</span>
          {onClose && (
            <button
              onClick={onClose}
              className="ml-2 flex h-5 w-5 items-center justify-center rounded-full hover:bg-whitesmoke-100 dark:hover:bg-[#303331]"
            >
              <Icon icon="material-symbols:close-rounded" className="h-3 w-3" />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NotificationToast;
