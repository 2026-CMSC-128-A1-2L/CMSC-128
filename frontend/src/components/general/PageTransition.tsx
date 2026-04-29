import { motion } from "framer-motion";
import { type ReactNode, type FunctionComponent } from "react";

const animations = {
  initial: { x: 10, opacity: 0 },
  animate: { x: 0, opacity: 1 },
  exit: { x: -10, opacity: 0 },
};

const PageTransition: FunctionComponent<{ children: ReactNode }> = ({ children }) => {
  return (
    <motion.div
      variants={animations}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.4,
        ease: [0.25, 1, 0.5, 1]
      }}    >
      {children}
    </motion.div>
  );
};

export default PageTransition;
