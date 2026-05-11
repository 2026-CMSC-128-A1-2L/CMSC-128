import { type FunctionComponent, useState } from 'react';
import DmsSidebar from '../../../components/general/DmsSidebar';
import oswald from '../../../../assets/owl_inbox.png';
import TutorialIcon from '../../../../assets/help-chat.svg';
import TutorialBubble from '../messages/DMsTutorial';
import NotificationDetail from '../../../components/general/NotificationDetail';
import BgUpper from '../../../../assets/bg-upper.svg?react';
import BgLower from '../../../../assets/bg-lower.svg?react';

const DmsLanding: FunctionComponent = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ type: 'notification' | 'dm'; id: number } | null>(null);

  // Initial Data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Invitation to Current Accommodation',
      subtitle: 'System',
      date: 'March 30, 2026',
      time: '1:20 am',
      headline: 'Quevin Custodio has invited you to join your current accommodations in Women’s Dormitory',
      message: 'Quevin Custodio has invited you to join Women’s Dormitory as a your current accommodation! Joining this invitation will help both you and the landlord manage your accommodations and have access to relevant informations. \n\nYou may head over to the building profile for more details. \n\nThis invitation will expire in 7 days.',
      unread: true,
      showButtons: true,
    },
    {
      id: 2,
      title: 'Verification Status',
      subtitle: 'System',
      date: 'March 30, 2026',
      time: '2:15 pm',
      headline: 'Hi Daphne! Your verification has been approved!',
      message: 'Congratulations! Your profile has been successfully verified by our system. You now have full access to all features, including direct booking and priority support. \n\nThank you for choosing ATLAS.',
      unread: true,
      showButtons: false,
    },
    {
      id: 3,
      title: 'Welcome to ATLAS!',
      subtitle: 'System',
      date: 'March 28, 2026',
      time: '10:00 am',
      headline: 'Hi Daphne! Welcome to the ATLAS Community!',
      message: 'We are thrilled to have you with us. ATLAS is designed to make your dormitory life easier and more connected. Explore our features to manage your stay, payments, and communications all in one place. \n\nHappy staying!',
      unread: false,
      showButtons: false,
    },
    {
      id: 4,
      title: 'New Message from Support',
      subtitle: 'System',
      date: 'March 31, 2026',
      time: '5:45 pm',
      headline: 'We have received your report and are looking into it.',
      message: 'Hi Daphne, our support team has successfully received your recent inquiry regarding the lease transfer. We are currently reviewing the details and will get back to you within 24-48 hours. \n\nReference ID: #88291',
      unread: false,
      showButtons: false,
    },
  ]);

  const [directMessages, setDirectMessages] = useState([
    {
      id: 1,
      title: 'Three Sapphire Place',
      body: 'Hi Daphne! Your application is being reviewed by our do...',
      time: '1hr ago',
      icon: 'iconamoon:email',
      unread: true,
      unreadCount: 5,
      archived: false,
    },
    {
      id: 2,
      title: 'Narra Residences',
      body: 'Hi Daphne! Your application is being reviewed by our do...',
      time: '2m ago',
      icon: 'iconamoon:email',
      unread: false,
      archived: false,
    },
    {
      id: 3,
      title: 'Past Dorm Stay',
      body: 'Thank you for staying with us! Please leave a review...',
      time: '1mo ago',
      icon: 'iconamoon:email',
      unread: false,
      archived: true,
    },
    {
      id: 4,
      title: 'Archived Inquiry',
      body: 'Hello, is this still available?',
      time: '2mo ago',
      icon: 'iconamoon:email',
      unread: false,
      archived: true,
    },
  ]);

  const handleItemSelect = (type: 'notification' | 'dm', id: number) => {
    setSelectedItem({ type, id });
    
    // Mark as read
    if (type === 'notification') {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, unread: false } : n));
    } else {
      setDirectMessages(prev => prev.map(dm => dm.id === id ? { ...dm, unread: false, unreadCount: 0 } : dm));
    }
  };

  const renderContent = () => {
    if (!selectedItem) {
      return (
        <div className="flex flex-col items-center gap-4 animate-fade-in relative z-10">
          <img
            src={oswald}
            alt="No conversation selected"
            className="w-80 h-auto object-contain opacity-80"
          />
          <div className="flex flex-col items-center gap-1 text-center">
            <b className="text-num-18 text-darkslategray leading-tight">
              No conversation selected
            </b>
            <p className="text-num-14s font-medium text-dimgray">
              Select a tab to view specific message
            </p>
          </div>
        </div>
      );
    }

    if (selectedItem.type === 'notification') {
      const notif = notifications.find(n => n.id === selectedItem.id);
      if (notif) {
        return (
          <div className="w-full h-full p-8 box-border animate-slide-up overflow-y-auto flex items-center justify-center relative z-10">
            <NotificationDetail
              title={notif.title}
              subtitle={notif.subtitle}
              date={notif.date}
              time={notif.time}
              headline={notif.headline}
              message={notif.message}
              showButtons={notif.showButtons}
              onCancel={() => setSelectedItem(null)}
              onAccept={() => setSelectedItem(null)}
            />
          </div>
        );
      }
    }

    // For DM type
    return (
      <div className="text-center p-8 animate-fade-in relative z-10">
        <h3 className="text-num-24 font-bold text-darkslategray">Direct Message Details</h3>
        <p className="text-slategray">Viewing DM with ID: {selectedItem.id}</p>
      </div>
    );
  };

  return (
    <div className="w-full h-screen flex items-start font-inter overflow-hidden relative bg-[#fafafa] dark:bg-darkmode">
      {/* Background Accents (Restricted to non-navbar area) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="opacity-30">
          <BgUpper className="absolute top-0 right-0 w-auto h-full" />
          <BgLower className="absolute -bottom-4 left-0 w-auto h-full" />
        </div>
      </div>

      <div className="sticky top-0 h-full w-fit shrink-0 border-r border-whitesmoke-300 z-20 bg-white dark:bg-darkmode">
        <DmsSidebar 
          notifications={notifications}
          directMessages={directMessages}
          selectedItem={selectedItem}
          onItemSelect={handleItemSelect}
          setNotifications={setNotifications}
          setDirectMessages={setDirectMessages}
        />
      </div>
      
      <TutorialBubble show={showHelp} onClose={() => setShowHelp(false)} />

      {/* Main Content Area */}
      <div className="flex-1 h-full flex flex-col items-center justify-center relative overflow-y-auto overflow-x-hidden z-10 bg-transparent">
        {renderContent()}
      </div>

      {/* ======= FLOATING ICON ========== */}
      <div
        className="fixed bottom-10 right-10 z-[1000] cursor-pointer transition-all hover:scale-110 active:scale-95"
        onClick={() => setShowHelp(!showHelp)}
      >
        <img src={TutorialIcon} alt="Help" className="w-16 h-16 drop-shadow-lg" />
      </div>
    </div>
  );
};

export default DmsLanding;
