import type { ReactNode } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

type AdminPopupOverlayProps = {
  onClose: () => void;
  children: ReactNode;
  isOpen: boolean;
};

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 10,
    transition: {
      duration: 0.2,
      ease: "easeInOut" as const,
    },
  },
};

const AdminPopupOverlay = ({
  onClose,
  children,
  isOpen,
}: AdminPopupOverlayProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-120 flex items-center justify-center p-5">
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm cursor-pointer"
            onClick={onClose}
            aria-label="Close popup"
          />
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative z-1"
          >
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default AdminPopupOverlay;
