import type { FunctionComponent } from 'react';
import { Icon } from '@iconify/react';
import type { CalendarEvent } from '../../service/CalendarService';

export type EventPopoutType = {
  className?: string;
  onClose?: () => void;
  event: CalendarEvent;
};

const getEventIcon = (type: CalendarEvent['type']) => {
  switch (type) {
    case 'booking':
      return 'ic:round-calendar-today';
    case 'billing':
      return 'ic:round-receipt';
    case 'move-in':
      return 'ic:round-home';
    case 'move-out':
      return 'ic:round-logout';
    default:
      return 'ic:round-circle';
  }
};

const getEventColor = (type: CalendarEvent['type']) => {
  switch (type) {
    case 'booking':
      return '#c00f0f';
    case 'billing':
      return '#ff9800';
    case 'move-in':
      return '#4caf50';
    case 'move-out':
      return '#2196f3';
    default:
      return '#c00f0f';
  }
};

const EventPopout: FunctionComponent<EventPopoutType> = ({ className = '', onClose, event }) => {
  const eventDate = new Date(event.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const formattedTime = eventDate.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });

  const getTypeLabel = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'booking':
        return 'Visit Booking';
      case 'billing':
        return 'Billing Due';
      case 'move-in':
        return 'Move In';
      case 'move-out':
        return 'Move Out';
      default:
        return 'Event';
    }
  };

  return (
    <div
      className={`w-96 h-auto relative max-w-full max-h-full overflow-auto text-left text-num-12 text-black font-inter ${className}`}
    >
      <div className="absolute top-0 left-0 rounded-md bg-white w-full h-full p-6" />
      <Icon
        icon="ic:round-close"
        className="absolute top-3 right-3 w-8 h-8 cursor-pointer hover:opacity-70"
        onClick={onClose}
      />
      <Icon
        icon={getEventIcon(event.type)}
        className="absolute top-4 left-6 w-8 h-8"
        color={getEventColor(event.type)}
      />

      <div className="absolute top-6 left-20 text-lg font-semibold">{getTypeLabel(event.type)}</div>
      <div className="absolute top-14 left-20 text-sm text-dimgray">{event.title}</div>
      <div className="absolute top-20 left-20 whitespace-pre-wrap text-num-12">
        {formattedDate} at {formattedTime}
      </div>
      <div className="absolute top-28 left-20 text-num-12 text-gray">ID: {event.referenceId}</div>
    </div>
  );
};

export default EventPopout;
