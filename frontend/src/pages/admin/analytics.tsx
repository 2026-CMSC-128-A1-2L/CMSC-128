import NavBarAdmin from '../../components/NavBarAdmin';
import SideBarAdmin from '../../components/SideBarAdmin';

function Analytics() {
  return (
    <div className="relative -mx-[calc((100vw-100%)/2)] flex w-screen flex-col min-h-screen">
      <NavBarAdmin />
      <div className="flex flex-1">
        <SideBarAdmin />
        <div className="flex-1">
          <h1></h1>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
