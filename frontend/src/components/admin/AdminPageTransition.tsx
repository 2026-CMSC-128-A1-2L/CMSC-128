import { motion, type Transition } from "framer-motion";

type AdminPageTransitionProps = {
  children: React.ReactNode;
  className?: string;
};

const pageVariants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.3,
      ease: "easeOut",
    } as Transition,
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeIn",
    } as Transition,
  },
};

const AdminPageTransition = ({
  children,
  className = "",
}: AdminPageTransitionProps) => {
  return (
    <motion.div
      className={className}
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  );
};

export default AdminPageTransition;
