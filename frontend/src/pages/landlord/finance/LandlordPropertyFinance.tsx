// frontend/src/pages/landlord/LandlordPropertyFinance.tsx
import { type FunctionComponent, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LandlordLayout, {
  type BreadcrumbItem,
} from "../../../components/landlord/LandlordLayout";
import SideNav from "../../../components/landlord/LandlordFinance/SideNav";
import { Icon } from "@iconify/react";
import OverviewTab from "../../../components/landlord/LandlordFinance/overview/Overview";
import TenantBillingsTab from "../../../components/landlord/LandlordFinance/billings/TenantBillings";
import { useFacilityFinance } from "../../../hooks/useFacilityFinance";

type TabType = "overview" | "billings";

const LandlordPropertyFinance: FunctionComponent = () => {
  const navigate = useNavigate();
  const { propertyId } = useParams<{ propertyId: string }>();
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const {
    facilityInfo,
    overview,
    monthlyIncome,
    incomeBreakdown,
    billings,
    unitRentalMap,
    isBillingsLoading,
    isLoading,
    error,
    refetch,
    refetchBillings,
    facilityListings,
  } = useFacilityFinance(propertyId);

  const handleTabChange = (tab: TabType) => {
    if (tab === activeTab) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(tab);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 150);
  };

  const breadcrumbs: BreadcrumbItem[] = [
    { label: "Finance", to: "/landlord/finance" },
    { label: facilityInfo?.name || "Property" },
  ];

  if (isLoading) {
    return (
      <LandlordLayout activeSidebarItem="finance" breadcrumbs={breadcrumbs}>
        <div className="flex flex-col w-full gap-4">
          <div className="h-8 w-48 bg-gray-100 animate-pulse rounded" />
          <div className="h-4 w-96 bg-gray-100 animate-pulse rounded" />
          <div className="h-[400px] bg-gray-100 animate-pulse rounded-2xl mt-4" />
        </div>
      </LandlordLayout>
    );
  }

  if (error || !facilityInfo) {
    return (
      <LandlordLayout activeSidebarItem="finance" breadcrumbs={breadcrumbs}>
        <div className="flex flex-col items-center justify-center py-20 gap-4">
          <p className="text-crimson font-semibold">
            {error ?? "Property not found."}
          </p>
          <button
            onClick={() => (error ? refetch() : navigate("/landlord/finance"))}
            className="px-4 py-2 rounded-xl bg-lightcyan-100 text-teal font-semibold hover:opacity-90 cursor-pointer"
          >
            {error ? "Retry" : "Back to Finance"}
          </button>
        </div>
      </LandlordLayout>
    );
  }

  return (
    <LandlordLayout activeSidebarItem="finance" breadcrumbs={breadcrumbs}>
      <div className="flex flex-col w-full">
        {/* Page title */}
        <div className="self-stretch flex flex-col items-start justify-center gap-3 mb-6">
          <div className="self-stretch flex items-center justify-between gap-5">
            <b className="relative text-[24px] leading-8 text-gray font-inter shrink-0 dark:text-[#edf6f4]">
              Finance
            </b>
          </div>
          <div className="self-stretch h-0.5 rounded-[100px] bg-whitesmoke-200 overflow-hidden shrink-0 dark:bg-[#242626]" />
        </div>

        {/* Property Header */}
        <div className="self-stretch flex flex-col items-start justify-center py-0 px-2 box-border gap-1 text-darkslategray-100 font-lora mb-6 dark:text-[#d7e0ef]">
          <b className="self-stretch relative text-[24px] leading-8 font-inter dark:text-[#d7e0ef]">
            {facilityInfo.name}
          </b>
          <div className="self-stretch flex items-center py-0 px-4 gap-2">
            <Icon icon="mdi:map-marker" className="text-lg" />
            <b className="flex-1 relative text-sm">{facilityInfo.address}</b>
          </div>
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate("/landlord/finance")}
          className="self-start flex items-center gap-2 mb-4 px-2 py-1 text-teal-200 hover:text-teal-100 transition-colors duration-200 dark:text-[#72cbb8] dark:hover:text-[#9ee0d2] cursor-pointer"
        >
          <Icon icon="mdi:chevron-left" className="w-5 h-5" />
          <span className="text-sm font-medium">Back to All Properties</span>
        </button>

        {/* Content with SideNav */}
        <div className="flex flex-col lg:flex-row gap-6">
          <SideNav activeTab={activeTab} onTabChange={handleTabChange} />
          <div className="flex-1 min-w-0">
            <div
              className={`transition-all duration-300 ease-in-out ${
                isTransitioning
                  ? "opacity-0 translate-y-2"
                  : "opacity-100 translate-y-0"
              } cursor-pointer`}
            >
              {activeTab === "overview" ? (
                <OverviewTab
                  overview={overview}
                  monthlyIncome={monthlyIncome}
                  incomeBreakdown={incomeBreakdown}
                />
              ) : (
                <TenantBillingsTab
                  facilityId={propertyId!}
                  billings={billings}
                  unitRentalMap={unitRentalMap}
                  isLoading={isBillingsLoading}
                  onRefresh={refetchBillings}
                  facilityListings={facilityListings}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </LandlordLayout>
  );
};

export default LandlordPropertyFinance;
