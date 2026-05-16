import {
  type FunctionComponent,
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Icon } from '@iconify/react';
import SideBar from '../../../components/user/SideBar';
import SideBarLandlord from '../../../components/landlord/SideBarLandlord';
import Footer from '../../../components/general/Footer';
import BreadcrumbHeader from '../../../components/general/Breadcrumb';
import PageBackground from '../../../components/general/PageBackground';
import { useAuthStore } from '../../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

type ArticleSection = {
  id: string;
  title: string;
};

const articleSections: ArticleSection[] = [
  { id: 'personal-data', title: 'Personal Data We Collect' },
  { id: 'data-use', title: 'How We Use Your Personal Data' },
  { id: 'data-sharing', title: 'How Your Personal Data is Shared' },
  { id: 'retention', title: 'Data Retention & Verification Cycles' },
  { id: 'rights', title: 'Your Rights & Choices' },
  { id: 'privacy-act', title: 'Data Privacy Act of 2012 (RA 10173)' },
];

function useRevealOnScroll() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = '0';
    el.style.transform = 'translateY(18px)';
    el.style.transition = 'opacity 0.45s ease, transform 0.45s ease';

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

const SectionHeading = ({ id, children }: { id: string; children: ReactNode }) => (
  <h2
    id={id}
    className="scroll-mt-24 text-[24px] font-extrabold leading-8 text-teal-200 dark:text-[#72cbb8]"
  >
    {children}
  </h2>
);

const MinorHeading = ({ children }: { children: ReactNode }) => (
  <h3 className="text-num-14 font-extrabold leading-6 text-darkslategray-200 dark:text-[#72cbb8]">
    {children}
  </h3>
);

const Paragraph = ({ children }: { children: ReactNode }) => (
  <p className="text-num-14 font-medium leading-6 text-black dark:text-[#edf6f4]">{children}</p>
);

const RevealedSection = ({ children, className }: { children: ReactNode; className: string }) => {
  const ref = useRevealOnScroll();

  return (
    <section ref={ref} className={className}>
      {children}
    </section>
  );
};

const PrivacyPolicy: FunctionComponent = () => {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const isSignedIn = Boolean(user);
  const usesLandlordShell = user?.userType === 'Landlord' || user?.userType === 'Manager';
  const signedInHomeUrl = usesLandlordShell ? '/landlord-homepage' : '/home';
  const [activeSectionId, setActiveSectionId] = useState(articleSections[0].id);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollToSection = useCallback((id: string) => {
    setActiveSectionId(id);
    document.getElementById(id)?.scrollIntoView({
      block: 'start',
      inline: 'nearest',
      behavior: 'smooth',
    });
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  useEffect(() => {
    let animationFrame = 0;

    const updateActiveSection = () => {
      const activationOffset = 160;
      let nextActiveSectionId = articleSections[0].id;

      for (const section of articleSections) {
        const element = document.getElementById(section.id);
        if (!element) continue;

        if (element.getBoundingClientRect().top <= activationOffset) {
          nextActiveSectionId = section.id;
        } else {
          break;
        }
      }

      setActiveSectionId(nextActiveSectionId);
      setShowScrollTop(window.scrollY > 300);
    };

    const handleArticleScroll = () => {
      cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(updateActiveSection);
    };

    updateActiveSection();
    window.addEventListener('scroll', handleArticleScroll, { passive: true });
    window.addEventListener('resize', handleArticleScroll);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('scroll', handleArticleScroll);
      window.removeEventListener('resize', handleArticleScroll);
    };
  }, []);

  return (
    <div className="privacy-policy-shell relative min-h-screen overflow-x-hidden bg-white font-inter text-black dark:bg-[#0f1010] dark:text-[#edf6f4]">
      <PageBackground />

      <div className="relative z-10 flex min-h-screen">
        {isSignedIn && (
          <aside className="fixed left-0 top-0 z-30 hidden h-screen shrink-0 md:block">
            {usesLandlordShell ? <SideBarLandlord /> : <SideBar />}
          </aside>
        )}

        <main
          className={`flex min-w-0 flex-1 flex-col px-5 pb-16 pt-8 sm:px-8 lg:px-12 xl:px-16 ${isSignedIn ? 'md:ml-[200px]' : 'items-center'}`}
        >
          <div className={`w-full ${isSignedIn ? 'max-w-[1180px]' : 'max-w-[1280px]'}`}>
            {/* <div className="mb-3 text-[20px] font-semibold text-[#d7d7d7] dark:text-[#4f555d]">
              Privacy Policy
            </div> */}

            <div className=" flex flex-col mb-8 border-b border-whitesmoke-200 pb-3 dark:border-[#303331] gap-4">
              {isSignedIn ? (
                <BreadcrumbHeader
                  routes={[{ name: 'Home', url: signedInHomeUrl }, { name: 'Privacy Policy' }]}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-num-14 font-extrabold text-darkslategray-200 transition-colors hover:text-teal-200 dark:text-[#edf6f4] dark:hover:text-[#72cbb8]"
                >
                  <Icon icon="material-symbols:arrow-back-rounded" className="h-5 w-5" />
                  Back
                </button>
              )}
              <h1 className="mt-2 text-[24px] font-extrabold leading-8 text-black dark:text-[#edf6f4]">
                ATLAS General Privacy Statement
              </h1>
            </div>

            <div className="grid gap-12 lg:grid-cols-[minmax(0,740px)_280px] xl:grid-cols-[minmax(0,800px)_320px]">
              <article className="flex min-w-0 flex-col gap-12 pb-12 font-inter">
                <RevealedSection className="flex flex-col gap-3">
                  <SectionHeading id="privacy-statement">ATLAS Privacy Statement</SectionHeading>
                  <Paragraph>
                    Welcome to <b>ATLAS</b>, a student-centric housing portal for the UPLB
                    community. Your privacy is a priority in our nest. This Privacy Policy explains
                    how we collect, use, and protect your personal information when you use our
                    platform to find or list student housing.
                  </Paragraph>
                </RevealedSection>

                <RevealedSection className="flex flex-col gap-4">
                  <SectionHeading id="personal-data">Personal Data We Collect</SectionHeading>
                  <Paragraph>
                    We collect Personal Data in different ways depending on how you interact with
                    ATLAS. This includes information you provide directly, data we collect
                    automatically, and information from third-party sources.
                  </Paragraph>

                  <div className="flex flex-col gap-1">
                    <MinorHeading>
                      A. Information We Collect from Third-Party OAuth Providers
                    </MinorHeading>
                    <Paragraph>
                      To simplify your experience, ATLAS allows you to sign in using a third-party
                      service, specifically Google. When you use this method, we automatically
                      retrieve:
                    </Paragraph>
                  </div>
                  <ul className="list-disc space-y-2 pl-6 text-num-14 leading-6 text-black dark:text-[#edf6f4]">
                    <li>
                      <b>Primary Identity Data:</b> We retrieve your Full Name and Primary Email
                      Address from your initial sign-in. These fields serve as your core identity
                      and are read-only to ensure account integrity.
                    </li>
                    <li>
                      <b>Authentication Tokens:</b> A secure, encrypted token that allows access
                      without ATLAS ever seeing or storing your third-party password.
                    </li>
                  </ul>

                  <div className="flex flex-col gap-1">
                    <MinorHeading>B. Information You Provide Directly</MinorHeading>
                    <Paragraph>
                      We collect Personal Data that you voluntarily provide or modify:
                    </Paragraph>
                  </div>
                  <ul className="list-disc space-y-2 pl-6 text-num-14 leading-6 text-black dark:text-[#edf6f4]">
                    <li>
                      <b>Editable Profile Information:</b> You can provide and manage your contact
                      number, secondary linked email, profile picture, and home address within your
                      user profile.
                    </li>
                    <li>
                      <b>Verification Data:</b> To maintain community safety, we require documents
                      to grant verified status.
                    </li>
                    <li className="ml-5 list-[circle]">
                      <b className="text-teal-200 dark:text-[#72cbb8]">For Students:</b> We require
                      a photo or PDF of a university-issued ID, Form 5, or Notice of Admission
                      depending on standing.
                    </li>
                    <li className="ml-5 list-[circle]">
                      <b className="text-teal-200 dark:text-[#72cbb8]">For Landlords:</b> We require
                      a valid Business Permit and Government-issued ID to verify rental operations.
                    </li>
                    <li>
                      <b>User Communications:</b> Content of messages sent through ATLAS between
                      students and landlords to facilitate housing agreements.
                    </li>
                    <li>
                      <b>User Reports & Reviews:</b> Feedback, reports, and supporting evidence
                      submitted to preserve community standards.
                    </li>
                  </ul>

                  <div className="flex flex-col gap-1">
                    <MinorHeading>C. Information We Collect Automatically</MinorHeading>
                    <Paragraph>
                      When you access ATLAS, we automatically collect technical information to keep
                      the platform stable and secure.
                    </Paragraph>
                  </div>
                  <ul className="list-disc space-y-2 pl-6 text-num-14 leading-6 text-black dark:text-[#edf6f4]">
                    <li>
                      <b>Usage Data:</b> Information about how you navigate the platform, such as
                      bookmarked dorms and search filters.
                    </li>
                    <li>
                      <b>Log Data:</b> Your IP address, device information, and time-stamped access
                      logs.
                    </li>
                    <li>
                      <b>Profile Information:</b> Additional details you add, such as profile
                      picture, contact number, address, or housing preferences.
                    </li>
                  </ul>

                  <div className="flex flex-col gap-1">
                    <MinorHeading>D. Information from Third Parties</MinorHeading>
                    <Paragraph>
                      We may receive information about you from other sources to improve listing
                      accuracy and community safety.
                    </Paragraph>
                  </div>
                  <ul className="list-disc space-y-2 pl-6 text-num-14 leading-6 text-black dark:text-[#edf6f4]">
                    <li>
                      <b>OAuth Providers:</b> As described above, we receive data from third-party
                      authentication services to verify identity and pre-populate your profile.
                    </li>
                  </ul>
                </RevealedSection>

                <RevealedSection className="flex flex-col gap-4">
                  <SectionHeading id="data-use">How We Use Your Personal Data</SectionHeading>
                  <Paragraph>
                    We use the Personal Data we collect to provide, maintain, and improve ATLAS.
                  </Paragraph>
                  <MinorHeading>A. To Provide and Personalize the Services</MinorHeading>
                  <ul className="list-disc space-y-2 pl-6 text-num-14 leading-6 text-black dark:text-[#edf6f4]">
                    <li>
                      <b>Create your Account:</b> Establish your unique identity in ATLAS.
                    </li>
                    <li>
                      <b>Personalize your Experience:</b> Use your name to greet you and manage
                      saved listings and search filters.
                    </li>
                    <li>
                      <b>Maintain Accurate Profiles:</b> Display contact details so landlords can
                      reach you regarding a listing.
                    </li>
                  </ul>
                  <MinorHeading>B. To Facilitate Secure Communications</MinorHeading>
                  <ul className="list-disc space-y-2 pl-6 text-num-14 leading-6 text-black dark:text-[#edf6f4]">
                    <li>
                      <b>Enable Inquiries:</b> Share your name and contact details with a landlord
                      only when you initiate a message or booking request.
                    </li>
                    <li>
                      <b>System Notifications:</b> Send alerts about messages, listing updates,
                      status changes, and verification updates.
                    </li>
                  </ul>
                  <MinorHeading>C. To Ensure Community Safety & Trust</MinorHeading>
                  <ul className="list-disc space-y-2 pl-6 text-num-14 leading-6 text-black dark:text-[#edf6f4]">
                    <li>
                      <b>Verification:</b> Use uploaded ID documents to grant verified badges.
                    </li>
                    <li>
                      <b>Business & Legal Compliance:</b> Require landlords to provide valid
                      business permits or clearances.
                    </li>
                    <li>
                      <b>Account Integrity:</b> Tie each account to a verified identity to prevent
                      anonymous misuse.
                    </li>
                  </ul>
                </RevealedSection>

                <RevealedSection className="flex flex-col gap-4">
                  <SectionHeading id="data-sharing">
                    How Your Personal Data is Shared
                  </SectionHeading>
                  <Paragraph>
                    ATLAS does not sell your Personal Data. We only share information in specific
                    scenarios that facilitate housing connections and community safety.
                  </Paragraph>
                  <MinorHeading>A. Sharing Between Students and Landlords</MinorHeading>
                  <ul className="list-disc space-y-2 pl-6 text-num-14 leading-6 text-black dark:text-[#edf6f4]">
                    <li>
                      <b>Upon Inquiry:</b> When you send a message about a listing, your name and
                      contact number may be shared with the landlord.
                    </li>
                    <li>
                      <b>Public Listings:</b> For landlords, business name and property address may
                      be public, while private verification documents are never shown.
                    </li>
                    <li>
                      <b>User Reviews:</b> If you post a review, your name and rating may be visible
                      to all users.
                    </li>
                  </ul>
                  <MinorHeading>B. For Legal and Safety Reasons</MinorHeading>
                  <ul className="list-disc space-y-2 pl-6 text-num-14 leading-6 text-black dark:text-[#edf6f4]">
                    <li>
                      <b>Protect the Community:</b> To investigate potential fraud or safety
                      reports.
                    </li>
                    <li>
                      <b>Compliance:</b> To comply with valid legal obligations or requests from
                      proper authorities.
                    </li>
                  </ul>
                  <MinorHeading>C. Service Providers</MinorHeading>
                  <Paragraph>
                    We may share technical data with trusted service providers who help maintain
                    hosting, database, communication, and security systems.
                  </Paragraph>
                </RevealedSection>

                <RevealedSection className="flex flex-col gap-4">
                  <SectionHeading id="retention">
                    Data Retention & Verification Cycles
                  </SectionHeading>
                  <Paragraph>
                    To keep verified status accurate and trustworthy, ATLAS implements periodic
                    renewal cycles for account verifications.
                  </Paragraph>
                  <MinorHeading>A. Verification Lifespans</MinorHeading>
                  <ul className="list-disc space-y-2 pl-6 text-num-14 leading-6 text-black dark:text-[#edf6f4]">
                    <li>
                      <b>For Iskos and Iskas:</b> Student verification is valid for six (6) months,
                      or one academic semester.
                    </li>
                    <li>
                      <b>For Landlords:</b> Business verification is valid for one (1) year and must
                      be renewed annually.
                    </li>
                  </ul>
                  <MinorHeading>B. Retention of Records</MinorHeading>
                  <ul className="list-disc space-y-2 pl-6 text-num-14 leading-6 text-black dark:text-[#edf6f4]">
                    <li>
                      <b>Active Verification:</b> We retain the most recently submitted ID or permit
                      supporting current verified status.
                    </li>
                    <li>
                      <b>Historical Records:</b> Previous documents may be archived to prevent
                      identity fraud and resolve disputes.
                    </li>
                  </ul>
                  <MinorHeading>C. Expiration Protocol</MinorHeading>
                  <ul className="list-disc space-y-2 pl-6 text-num-14 leading-6 text-darkslategray-200 dark:text-[#d7e0ef]">
                    <li>
                      <b>Grace Period:</b> Users have two (2) months after expiration to submit
                      updated documentation.
                    </li>
                    <li>
                      <b>Automatic Removal:</b> Failure to renew removes the verified badge from the
                      profile.
                    </li>
                    <li>
                      <b>Re-Verification:</b> Users must initiate verification again through Profile
                      Settings.
                    </li>
                  </ul>
                </RevealedSection>

                <RevealedSection className="flex flex-col gap-4">
                  <SectionHeading id="rights">Your Rights & Choices</SectionHeading>
                  <Paragraph>You maintain control over your editable information:</Paragraph>
                  <ul className="list-disc space-y-2 pl-6 text-num-14 leading-6 text-black dark:text-[#edf6f4]">
                    <li>
                      <b>Manage Profile:</b> You can update contact number, secondary email, profile
                      picture, and address through your user profile.
                    </li>
                    <li>
                      <b>Transparency:</b> You may contact the ATLAS team to ask about stored
                      documents or data.
                    </li>
                  </ul>
                </RevealedSection>

                <RevealedSection className="flex flex-col gap-4">
                  <SectionHeading id="privacy-act">
                    Data Privacy Act of 2012 (RA 10173)
                  </SectionHeading>
                  <Paragraph>
                    ATLAS complies with the Data Privacy Act of 2012 (Republic Act No. 10173) and
                    the guidelines of the National Privacy Commission.
                  </Paragraph>
                  <MinorHeading>A. Principles of Data Processing</MinorHeading>
                  <ul className="list-disc space-y-1 pl-6 text-num-14 leading-6 text-black dark:text-[#edf6f4]">
                    <li>
                      <b>Transparency:</b> Users are informed about how personal data is collected
                      and used.
                    </li>
                    <li>
                      <b>Legitimate Purpose:</b> Data is collected for specific platform functions.
                    </li>
                    <li>
                      <b>Proportionality:</b> Only minimum necessary data is processed.
                    </li>
                  </ul>
                  <MinorHeading>B. Lawful Data Processing</MinorHeading>
                  <ul className="list-disc space-y-1 pl-6 text-num-14 leading-6 text-black dark:text-[#edf6f4]">
                    <li>
                      <b>User consent</b>, such as account registration or verification submission.
                    </li>
                    <li>
                      <b>Fulfillment of contractual obligations</b>, such as ocular booking and
                      accommodation processes.
                    </li>
                    <li>
                      <b>Compliance with legal obligations.</b>
                    </li>
                    <li>
                      <b>Interests</b> such as system security, fraud prevention, and service
                      improvement.
                    </li>
                  </ul>
                  <MinorHeading>C. Data Subject Rights</MinorHeading>
                  <ul className="list-disc space-y-1 pl-6 text-num-14 leading-6 text-black dark:text-[#edf6f4]">
                    <li>
                      <b>Right to be Informed:</b> to know how we process and collect data.
                    </li>
                    <li>
                      <b>Right to Access:</b> to request access to your personal data.
                    </li>
                    <li>
                      <b>Right to Rectify:</b> to correct inaccurate data.
                    </li>
                    <li>
                      <b>Right to Erasure:</b> to request erasure of your data.
                    </li>
                    <li>
                      <b>Right to Object:</b> to refuse consent for certain processing.
                    </li>
                    <li>
                      <b>Right to Data Portability:</b> to obtain a copy of your data in a usable
                      format.
                    </li>
                    <li>
                      <b>Right to Damages:</b> to claim compensation for misuse of personal data.
                    </li>
                    <li>
                      <b>Right to File a Complaint:</b> to file a complaint for misuse of your data.
                    </li>
                  </ul>
                  <MinorHeading>D. Data Security Measures</MinorHeading>
                  <Paragraph>
                    ATLAS implements reasonable organizational, physical, and technical measures,
                    including role-based access control, encryption where applicable, restricted
                    access, and activity logging.
                  </Paragraph>
                  <MinorHeading>E. Data Retention and Disposal</MinorHeading>
                  <Paragraph>
                    Personal data is retained only as long as necessary to fulfill its intended
                    purpose or comply with legal requirements. Once no longer needed, data is
                    securely deleted or anonymized.
                  </Paragraph>
                  <MinorHeading>F. Data Breach and Incident Response</MinorHeading>
                  <Paragraph>
                    In the event of a data breach, ATLAS will take immediate steps to contain and
                    assess the incident. Affected users and relevant authorities will be notified
                    according to applicable laws.
                  </Paragraph>
                  <MinorHeading>G. Accountability and Contact</MinorHeading>
                  <Paragraph>
                    Users may raise concerns, request access, or file complaints regarding personal
                    data by contacting ATLAS administrators or the designated data protection
                    personnel.
                  </Paragraph>
                  <Paragraph>
                    By using ATLAS, you acknowledge that your data will be processed in accordance
                    with this Privacy Policy.
                  </Paragraph>
                </RevealedSection>
              </article>

              <aside className="relative hidden lg:block">
                <div className="fixed top-40 flex max-h-[calc(100vh-12rem)] w-[280px] flex-col gap-4 overflow-y-auto pt-5 text-num-14 xl:w-[320px]">
                  <b className="text-black dark:text-[#edf6f4]">In this article</b>
                  <div className="flex flex-col gap-4 text-dimgray dark:text-[#a4acba]">
                    {articleSections.map((section) => (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => scrollToSection(section.id)}
                        className={`border-l-4 py-1 pl-3 text-left font-extrabold leading-5 transition-colors ${
                          activeSectionId === section.id
                            ? 'border-teal-200 text-teal-200 dark:border-[#72cbb8] dark:text-[#72cbb8]'
                            : 'border-transparent hover:text-teal-200 dark:hover:text-[#72cbb8]'
                        }`}
                      >
                        {section.title}
                      </button>
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </main>
      </div>

      <footer
        className={`relative z-10 min-w-0 overflow-x-hidden bg-white dark:bg-[#0f1010] ${isSignedIn ? 'md:ml-[200px]' : ''}`}
      >
        <div className={isSignedIn ? '' : 'mx-auto max-w-[1280px]'}>
          <Footer />
        </div>
      </footer>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className="fixed bottom-10 right-10 z-20 flex h-14 w-14 items-center justify-center rounded-full bg-teal-200 text-white shadow-lg hover:-translate-y-1 hover:bg-darkslategray-200 dark:bg-[#2f9b86] dark:hover:bg-[#155444]"
        style={{
          transition: 'opacity 0.25s ease, transform 0.25s ease, background-color 0.2s',
          opacity: showScrollTop ? 1 : 0,
          transform: showScrollTop ? 'translateY(0) scale(1)' : 'translateY(12px) scale(0.9)',
          pointerEvents: showScrollTop ? 'auto' : 'none',
        }}
      >
        <Icon icon="material-symbols:arrow-upward-rounded" className="h-8 w-8" />
      </button>
    </div>
  );
};

export default PrivacyPolicy;
