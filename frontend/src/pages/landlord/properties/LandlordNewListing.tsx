import LandlordUnderConstruction from '../../../components/landlord/LandlordUnderConstruction';

const LandlordNewListing = () => {
  return (
    <LandlordUnderConstruction
      activeSidebarItem="properties"
      breadcrumbs={[{ label: 'Properties', to: '/landlord/properties' }, { label: 'New Listing' }]}
      icon="solar:add-square-bold-duotone"
      title="New Listing coming soon"
    />
  );
};

export default LandlordNewListing;
