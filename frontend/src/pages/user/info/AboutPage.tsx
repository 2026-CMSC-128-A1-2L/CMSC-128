import type { FunctionComponent } from 'react';
import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import SideBar from '../../../components/user/SideBar';
import SideBarLandlord from '../../../components/landlord/SideBarLandlord';
import Footer from '../../../components/general/Footer';
import Banner from '../../../components/general/Banner';
import BreadcrumbHeader from '../../../components/general/Breadcrumb';
import AutoImageSwitcher from '../../../components/general/AutoImageSwitcher';
import LandingFAQ from '../../../components/general/LandingFAQ';
import { useAuthStore } from '../../../store/useAuthStore';

function useScrollReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

const reveal = (visible: boolean, extra = '') =>
  `transition-all duration-700 ease-out ${extra} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`;

const AboutPage: FunctionComponent = () => {
  const user = useAuthStore((state) => state.user);
  const isSignedIn = Boolean(user);
  const usesLandlordShell = user?.userType === 'Landlord' || user?.userType === 'Manager';
  const homeUrl = usesLandlordShell ? '/landlord-homepage' : '/home';

  const whatIsReveal = useScrollReveal();
  const cardsReveal = useScrollReveal();
  const howHelpsReveal = useScrollReveal();
  const coreFeaturesReveal = useScrollReveal();
  const purposeReveal = useScrollReveal(0.1);
  const providesReveal = useScrollReveal(0.05);

  const [openProvides, setOpenProvides] = useState<number | null>(null);
  const toggleProvides = (i: number) => setOpenProvides((prev) => (prev === i ? null : i));

  const providesItems = [
    {
      num: '01',
      title: 'A centralized, reliable source of dormitory information',
      detail:
        'ATLAS aggregates all dormitory listings in one place so students never have to chase scattered posts or outdated flyers. Every listing is verified and kept up-to-date by landlords, giving you accurate information when you need it most.',
    },
    {
      num: '02',
      title: 'A streamlined digital application and management system',
      detail:
        'Gone are the days of paper forms and manual tracking. Students submit applications online, landlords review them digitally, and the entire workflow — from submission to approval — is tracked in real time.',
    },
    {
      num: '03',
      title: 'Improved coordination and communication between tenants and providers',
      detail:
        'Built-in messaging and notification tools keep tenants and landlords on the same page. Lease updates, maintenance requests, and announcements are delivered instantly, reducing miscommunication and delays.',
    },
    {
      num: '04',
      title:
        'Greater transparency, accessibility, and accountability in dormitory-related processes',
      detail:
        'Every action in ATLAS is logged and traceable. Tenants can see exactly where their application stands, and landlords are held accountable to the information they publish — fostering a fairer, more transparent housing ecosystem.',
    },
    {
      num: '05',
      title: 'Safety and compliance information built into every listing',
      detail:
        'Each listing includes emergency contacts, hazard disclosures, and safety certifications so tenants can make informed decisions before committing to a place to live.',
    },
  ];

  return (
    <div className="w-full min-h-screen flex font-inter text-darkslategray-100 overflow-hidden">
      <div className="w-full flex flex-1 overflow-hidden">
        {isSignedIn && (
          <>
            <div className="fixed top-0 left-0 h-full w-[200px] hidden md:block z-10">
              {usesLandlordShell ? <SideBarLandlord /> : <SideBar />}
            </div>
            <div className="w-[200px] shrink-0 hidden md:block" />
          </>
        )}

        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="flex flex-col">
              <div className="flex-1 flex flex-col px-4 sm:px-8 lg:px-20 pt-0">
                <div className="self-stretch h-16 overflow-hidden shrink-0 flex items-end p-num-10 box-border gap-2.5">
                  <BreadcrumbHeader
                    routes={[{ name: 'Home', url: homeUrl }, { name: 'About ATLAS' }]}
                  />
                </div>

                {/* What is ATLAS? */}
                <div ref={whatIsReveal.ref} className={`self-stretch bg-white flex items-center py-16 gap-3 ${reveal(whatIsReveal.isVisible)}`}>
                  <div className="flex-1 flex flex-col items-start gap-3">
                    <b className="self-stretch relative text-[56px]">What is ATLAS?</b>
                    <div className="self-stretch relative text-[20px] leading-10 text-gray-300">
                      <span>
                        <b className="font-inter">ATLAS</b>
                        <span className="font-medium">{` is a dormitory searching and management platform built specifically for the `}</span>
                      </span>
                      <b className="text-teal-100">University of the Philippines Los Baños</b>
                      <span className="font-medium">
                        {' '}
                        community. It bridges the gap between students looking for housing and landlords
                        or housing authorities managing their properties—bringing the entire process
                        online in one reliable, transparent place.
                      </span>
                    </div>
                  </div>
                  <div className="h-[356px] w-[580px] relative rounded-xl bg-white overflow-hidden shrink-0">
                    <AutoImageSwitcher />
                  </div>
                </div>

                {/* Cards */}
                <div ref={cardsReveal.ref} className={`self-stretch bg-white flex items-center justify-center py-10 gap-[89px] text-center text-num-24 text-gray-300 ${reveal(cardsReveal.isVisible)}`}>
                  <div className="h-[233px] w-[200px] flex flex-col items-center p-2.5 gap-3.5 hover:scale-110 transition-transform duration-50">
                    <Icon icon="tabler:search" color="#2F8677" className="w-20 h-20" />
                    <b className="w-[177px] leading-num-32">DISCOVER</b>
                    <b className="w-num-199 text-num-18 font-lora">Browse and filter available dorms near campus with accurate, up-to-date listings.</b>
                  </div>
                  <div className="h-[247px] w-num-199 flex flex-col items-center p-2.5 gap-3.5 hover:scale-110 transition-transform duration-50">
                    <Icon icon="emojione-monotone:clipboard" color="#2F8677" className="w-15 h-15" />
                    <b className="w-[177px] leading-num-32">APPLY</b>
                    <b className="w-num-199 text-num-18 font-lora">Submit dorm applications digitally, no more paper forms or in-person queuing.</b>
                  </div>
                  <div className="h-[251px] w-num-199 flex flex-col items-center p-2.5 gap-3.5 hover:scale-110 transition-transform duration-50">
                    <Icon icon="mdi:home" color="#2F8677" className="w-17 h-17" />
                    <b className="self-stretch leading-num-32">MANAGE</b>
                    <b className="self-stretch text-num-18 font-lora">Landlords can monitor listings, tenants, and documents in one place.</b>
                  </div>
                  <div className="h-[247px] w-num-199 flex flex-col items-center p-2.5 gap-3.5 hover:scale-110 transition-transform duration-50">
                    <Icon icon="mdi:security" color="#2F8677" className="w-15 h-15" />
                    <b className="w-[177px] leading-num-32">STAY SAFE</b>
                    <b className="w-num-199 text-num-18 font-lora">Emergency contacts, hazard disclosures, and safety information available at a glance.</b>
                  </div>
                </div>

                {/* How does it help? */}
                <div ref={howHelpsReveal.ref} className={`self-stretch flex flex-row items-center bg-[#0c8873] rounded-xl ${reveal(howHelpsReveal.isVisible)}`}>
                  <div className="flex-1 flex flex-col items-center justify-center py-16 px-20 gap-3 text-center text-white">
                    <b className="self-stretch relative text-[56px]">How does it help?</b>
                    <div className="self-stretch relative text-[20px] leading-10 font-medium">
                      Currently, dormitory searching and management at UPLB relies heavily on manual,
                      fragmented processes that are both inefficient and difficult to track. ATLAS
                      replaces these with a structured digital system that benefits every party
                      involved.
                    </div>
                  </div>
                </div>

                {/* Core Features */}
                <div ref={coreFeaturesReveal.ref} className={`self-stretch bg-azure flex flex-col items-center py-12 px-40 gap-[52px] text-center ${reveal(coreFeaturesReveal.isVisible)}`}>
                  <div className="relative text-[56px] font-extrabold text-transparent bg-clip-text! [background:linear-gradient(90deg,#0c8873,#5dc2a8_72.12%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent]">
                    Core features that set us<br />apart from the competition
                  </div>
                  <div className="self-stretch flex items-start gap-5 text-left text-num-24">
                    <div className="flex-1 flex flex-col gap-2.5">
                      <div className="rounded-num-16 bg-white p-4 px-num-32 gap-2.5 hover:scale-105 transition-transform">
                        <Icon icon="iconoir:design-nib" className="w-[58px] h-[58px]" color="#096C5B" />
                        <b className="leading-num-32">Role-based Views</b>
                        <div className="text-num-18 tracking-num--0_01 leading-num-25 font-semibold text-teal-100">
                          Distinct interfaces for Students, Managers, and Admins to ensure users only see what they need.
                        </div>
                      </div>
                      <div className="rounded-num-16 bg-white p-4 px-num-32 gap-2.5 hover:scale-105 transition-transform">
                        <Icon icon="material-symbols:verified" className="w-[58px] h-[58px]" color="#096C5B" />
                        <b className="leading-num-32">Verification Cycles</b>
                        <div className="text-num-18 tracking-num--0_01 leading-num-25 font-semibold text-teal-100">
                          Verification badges expire periodically to ensure a safe space for the community.
                        </div>
                      </div>
                    </div>
                    <div className="w-[300px] flex items-start">
                      <div className="rounded-xl bg-white p-2.5 gap-2.5 hover:scale-105 transition-transform">
                        <Icon icon="mdi:home" className="w-[58px] h-[58px] ml-5" color="#096C5B" />
                        <div className="px-num-32 gap-2.5">
                          <b className="leading-num-32">Accommodation Tracking</b>
                          <div className="text-num-18 tracking-num--0_01 leading-num-25 font-semibold text-teal-100">
                            Housing authorities can manage dormitory rooms, assign approved students,
                            enforce capacity limits, and monitor move-in and move-out dates, all from
                            one unified dashboard.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col gap-2.5">
                      <div className="rounded-num-16 bg-white p-4 px-num-32 gap-2.5 hover:scale-105 transition-transform">
                        <Icon icon="ic:baseline-notifications-active" className="w-[58px] h-[58px] ml-1" color="#096C5B" />
                        <b className="leading-num-32">Customizable Updates</b>
                        <div className="text-num-18 tracking-num--0_01 leading-num-25 font-semibold text-teal-100">
                          Get notified via email or system notifications the moment a manager approves or rejects your request.
                        </div>
                      </div>
                      <div className="rounded-num-16 bg-white p-4 px-num-32 hover:scale-105 transition-transform">
                        <Icon icon="fluent:handshake-16-regular" className="w-[58px] h-[58px]" color="#096C5B" />
                        <b className="leading-num-32">Fast & Smooth Process</b>
                        <div className="text-num-18 tracking-num--0_01 leading-num-25 font-semibold text-teal-100">
                          Optimized workflows and automated document generation move you from "Applying" to "Approved" in record time.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Purpose */}
                <div ref={purposeReveal.ref} className={`self-stretch bg-darkslategray-100 flex flex-col items-center justify-center py-20 px-6 md:px-20 rounded-xl ${reveal(purposeReveal.isVisible)}`}>
                  <div className="text-[50px] font-extrabold text-transparent bg-clip-text! [background:linear-gradient(90deg,#0c8873,#5dc2a8_72.12%)] [-webkit-background-clip:text] [-webkit-text-fill-color:transparent] text-center">
                    What is its PURPOSE?
                  </div>
                  <div className="h-10" />
                  <div className="max-w-2xl">
                    <p className="text-num-24 leading-relaxed font-inter font-normal text-white text-center opacity-90">
                      Finding a dormitory near UPLB is a stressful process for many students, especially
                      those coming from outside Los Baños. Information is scattered, processes are manual,
                      and there is little transparency between tenants and landlords. At the same time,
                      landlords and housing authorities struggle to coordinate applications, maintain
                      records, and communicate with their tenants efficiently.
                    </p>
                  </div>
                </div>

                {/* What does ATLAS provide? */}
                <div className="self-stretch bg-white flex flex-col items-center py-[111px] px-[118px] gap-10">
                  <div className="self-stretch text-center text-[56px] font-extrabold leading-[60px]">
                    What does ATLAS provide?
                  </div>
                  <div className="w-[1173px] flex flex-col text-center text-num-36 font-poppins">
                    {providesItems.map((item, i) => {
                      const isOpen = openProvides === i;
                      return (
                        <div key={item.num} className="w-num-1172">
                          <div className="w-full bg-white border-teal-200 border-solid border-b flex items-center gap-[67px] py-[46px] px-[28px] text-left">
                            <b className="h-num-37 w-num-48.7 flex items-center justify-center shrink-0 text-num-36 font-poppins">
                              {item.num}
                            </b>
                            <b className="flex-1 text-num-28 font-inter text-darkslategray-200 text-left">
                              {item.title}
                            </b>
                            <button
                              type="button"
                              onClick={() => toggleProvides(i)}
                              className="flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full transition-colors duration-200 hover:bg-[#0c8873]/10"
                              aria-label={`${isOpen ? 'Collapse' : 'Expand'} ${item.title}`}
                            >
                              <Icon
                                icon="lucide:plus"
                                className={`h-[26px] w-[26px] transition-transform duration-300 ${isOpen ? 'rotate-45 text-teal-200' : ''} cursor-pointer`}
                              />
                            </button>
                          </div>
                          <div className={`overflow-hidden transition-all duration-400 ease-in-out bg-[#F0FAF8] border-teal-200 border-solid border-b ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                            <p className="px-[28px] py-4 text-num-18 font-inter text-gray-300 leading-relaxed text-left pl-[143px]">
                              {item.detail}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* FAQ */}
                <div className="self-stretch mb-8">
                  <LandingFAQ />
                </div>

                <div className="w-full mb-12">
                  <Banner />
                </div>
              </div>
              <Footer />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
