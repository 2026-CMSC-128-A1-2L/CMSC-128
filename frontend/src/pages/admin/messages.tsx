import NavBarAdmin from '../../components/NavBarAdmin';
import SideBarAdmin from '../../components/SideBarAdmin';
import { Icon } from '@iconify/react';

function Messages() {
  return (
    <div className="relative -mx-[calc((100vw-100%)/2)] flex w-screen flex-col min-h-screen">
      <NavBarAdmin />
      <div className="flex flex-1">
        <SideBarAdmin activeItem="messages" />
        <div className="flex flex-1 flex-col items-center justify-center gap-3 bg-white">
          <Icon icon="solar:chat-round-dots-outline" className="h-16 w-16 text-[#7c8db5]" />
          <h1 className="font-['Outfit'] text-[32px] font-semibold text-black">Messages</h1>
          <p className="font-['Outfit'] text-lg text-[#7c8db5]">Page under construction</p>
        </div>
      </div>
    </div>
  );
}

export default Messages;
