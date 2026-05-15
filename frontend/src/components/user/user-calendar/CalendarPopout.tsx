import { Icon } from '@iconify/react';
import axios from 'axios';
import { type FunctionComponent, useEffect, useMemo, useState } from 'react';
import { BookingService, type VisitSlotAvailability } from '../../../service/BookingService';
import { UserService } from '../../../service/UserService';

type BookingUser = {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  emails?: string[];
  address?: string;
};

type ApiErrorPayload = {
  error?: string | { message?: string } | { message?: string }[];
};

export type CalendarPopoutType = {
  className?: string;
  facilityId: string;
  facilityName: string;
  facilityAddress: string;
  onClose: () => void;
  onBooked?: () => void;
};

const formatDateInput = (date: Date) => {
  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const formatTime = (dateValue: string) =>
  new Intl.DateTimeFormat('en-PH', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(new Date(dateValue));

const formatTimeRange = (slot: VisitSlotAvailability) =>
  `${formatTime(slot.startDate)} - ${formatTime(slot.endDate)}`;

const getApiErrorMessage = (error: unknown, fallback: string) => {
  if (!axios.isAxiosError(error)) return fallback;

  const payload = error.response?.data as ApiErrorPayload | string | undefined;
  if (typeof payload === 'string') return payload;
  if (!payload?.error) return fallback;
  if (typeof payload.error === 'string') return payload.error;
  if (Array.isArray(payload.error)) return payload.error[0]?.message ?? fallback;

  return payload.error.message ?? fallback;
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const CalendarPopout: FunctionComponent<CalendarPopoutType> = ({
  className = '',
  facilityId,
  facilityName,
  facilityAddress,
  onClose,
  onBooked,
}) => {
  const today = useMemo(() => formatDateInput(new Date()), []);
  const [selectedDate, setSelectedDate] = useState(today);
  const [viewDate, setViewDate] = useState(() => new Date());
  const [selectedSlotStart, setSelectedSlotStart] = useState('');
  const [slots, setSlots] = useState<VisitSlotAvailability[]>([]);
  const [user, setUser] = useState<BookingUser | null>(null);
  const [message, setMessage] = useState('');
  const [isTimeMenuOpen, setTimeMenuOpen] = useState(false);
  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const loadUser = async () => {
      setIsLoadingUser(true);
      try {
        const response = await UserService.getSelf();
        if (!cancelled) setUser(response.data);
      } catch (_err) {
        if (!cancelled) setError('Could not load your booking details.');
      } finally {
        if (!cancelled) setIsLoadingUser(false);
      }
    };

    loadUser();

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadSlots = async () => {
      setIsLoadingSlots(true);
      setError(null);
      setSelectedSlotStart('');

      try {
        const response = await BookingService.getAvailableVisitSlots(facilityId, selectedDate);
        if (!cancelled) setSlots(response.data);
      } catch (err) {
        if (!cancelled) {
          setSlots([]);
          setError(getApiErrorMessage(err, 'Could not load available visit times.'));
        }
      } finally {
        if (!cancelled) setIsLoadingSlots(false);
      }
    };

    loadSlots();

    return () => {
      cancelled = true;
    };
  }, [facilityId, selectedDate]);

  const selectedSlot = slots.find((slot) => slot.startDate === selectedSlotStart);
  const availableSlots = slots.filter((slot) => slot.available);
  const firstAvailableSlotStart = availableSlots[0]?.startDate ?? '';
  const years = useMemo(() => {
    const currentYear = new Date().getFullYear();
    return Array.from({ length: 8 }, (_, index) => currentYear + index);
  }, []);
  const firstName = user?.firstName ?? '';
  const lastName = user?.lastName ?? '';
  const email = user?.emails?.[0] ?? '';
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const calendarCells: { key: string; day: number | null }[] = [
    ...Array.from({ length: firstDay }, (_, index) => ({
      key: `leading-${year}-${month}-${index}`,
      day: null,
    })),
    ...Array.from({ length: daysInMonth }, (_, index) => {
      const day = index + 1;
      return { key: formatDateInput(new Date(year, month, day)), day };
    }),
  ];
  const trailingCount = (7 - (calendarCells.length % 7)) % 7;
  calendarCells.push(
    ...Array.from({ length: trailingCount }, (_, index) => ({
      key: `trailing-${year}-${month}-${index}`,
      day: null,
    })),
  );

  const syncSelectedDateToView = (nextYear: number, nextMonth: number) => {
    const currentSelectedDate = new Date(`${selectedDate}T00:00:00`);
    const lastDayOfNextMonth = new Date(nextYear, nextMonth + 1, 0).getDate();
    const nextDay = Math.min(currentSelectedDate.getDate(), lastDayOfNextMonth);
    const nextDate = new Date(nextYear, nextMonth, nextDay);
    const nextDateValue = formatDateInput(nextDate);
    setSelectedDate(nextDateValue < today ? today : nextDateValue);
  };

  const goToMonth = (offset: number) => {
    const nextDate = new Date(year, month + offset, 1);
    setViewDate(nextDate);
    syncSelectedDateToView(nextDate.getFullYear(), nextDate.getMonth());
  };

  const selectCalendarDay = (day: number) => {
    const nextDate = new Date(year, month, day);
    const nextDateValue = formatDateInput(nextDate);
    if (nextDateValue < today) return;
    setSelectedDate(nextDateValue);
  };

  const handleMonthSelect = (monthIndex: number) => {
    setViewDate((current) => new Date(current.getFullYear(), monthIndex, 1));
    syncSelectedDateToView(year, monthIndex);
  };

  const handleYearSelect = (selectedYear: number) => {
    setViewDate((current) => new Date(selectedYear, current.getMonth(), 1));
    syncSelectedDateToView(selectedYear, month);
  };

  const handleBook = async () => {
    if (!selectedSlot) {
      setError('Please choose an available time slot.');
      return;
    }

    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await BookingService.createBooking({
        facilityId,
        startDate: selectedSlot.startDate as unknown as Date,
        endDate: selectedSlot.endDate as unknown as Date,
        message: message.trim() || undefined,
      });
      onBooked?.();
      setTimeout(onClose, 900);
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not book this visit.'));
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    setSelectedSlotStart(firstAvailableSlotStart);
    setTimeMenuOpen(false);
  }, [firstAvailableSlotStart]);

  return (
    <div
      className={`h-[602px] w-[687px] max-h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)] overflow-auto rounded-[12px] bg-white px-6 py-6 text-left text-num-14 text-dimgray font-inter shadow-xl ${className}`}
    >
      <div className="relative text-center">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-0 top-0 grid h-8 w-8 place-items-center rounded-full text-dimgray hover:bg-whitesmoke-100"
          aria-label="Close booking form"
        >
          <Icon icon="material-symbols:close-rounded" className="h-5 w-5" />
        </button>
        <div className="text-num-14 font-bold text-[#666]">Booking a visit for</div>
        <h2 className="mt-1 text-[24px] font-extrabold leading-tight text-[#004236]">
          {facilityName}
        </h2>
        <p className="mx-auto mt-1 max-w-[340px] text-center text-num-12 font-bold leading-4 text-black font-lora">
          {facilityAddress}
        </p>
      </div>

      <div className="my-4 h-0.5 rounded-full bg-whitesmoke-300" />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_250px]">
        <div className="flex flex-col gap-2">
          <b className="text-[20px] tracking-num--0_01 text-black">Your booking details</b>
          <div className="grid gap-2">
            <label className="grid gap-1.5">
              <span className="text-num-14 font-bold text-[#666]">First name</span>
              <input
                value={isLoadingUser ? 'Loading...' : firstName}
                readOnly
                placeholder="First name"
                className="h-9 rounded-xl bg-white border border-[#e5e5e5] px-4 text-num-14 font-medium text-black outline-none placeholder:text-[#9b9b9b]"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-num-14 font-bold text-[#666]">Last name</span>
              <input
                value={isLoadingUser ? 'Loading...' : lastName}
                readOnly
                placeholder="Last name"
                className="h-9 rounded-xl bg-white border border-[#e5e5e5] px-4 text-num-14 font-medium text-black outline-none placeholder:text-[#9b9b9b]"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-num-14 font-bold text-[#666]">Email address</span>
              <input
                value={isLoadingUser ? 'Loading...' : email}
                readOnly
                placeholder="Email addr."
                className="h-9 rounded-xl bg-white border border-[#e5e5e5] px-4 text-num-14 font-medium text-black outline-none placeholder:text-[#9b9b9b]"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-num-14 font-bold text-[#666]">Home address</span>
              <input
                value={isLoadingUser ? 'Loading...' : (user?.address ?? '')}
                readOnly
                placeholder="Home address"
                className="h-9 rounded-xl bg-white border border-[#e5e5e5] px-4 text-num-14 font-medium text-black outline-none placeholder:text-[#9b9b9b]"
              />
            </label>
            <label className="grid gap-1.5">
              <span className="text-num-14 font-bold text-[#666]">
                Message <span className="text-num-12 font-semibold text-slategray">(optional)</span>
              </span>
              <textarea
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                placeholder="Add a note for the landlord or manager"
                className="min-h-[48px] resize-none rounded-[18px] border border-[#e5e5e5] bg-white px-4 py-2 text-num-12 font-medium text-black outline-none placeholder:text-[#9b9b9b] focus:border-teal-200"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <b className="text-[20px] tracking-num--0_01 text-black">Date and Time</b>
          <div className="rounded-[16px] border border-[#dedede] bg-white p-3">
            <div className="mb-3 flex items-center gap-1.5 text-black">
              <button
                type="button"
                onClick={() => goToMonth(-1)}
                className="grid h-7 w-7 place-items-center rounded-full hover:bg-whitesmoke-100"
                aria-label="Previous month"
              >
                <Icon icon="material-symbols:chevron-left-rounded" className="h-6 w-6" />
              </button>
              <select
                value={month}
                onChange={(event) => handleMonthSelect(Number(event.target.value))}
                className="h-7 flex-1 rounded-lg border border-[#dedede] bg-white px-2 text-num-12 font-medium outline-none"
              >
                {MONTHS.map((monthLabel, index) => (
                  <option key={monthLabel} value={index}>
                    {monthLabel}
                  </option>
                ))}
              </select>
              <select
                value={year}
                onChange={(event) => handleYearSelect(Number(event.target.value))}
                className="h-7 flex-1 rounded-lg border border-[#dedede] bg-white px-2 text-num-12 font-medium outline-none"
              >
                {years.map((yearOption) => (
                  <option key={yearOption} value={yearOption}>
                    {yearOption}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => goToMonth(1)}
                className="grid h-7 w-7 place-items-center rounded-full hover:bg-whitesmoke-100"
                aria-label="Next month"
              >
                <Icon icon="material-symbols:chevron-right-rounded" className="h-6 w-6" />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-y-1 text-center">
              {DAYS.map((day) => (
                <div key={day} className="pb-1 text-xs font-medium text-[#777]">
                  {day}
                </div>
              ))}
              {calendarCells.map(({ key, day }) => {
                if (day == null) return <div key={key} className="h-7" />;

                const dateValue = formatDateInput(new Date(year, month, day));
                const isPast = dateValue < today;
                const isSelected = dateValue === selectedDate;

                return (
                  <button
                    key={dateValue}
                    type="button"
                    disabled={isPast}
                    onClick={() => selectCalendarDay(day)}
                    className={`mx-auto grid h-7 w-7 place-items-center rounded-lg text-num-12 font-medium transition-colors disabled:cursor-not-allowed ${
                      isSelected
                        ? 'bg-[#bdf1e6] text-[#006f5e] font-bold'
                        : isPast
                          ? 'text-[#b4b4b4]'
                          : 'text-black hover:bg-whitesmoke-100'
                    }`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 text-black">
            <Icon icon="solar:clock-circle-outline" className="h-5 w-5" />
            <div className="relative w-[150px]">
              <button
                type="button"
                onClick={() => setTimeMenuOpen((isOpen) => !isOpen)}
                disabled={isLoadingSlots || availableSlots.length === 0}
                className="flex h-9 w-full items-center justify-between rounded-[10px] border border-[#e5e5e5] bg-white px-3 text-left text-num-12 font-medium text-[#5d5d5d] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <span className="truncate">
                  {isLoadingSlots
                    ? 'Loading...'
                    : selectedSlot
                      ? formatTimeRange(selectedSlot)
                      : availableSlots.length > 0
                        ? 'Select time'
                        : 'No slots'}
                </span>
                <Icon
                  icon="material-symbols:keyboard-arrow-down-rounded"
                  className={`h-5 w-5 shrink-0 text-[#356c65] transition-transform ${
                    isTimeMenuOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isTimeMenuOpen && availableSlots.length > 0 && (
                <div className="absolute left-0 right-0 z-20 mt-2 max-h-44 overflow-y-auto rounded-[10px] border border-whitesmoke-300 bg-white p-1 shadow-lg">
                  {availableSlots.map((slot) => (
                    <button
                      key={slot.startDate}
                      type="button"
                      onClick={() => {
                        setSelectedSlotStart(slot.startDate);
                        setTimeMenuOpen(false);
                      }}
                      className="w-full rounded-lg px-3 py-1.5 text-left text-xs font-medium text-black hover:bg-lightcyan"
                    >
                      {formatTimeRange(slot)}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {(error || success) && (
        <p
          className={`mt-4 text-center text-xs font-semibold ${
            success ? 'text-teal-200' : 'text-red-500'
          }`}
        >
          {success ?? error}
        </p>
      )}

      <div className="mt-5 flex items-center justify-center gap-14">
        <button
          type="button"
          onClick={onClose}
          className="h-8 rounded-num-16 px-5 text-base font-medium text-red-500 hover:bg-red-50"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleBook}
          disabled={isSubmitting || isLoadingUser || isLoadingSlots}
          className="h-9 rounded-[20px] bg-aliceblue px-7 text-base font-bold text-teal-200 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? 'Booking...' : 'Book'}
        </button>
      </div>
    </div>
  );
};

export default CalendarPopout;
