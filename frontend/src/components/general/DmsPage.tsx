import { type FunctionComponent, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DmsSidebar from './DmsSidebar';
import oswald from '../../../assets/owl_inbox.png';
import TutorialIcon from '../../../assets/help-chat.svg';
import TutorialBubble from '../../pages/user/messages/DMsTutorial';
import NotificationDetail from './NotificationDetail';
import ChatDetail from './ChatDetail';
import BgUpper from '../../../assets/bg-upper.svg?react';
import BgLower from '../../../assets/bg-lower.svg?react';
import { useMessageStore } from '../../store/useMessageStore';
import { useNotificationStore } from '../../store/useNotificationStore';
import { useAuthStore } from '../../store/useAuthStore';

interface DmsPageProps {
  basePath: string;
}

const DmsPage: FunctionComponent<DmsPageProps> = ({ basePath }) => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{
    type: 'notification' | 'dm';
    id: string;
  } | null>(userId ? { type: 'dm', id: userId } : null);

  const myId = useAuthStore((s) => s.user)?._id;

  const {
    conversations,
    activeUserId,
    activeMessages,
    activeOtherUser,
    typingUsers,
    fetchConversations,
    setActiveConversation,
    sendMessage,
    emitTyping,
    subscribeToPusher: subscribeMessages,
    unsubscribeFromPusher: unsubscribeMessages,
  } = useMessageStore();

  const {
    notifications,
    fetchNotifications,
    readNotification,
    subscribeToPusher: subscribeNotifs,
    unsubscribeFromPusher: unsubscribeNotifs,
  } = useNotificationStore();

  useEffect(() => {
    fetchConversations();
    fetchNotifications();
    subscribeMessages();
    subscribeNotifs();
    return () => {
      unsubscribeMessages();
      unsubscribeNotifs();
    };
  }, [
    fetchConversations,
    fetchNotifications,
    subscribeMessages,
    subscribeNotifs,
    unsubscribeMessages,
    unsubscribeNotifs,
  ]);

  useEffect(() => {
    if (userId) {
      setSelectedItem({ type: 'dm', id: userId });
      setActiveConversation(userId);
    }
  }, [userId, setActiveConversation]);

  const handleItemSelect = (type: 'notification' | 'dm', id: string) => {
    setSelectedItem({ type, id });

    if (type === 'dm') {
      navigate(`${basePath}/${id}`, { replace: true });
      setActiveConversation(id);
    } else {
      const notif = notifications.find((n) => n._id === id);
      if (notif && notif.status === 'unread') {
        readNotification(id);
      }
    }
  };

  const handleSendMessage = (text: string) => {
    if (!activeUserId) return;
    sendMessage(activeUserId, text);
  };

  const handleTyping = (isTyping: boolean) => {
    if (!activeUserId) return;
    emitTyping(activeUserId, isTyping);
  };

  const sidebarNotifications = notifications.map((n) => ({
    id: n._id,
    title: n.subject,
    body: n.content,
    time: new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    icon: 'iconamoon:notification',
    unread: n.status === 'unread',
  }));

  const sidebarDMs = conversations.map((c) => ({
    id: c.user.id,
    title: `${c.user.firstName} ${c.user.lastName}`,
    body: c.message.text,
    time: new Date(c.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    icon: 'iconamoon:email',
    unread: !c.readAt,
    archived: false,
  }));

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
            <b className="text-num-18 text-darkslategray leading-tight dark:text-[#b9eadf]">
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
      const notif = notifications.find((n) => n._id === selectedItem.id);
      if (notif) {
        return (
          <div className="w-full h-full p-8 box-border animate-slide-up overflow-y-auto flex items-center justify-center relative z-10">
            <NotificationDetail
              title={notif.subject}
              subtitle="System"
              date={new Date(notif.createdAt).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
              time={new Date(notif.createdAt).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
              headline={notif.subject}
              message={notif.content}
              showButtons={false}
              onCancel={() => setSelectedItem(null)}
              onAccept={() => setSelectedItem(null)}
            />
          </div>
        );
      }
    }

    if (selectedItem.type === 'dm') {
      if (activeOtherUser && activeUserId) {
        return (
          <div className="w-full h-full animate-fade-in relative z-10">
            <ChatDetail
              title={`${activeOtherUser.firstName} ${activeOtherUser.lastName}`}
              subtitle={activeOtherUser.userType}
              avatar={activeOtherUser.profilePicture ?? undefined}
              messages={activeMessages}
              myId={myId}
              typingUsers={typingUsers}
              showInput
              onSendMessage={handleSendMessage}
              onTyping={handleTyping}
            />
          </div>
        );
      }
    }

    return null;
  };

  return (
    <div className="user-messages-shell w-full h-screen flex items-start font-inter overflow-hidden relative bg-transparent text-[#2d3748] dark:text-[#d7e0ef]">
      {/* Background Accents (Restricted to non-navbar area) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="opacity-50 dark:opacity-100">
          <BgUpper className="absolute top-0 right-0 w-auto h-full" />
          <BgLower className="absolute -bottom-4 left-0 w-auto h-full" />
        </div>
      </div>

      <div className="sticky top-0 h-full w-fit shrink-0 border-r border-whitesmoke-300 z-20 bg-white dark:border-[#303331] dark:bg-[#101111]">
        <DmsSidebar
          notifications={sidebarNotifications}
          directMessages={sidebarDMs}
          selectedItem={selectedItem}
          onItemSelect={handleItemSelect}
          setNotifications={() => {}}
          setDirectMessages={() => {}}
        />
      </div>

      <TutorialBubble show={showHelp} onClose={() => setShowHelp(false)} />

      {/* Main Content Area */}
      <div className="flex-1 h-full flex flex-col items-center justify-center relative overflow-y-auto overflow-x-hidden z-10 bg-transparent">
        {renderContent()}
      </div>

      {/* ======= FLOATING ICON ========== */}
      <button
        type="button"
        className="help-button-animated z-[1000] cursor-pointer transition-all hover:scale-110 active:scale-95"
        onClick={() => setShowHelp(!showHelp)}
      >
        <img src={TutorialIcon} alt="Help" className="w-16 h-16 drop-shadow-lg" />
      </button>
    </div>
  );
};

export default DmsPage;
