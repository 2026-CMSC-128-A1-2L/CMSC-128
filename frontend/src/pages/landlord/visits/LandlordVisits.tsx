import type { FunctionComponent } from 'react';
import { useState, useCallback, useMemo, useEffect } from 'react';
import { api } from '../../../service/axiosInstance';
import { Icon } from '@iconify/react';
import LandlordLayout, { type BreadcrumbItem } from '../../../components/landlord/LandlordLayout';
import SetAvailableTime from '../../../components/landlord/VisitsSections/SetAvailableTime';
import MiniCalendar from '../../../components/landlord/VisitsSections/MiniCalendar';
import MainCalendarGrid from '../../../components/landlord/VisitsSections/MainCalendarGrid';
import UpcomingVisitsSection from '../../../components/landlord/VisitsSections/UpcomingVisitsSection';
import VisitRequestsSection from '../../../components/landlord/VisitsSections/VisitRequestsSection';
import LandlordDayEventsPopout, {
  type VisitSlot,
} from '../../../components/landlord/VisitsSections/LandlordDayEventsPopout';
import LandlordEventPopout from '../../../components/landlord/VisitsSections/LandlordEventPopout';
import { BookingService } from '../../../service/BookingService';

const Visits: FunctionComponent = () => {
  const [isSetAvailableTimeOpen, setSetAvailableTimeOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<VisitSlot | null>(null);

  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const shortMonthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const [allVisits, setAllVisits] = useState<VisitSlot[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVisits = useCallback(async () => {
    try {
      const response = await api.get('/api/bookings');
      if (response.data?.data) {
        // Map backend bookings to VisitSlot interface
        const mapped: VisitSlot[] = response.data.data.map((b: any) => ({
          id: b._id,
          visitorName: b.userId?.firstName ? `${b.userId.firstName} ${b.userId.lastName}` : 'Student',
          time: new Date(b.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          date: new Date(b.startDate).toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
          }),
          status: b.status,
          dayOfWeek: new Date(b.startDate).getDay(),
          startDate: new Date(b.startDate),
          propertyName: b.facilityId?.name || 'Property',
          backgroundColor: b.status === 'accepted' ? 'bg-blue-100 dark:bg-[#12342e]' : 'bg-orange-100 dark:bg-[#342e12]',
        }));
        setAllVisits(mapped);
      }
    } catch (error) {
      console.error('Failed to fetch visits:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVisits();
  }, [fetchVisits]);

  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const getDaysInMonth = (m: number, y: number) => new Date(y, m + 1, 0).getDate();
  const getFirstDayOfMonth = (m: number, y: number) => new Date(y, m, 1).getDay();

  const getVisitsForDay = (day: number) => {
    const targetDate = new Date(year, month, day);
    return allVisits.filter((visit) => {
      const vDate = new Date(visit.startDate);
      return visit.status === 'accepted' &&
             vDate.getDate() === targetDate.getDate() &&
             vDate.getMonth() === targetDate.getMonth() &&
             vDate.getFullYear() === targetDate.getFullYear();
    });
  };

  // Transform visits to show all upcoming visits
  const upcomingVisits = allVisits
    .filter((v) => v.status === 'accepted')
    .map((visit) => ({
      id: visit.id,
      propertyName: visit.visitorName,
      visitCount: 1,
    }));

  const pendingRequests = allVisits
    .filter((v) => v.status === 'pending')
    .map((v) => ({
      id: v.id,
      visitorName: v.visitorName,
      dateTime: `${v.startDate.toLocaleDateString()} - ${v.time}`,
      propertyName: v.propertyName,
      buildingName: 'Building',
    }));

  const getDaysForCalendar = () => {
    const daysInMonth = getDaysInMonth(month, year);
    const firstDay = getFirstDayOfMonth(month, year);
    const days = [];

    // Empty slots for previous month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Days of current month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const breadcrumbs = useMemo<BreadcrumbItem[]>(() => [{ label: 'Visits' }], []);

  const handleAcceptRequest = async (requestId: string) => {
    try {
      await BookingService.updateBookingStatus(requestId as any, 'accepted');
      fetchVisits();
    } catch (error) {
      console.error('Failed to accept request:', error);
    }
  };

  const handleRejectRequest = async (requestId: string) => {
    try {
      await BookingService.updateBookingStatus(requestId as any, 'cancelled');
      fetchVisits();
    } catch (error) {
      console.error('Failed to reject request:', error);
    }
  };

  return (
    <LandlordLayout breadcrumbs={breadcrumbs}>
      <div className="flex flex-col gap-6 p-6">
        {/* Header Section */}
        <div className="flex justify-between items-center">
          <div className="bg-[#c2e4dd] dark:bg-[#12342e] rounded-lg px-6 py-3">
            <button
              className="text-[#000] dark:text-[#72cbb8] font-semibold text-lg hover:opacity-80 transition-opacity"
              onClick={() => setSetAvailableTimeOpen(true)}
            >
              Set Available Time Slots
            </button>
          </div>
          <div className="text-2xl font-bold text-dimgray dark:text-[#d7e0ef]">
            {monthNames[month]} {year}
          </div>
          <div className="flex gap-2"></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Mini Calendar and Upcoming Visits */}
          <div className="flex flex-col gap-6 w-full lg:w-80 shrink-0">
            <MiniCalendar
              currentDate={currentDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              monthNames={shortMonthNames}
            />

            <UpcomingVisitsSection visits={upcomingVisits} />
          </div>

          {/* Right Column: Main Calendar Grid */}
          <div className="flex-1 min-w-0">
            <MainCalendarGrid
              days={getDaysForCalendar()}
              getVisitsForDay={getVisitsForDay}
              onDayClick={(day) => setSelectedDay(day)}
              onEventClick={(event) => setSelectedEvent(event)}
            />
          </div>
        </div>

        {/* Visit Requests Section - Full Width Below */}
        <VisitRequestsSection
          requests={pendingRequests}
          onAccept={handleAcceptRequest}
          onReject={handleRejectRequest}
        />
      </div>

      {/* Modals and Popouts */}
      {isSetAvailableTimeOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <SetAvailableTime onClose={() => setSetAvailableTimeOpen(false)} />
        </div>
      )}

      {selectedDay !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <LandlordDayEventsPopout
            date={new Date(year, month, selectedDay)}
            events={getVisitsForDay(selectedDay)}
            onClose={() => setSelectedDay(null)}
          />
        </div>
      )}

      {selectedEvent !== null && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <LandlordEventPopout event={selectedEvent} onClose={() => setSelectedEvent(null)} />
        </div>
      )}
    </LandlordLayout>
  );
};

export default Visits;
