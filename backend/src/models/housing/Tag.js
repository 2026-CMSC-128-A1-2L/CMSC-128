import mongoose from 'mongoose';

const TagSchema = new Schema({
    tagID: { type: mongoose.Schema.Types.ObjectId, unique: true },
    dataType: {
        type: String, 
        required: true 
    }, 
    name: { 
        type: String, 
        required: true 
    } 
}); 

export const Tag = mongoose.model('Tag', TagSchema);
