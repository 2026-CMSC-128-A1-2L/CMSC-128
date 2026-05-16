import { type FunctionComponent, useEffect, useRef } from 'react';
import { BulletList, Callout, SectionHeader } from './TermsPrimitives';
import { DEFINITIONS } from './TermsData';

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
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return ref;
}

const TermsArticle: FunctionComponent = () => {
  const acceptanceRef = useRevealOnScroll();
  const atlasRef = useRevealOnScroll();
  const definitionsRef = useRevealOnScroll();
  const accountRef = useRevealOnScroll();
  const platformRef = useRevealOnScroll();
  const tenantRef = useRevealOnScroll();
  const landlordRef = useRevealOnScroll();
  const paymentsRef = useRevealOnScroll();
  const privacyRef = useRevealOnScroll();
  const prohibitedRef = useRevealOnScroll();
  const disclaimersRef = useRevealOnScroll();
  const terminationRef = useRevealOnScroll();
  const governingRef = useRevealOnScroll();
  const contactRef = useRevealOnScroll();

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-10">

      {/* Acceptance of Terms */}
      <section ref={acceptanceRef} id="acceptance" className="flex flex-col gap-3 scroll-mt-6">
        <SectionHeader id="" title="Acceptance of Terms" />
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          By accessing, browsing, or using ATLAS, whether through our website, mobile application,
          or any related services, you acknowledge that you have read, understood, and agree to be
          bound by these Terms of Use.
        </p>
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          These terms apply to <b>all users</b> of the platform, including students, tenants,
          landlords, housing managers, and any other individuals or entities accessing ATLAS.
        </p>
      </section>

      {/* The ATLAS Terms of Use */}
      <section ref={atlasRef} id="atlas-terms" className="flex flex-col gap-3 scroll-mt-6">
        <SectionHeader id="" title="The ATLAS Terms of Use" />
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          <span className="font-bold">Effective Date:</span> May 11, 2026
        </p>
      </section>

      {/* A. Definitions */}
      <section ref={definitionsRef} id="definitions" className="flex flex-col gap-4 scroll-mt-6">
        <SectionHeader id="" title="A. Definitions" />
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          Key terms used throughout the agreement.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {DEFINITIONS.map(({ term, definition }) => (
            <div
              key={term}
              className="rounded-num-12 bg-white border border-solid border-whitesmoke-200 flex flex-col gap-1 p-5"
              style={{ transition: 'box-shadow 0.2s ease, transform 0.2s ease' }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 14px rgba(9,108,91,0.1)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '';
                (e.currentTarget as HTMLDivElement).style.transform = '';
              }}
            >
              <span className="font-bold text-[15px] text-darkslategray-200 tracking-tight">
                {term}
              </span>
              <span className="text-num-14 font-medium text-dimgray font-lora leading-num-24">
                {definition}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* B. Account Terms */}
      <section ref={accountRef} id="account" className="flex flex-col gap-4 scroll-mt-6">
        <SectionHeader id="" title="B. Account Terms" />
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          To access most features of ATLAS, you must create an account using a valid email address
          and a secure password. You are responsible for maintaining the confidentiality of your
          credentials and for all activities conducted under your account.
        </p>
        <BulletList
          items={[
            'To be a tenant user, you must be a UPLB student.',
            'You agree to provide accurate, complete, and current information during registration and to update it as needed.',
            'You must not create multiple accounts for the same person, or create accounts on behalf of others without authorization.',
            'ATLAS reserves the right to verify your identity and school enrollment status as part of tenant verification.',
            'You must notify ATLAS immediately if you suspect unauthorized access to your account.',
          ]}
        />
        <Callout variant="orange" label="Account Sharing">
          Sharing your login credentials with others is strictly prohibited. ATLAS is not
          responsible for any loss or damage arising from unauthorized account access due to your
          failure to secure your credentials.
        </Callout>
      </section>

      {/* C. Platform Use */}
      <section ref={platformRef} id="platform" className="flex flex-col gap-4 scroll-mt-6">
        <SectionHeader id="" title="C. Platform Use" />
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          ATLAS grants you a limited, non-exclusive, non-transferable, and revocable license to
          access and use the platform strictly for its intended purpose: finding and managing
          dormitory accommodations in the vicinity of the University of the Philippines Los Baños.
        </p>
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          All content on the platform — including the ATLAS name, logo, design, text, graphics, and
          underlying software — is the intellectual property of ATLAS or its licensors and is
          protected by applicable Philippine and international laws. You may not copy, modify,
          distribute, sell, or lease any part of the platform or its content without prior written
          permission.
        </p>
        <Callout variant="teal" label="Permitted use includes">
          Browsing listings, submitting applications, managing your lease, downloading your own
          billing statements, and communicating with landlords through the platform's messaging
          system.
        </Callout>
      </section>

      {/* D. Tenant Obligations */}
      <section ref={tenantRef} id="tenant" className="flex flex-col gap-4 scroll-mt-6">
        <SectionHeader id="" title="D. Tenant Obligations" />
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          As a tenant using ATLAS, you agree to the following responsibilities:
        </p>
        <BulletList
          items={[
            'Submit only truthful information in applications, profiles, and lease transfer requests. Misrepresentation may result in account suspension.',
            'Fulfill all obligations under your lease agreement, including timely payment of rent and utilities as recorded in the billing system.',
            "Comply with the house rules established by your landlord and visible in your unit's listing.",
            "Report maintenance issues through the proper channels on the platform and cooperate with the landlord's resolution process.",
            'Seek landlord approval before initiating a Pasalo (lease transfer) and complete all required documents on the platform.',
            'Leave the unit in the condition agreed upon at move-out and settle all outstanding balances before departure.',
          ]}
        />
      </section>

      {/* E. Landlord/Manager Obligations */}
      <section ref={landlordRef} id="landlord" className="flex flex-col gap-4 scroll-mt-6">
        <SectionHeader id="" title="E. Landlord/Manager Obligations" />
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          Landlords and housing managers using ATLAS agree to uphold standards of honesty and fair
          practice in all interactions with tenants on the platform.
        </p>
        <BulletList
          items={[
            'Provide accurate, up-to-date, and complete information in all unit listings, including photos, amenities, and pricing.',
            'Process tenant applications and lease transfer requests promptly and within the timelines specified on the platform.',
            'Issue billing statements accurately and in a timely manner. Overcharging or fabricating utility costs is a violation of these terms.',
            'Maintain units in a habitable and safe condition consistent with the description in the listing.',
            "Respect tenant privacy and not use ATLAS's communication tools for purposes outside of legitimate property management.",
          ]}
        />
        <Callout variant="lightcyan" label="Zero Tolerance">
          Harassment, discrimination, or retaliatory actions against tenants using the platform
          will result in immediate account suspension and may be reported to relevant authorities.
        </Callout>
      </section>

      {/* F. Payments and Billings */}
      <section ref={paymentsRef} id="payments" className="flex flex-col gap-4 scroll-mt-6">
        <SectionHeader id="" title="F. Payments and Billings" />
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          ATLAS provides a billing management system that enables landlords to issue statements and
          tenants to view and download their billing records. Users agree to the following rules
          of this system:
        </p>
        <BulletList
          items={[
            <>
              ATLAS <b>does not process payments directly</b>. Rent and utility payments are made
              between tenants and landlords through their agreed payment methods (cash, bank
              transfer, GCash, etc.).
            </>,
            'Billing records on the platform are for reference and documentation purposes only. They do not constitute official receipts unless issued as such by the landlord.',
            'Disputes over payment amounts must be resolved directly between the tenant and landlord. ATLAS may provide records to assist resolution but is not an arbitrator.',
            'Downloadable PDF billing statements and monthly reports are generated by the system for record-keeping purposes and are not legally binding financial instruments.',
          ]}
        />
      </section>

      {/* G. Privacy and Data */}
      <section ref={privacyRef} id="privacy" className="flex flex-col gap-4 scroll-mt-6">
        <SectionHeader id="" title="G. Privacy and Data" />
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          ATLAS collects and processes personal data in accordance with Republic Act No. 10173, the{' '}
          <b>Data Privacy Act of 2012</b>, and its implementing rules and regulations. Your privacy
          is important to us.
        </p>
        <BulletList
          items={[
            'We collect only the data necessary to provide our services, including identity verification, profile information, and platform activity.',
            'Your personal data is never sold to third parties. It may be shared with your landlord only to the extent necessary for tenancy management.',
            'You have the right to access, correct, and request deletion of your personal data. Contact our Data Protection Officer to exercise these rights.',
            'Documents uploaded for verification (IDs, enrollment certificates, etc.) are stored securely and accessible only to authorized parties.',
          ]}
        />
        <Callout variant="teal" label="Privacy Policy">
          For full details on data collection and processing, please refer to our separate{' '}
          <a className="underline text-teal" href="#">
            Privacy Policy
          </a>
          , which forms part of these terms by reference.
        </Callout>
      </section>

      {/* H. Prohibited Conduct */}
      <section ref={prohibitedRef} id="prohibited" className="flex flex-col gap-4 scroll-mt-6">
        <SectionHeader id="" title="H. Prohibited Conduct" />
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          The following actions are strictly prohibited on the ATLAS platform. Violations may
          result in content removal, account suspension, or legal action:
        </p>
        <BulletList
          items={[
            'Posting false, misleading, or fraudulent listings or tenant applications.',
            'Impersonating another person or entity, or misrepresenting your identity or affiliation.',
            'Uploading falsified documents for verification, application, or lease transfer purposes.',
            "Harassing, threatening, or abusing other users through the platform's communication features.",
            "Attempting to access, scrape, or reverse-engineer any part of the platform's systems or data.",
            'Using the platform for any illegal purpose, including money laundering, fraud, or any activity prohibited under Philippine law.',
          ]}
        />
      </section>

      {/* I. Disclaimers & Limitation of Liability */}
      <section ref={disclaimersRef} id="disclaimers" className="flex flex-col gap-4 scroll-mt-6">
        <SectionHeader id="" title="I. Disclaimers & Limitation of Liability" />
        <Callout variant="teal" label="Platform Role">
          ATLAS is a facilitating platform, not a party to any tenancy agreement. We do not own,
          manage, or operate any of the listed properties.
        </Callout>
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          ATLAS provides the platform on an "as is" and "as available" basis. We make no
          warranties, express or implied, about the accuracy, completeness, or reliability of
          listings, user-submitted content, or information on the platform.
        </p>
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          To the maximum extent permitted by Philippine law, ATLAS shall not be liable for any
          indirect, incidental, special, consequential, or punitive damages arising from: your use
          or inability to use the platform; disputes between tenants and landlords; or the content
          or actions of other users.
        </p>
      </section>

      {/* J. Termination */}
      <section ref={terminationRef} id="termination" className="flex flex-col gap-4 scroll-mt-6">
        <SectionHeader id="" title="J. Termination" />
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          ATLAS reserves the right to suspend or terminate your account at any time, with or
          without notice, for violations of these terms, fraudulent activity, extended inactivity,
          or any other reason at our discretion.
        </p>
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          You may also close your account at any time by contacting our support team. Upon
          termination, your access to the platform will be revoked. Certain data may be retained
          as required by law or for legitimate business purposes, as described in our Privacy
          Policy.
        </p>
        <BulletList
          items={[
            'Outstanding lease obligations or billing records will remain accessible for download for 30 days after account closure.',
            'ATLAS will provide notice of termination where reasonably practicable, except in cases of serious or urgent violations.',
          ]}
        />
      </section>

      {/* K. Governing Law */}
      <section ref={governingRef} id="governing" className="flex flex-col gap-4 scroll-mt-6">
        <SectionHeader id="" title="K. Governing Law" />
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          These Terms of Use shall be governed by and construed in accordance with the laws of the{' '}
          <b>Republic of the Philippines</b>, without regard to its conflict of law provisions.
        </p>
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          Any dispute arising out of or relating to these terms or your use of ATLAS shall first be
          attempted to be resolved through good-faith negotiation. If unresolved, disputes shall be
          submitted to the appropriate courts of the Philippines with proper jurisdiction.
        </p>
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          ATLAS reserves the right to update or modify these terms at any time. Continued use of
          the platform after any changes constitutes your acceptance of the revised terms. We will
          notify users of material changes via email or in-platform notification.
        </p>
      </section>

      {/* Contact Us */}
      <section ref={contactRef} id="contact" className="flex flex-col gap-3 scroll-mt-6 pb-16">
        <SectionHeader id="" title="Contact Us" />
        <p className="text-num-14 leading-num-24 font-medium text-black m-0">
          If you have questions, concerns, or requests relating to these Terms of Use, you may
          contact us through our{' '}
          <a href="/contact-us" className="underline text-dodgerblue">
            Contact Us
          </a>{' '}
          page.
        </p>
      </section>

    </div>
  );
};

export default TermsArticle;