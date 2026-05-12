import type { FunctionComponent } from "react";
import { Icon } from "@iconify/react";
import { useState, useRef, useEffect } from "react";

type FaqTab = "TENANTS" | "LANDLORDS" | "OTHERS";

interface FaqItem {
  q: string;
  a: string;
}

const FAQ_DATA: Record<FaqTab, FaqItem[]> = {
  TENANTS: [
    {
      q: "Who can use ATLAS as a tenant?",
      a: "Any UPLB student looking for dormitory accommodation can register as a tenant. You will need a valid university ID to verify your identity.",
    },
    {
      q: "How do I search for available dormitories?",
      a: "Use the See All Listings page to filter listings by location, price range, room type, and amenities. Results update in real time and show only verified, active listings.",
    },
    {
      q: "Can I apply for a dorm directly through ATLAS?",
      a: 'Yes! Once you find a listing you like, click "Apply Now" to submit a digital application. You can upload required documents, track your application status, and receive approval notifications all within the platform.',
    },
    {
      q: "Is my personal information safe on ATLAS?",
      a: "Absolutely. ATLAS employs industry-standard encryption and follows strict data-privacy guidelines. Your information is only shared with the landlord of a listing you apply to, and never sold to third parties.",
    },
    {
      q: "What happens after my application is approved?",
      a: "You will receive a notification and can then proceed with lease signing and move-in scheduling directly through the platform. The landlord will also reach out to confirm the next steps.",
    },
  ],
  LANDLORDS: [
    {
      q: "How do I list my property on ATLAS?",
      a: 'Register as a landlord, complete the verification process, then use the "Add Listing" form to input your property details, photos, pricing, and house rules. Listings go live after a quick admin review.',
    },
    {
      q: "How does the verification process work?",
      a: "You will be asked to submit proof of property ownership or authority to rent, along with a valid government ID. Our team reviews submissions within 3–5 business days. Verification badges expire periodically and must be renewed to maintain listing visibility.",
    },
    {
      q: "Can I manage multiple properties on one account?",
      a: "Yes. The landlord dashboard supports multiple listings under a single account. You can manage rooms, track occupancy, and communicate with tenants for each property from one place.",
    },
    {
      q: "How do I handle tenant applications?",
      a: "Applications appear in your dashboard with all submitted documents. You can approve, reject, or message applicants directly. Tenants are notified instantly of any status changes.",
    },
    {
      q: "Are there fees for listing on ATLAS?",
      a: "Basic listings are free. Premium features such as priority placement and analytics reports may be subject to a nominal fee. Detailed pricing is available in your landlord dashboard.",
    },
  ],
  OTHERS: [
    {
      q: "Who else can benefit from ATLAS?",
      a: "Beyond students and landlords, university housing authorities, parents of incoming students, and institutional partners can all use ATLAS to access reliable dormitory information and streamline accommodation coordination.",
    },
    {
      q: "Is ATLAS only for UPLB?",
      a: "Currently, ATLAS is purpose-built for the University of the Philippines Los Baños community. Expansion to other campuses is on the roadmap based on demand and institutional partnerships.",
    },
    {
      q: "Can I use ATLAS to report a housing concern?",
      a: "Yes. The platform includes a reporting feature where tenants and community members can flag inaccurate listings, safety concerns, or policy violations. Reports are reviewed by the ATLAS admin team.",
    },
    {
      q: "How do I contact the ATLAS support team?",
      a: "Reach us through the Contact Us page or email support@atlas.uplb.edu.ph. Our team responds within 1–2 business days.",
    },
  ],
};

const TAB_ICONS: Record<FaqTab, string> = {
  TENANTS: "ic:baseline-person-pin",
  LANDLORDS: "material-symbols:home-outline-rounded",
  OTHERS: "mynaui:dots-circle",
};

const TABS: FaqTab[] = ["TENANTS", "LANDLORDS", "OTHERS"];

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

const reveal = (visible: boolean, extra = "") =>
  `transition-all duration-700 ease-out ${extra} ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`;

const LandingFAQ: FunctionComponent = () => {
  const faqReveal = useScrollReveal();

  const [activeTab, setActiveTab] = useState<FaqTab>("TENANTS");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const handleTabChange = (tab: FaqTab) => {
    setActiveTab(tab);
    setOpenFaq(null);
  };

  const toggleFaq = (i: number) =>
    setOpenFaq((prev) => (prev === i ? null : i));

  return (
    <div
      ref={faqReveal.ref}
      className={`w-screen flex flex-col items-center py-0 px-[79px] box-border gap-[52px] z-3 shrink-0 text-[100px] text-darkslategray-200 ${reveal(faqReveal.isVisible)}`}
    >
      <div className="self-stretch h-[71px] w-screen relative">
        <b className="flex items-center w-screen h-[71px]">FAQs</b>
      </div>

      <div className="w-[1280px] relative text-num-18 text-gray-300 font-inte">
        <div className="flex rounded-num-10 overflow-hidden shadow-[0px_7px_20px_rgba(0,0,0,0.1)] bg-gray-500 border-gray-500 border-solid border-[5px] mb-4">
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => handleTabChange(tab)}
                className={`flex-1 flex flex-col items-center justify-center gap-1 py-4 cursor-pointer transition-colors duration-200 text-num-14 font-inter font-bold ${
                  isActive
                    ? "bg-teal-200 text-white"
                    : "bg-transparent text-gray-300 hover:bg-teal-50"
                }`}
              >
                <Icon icon={TAB_ICONS[tab]} className="w-6 h-6" />
                <span>{tab}</span>
                {isActive && (
                  <div className="w-8 h-1 rounded-full bg-white mt-1" />
                )}
              </button>
            );
          })}
        </div>

        <div className="flex flex-col gap-2">
          {FAQ_DATA[activeTab].map((item, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className="shadow-[0px_7px_20px_rgba(0,0,0,0.1)] rounded-num-10 overflow-hidden bg-gray-500 border-gray-500 border-solid border-[5px]"
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(i)}
                  className="w-full flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-teal-50 transition-colors duration-200 text-left gap-4"
                >
                  <b className="flex-1 text-num-18 text-gray-300 font-inter">
                    {item.q}
                  </b>
                  <Icon
                    icon="lucide:chevron-down"
                    className={`w-5 h-5 shrink-0 text-teal-200 transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-48 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-5 text-num-16 text-gray-300 font-lora leading-relaxed border-t border-teal-100 pt-3">
                    {item.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LandingFAQ;
