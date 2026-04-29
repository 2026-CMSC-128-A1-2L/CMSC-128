import { Icon } from '@iconify/react';
import AtlasLogo from '../../../assets/logo_atlas_text.svg?react';

const LandlordFooter = () => {
  return (
    <footer className="flex min-h-[80px] w-full items-center justify-center bg-[#f8fafc]">
      <div className="flex w-full items-center justify-center px-[32px] py-[19px] xl:px-[80px]">
        <div className="flex w-full flex-wrap items-center justify-center gap-x-[48px] gap-y-[16px]">
          <div className="flex items-center gap-[16px]">
            <div className="flex items-center gap-[8px]">
              <AtlasLogo className="h-[42px] w-[48px]" aria-label="Atlas" />
              <div className="flex items-center gap-[12px]">
                <span className="flex items-center gap-[4px] font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
                  <Icon icon="ph:copyright-bold" className="h-[20px] w-[20px]" aria-hidden="true" />
                  2026
                </span>
                <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
                  ATLAS Team
                </span>
              </div>
            </div>
            <span className="font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
              All Rights Reserved
            </span>
          </div>
          <nav className="flex flex-col items-center justify-center gap-[10px] whitespace-nowrap font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
            <a href="#" className="hover:underline">
              Browse Dorms
            </a>
            <a href="#" className="hover:underline">
              List your property
            </a>
          </nav>
          <nav className="flex flex-col items-center justify-center gap-[10px] whitespace-nowrap font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
            <a href="#" className="hover:underline">
              About
            </a>
            <a href="#" className="hover:underline">
              Contact Us
            </a>
          </nav>
          <nav className="flex flex-col items-center justify-center gap-[10px] whitespace-nowrap font-['Inter',sans-serif] text-[14px] font-bold text-[#666]">
            <a href="#" className="hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="hover:underline">
              Terms of Use
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default LandlordFooter;
