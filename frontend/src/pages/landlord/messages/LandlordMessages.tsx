import LandlordUnderConstruction from '../../../components/landlord/LandlordUnderConstruction';

const LandlordMessages = () => {
  return (
    <LandlordUnderConstruction
      activeSidebarItem="messages"
      breadcrumbs={[{ label: 'Messages' }]}
      icon="solar:chat-round-dots-bold-duotone"
      title="Messages coming soon"
    />
  );
};

export default LandlordMessages;
