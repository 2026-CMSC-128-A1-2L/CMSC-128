import type { FunctionComponent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Icon } from '@iconify/react';

interface NotificationToastProps {
  show: boolean;
  message: string;
  type?: 'success' | 'warning';
  position?: 'top-center' | 'top-right';
  stackIndex?: number;
  onClose?: () => void;
}

const toastStyles = {
  success: {
    icon: 'material-symbols:check-rounded',
    iconWrap: 'bg-lightcyan dark:bg-[#12342e]',
    iconColor: 'text-teal dark:text-[#72cbb8]',
  },
  warning: {
    icon: 'material-symbols:warning-rounded',
    iconWrap: 'bg-amber-100 dark:bg-[#3a2f12]',
    iconColor: 'text-amber-600 dark:text-[#f0c36a]',
  },
};

const positionStyles = {
  'top-center': {
    initial: { opacity: 0, y: -20, x: '-50%' },
    animate: { opacity: 1, y: 20, x: '-50%' },
    exit: { opacity: 0, y: -20, x: '-50%' },
    className: 'top-0 left-1/2',
  },
  'top-right': {
    initial: { opacity: 0, y: -20, x: 20 },
    animate: { opacity: 1, y: 20, x: 0 },
    exit: { opacity: 0, y: -20, x: 20 },
    className: 'top-0 right-6',
  },
};

const NotificationToast: FunctionComponent<NotificationToastProps> = ({
  show,
  message,
  type = 'success',
  position = 'top-center',
  stackIndex = 0,
  onClose,
}) => {
  const style = toastStyles[type];
  const placement = positionStyles[position];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={placement.initial}
          animate={placement.animate}
          exit={placement.exit}
          className={`fixed ${placement.className} z-[10000] flex max-w-[calc(100vw-3rem)] items-center gap-3 rounded-full bg-white px-6 py-3 shadow-[0_4px_12px_rgba(0,0,0,0.15)] border border-whitesmoke-200 dark:bg-[#1f2022] dark:border-[#303331] dark:text-[#d7e0ef]`}
          style={{ marginTop: stackIndex * 56 }}
        >
          <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${style.iconWrap}`}>
            <Icon icon={style.icon} className={`h-4 w-4 ${style.iconColor}`} />
          </div>
          <span className="text-sm font-semibold">{message}</span>
          {onClose && (
            <button
              type="button"
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
