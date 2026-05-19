import Pusher from 'pusher-js';

export const pusherClient = new Pusher(import.meta.env.VITE_PUSHER_KEY as string, {
  cluster: import.meta.env.VITE_PUSHER_CLUSTER as string,
  forceTLS: true,
  authorizer: (channel) => ({
    authorize: (socketId, callback) => {
      fetch('/api/pusher/auth', {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ socket_id: socketId, channel_name: channel.name }),
      })
        .then((res) => {
          if (!res.ok) throw new Error(`Auth failed: ${res.status}`);
          return res.json();
        })
        .then((data) => callback(null, data))
        .catch((err) => callback(err, null));
    },
  }),
});

export const getChatChannelName = (id1: string, id2: string) => {
  const min = id1 < id2 ? id1 : id2;
  const max = id1 < id2 ? id2 : id1;
  return `private-chat-${min}-${max}`;
};
