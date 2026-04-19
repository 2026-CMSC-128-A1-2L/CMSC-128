import { FunctionComponent } from 'react';
import map from '../../assets/map.svg';

const LandingMap: FunctionComponent = () => {
  return (
    <div className="w-full h-[753px] relative [transform:_rotate(16.3deg)] [transform-origin:0_0]">
      <img src={map} />
    </div>
  );
};

export default LandingMap;
