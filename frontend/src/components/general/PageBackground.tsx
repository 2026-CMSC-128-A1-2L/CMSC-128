import BgUpper from '../../assets/bg-upper.svg?react';
import BgLower from '../../assets/bg-lower.svg?react';

const PageBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-white">
      {/* Top-right group */}
      <div className="opacity-50">
        <BgUpper className="absolute top-0 right-0 w-auto h-full" />
        <BgLower className="absolute bottom-0 left-0 w-auto h-full" />
      </div>
    </div>
  );
};

export default PageBackground;
