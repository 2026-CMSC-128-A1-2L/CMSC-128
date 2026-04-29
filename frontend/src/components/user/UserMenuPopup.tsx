interface UserMenuPopupProps {
  isOpen: boolean;
  onViewProfile: () => void;
  onLogOut: () => void;
}

export default function UserMenuPopup({ isOpen, onViewProfile, onLogOut }: UserMenuPopupProps) {
  // If the popup is closed, don't render anything
  if (!isOpen) return null;

  return (
    /* absolute: Floats the menu. 
      top-full & mt-2: Pushes it right below the profile picture container. 
      left-0: Aligns it to the left side of the parent.
    */
    <div className="absolute top-full left-0 mt-2 w-[220px] bg-[#f8f9fa] rounded-2xl p-3 shadow-[0px_4px_12px_rgba(0,0,0,0.1)] flex flex-col gap-2 font-inter z-50">
      
      {/* View Profile Button */}
      <button 
        onClick={onViewProfile}
        className="w-full py-2.5 bg-[#dcfce7] text-[#096c5b] font-medium text-[14px] rounded-full transition-colors hover:bg-[#bbf7d0] cursor-pointer"
      >
        View Profile
      </button>

      {/* Log Out Button */}
      <button 
        onClick={onLogOut}
        className="w-full py-2.5 bg-white text-[#ef4444] border border-[#f0f0f0] font-medium text-[14px] rounded-full transition-colors hover:bg-gray-50 drop-shadow-sm cursor-pointer"
      >
        Log Out
      </button>

    </div>
  )
}