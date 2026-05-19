import mongoose from 'mongoose';
import { Message, MessageType } from './message.model.js';
import { User, UserType } from '../user/user.model.js';
import { AppError } from '../../error.js';
import { UserTypeType } from 'shared';
import { getManagedFacilities } from '../facility/facility.service.js';
import { triggerNewMessage } from '../../pusher.js';

export type ConversationAggregateResult = {
  _id: mongoose.Types.ObjectId;
  latestMessage: MessageType;
  otherUser: UserType;
}[];

export const getConversations = async (userId: mongoose.Types.ObjectId) => {
  return (await Message.aggregate([
    {
      $match: {
        $or: [{ senderId: userId }, { receiverId: userId }],
      },
    },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: {
          $cond: [{ $eq: ['$senderId', userId] }, '$receiverId', '$senderId'],
        },
        latestMessage: { $first: '$$ROOT' },
      },
    },
    {
      $lookup: {
        from: 'users',
        localField: '_id',
        foreignField: '_id',
        as: 'otherUser',
      },
    },
    { $unwind: '$otherUser' },
    { $sort: { 'latestMessage.createdAt': -1 } },
  ])) as ConversationAggregateResult;
};

export const getConversation = async (
  userId: mongoose.Types.ObjectId,
  otherId: mongoose.Types.ObjectId,
) => {
  const otherUser = await User.findById(otherId).lean();
  if (!otherUser) throw new AppError(404, 'User not found!');

  await Message.updateMany(
    {
      senderId: otherId,
      receiverId: userId,
      receiverSeenAt: null,
    },
    { $set: { receiverSeenAt: new Date() } },
  );

  return {
    user: otherUser,
    messages: await Message.find({
      $or: [
        { senderId: userId, receiverId: otherId },
        { senderId: otherId, receiverId: userId },
      ],
    })
      .sort({ createdAt: 1 })
      .lean(),
  } as { user: UserType; messages: MessageType[] };
};

export const sendMessage = async (
  userType: UserTypeType,
  userId: mongoose.Types.ObjectId,
  otherId: mongoose.Types.ObjectId,
  text: string,
) => {
  const otherUser = await User.findById(otherId).lean();
  if (!otherUser) throw new AppError(404, 'User not found.');

  if (userType === 'Student' && otherUser.userType === 'Student')
    throw new AppError(403, 'Students cannot message other students.');

  console.log(userType, otherUser.userType);
  if (
    ['Manager', 'Landlord'].includes(userType) &&
    ['Manager', 'Landlord'].includes(otherUser.userType!)
  ) {
    // there should be an intersection in what they manage for them to be able to message each other
    const selfFacilities = new Set((await getManagedFacilities(userId)).map((x) => x.toString()));
    const otherFacilities = new Set((await getManagedFacilities(otherId)).map((x) => x.toString()));

    // has intersection
    if (selfFacilities.intersection(otherFacilities).size === 0)
      throw new AppError(403, 'Managers can only message managers managing the same facility.');
  }

  const newMessage = await Message.create({
    senderId: userId,
    receiverId: otherId,
    text: text,
    senderSeenAt: new Date(),
  });

  await triggerNewMessage(userId.toString(), otherId.toString(), {
    _id: newMessage._id.toString(),
    senderId: newMessage.senderId.toString(),
    receiverId: newMessage.receiverId.toString(),
    text: newMessage.text,
    createdAt: newMessage.createdAt,
  });

  return newMessage;
};
