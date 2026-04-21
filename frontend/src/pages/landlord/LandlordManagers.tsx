import LandlordUnderConstruction from '../../components/landlord/LandlordUnderConstruction';

const LandlordManagers = () => {
  return (
    <LandlordUnderConstruction
      activeSidebarItem="managers"
      breadcrumbs={[{ label: 'Managers' }]}
      icon="solar:user-id-bold-duotone"
      title="Managers coming soon"
    />
  );
};

export default LandlordManagers;
