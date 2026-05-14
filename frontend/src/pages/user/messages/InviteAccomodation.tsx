import { type FunctionComponent } from 'react';
import { useLocation } from 'react-router-dom';
import NotificationDetail from '../../../components/general/NotificationDetail';

const InviteAccomodation: FunctionComponent = () => {
  const location = useLocation();

  // Determine which notification data to show based on the route
  const getNotificationData = () => {
    const path = location.pathname;

    if (path.includes('verification-status')) {
      return {
        title: 'Verification Status',
        date: 'March 30, 2026',
        time: '2:15 pm',
        headline: 'Hi Daphne! Your verification has been approved!',
        message: 'Congratulations! Your profile has been successfully verified by our system. You now have full access to all features, including direct booking and priority support. \n\nThank you for choosing ATLAS.',
      };
    }

    if (path.includes('welcome-atlas')) {
      return {
        title: 'Welcome to ATLAS!',
        date: 'March 28, 2026',
        time: '10:00 am',
        headline: 'Hi Daphne! Welcome to the ATLAS Community!',
        message: 'We are thrilled to have you with us. ATLAS is designed to make your dormitory life easier and more connected. Explore our features to manage your stay, payments, and communications all in one place. \n\nHappy staying!',
      };
    }

    if (path.includes('support-message')) {
      return {
        title: 'New Message from Support',
        date: 'March 31, 2026',
        time: '5:45 pm',
        headline: 'We have received your report and are looking into it.',
        message: 'Hi Daphne, our support team has successfully received your recent inquiry regarding the lease transfer. We are currently reviewing the details and will get back to you within 24-48 hours. \n\nReference ID: #88291',
      };
    }

    // Default: Invitation to Current Accommodation
    return {
      title: 'Invitation to Current Accommodation',
      date: 'March 30, 2026',
      time: '1:20 am',
      headline: 'Quevin Custodio has invited you to join your current accommodations in Women’s Dormitory',
      message: 'Quevin Custodio has invited you to join Women’s Dormitory as a your current accommodation! Joining this invitation will help both you and the landlord manage your accommodations and have access to relevant informations. \n\nYou may head over to the building profile for more details. \n\nThis invitation will expire in 7 days.',
    };
  };

  const data = getNotificationData();

  return (
    <div className="w-full h-full p-8 box-border bg-transparent flex items-center justify-center">
      <NotificationDetail
        title={data.title}
        date={data.date}
        time={data.time}
        headline={data.headline}
        message={data.message}
      />
    </div>
  );
};

export default InviteAccomodation;
