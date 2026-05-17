import { useLocation, useOutlet } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import PageBackground from '../../components/general/PageBackground';

const PageLayout = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <div className="relative min-h-screen">
      <PageBackground />

      <div className="relative z-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
          >
            {outlet}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default PageLayout;
