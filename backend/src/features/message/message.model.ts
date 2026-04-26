import mongoose from 'mongoose';

export type MessageType = {
  _id: mongoose.Types.ObjectId;

  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  text: string;
  senderSeenAt?: Date | null;
  receiverSeenAt?: Date | null;

  createdAt: Date;
  updatedAt: Date;
};

const messageSchema = new mongoose.Schema(
  {
    // Should only be Verified to Manager/Landlord or vice-versa, but it is checked in the backend anyway.
    senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    text: { type: String, required: true },
    senderSeenAt: { type: Date },
    receiverSeenAt: { type: Date },
  },
  { timestamps: true },
);

export const Message = mongoose.model('Message', messageSchema);
