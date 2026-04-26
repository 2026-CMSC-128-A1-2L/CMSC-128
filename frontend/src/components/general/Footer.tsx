import type { FunctionComponent } from 'react';
import LogoFooter from '../../../assets/footer_logo.svg?react';
import { Icon } from '@iconify/react';

const Footer: FunctionComponent = () => {
  return (
    <div className="w-full bg-whitesmoke overflow-hidden flex items-center py-4 px-10 box-border text-num-14 text-dimgray font-inter max-w-full">
      <div className="flex-1 flex items-center gap-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <img className="w-12 relative max-h-full object-cover" alt="" />
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <LogoFooter className="h-9 w-9 relative fill-[#173B2F]" />

                <Icon icon="ph:copyright-bold" className="w-6 h-6" />
                <b className="relative">2026</b>
              </div>
              <div className="flex items-center justify-center">
                <b className="relative">ATLAS Team</b>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <b className="relative">{`All Rights Reserved `}</b>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center gap-2.5">
            <b className="relative">Browse Dorms</b>
            <b className="relative">List your property</b>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center gap-2.5">
          <b className="relative">About</b>
          <b className="relative">Contact Us</b>
        </div>
        <div className="flex flex-col items-center justify-center gap-2.5">
          <b className="relative">Privacy Policy</b>
          <b className="relative">Terms of Use</b>
        </div>
      </div>
    </div>
  );
};

export default Footer;
