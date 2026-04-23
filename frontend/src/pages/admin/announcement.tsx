import NavBarAdmin from "../../components/admin/NavBarAdmin";
import SideBarAdmin from "../../components/admin/SideBarAdmin";
import AdminPageTransition from "../../components/admin/AdminPageTransition";
import { Icon } from "@iconify/react";

function Announcement() {
  return (
    <AdminPageTransition>
      <div className="relative -mx-[calc((100vw-100%)/2)] flex w-screen flex-col min-h-screen">
        <NavBarAdmin />
        <div className="flex flex-1">
          <SideBarAdmin activeItem="announce" />
          <div className="flex-1 bg-white px-10 py-8 flex items-start justify-center">
            <div className="mt-10 w-full max-w-168.75 rounded-2xl bg-white p-8">
              {/* Subject */}
              <div className="mb-6">
                <label className="mb-2 block font-['Inter'] text-sm font-medium text-black">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Input subject here"
                  className="h-8.5 w-full rounded-md border border-[#cbd5e1] bg-white px-3 py-2 font-['Inter'] text-sm text-black outline-none placeholder:text-[#94a3b8]"
                />
              </div>

              {/* Message */}
              <div className="mb-8">
                <label className="mb-2 block font-['Inter'] text-sm font-medium text-black">
                  Message
                </label>
                <textarea
                  placeholder="Type your message here"
                  rows={20}
                  className="w-full resize-none rounded-md border border-[#cbd5e1] bg-white px-3 py-2 font-['Inter'] text-sm text-black outline-none placeholder:text-[#94a3b8]"
                />
              </div>

              {/* Submit */}
              <div className="flex justify-center">
                <button className="flex cursor-pointer items-center gap-2 rounded-full bg-[#024338] px-6 py-2">
                  <Icon
                    icon="iconamoon:arrow-right-2-thin"
                    className="h-5 w-5 text-white"
                  />
                  <span className="font-['Lora'] text-base font-medium text-white">
                    Submit
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminPageTransition>
  );
}

export default Announcement;
