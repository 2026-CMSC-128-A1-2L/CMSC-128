import { create } from 'zustand';
import { NotificationService } from '../service/NotificationService';
import { pusherClient } from '../service/pusherInstance';
import { useAuthStore } from './useAuthStore';
import type { StoreNotification } from '../interface/notification';

type NotificationState = {
  notifications: StoreNotification[];
  _channel: ReturnType<typeof pusherClient.subscribe> | null;
  _announcementChannel: ReturnType<typeof pusherClient.subscribe> | null;
  fetchNotifications: () => Promise<void>;
  readNotification: (notificationId: string) => Promise<void>;
  subscribeToPusher: () => void;
  unsubscribeFromPusher: () => void;
};

const sortByDate = (a: StoreNotification, b: StoreNotification) =>
  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

const mergeAndSort = (notifs: StoreNotification[], announcements: StoreNotification[]) =>
  [...notifs, ...announcements].sort(sortByDate);

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  _channel: null,
  _announcementChannel: null,

  fetchNotifications: async () => {
    const myId = useAuthStore.getState().user?._id;
    if (!myId) return;

    const notifResponse = await NotificationService.getNotifications({ status: undefined });

    const notifs: StoreNotification[] = notifResponse.data.map((n: any) => ({
      _id: n._id ?? n.id,
      subject: n.subject ?? '',
      content: n.content ?? n.text ?? '',
      status: n.status ?? (n.readAt ? 'read' : 'unread'),
      createdAt: n.createdAt ?? new Date().toISOString(),
    }));

    const annResponse = await NotificationService.getAnnouncements();
    const announcements: StoreNotification[] = annResponse.data.map((a) => ({
      _id: a._id,
      subject: a.subject,
      content: a.content,
      status: a.isRead ? 'read' : 'unread',
      createdAt: a.createdAt,
      _isAnnouncement: true,
    }));

    set({ notifications: mergeAndSort(notifs, announcements) });
  },

  readNotification: async (notificationId: string) => {
    const state = get();
    const target = state.notifications.find((n) => n._id === notificationId);
    if (!target) return;

    if (target._isAnnouncement) {
      await NotificationService.readAnnouncement(notificationId);
    } else {
      await NotificationService.readNotification(notificationId);
    }

    set((s) => ({
      notifications: s.notifications.map((n) =>
        n._id === notificationId ? { ...n, status: 'read' } : n,
      ),
    }));
  },

  subscribeToPusher: () => {
    const myId = useAuthStore.getState().user?._id;
    if (!myId) return;

    const channel = pusherClient.subscribe(`private-user-${myId}`);
    channel.bind('new-notification', (notif: any) => {
      const item: StoreNotification = {
        _id: notif._id,
        subject: notif.subject,
        content: notif.content,
        status: notif.status ?? 'unread',
        createdAt: notif.createdAt,
      };
      set((s) => ({
        notifications: [item, ...s.notifications].sort(sortByDate),
      }));
    });

    const annChannel = pusherClient.subscribe('announcements');
    annChannel.bind('new-announcement', (ann: any) => {
      const myUserType = useAuthStore.getState().user?.userType;
      if (
        ann.targetRole &&
        myUserType &&
        ann.targetRole !== myUserType &&
        ann.targetRole !== 'All'
      ) {
        return;
      }
      const item: StoreNotification = {
        _id: ann._id,
        subject: ann.subject,
        content: ann.content,
        status: 'unread',
        createdAt: ann.createdAt,
        _isAnnouncement: true,
      };
      set((s) => ({
        notifications: [item, ...s.notifications].sort(sortByDate),
      }));
    });

    set({ _channel: channel, _announcementChannel: annChannel });
  },

  unsubscribeFromPusher: () => {
    const state = get();
    if (state._channel) {
      pusherClient.unsubscribe(state._channel.name);
    }
    if (state._announcementChannel) {
      pusherClient.unsubscribe(state._announcementChannel.name);
    }
    set({ _channel: null, _announcementChannel: null });
  },
}));
