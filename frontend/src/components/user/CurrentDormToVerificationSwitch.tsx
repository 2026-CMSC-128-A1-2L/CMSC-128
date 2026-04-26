// ../components/CurrentDormToVerificationSwitch.tsx
interface SwitchProps {
  activeTab: 'dorm' | 'verification';
  setActiveTab: (tab: 'dorm' | 'verification') => void;
}

const CurrentDormToVerificationSwitch = ({ activeTab, setActiveTab }: SwitchProps) => {
  return (
    <div className="flex flex-col items-center justify-center w-full py-4">
      <div className="relative flex flex-row items-center gap-2 p-1 bg-transparent rounded-full border border-whitesmoke-200">
        {/* Sliding background */}
        <div
          className={`absolute h-[48px] w-[240px] bg-[#064e3b] rounded-full shadow-md transition-all duration-300 ease-in-out z-0 ${
            activeTab === 'dorm' ? 'left-1' : 'left-[249px]'
          }`}
        />

        {/* Current Dorm Tab */}
        <div
          onClick={() => setActiveTab('dorm')}
          className={`relative z-10 w-[240px] h-[48px] flex items-center justify-center cursor-pointer transition-colors duration-300 ${
            activeTab === 'dorm' ? 'text-white' : 'text-slategray hover:text-teal-800'
          }`}
        >
          <div className="text-[14px] font-bold tracking-wider uppercase">Current Dorm</div>
        </div>

        {/* Verification Status Tab */}
        <div
          onClick={() => setActiveTab('verification')}
          className={`relative z-10 w-[240px] h-[48px] flex items-center justify-center cursor-pointer transition-colors duration-300 ${
            activeTab === 'verification' ? 'text-white' : 'text-slategray hover:text-teal-800'
          }`}
        >
          <div className="text-[14px] font-bold tracking-wider uppercase">Verification Status</div>
        </div>
      </div>
    </div>
  );
};

export default CurrentDormToVerificationSwitch;
