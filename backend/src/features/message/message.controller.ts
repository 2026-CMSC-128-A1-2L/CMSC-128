import { AppError } from '../../error';
import {
  ObjectIdSchema,
  GetMyConversationResponseBody,
  GetMyConversationsResponseBody,
} from 'shared';
import { getConversation, getConversations, sendMessage } from './message.service';
import { RequestHandler } from 'express';
import assert from 'node:assert';
import z from 'zod';

export const routeGetMessages: RequestHandler = async (req, res) => {
  assert.ok(req.user);
  const aggregateResult = await getConversations(req.user._id);

  const response: z.infer<typeof GetMyConversationsResponseBody> = {
    conversations: aggregateResult.map((convo) => ({
      user: {
        id: convo.otherUser._id,
        profilePicture: convo.otherUser.profilePicture,
        firstName: convo.otherUser.firstName,
        middleName: convo.otherUser.middleName,
        lastName: convo.otherUser.lastName,
        userType: convo.otherUser.userType,
      },
      message: {
        userId: convo.latestMessage.senderId,
        text: convo.latestMessage.text,
      },
      createdAt: convo.latestMessage.createdAt,
      readAt: convo.latestMessage.receiverSeenAt,
    })),
  };

  res.status(200).json({ data: response });
};

// GET /messages/:userId
// Returns the full conversation history with a specific user
export const routeGetUserMessages: RequestHandler = async (req, res) => {
  assert.ok(req.user);
  const userId = req.user._id;
  const otherId = ObjectIdSchema.parse(req.params.userId);

  const { user: otherUser, messages } = await getConversation(userId, otherId);

  const response: z.infer<typeof GetMyConversationResponseBody> = {
    user: {
      id: otherUser._id,
      profilePicture: otherUser.profilePicture,
      firstName: otherUser.firstName,
      middleName: otherUser.middleName,
      lastName: otherUser.lastName,
      userType: otherUser.userType,
    },
    messages: messages.map((msg) => ({
      userId: msg.senderId,
      text: msg.text,
    })),
    readAt: messages.length > 0 ? messages[messages.length - 1].receiverSeenAt : undefined,
  };

  res.status(200).json({ data: response });
};

// POST /messages/:userId
// Sends a new message to a specific user
export const routeSendMessage: RequestHandler = async (req, res) => {
  assert.ok(req.user);
  const userId = req.user._id;
  const otherId = ObjectIdSchema.parse(req.params.userId);

  const { text } = req.body;
  if (!text) throw new AppError(400, 'Message text is required.');

  res.status(201).json({ data: await sendMessage(req.user.userType, userId, otherId, text) });
};
