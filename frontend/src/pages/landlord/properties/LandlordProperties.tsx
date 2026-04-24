import LandlordUnderConstruction from "../../../components/landlord/LandlordUnderConstruction";

const LandlordProperties = () => {
  return (
    <LandlordUnderConstruction
      activeSidebarItem="properties"
      breadcrumbs={[{ label: "Properties" }]}
      icon="solar:buildings-3-bold-duotone"
      title="Properties coming soon"
    />
  );
};

export default LandlordProperties;
