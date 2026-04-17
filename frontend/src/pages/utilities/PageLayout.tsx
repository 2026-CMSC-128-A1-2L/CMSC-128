import { Outlet } from "react-router-dom";
import PageBackground from "../../components/PageBackground";

const PageLayout = () => {
  return (
    <div className="relative min-h-screen w-full max-w-[1440px] mx-auto overflow-x-hidden">
      <PageBackground />
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
