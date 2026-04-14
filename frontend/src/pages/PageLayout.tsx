import PageBackground from "../components/PageBackground";

type PageLayoutProps = {
  children: React.ReactNode;
};

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="relative min-h-screen w-full max-w-[1440px] mx-auto">
      <PageBackground />
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PageLayout;
