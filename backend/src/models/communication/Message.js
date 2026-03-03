import mongoose from 'mongoose';


//Schema message
const messageSchema = new mongoose.Schema({
    // Assumed that Mongo will create Primary Key

    message_content: { type: String, required: true },
    dateCreated: { type: Date, required: true },
    dateSeen: { type: Date, required: true },
    senderID: {type: mongoose.Schema.Types.ObjectId, ref:'Users' , required: true},    // Foreign for sender

  })

export const Message = model('Message', messageSchema);             
