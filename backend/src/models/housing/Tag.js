import mongoose from 'mongoose';

const TagSchema = new Schema({ 
    data_type: {
        type: String, 
        required: true 
    }, 
    name: { 
        type: String, 
        required: true 
    } 
}); 

export const Tag = mongoose.model('Tag', TagSchema);
