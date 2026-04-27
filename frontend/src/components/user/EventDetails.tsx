import { FunctionComponent } from "react";

interface EventDetailsProps {
  title?: string;
  date?: string;
  time?: string;
  description?: string;
  location?: string;
}

const EventDetails: FunctionComponent<EventDetailsProps> = ({
  title = "Ocular Visit",
  date = "April 7, 2026",
  time = "2:00 PM - 3:00 PM",
  description = "Please visit the clinic for your ocular checkup.",
  location = "Health Services Center, 2nd Floor",
}) => {
  return (
    <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6 flex flex-col gap-4">
      <div className="border-b pb-4">
        <h2 className="text-xl font-bold text-black mb-2">{title}</h2>
        <div className="flex flex-col gap-2 text-sm text-dimgray">
          <div className="flex items-center gap-2">
            <span className="font-medium">Date:</span>
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Time:</span>
            <span>{time}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-medium">Location:</span>
            <span>{location}</span>
          </div>
        </div>
      </div>
      
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-sm text-black">Description</h3>
        <p className="text-sm text-dimgray leading-relaxed">{description}</p>
      </div>

      <div className="flex gap-2 pt-4">
        <button className="flex-1 py-2 px-4 bg-teal-200 text-white rounded-lg font-medium hover:opacity-90 transition-opacity">
          Accept
        </button>
        <button className="flex-1 py-2 px-4 border border-gray-200 rounded-lg font-medium hover:bg-gray-50 transition-colors">
          Decline
        </button>
      </div>
    </div>
  );
};

export default EventDetails;
