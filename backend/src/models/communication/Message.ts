import mongoose from 'mongoose';

//Schema message
const messageSchema = new mongoose.Schema({
  // Should only be Verified to Manager/Landlord or vice-versa, but it is checked in the backend anyway.
  senderId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  receiverId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  messageContent: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  dateSeen: { type: Date, required: true },
});

export const Message = mongoose.model('Message', messageSchema);
