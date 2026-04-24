import LandlordUnderConstruction from '../../../components/landlord/LandlordUnderConstruction';

const LandlordTenants = () => {
  return (
    <LandlordUnderConstruction
      activeSidebarItem="tenants"
      breadcrumbs={[{ label: 'My Tenants' }]}
      icon="solar:users-group-two-rounded-bold-duotone"
      title="My Tenants coming soon"
    />
  );
};

export default LandlordTenants;
