import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import AtlasLogo from '../../../assets/logo_atlas_text.svg?react';

const LandlordFooter = () => {
  return (
    <footer className="flex w-full items-center justify-center">
      <div className="flex w-full items-center justify-center px-3 sm:px-6 lg:px-[32px] py-[12px] lg:py-[19px]">
        <div className="flex w-full items-center justify-center gap-x-3 sm:gap-x-6 lg:gap-x-[48px] flex-nowrap">
          <div className="hidden sm:flex items-center gap-1.5 sm:gap-[8px] shrink-0">
            <AtlasLogo
              className="h-[32px] w-[36px] lg:h-[42px] lg:w-[48px] shrink-0 fill-[#2d3748] dark:fill-[#d7e0ef]"
              aria-label="Atlas"
            />
            <div className="flex items-center gap-1 sm:gap-[12px]">
              <span className="flex items-center gap-[2px] sm:gap-[4px] font-['Inter',sans-serif] text-[10px] lg:text-[14px] font-bold text-[#666] dark:text-[#a4acba] whitespace-nowrap">
                <Icon
                  icon="ph:copyright-bold"
                  className="h-[14px] w-[14px] lg:h-[20px] lg:w-[20px] shrink-0"
                  aria-hidden="true"
                />
                2026
              </span>
              <span className="font-['Inter',sans-serif] text-[10px] lg:text-[14px] font-bold text-[#666] dark:text-[#a4acba] whitespace-nowrap">
                ATLAS Team
              </span>
            </div>
            <span className="font-['Inter',sans-serif] text-[10px] lg:text-[14px] font-bold text-[#666] dark:text-[#a4acba] whitespace-nowrap">
              All Rights Reserved
            </span>
          </div>

          <div className="flex items-center gap-x-3 sm:gap-x-6 lg:gap-x-[48px] flex-nowrap shrink-0">
            <nav className="flex flex-col items-center gap-[6px] lg:gap-[10px] whitespace-nowrap font-['Inter',sans-serif] text-[9px] sm:text-[10px] lg:text-[14px] font-bold text-[#666] dark:text-[#a4acba] shrink-0">
              <Link to="/home" className="hover:underline">
                Browse Dorms
              </Link>
              <Link to="/landlord/properties/new" className="hover:underline">
                List your property
              </Link>
            </nav>
            <nav className="flex flex-col items-center gap-[6px] lg:gap-[10px] whitespace-nowrap font-['Inter',sans-serif] text-[9px] sm:text-[10px] lg:text-[14px] font-bold text-[#666] dark:text-[#a4acba] shrink-0">
              <Link to="/" className="hover:underline">
                About
              </Link>
              <Link to="/contact-us" className="hover:underline">
                Contact Us
              </Link>
            </nav>
            <nav className="flex flex-col items-center gap-[6px] lg:gap-[10px] whitespace-nowrap font-['Inter',sans-serif] text-[9px] sm:text-[10px] lg:text-[14px] font-bold text-[#666] dark:text-[#a4acba] shrink-0">
              <Link to="/privacy-policy" className="hover:underline">
                Privacy Policy
              </Link>
              <Link to="/terms-of-use" className="hover:underline">
                Terms of Use
              </Link>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default LandlordFooter;
