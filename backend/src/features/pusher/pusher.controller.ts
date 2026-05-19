import type { RequestHandler } from 'express';
import { pusher } from '../../pusher.js';

export const routePusherAuth: RequestHandler = (req, res) => {
  const socketId = req.body.socket_id as string;
  const channel = req.body.channel_name as string;

  if (!req.user) {
    res.status(401).json({ error: 'Unauthenticated' });
    return;
  }

  const userId = req.user._id.toString();

  if (channel.startsWith('private-user-')) {
    const channelUserId = channel.replace('private-user-', '');
    if (channelUserId !== userId) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
  } else if (channel.startsWith('private-chat-')) {
    const parts = channel.replace('private-chat-', '').split('-');
    if (parts.length !== 2) {
      res.status(400).json({ error: 'Invalid channel name' });
      return;
    }
    const [id1, id2] = parts;
    if (id1 !== userId && id2 !== userId) {
      res.status(403).json({ error: 'Forbidden' });
      return;
    }
  } else {
    res.status(403).json({ error: 'Forbidden' });
    return;
  }

  const authResponse = pusher.authorizeChannel(socketId, channel);
  res.json(authResponse);
};
