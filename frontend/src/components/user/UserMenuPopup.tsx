interface UserMenuPopupProps {
  isOpen: boolean;
  onViewProfile: () => void;
  onLogOut: () => void;
}

export default function UserMenuPopup({ isOpen, onViewProfile, onLogOut }: UserMenuPopupProps) {
  // If the popup is closed, don't render anything
  if (!isOpen) return null;

  return (
    <div className="w-[220px] bg-[#f8f9fa] rounded-2xl p-3 shadow-[0px_8px_24px_rgba(0,0,0,0.16)] flex flex-col gap-2 font-inter">
      {/* View Profile Button */}
      <button
        type="button"
        onClick={onViewProfile}
        className="w-full py-2.5 bg-[#dcfce7] text-[#096c5b] font-medium text-[14px] rounded-full transition-colors hover:bg-[#bbf7d0] cursor-pointer"
      >
        View Profile
      </button>

      {/* Log Out Button */}
      <button
        type="button"
        onClick={onLogOut}
        className="w-full py-2.5 bg-white text-[#ef4444] border border-[#f0f0f0] font-medium text-[14px] rounded-full transition-colors hover:bg-gray-50 drop-shadow-sm cursor-pointer"
      >
        Log Out
      </button>
    </div>
  );
}
