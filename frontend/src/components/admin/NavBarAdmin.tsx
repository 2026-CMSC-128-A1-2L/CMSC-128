import type { FunctionComponent } from 'react';
import AtlasLogo from '../../../assets/logo_atlas_text.svg?react';
import profileAvatar from '../../../assets/admin/empty_profile_icon.svg';

const NavBarAdmin: FunctionComponent = () => {
  return (
    <header className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-[#001d18] shadow-[0_4px_10px_rgba(0,0,0,0.35)]">
      <div className="flex h-[106px] w-full items-center justify-between px-[90px]">
        <div className="flex h-[74px] w-[185px] shrink-0 items-center">
          <AtlasLogo className="h-full w-full fill-white" aria-label="Atlas" />
        </div>

        <div className="flex items-center gap-[12px]">
          <img src={profileAvatar} alt="Admin profile" className="h-[46px] w-[45px] shrink-0" />
          <span className="font-['Lora',serif] text-[20px] text-white">Kopiko</span>
        </div>
      </div>
    </header>
  );
};

export default NavBarAdmin;
