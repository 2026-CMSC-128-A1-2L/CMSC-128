import { type FunctionComponent, useState, useCallback, useEffect, useRef } from 'react';
import { Icon } from '@iconify/react';
import SideBar from '../../../components/user/SideBar';
import SideBarLandlord from '../../../components/landlord/SideBarLandlord';
import TableOfContents from '../../../components/user/info/terms-of-use/TableOfContents';
import TermsArticle from '../../../components/user/info/terms-of-use/TermsArticle';
import { SECTIONS } from '../../../components/user/info/terms-of-use/TermsData';
import { useAuthStore } from '../../../store/useAuthStore';
import BreadcrumbHeader from '../../../components/general/Breadcrumb';

const TermsOfUse: FunctionComponent = () => {
  const user = useAuthStore((state) => state.user);
  const isSignedIn = Boolean(user);
  const usesLandlordShell = user?.userType === 'Landlord' || user?.userType === 'Manager';
  const homeUrl = usesLandlordShell ? '/landlord-homepage' : '/home';
  const [activeSection, setActiveSection] = useState<string>('acceptance');
  const [showScrollTop, setShowScrollTop] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = contentRef.current;
    if (!container) return;

    const handleScroll = () => {
      for (const section of [...SECTIONS].reverse()) {
        const el = document.getElementById(section.anchor);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(section.id);
          break;
        }
      }
      setShowScrollTop(container.scrollTop > 300);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = useCallback((anchor: string) => {
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  const scrollToTop = useCallback(() => {
    contentRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <div className="w-full h-screen flex flex-col font-inter text-darkslategray-100 overflow-hidden animate-fade-in">
      <div className="flex flex-1 overflow-hidden">
        {isSignedIn && (
          <>
            <div className="fixed top-0 left-0 h-full w-[200px] hidden md:block z-10">
              {usesLandlordShell ? <SideBarLandlord /> : <SideBar />}
            </div>
            <div className="w-[200px] shrink-0 hidden md:block" />
          </>
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <div ref={contentRef} className="flex-1 overflow-y-auto">
            <div className="flex flex-col min-h-full px-4 sm:px-8 pr-4 sm:pr-12 pb-20">
              <div
                className="h-16 flex items-end pb-3 gap-1.5 text-num-14 font-semibold font-lora shrink-0"
                style={{ animation: 'slide-up 0.4s ease-out forwards' }}
              >
                <BreadcrumbHeader
                  routes={[{ name: 'Home', url: homeUrl }, { name: 'Terms of Use' }]}
                />
              </div>

              <div
                className="flex flex-col gap-2 mb-6"
                style={{ animation: 'slide-up 0.45s ease-out 0.05s both' }}
              >
                <h1 className="text-[28px] font-bold text-darkslategray-200 font-inter leading-8 m-0">
                  ATLAS Terms of Use
                </h1>
                <div className="w-full h-0.5 rounded-full bg-whitesmoke-200" />
              </div>

              <div className="flex gap-10 xl:gap-14 items-start">
                <TermsArticle />
                <TableOfContents
                  sections={SECTIONS}
                  activeSection={activeSection}
                  onNavigate={scrollTo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 w-[52px] h-[52px] rounded-full bg-teal hover:bg-teal-100 flex items-center justify-center shadow-md cursor-pointer border-none z-20"
        aria-label="Scroll to top"
        style={{
          transition: 'opacity 0.25s ease, transform 0.25s ease, background-color 0.2s',
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
          pointerEvents: showScrollTop ? 'auto' : 'none',
        }}
      >
        <Icon icon="iconamoon:arrow-up-2" className="w-6 h-6 text-white" />
      </button>
    </div>
  );
};

export default TermsOfUse;
