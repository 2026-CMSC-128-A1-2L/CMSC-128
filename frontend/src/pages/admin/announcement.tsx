import SideBarAdmin from '../../components/admin/SideBarAdmin';
import AdminPageTransition from '../../components/admin/AdminPageTransition';
import { Icon } from '@iconify/react';
import PageBackground from '../../components/general/PageBackground';
import { motion } from 'framer-motion';

function Announcement() {
  return (
    <AdminPageTransition>
      <div className="relative -mx-[calc((100vw-100%)/2)] flex w-screen h-screen flex-col overflow-hidden bg-transparent">
        <PageBackground />
        <div className="flex flex-1 relative z-10 overflow-hidden">
          <SideBarAdmin activeItem="announce" />
          <div className="flex-1 overflow-y-auto bg-transparent px-10 py-8 flex items-start justify-center">
            <div className="mt-10 w-full max-w-168.75 rounded-2xl bg-white dark:bg-[#141515] dark:border dark:border-[#303331] p-8 shadow-sm">
              {/* Subject */}
              <div className="mb-6">
                <label
                  htmlFor="announcement-subject"
                  className="mb-2 block font-['Inter'] text-sm font-medium text-black dark:text-[#d7e0ef]"
                >
                  Subject
                </label>
                <input
                  id="announcement-subject"
                  type="text"
                  placeholder="Input subject here"
                  className="h-8.5 w-full rounded-md border border-[#cbd5e1] dark:border-[#303331] bg-white dark:bg-[#1f2022] px-3 py-2 font-['Inter'] text-sm text-black dark:text-[#d7e0ef] outline-none placeholder:text-[#94a3b8] dark:placeholder:text-[#a4acba]"
                />
              </div>

              {/* Message */}
              <div className="mb-8">
                <label
                  htmlFor="announcement-message"
                  className="mb-2 block font-['Inter'] text-sm font-medium text-black dark:text-[#d7e0ef]"
                >
                  Message
                </label>
                <textarea
                  id="announcement-message"
                  placeholder="Type your message here"
                  rows={20}
                  className="w-full resize-none rounded-md border border-[#cbd5e1] dark:border-[#303331] bg-white dark:bg-[#1f2022] px-3 py-2 font-['Inter'] text-sm text-black dark:text-[#d7e0ef] outline-none placeholder:text-[#94a3b8] dark:placeholder:text-[#a4acba]"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex cursor-pointer items-center gap-2 rounded-full bg-[#024338] px-6 py-2"
                >
                  <Icon icon="iconamoon:arrow-right-2-thin" className="h-5 w-5 text-white" />
                  <span className="font-['Lora'] text-base font-medium text-white">Submit</span>
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminPageTransition>
  );
}

export default Announcement;
