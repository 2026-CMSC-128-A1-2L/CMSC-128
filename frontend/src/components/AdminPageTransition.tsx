import { useEffect, useState, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

type AdminPageTransitionProps = {
  children: ReactNode;
  /** ms for the fade-in/out. Keep it subtle to avoid a laggy feel. */
  duration?: number;
  className?: string;
};

/**
 * Wrap a page to give it a soft fade-in transition when mounted or when the
 * current location changes. Pair with `SideBarAdmin` for a smooth
 * sidebar → messages transition when routing between admin pages.
 */
const AdminPageTransition = ({
  children,
  duration = 260,
  className = '',
}: AdminPageTransitionProps) => {
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(false);
    // Using a microtask-level delay so the initial opacity-0 state is
    // committed before we flip to opacity-100, guaranteeing the transition.
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, [location.pathname]);

  return (
    <div
      className={[
        'transition-opacity ease-out',
        visible ? 'opacity-100' : 'opacity-0',
        className,
      ].join(' ')}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};

export default AdminPageTransition;
