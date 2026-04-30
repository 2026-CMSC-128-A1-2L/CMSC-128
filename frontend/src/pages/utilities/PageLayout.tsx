import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import PageBackground from "../../components/general/PageBackground";

const PageLayout = () => {
  const location = useLocation();

  return (
    <div className="relative min-h-screen">
      <PageBackground />

      <div className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PageLayout;
