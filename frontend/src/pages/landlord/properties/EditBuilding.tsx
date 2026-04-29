import LandlordUnderConstruction from '../../../components/landlord/LandlordUnderConstruction';

const EditBuilding = () => {
  return (
    <LandlordUnderConstruction
      activeSidebarItem="properties"
      breadcrumbs={[{ label: 'Properties', to: '/landlord/properties' }, { label: 'New Listing' }]}
      icon="solar:add-square-bold-duotone"
      title="Edit Building coming soon"
    />
  );
};

export default EditBuilding;
