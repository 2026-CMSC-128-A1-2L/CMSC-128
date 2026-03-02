import mongoose from 'mongoose';
// ─────────────────────────────────────────────
// ADMINISTRATOR  (platform staff)
// ─────────────────────────────────────────────
const administratorSchema = new Schema({

    user_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'User', 
      required: true 
    },

}, { timestamps: true });

export const Administrator = mongoose.model('Administrator', administratorSchema);