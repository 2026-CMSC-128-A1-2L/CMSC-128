import Pusher from 'pusher';

if (!process.env.PUSHER_APP_ID) throw new Error('Missing PUSHER_APP_ID');
if (!process.env.PUSHER_KEY) throw new Error('Missing PUSHER_KEY');
if (!process.env.PUSHER_SECRET) throw new Error('Missing PUSHER_SECRET');
if (!process.env.PUSHER_CLUSTER) throw new Error('Missing PUSHER_CLUSTER');

export const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID,
  key: process.env.PUSHER_KEY,
  secret: process.env.PUSHER_SECRET,
  cluster: process.env.PUSHER_CLUSTER,
  useTLS: true,
});

export const getChatChannelName = (id1: string, id2: string) => {
  const min = id1 < id2 ? id1 : id2;
  const max = id1 < id2 ? id2 : id1;
  return `private-chat-${min}-${max}`;
};

export const triggerNewMessage = async (
  senderId: string,
  receiverId: string,
  message: { _id: string; senderId: string; receiverId: string; text: string; createdAt: Date },
) => {
  const channel = getChatChannelName(senderId, receiverId);
  await pusher.trigger(channel, 'message-sent', message);
  await pusher.trigger(`private-user-${senderId}`, 'new-message', message);
  await pusher.trigger(`private-user-${receiverId}`, 'new-message', message);
};

export const triggerNewNotification = async (
  userId: string,
  notification: { _id: string; subject: string; content: string; status: string; createdAt: Date },
) => {
  await pusher.trigger(`private-user-${userId}`, 'new-notification', notification);
};
