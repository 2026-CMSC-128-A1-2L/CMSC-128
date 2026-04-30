import { motion } from 'framer-motion';
import { type ReactNode } from 'react';

export default function PageTransition({ children }: { children: ReactNode }) {
  return (
    <>
      {/* Your page */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {children}
      </motion.div>

      {/* BIG overlay animation (you WILL see this) */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: '100%' }}
        exit={{ x: '0%' }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'black',
          zIndex: 9999,
        }}
      />
    </>
  );
}
