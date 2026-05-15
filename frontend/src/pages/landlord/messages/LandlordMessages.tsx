import { type FunctionComponent, useState } from 'react';
import DmsSidebar from '../../../components/general/DmsSidebar';
import oswald from '../../../../assets/owl_inbox.png';
import TutorialIcon from '../../../../assets/help-chat.svg';
import TutorialBubble from '../../user/messages/DMsTutorial';
import NotificationDetail from '../../../components/general/NotificationDetail';
import ChatDetail from '../../../components/general/ChatDetail';
import BgUpper from '../../../../assets/bg-upper.svg?react';
import BgLower from '../../../../assets/bg-lower.svg?react';

const LandlordMessages: FunctionComponent = () => {
  const [showHelp, setShowHelp] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    type: 'notification' | 'dm';
    id: number;
  } | null>(null);

  // Landlord-specific Mock Data
  const [notifications, setNotifications] = useState<any[]>([]);
  /* UNCOMMENT BELOW FOR DUMMY DATA
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'Verification Status',
      subtitle: 'System',
      date: 'March 30, 2026',
      time: '2:15 pm',
      headline: 'Your landlord verification has been approved!',
      message: 'Congratulations! Your landlord profile has been successfully verified. You can now post listings and manage tenants directly through ATLAS. \n\nThank you for partnering with us.',
      unread: true,
      showButtons: false,
    },
    {
      id: 2,
      title: 'Monthly Analytics Report',
      subtitle: 'System',
      date: 'March 28, 2026',
      time: '10:00 am',
      headline: 'Your March performance report is ready',
      message: 'Check out how your listings performed this month. Your occupancy rate is up by 12%! \n\nView the full report in your dashboard.',
      unread: false,
      showButtons: false,
    },
    {
      id: 3,
      title: 'Welcome to ATLAS Landlord!',
      subtitle: 'System',
      date: 'March 25, 2026',
      time: '9:00 am',
      headline: 'Start managing your properties efficiently',
      message: 'Welcome to the ATLAS Landlord community. We provide you with the tools to manage leases, communications, and payments all in one place. \n\nExplore our features to get started!',
      unread: false,
      showButtons: false,
    },
  ]);
  */

  const [directMessages, setDirectMessages] = useState<any[]>([]);
  /* UNCOMMENT BELOW FOR DUMMY DATA
  const [directMessages, setDirectMessages] = useState([
    {
      id: 1,
      title: 'Daphne', // Tenant Name
      subtitle: 'Tenant',
      body: 'Yes! I would like to move in next week!',
      time: '1hr ago',
      icon: 'iconamoon:email',
      unread: true,
      unreadCount: 1,
      archived: false,
      messages: [
        { id: 1, sender: 'You', text: 'Mabuhay! We\'re confirming your slot in our dormitory. Would you like to proceed?', isMe: true },
        { id: 2, sender: 'Daphne', text: 'Yes! I would like to move in next week!', isMe: false },
        { id: 3, sender: 'You', text: 'That sounds great. We just need a few more documents to finalize your stay.', isMe: true },
        { id: 4, sender: 'Daphne', text: 'Sure, what else do you need from my side?', isMe: false },
      ]
    },
    {
      id: 2,
      title: 'John Doe',
      subtitle: 'Applicant',
      body: 'Hello, is the room still available?',
      time: '5m ago',
      icon: 'iconamoon:email',
      unread: false,
      archived: false,
      messages: [
        { id: 1, sender: 'John Doe', text: 'Hello, is the room still available?', isMe: false },
        { id: 2, sender: 'You', text: 'Yes it is! When would you like to visit?', isMe: true },
      ]
    },
    {
      id: 3,
      title: 'Old Tenant Smith',
      subtitle: 'Former Tenant',
      body: 'Thank you for everything!',
      time: '1mo ago',
      icon: 'iconamoon:email',
      unread: false,
      archived: true,
      messages: [
        { id: 1, sender: 'Old Tenant Smith', text: 'Thank you for everything!', isMe: false },
      ]
    },
  ]);
  */

  const handleItemSelect = (type: 'notification' | 'dm', id: number) => {
    setSelectedItem({ type, id });

    // Mark as read
    if (type === 'notification') {
      setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, unread: false } : n)));
    } else {
      setDirectMessages((prev) =>
        prev.map((dm) => (dm.id === id ? { ...dm, unread: false, unreadCount: 0 } : dm)),
      );
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
            <b className="text-num-18 text-darkslategray leading-tight dark:text-gray-100">
              No conversation selected
            </b>
            <p className="text-num-14s font-medium text-dimgray dark:text-[#a4acba]">
              Select a tab to view specific message
            </p>
          </div>
        </div>
      );
    }

    if (selectedItem.type === 'notification') {
      const notif = notifications.find((n) => n.id === selectedItem.id);
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

    if (selectedItem.type === 'dm') {
      const dm = directMessages.find((d) => d.id === selectedItem.id);
      if (dm) {
        return (
          <div className="w-full h-full animate-fade-in relative z-10">
            <ChatDetail
              title={dm.title}
              subtitle={dm.subtitle}
              messages={dm.messages}
              showInput={!dm.archived} // Show input for active, hide for archived
            />
          </div>
        );
      }
    }

    return null;
  };

  return (
    <div className="w-full h-screen flex items-start font-inter overflow-hidden relative bg-transparent">
      {/* Background Accents (Restricted to non-navbar area) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="opacity-20">
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
        className="help-button-animated bottom-32 right-10 z-[1000] cursor-pointer transition-all hover:scale-110 active:scale-95"
        onClick={() => setShowHelp(!showHelp)}
      >
        <img src={TutorialIcon} alt="Help" className="w-16 h-16 drop-shadow-lg" />
      </div>
    </div>
  );
};

export default LandlordMessages;
