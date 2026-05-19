import { useEffect } from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { useMessageStore } from '../store/useMessageStore';
import { useNotificationStore } from '../store/useNotificationStore';

export const useUnreadCommunicationCount = () => {
  const userId = useAuthStore((state) => state.user?._id);
  const conversations = useMessageStore((state) => state.conversations);
  const fetchConversations = useMessageStore((state) => state.fetchConversations);
  const subscribeMessages = useMessageStore((state) => state.subscribeToPusher);
  const unsubscribeMessages = useMessageStore((state) => state.unsubscribeFromPusher);
  const notifications = useNotificationStore((state) => state.notifications);
  const fetchNotifications = useNotificationStore((state) => state.fetchNotifications);
  const subscribeNotifications = useNotificationStore((state) => state.subscribeToPusher);
  const unsubscribeNotifications = useNotificationStore((state) => state.unsubscribeFromPusher);

  useEffect(() => {
    if (!userId) return;

    fetchConversations().catch(() => undefined);
    fetchNotifications().catch(() => undefined);
    subscribeMessages();
    subscribeNotifications();

    return () => {
      unsubscribeMessages();
      unsubscribeNotifications();
    };
  }, [
    userId,
    fetchConversations,
    fetchNotifications,
    subscribeMessages,
    subscribeNotifications,
    unsubscribeMessages,
    unsubscribeNotifications,
  ]);

  if (!userId) return 0;

  const unreadMessages = conversations.filter((conversation) => !conversation.readAt).length;
  const unreadNotificationIds = new Set(
    notifications
      .filter((notification) => notification.status === 'unread')
      .map((notification) => notification._id),
  );

  return unreadMessages + unreadNotificationIds.size;
};
