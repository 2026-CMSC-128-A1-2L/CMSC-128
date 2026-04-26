import type { ReactNode } from 'react';

type PopupOverlayProps = {
  onClose: () => void;
  children: ReactNode;
};

const PopupOverlay = ({ onClose, children }: PopupOverlayProps) => {
  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-[20px]">
      <button
        type="button"
        aria-label="Close popup"
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
};

export default PopupOverlay;
