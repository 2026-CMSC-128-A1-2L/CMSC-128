import BgUpper from '../../../assets/bg-upper.svg?react';
import BgLower from '../../../assets/bg-lower.svg?react';

const PageBackground = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 w-full h-full overflow-hidden bg-white text-black dark:bg-[#0f1010] dark:text-white">
      {/* Top-right group */}
      <div className="opacity-50 dark:opacity-100">
        <BgUpper className="absolute top-0 right-0 w-auto h-full dark:scale-105 dark:origin-top-right" />
        <BgLower className="absolute -bottom-4 left-0 w-auto h-full dark:scale-105 dark:origin-bottom-left" />
      </div>
    </div>
  );
};

export default PageBackground;
