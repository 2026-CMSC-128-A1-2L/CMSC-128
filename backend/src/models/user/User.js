import mongoose from 'mongoose';


//Schema for user
const userSchema = new mongoose.Schema({
    // Assumed that Mongo will create Primary Key

    firstName: { type: String, required: true },
    middleName: { type: String, required: true },
    lastName: { type: String, required: true },

    birthDate: { type: Date, required: true },             //  Student, Manager, Land lord

    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    dateCreated: { type: Date, required: true },
    dateUpdated: { type: Date, required: true },
    
    userType: { type: String, required: true },             //  Student, Manager, Land lord
    accountStatus: { type: String, required: true },        // Active, Unverified, Suspended etc..

    profilePicture:  { type: String, required: true },      // Should be a url
})


export const User = mongoose.model('User', userSchema);     // match name with mongo name
