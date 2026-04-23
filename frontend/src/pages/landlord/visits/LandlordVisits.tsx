import LandlordUnderConstruction from "../../../components/landlord/LandlordUnderConstruction";

const LandlordVisits = () => {
  return (
    <LandlordUnderConstruction
      activeSidebarItem="visits"
      breadcrumbs={[{ label: "Visits" }]}
      icon="solar:calendar-bold-duotone"
      title="Visits coming soon"
    />
  );
};

export default LandlordVisits;
