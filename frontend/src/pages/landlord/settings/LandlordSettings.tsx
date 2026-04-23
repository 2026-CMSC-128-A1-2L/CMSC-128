import LandlordUnderConstruction from "../../../components/landlord/LandlordUnderConstruction";

const LandlordSettings = () => {
  return (
    <LandlordUnderConstruction
      activeSidebarItem="settings"
      breadcrumbs={[{ label: "Settings" }]}
      icon="solar:settings-bold-duotone"
      title="Settings coming soon"
    />
  );
};

export default LandlordSettings;
