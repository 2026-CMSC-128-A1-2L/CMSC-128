import { Outlet } from 'react-router-dom';
import PageBackground from '../../components/general/PageBackground';

const PageLayout = () => {
  return (
    <div className="relative">
      <PageBackground />
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
