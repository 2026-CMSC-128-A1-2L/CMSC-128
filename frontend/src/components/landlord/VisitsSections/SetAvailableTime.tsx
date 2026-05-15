import { type FunctionComponent, useState, useCallback } from 'react';

const HOURS = Array.from({ length: 10 }, (_, i) => `${i + 8}:00`);
const DAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

interface SetAvailableTimeProps {
  onClose?: () => void;
}

const SetAvailableTime: FunctionComponent<SetAvailableTimeProps> = ({ onClose }) => {
  const [availability, setAvailability] = useState<boolean[][]>(
    Array(10)
      .fill(null)
      .map(() => Array(7).fill(true)),
  );
  const [initialAvailability] = useState<boolean[][]>(
    Array(10)
      .fill(null)
      .map(() => Array(7).fill(true)),
  );

  const handleTileClick = useCallback((row: number, col: number) => {
    setAvailability((prev) => {
      const newAvailability = prev.map((r) => [...r]);
      newAvailability[row][col] = !newAvailability[row][col];
      return newAvailability;
    });
  }, []);

  const handleCancel = useCallback(() => {
    setAvailability(initialAvailability.map((row) => [...row]));
    onClose?.();
  }, [initialAvailability, onClose]);

  const handleSave = useCallback(() => {
    console.log('Saved availability:', availability);
    // TODO: Call API to save availability
    onClose?.();
  }, [availability, onClose]);
  return (
    <div className="relative rounded-2xl bg-white dark:bg-[#141515] w-[900px] overflow-hidden flex flex-col items-start py-8 px-12 box-border gap-2.5 text-center text-[24px] text-teal dark:text-[#72cbb8] font-inter">
      <div className="self-stretch overflow-hidden flex flex-col items-start p-num-10 gap-2.5">
        <b className="relative leading-8">General Availability</b>
        <b className="relative text-num-14 text-darkslategray dark:text-[#a4acba]">{`Set your available times for scheduled visits `}</b>
      </div>
      <div className="w-full flex items-start gap-2.5 text-num-12 text-black dark:text-[#d7e0ef]">
        <div
          className="w-fit overflow-hidden flex flex-col items-start pt-12 px-0 pb-0 box-border"
          style={{ gap: '8px' }}
        >
          {HOURS.map((hour) => (
            <div key={hour} className="w-full flex flex-col items-center justify-center h-10">
              <b className="relative">{hour}</b>
            </div>
          ))}
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-left text-num-14 text-dimgray dark:text-[#a4acba]">
          <div className="w-full flex flex-col items-stretch gap-0">
            <div className="self-stretch flex items-center justify-start gap-2.5">
              {DAYS.map((day) => (
                <div
                  key={day}
                  className="flex-1 h-8 rounded-tl-num-4_65 rounded-tr-num-0 rounded-b-num-0 flex flex-col items-center justify-center box-border text-center"
                >
                  <b className="relative text-num-12 font-semibold text-dimgray dark:text-[#a4acba]">
                    {day}
                  </b>
                </div>
              ))}
            </div>
          </div>
          <div
            className="w-full h-auto bg-white dark:bg-[#141515] overflow-hidden shrink-0 grid box-border grid-cols-[repeat(7,1fr)] grid-rows-[repeat(10,1fr)]"
            style={{ gap: '8px' }}
          >
            {availability.map((row, rowIdx) =>
              row.map((isAvailable, colIdx) => (
                <div
                  key={`${rowIdx}-${colIdx}`}
                  onClick={() => handleTileClick(rowIdx, colIdx)}
                  className={`h-10 overflow-hidden flex items-start p-num-10 box-border cursor-pointer transition-colors hover:opacity-80 ${
                    isAvailable ? 'bg-teal dark:bg-[#72cbb8]' : 'bg-white dark:bg-[#1f2022]'
                  }`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      handleTileClick(rowIdx, colIdx);
                    }
                  }}
                  aria-pressed={isAvailable}
                  aria-label={`${HOURS[rowIdx]} ${DAYS[colIdx]}`}
                />
              )),
            )}
          </div>
        </div>
      </div>
      <div className="self-stretch flex items-center justify-center gap-4 text-left text-num-14 text-crimson dark:text-red-400">
        <button
          onClick={handleCancel}
          className="rounded-xl flex items-center justify-center py-2 px-6 cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="relative font-semibold">Cancel</div>
        </button>
        <button
          onClick={handleSave}
          className="rounded-xl bg-lightcyan dark:bg-[#12342e] overflow-hidden flex items-center justify-center py-2 px-6 text-teal dark:text-[#72cbb8] cursor-pointer hover:opacity-80 transition-opacity"
        >
          <div className="relative font-semibold">Save</div>
        </button>
      </div>
    </div>
  );
};

export default SetAvailableTime;
