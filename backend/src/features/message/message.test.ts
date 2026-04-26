import '../../config.js';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { studentAgent, guestAgent, student, manager } from '../../test/setup.js';
import mongoose from 'mongoose';
import { Message } from './message.model';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

describe('Messages API', () => {
  let senderId: string;
  let receiverId: string;

  beforeEach(() => {
    senderId = student._id.toString();
    receiverId = manager._id.toString();
  });

  afterEach(async () => {
    await Message.deleteMany({});
  });

  describe('GET /api/messages', () => {
    it('should return 401 for unauthenticated users', async () => {
      const response = await guestAgent.get('/api/messages');
      expect(response).statusToBe(401);
    });

    it('should return empty conversations for user with no messages', async () => {
      const response = await studentAgent.get('/api/messages');
      expect(response).statusToBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('conversations');
      expect(Array.isArray(response.body.data.conversations)).toBe(true);
      expect(response.body.data.conversations.length).toBe(0);
    });

    it('should return conversations for user with messages', async () => {
      await Message.create({
        senderId: senderId,
        receiverId: receiverId,
        text: 'Hello from sender',
        senderSeenAt: new Date(),
      });

      const response = await studentAgent.get('/api/messages');
      expect(response).statusToBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('conversations');
      expect(Array.isArray(response.body.data.conversations)).toBe(true);
      expect(response.body.data.conversations.length).toBeGreaterThan(0);

      expect(response.body.data.conversations[0].user).toHaveProperty('id', receiverId);
      expect(response.body.data.conversations[0].user).toHaveProperty('firstName');
      expect(response.body.data.conversations[0].user).toHaveProperty('userType');
      expect(response.body.data.conversations[0].message).toHaveProperty(
        'text',
        'Hello from sender',
      );
      expect(response.body.data.conversations[0]).toHaveProperty('createdAt');
    });
  });

  describe('GET /api/messages/:userId', () => {
    it('should return 401 for unauthenticated users', async () => {
      const response = await guestAgent.get(`/api/messages/${receiverId}`);
      expect(response).statusToBe(401);
    });

    it('should return 404 for non-existent user', async () => {
      const fakeId = new mongoose.Types.ObjectId().toString();
      const response = await studentAgent.get(`/api/messages/${fakeId}`);
      expect(response).statusToBe(404);
    });

    it('should return messages between two users', async () => {
      // Create test messages
      await Message.create({
        senderId: senderId,
        receiverId: receiverId,
        text: 'Hello from sender',
        senderSeenAt: new Date(),
      });

      await sleep(2000);

      await Message.create({
        senderId: receiverId,
        receiverId: senderId,
        text: 'Hi back!',
        senderSeenAt: new Date(Date.now() + 1000),
      });

      const response = await studentAgent.get(`/api/messages/${receiverId}`);
      expect(response).statusToBe(200);
      expect(response.body).toHaveProperty('data');
      expect(response.body.data).toHaveProperty('user');
      expect(response.body.data).toHaveProperty('messages');
      expect(Array.isArray(response.body.data.messages)).toBe(true);
      expect(response.body.data.messages.length).toBe(2);

      expect(response.body.data.messages[0]).toHaveProperty('text', 'Hi back!');
      expect(response.body.data.messages[1]).toHaveProperty('text', 'Hello from sender');

      expect(response.body.data.user).toHaveProperty('id', receiverId);
      expect(response.body.data.user).toHaveProperty('firstName');
      expect(response.body.data.user).toHaveProperty('userType');
    });
  });

  describe('POST /api/messages/:userId', () => {
    it('should return 401 for unauthenticated users', async () => {
      const response = await guestAgent.post(`/api/messages/${receiverId}`).send({ text: 'Hello' });
      expect(response).statusToBe(401);
    });

    it('should return 400 for invalid user ID', async () => {
      const response = await studentAgent.post('/api/messages/invalid-id').send({ text: 'Hello' });
      expect(response).statusToBe(400); // Assuming your error middleware catches CastErrors for invalid ObjectIds
    });

    it('should return 400 for empty message text', async () => {
      const response = await studentAgent.post(`/api/messages/${receiverId}`).send({ text: '' });
      expect(response).statusToBe(400);
    });

    it('should successfully send a message', async () => {
      const response = await studentAgent
        .post(`/api/messages/${receiverId}`)
        .send({ text: 'Hello there!' });

      expect(response).statusToBe(201);
      expect(response.body).toHaveProperty('data');

      expect(response.body.data).toHaveProperty('_id');
      expect(response.body.data).toHaveProperty('text', 'Hello there!');

      expect(response.body.data.senderId.toString()).toBe(senderId);
      expect(response.body.data.receiverId.toString()).toBe(receiverId);
    });
  });
});
