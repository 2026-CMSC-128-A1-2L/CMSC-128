import mongoose from 'mongoose';


//Schema message
const messageSchema = new mongoose.Schema({
    messageID: { type: mongoose.Schema.Types.ObjectId, unique: true },

    senderId: {
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'User',   // Interaction point: any platform user can send
        required: true
    },

    receiverId: {
        type:     mongoose.Schema.Types.ObjectId,
        ref:      'User',   // Interaction point: any platform user can receive
        required: true
    },

    messageContent: {
        type:     String,
        required: true
    },
    dateCreated: { type: Date, required: true },
    dateSeen: { type: Date, required: true },
  })

export const Message = model('Message', messageSchema);             
