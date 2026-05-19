import type { FunctionComponent } from 'react';
import LogoFooter from '../../../assets/footer_logo.svg?react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';

const Footer: FunctionComponent = () => {
  return (
    <footer className="flex w-full items-center justify-center border-t border-[#f0f0f0] font-inter text-dimgray">
      <div className="flex w-full items-center justify-center px-3 sm:px-6 lg:px-10 py-[12px] lg:py-4">
        <div className="flex items-center flex-nowrap justify-center gap-x-3 sm:gap-x-6 lg:gap-x-20">
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <LogoFooter className="h-6 w-6 lg:h-9 lg:w-9 shrink-0 fill-[#173B2F]" />
            <div className="flex items-center gap-1 sm:gap-3">
              <div className="flex items-center gap-1">
                <Icon icon="ph:copyright-bold" className="w-4 h-4 lg:w-6 lg:h-6 shrink-0" />
                <b className="text-[10px] lg:text-[14px] whitespace-nowrap">2026</b>
              </div>
              <b className="text-[10px] lg:text-[14px] whitespace-nowrap">ATLAS Team</b>
            </div>
            <b className="text-[10px] lg:text-[14px] whitespace-nowrap">All Rights Reserved</b>
          </div>
          <div className="flex flex-row flex-nowrap items-start gap-x-3 sm:gap-x-6 lg:gap-x-20">
            <div className="flex flex-col items-center gap-[6px] lg:gap-2.5 shrink-0">
              <Link to="/about">
                <b className="block text-[9px] sm:text-[10px] lg:text-[14px] whitespace-nowrap hover:underline">
                  About
                </b>
              </Link>
              <Link to="/contact-us">
                <b className="block text-[9px] sm:text-[10px] lg:text-[14px] whitespace-nowrap hover:underline">
                  Contact Us
                </b>
              </Link>
            </div>
            <div className="flex flex-col items-center gap-[6px] lg:gap-2.5 shrink-0">
              <Link to="/privacy-policy">
                <b className="block text-[9px] sm:text-[10px] lg:text-[14px] whitespace-nowrap hover:underline">
                  Privacy Policy
                </b>
              </Link>
              <Link to="/terms-of-use">
                <b className="block text-[9px] sm:text-[10px] lg:text-[14px] whitespace-nowrap hover:underline">
                  Terms of Use
                </b>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
