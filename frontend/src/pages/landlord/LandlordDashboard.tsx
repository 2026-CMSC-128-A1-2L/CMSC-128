import LandlordUnderConstruction from '../../components/landlord/LandlordUnderConstruction';

const LandlordDashboard = () => {
  return (
    <LandlordUnderConstruction
      activeSidebarItem="dashboard"
      breadcrumbs={[{ label: 'Dashboard' }]}
      icon="solar:home-2-bold-duotone"
      title="Dashboard coming soon"
    />
  );
};

export default LandlordDashboard;
