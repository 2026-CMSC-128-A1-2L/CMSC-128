import type { FunctionComponent } from 'react';
import map from '../../assets/map.svg';

const LandingMap: FunctionComponent = () => {
  return (
    <div className="w-full h-[753px] relative transform-[rotate(16.3deg)] origin-top-left">
      <img src={map} />
    </div>
  );
};

export default LandingMap;
