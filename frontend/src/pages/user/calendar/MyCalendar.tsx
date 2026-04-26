import { FunctionComponent, useState, useCallback } from "react";
import Footer from "../../../components/general/Footer";
import SideBar from "../../../components/user/SideBar";
import CalendarHeader from "../../../components/user/CalendarHeader";
import MiniCalendar from "../../../components/user/MiniCalendar";
import EventPopout from "../../../components/user/EventPopout";
import PortalPopup from "../../../components/general/PortalPopup";
import MainCalendarGrid from "../../../components/user/MainCalendarGrid";
import PageBackground from "../../../components/general/PageBackground";

const MyCalendar: FunctionComponent = () => {
  const [isEventPopoutOpen, setEventPopoutOpen] = useState(false);

  const openEventPopout = useCallback(() => {
    setEventPopoutOpen(true);
  }, []);

  const closeEventPopout = useCallback(() => {
    setEventPopoutOpen(false);
  }, []);

  return (
    <>
      <PageBackground />
      <div className="w-full h-screen relative overflow-y-auto flex flex-col items-start isolate gap-2.5 text-left text-num-14 text-darkslategray-100 font-lora">
        <div className="w-full max-w-[1440px] h-auto overflow-hidden shrink-0 flex flex-col items-start">
          <div className="gap-8 flex-1 flex items-center">
            <div className="sticky top-0 left-0 h-full w-[200px] hidden md:block z-10">
              <SideBar />
            </div>

            <div className="w-full flex flex-col items-start justify-between gap-20">
              <div className="self-stretch flex flex-col items-start py-num-0 pr-20">
                <div className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-num-10 box-border gap-2.5">
                  <div className="h-6 flex items-center gap-1.5">
                    <div className="relative font-semibold text-xl">Calendar</div>
                  </div>
                </div>

                <div className="self-stretch min-h-[800px] rounded-2xl bg-white border border-whitesmoke-200 flex flex-col items-start gap-3 text-center text-dimgray font-inter pb-10">
                  <div className="self-stretch flex-1 flex items-start text-num-15_45 overflow-x-auto px-6 py-6 gap-4">
                    <MiniCalendar onEventClick={openEventPopout} />
                    <MainCalendarGrid onEventClick={openEventPopout} />
                  </div>
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
      {isEventPopoutOpen && (
        <PortalPopup
          overlayColor="rgba(0, 0, 0, 0.25)"
          placement="Centered"
          onOutsideClick={closeEventPopout}
        >
          <EventPopout onClose={closeEventPopout} />
        </PortalPopup>
      )}
    </>
  );
};

export default MyCalendar;
