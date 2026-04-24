import type { FunctionComponent } from 'react';
import { useState, useCallback, useMemo } from 'react';
import { Icon } from '@iconify/react';
import LandlordLayout, { type BreadcrumbItem } from "../../../components/landlord/LandlordLayout";
import SetAvailableTime from "../../../components/landlord/SetAvailableTime";
import PortalPopup from "../../../components/landlord/PortalPopup";
import UpcomingVisitsSection from "../../../components/landlord/VisitsSections/UpcomingVisitsSection";
import VisitRequestsSection from "../../../components/landlord/VisitsSections/VisitRequestsSection";
import VisitsCalendarView from "../../../components/landlord/VisitsSections/VisitsCalendarView";

const Visits: FunctionComponent = () => {
  const [isSetAvailableTimeOpen, setSetAvailableTimeOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState('Apr');
  const [currentYear, setCurrentYear] = useState(2026);
  
  const openSetAvailableTime = useCallback(() => {
    setSetAvailableTimeOpen(true);
  }, []);
  
  const closeSetAvailableTime = useCallback(() => {
    setSetAvailableTimeOpen(false);
  }, []);

  const breadcrumbs = useMemo<BreadcrumbItem[]>(() => [
    { label: "Visits" }
  ], []);

  const handleAcceptRequest = (requestId: string) => {
    console.log('Accept request:', requestId);
  };

  const handleRejectRequest = (requestId: string) => {
    console.log('Reject request:', requestId);
  };

  return (
    <LandlordLayout activeSidebarItem="visits" breadcrumbs={breadcrumbs}>
      <div className="flex flex-col w-full gap-6">
        {/* Header Section - Large Title with Divider */}
        <div className="flex flex-col gap-3">
              <b className="relative text-[24px] leading-8 text-gray font-inter shrink-0">
                My Calendar
              </b>
          <div className="h-0.5 bg-whitesmoke-200" />
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="flex gap-6">
          {/* LEFT SIDEBAR */}
          <div className="w-72 flex flex-col gap-6">
            {/* Set Available Time Slots Button */}
            <button
              type="button"
              onClick={openSetAvailableTime}
              className="w-full rounded-lg bg-lightcyan text-teal font-semibold py-2 px-4 hover:opacity-90 transition-opacity border-none cursor-pointer font-inter"
            >
              Set Available Time Slots
            </button>

            {/* Mini Calendar */}
            <div className="bg-white rounded-num-8 p-4 border border-whitesmoke-200">
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-4">
                <button className="p-1 hover:bg-whitesmoke-200 rounded">
                  <Icon icon="ic:baseline-chevron-left" width={20} height={20} color="#2f3136" />
                </button>
                <div className="flex gap-2">
                  <select className="px-2 py-1 border border-whitesmoke-200 rounded text-sm font-inter text-dimgray">
                    <option>Apr</option>
                  </select>
                  <select className="px-2 py-1 border border-whitesmoke-200 rounded text-sm font-inter text-dimgray">
                    <option>2026</option>
                  </select>
                </div>
                <button className="p-1 hover:bg-whitesmoke-200 rounded">
                  <Icon icon="ic:baseline-chevron-right" width={20} height={20} color="#2f3136" />
                </button>
              </div>

              {/* Day Headers */}
              <div className="grid grid-cols-7 gap-1 mb-2 text-center text-xs font-semibold text-dimgray font-inter">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>

              {/* Calendar Days */}
              <div className="grid grid-cols-7 gap-1 text-sm text-center font-inter">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30].map((day) => (
                  <div
                    key={day}
                    className={`py-2 rounded ${
                      day === 5
                        ? 'bg-lightcyan text-teal font-bold'
                        : 'hover:bg-whitesmoke-200 cursor-pointer text-dimgray'
                    }`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Visits Section */}
            <div className="bg-white rounded-num-8 p-4 border border-whitesmoke-200">
              <UpcomingVisitsSection />
            </div>
          </div>

          {/* DIVIDER */}
          <div className="w-px bg-whitesmoke-200"></div>

          {/* RIGHT MAIN CONTENT */}
          <div className="flex-1 flex flex-col gap-6">
            {/* Weekly Calendar Header */}
            <div className="flex items-center justify-between gap-4">
              <button className="p-1 hover:bg-whitesmoke-200 rounded">
                <Icon icon="ic:baseline-chevron-left" width={24} height={24} color="#2f3136" />
              </button>
              
              <div className="grid grid-cols-7 gap-4 flex-1">
                {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day, idx) => (
                  <div key={day} className="text-center font-inter">
                    <div className="text-xs font-semibold text-dimgray mb-1">{day}</div>
                    <div className={`text-lg font-bold ${idx === 0 ? 'text-silver-100' : 'text-teal'}`}>
                      {5 + idx}
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="p-1 hover:bg-whitesmoke-200 rounded">
                <Icon icon="ic:baseline-chevron-right" width={24} height={24} color="#2f3136" />
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="bg-white rounded-num-8 p-6 border border-whitesmoke-200 flex-1">
              <VisitsCalendarView />
            </div>
          </div>
        </div>

        {/* Visit Requests Section - Full Width Below */}
        <VisitRequestsSection
          onAccept={handleAcceptRequest}
          onReject={handleRejectRequest}
        />
      </div>

      {isSetAvailableTimeOpen && (
        <PortalPopup
          overlayColor="rgba(113, 113, 113, 0.3)"
          placement="Centered"
          onOutsideClick={closeSetAvailableTime}
        >
          <SetAvailableTime onClose={closeSetAvailableTime} />
        </PortalPopup>
      )}
    </LandlordLayout>
  );
};

export default Visits;
