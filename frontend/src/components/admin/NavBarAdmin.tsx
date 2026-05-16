import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';
import atlasLogo from '../../../assets/admin/atlas_worded_logo.svg';

const NavBarAdmin: FunctionComponent = () => {
  return (
    <header className="relative left-1/2 right-1/2 w-screen -translate-x-1/2 bg-[#001d18] shadow-[0_4px_10px_rgba(0,0,0,0.35)]">
      <div className="flex h-[106px] w-full items-center justify-between px-[90px]">
        <div className="flex h-[74px] w-[185px] shrink-0 items-center">
          <img
            src={atlasLogo}
            alt="Atlas logo"
            className="h-[74px] w-[185px] object-contain object-left"
          />
        </div>

        <div className="flex items-center gap-[12px]">
        <Icon icon="solar:user-circle-bold" className="h-[46px] w-[45px] shrink-0" />
          <span className="font-['Lora',serif] text-[20px] text-white">Kopiko</span>
        </div>
      </div>
    </header>
  );
};

export default NavBarAdmin;
