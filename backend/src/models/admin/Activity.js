// activity schema
const activitySchema = new mongoose.Schema({
    activity_id:
    {
        type: Number,
        unique: true,
        required: true
    }, 
    type:
    {
        type: String,
        required: true,
        enum: ["login", "logout", "update", "others"] // types of activity to choose, can be expanded
    }, // activity type
    text: // to verify attribute use
    {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    activity_date: // time/date of said activity
    {
        type: Date,
        required: true
    }
})
