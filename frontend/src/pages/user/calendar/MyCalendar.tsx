import { type FunctionComponent, useState, useCallback } from 'react';
import Footer from '../../../components/general/Footer';
import SideBar from '../../../components/user/SideBar';
import MiniCalendar from '../../../components/user/MiniCalendar';
import EventPopout from '../../../components/user/EventPopout';
import PortalPopup from '../../../components/general/PortalPopup';
import MainCalendarGrid from '../../../components/user/MainCalendarGrid';
import PageBackground from '../../../components/general/PageBackground';

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
      <div className="w-full h-screen flex flex-col font-inter text-black overflow-hidden">
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="fixed top-0 left-0 h-full w-[200px] hidden md:block z-10">
            <SideBar />
          </div>
          <div className="w-[200px] shrink-0 hidden md:block" />

          {/* Right Frame / Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto">
              <div className="flex flex-col min-h-full">
                <div className="flex-1 flex flex-col px-4 sm:px-8 pt-16 pr-4 sm:pr-20">
                  <div className="flex flex-col gap-8 flex-1">
                    {/* Header */}
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-2.5">
                        <b className="relative leading-8 shrink-0">My Calendar</b>
                      </div>
                    </div>

                    {/* Calendar Content */}
                    <div className="self-stretch flex-1 rounded-2xl bg-white border border-whitesmoke-200 flex flex-col items-start gap-4 text-center text-dimgray">
                      <div className="self-stretch flex-1 flex items-start text-num-15_45 overflow-auto px-6 py-6 gap-6">
                        <MiniCalendar onEventClick={openEventPopout} />
                        <MainCalendarGrid onEventClick={openEventPopout} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <footer>
                  <Footer />
                </footer>
              </div>
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
