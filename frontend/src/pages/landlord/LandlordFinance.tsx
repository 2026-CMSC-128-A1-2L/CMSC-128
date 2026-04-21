import LandlordUnderConstruction from '../../components/landlord/LandlordUnderConstruction';

const LandlordFinance = () => {
  return (
    <LandlordUnderConstruction
      activeSidebarItem="finance"
      breadcrumbs={[{ label: 'Finance' }]}
      icon="solar:wallet-money-bold-duotone"
      title="Finance coming soon"
    />
  );
};

export default LandlordFinance;
