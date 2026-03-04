// unit schema
const unitSchema = new mongoose.Schema({
    room_number:
    {
        type: Number,
        unique: true,
        required: true
    },
    price:
    {
        type: Number,
        required: true
    },
    status:
    {
        type: String,
        required: true,
        enum: ["available", "occupied", "reserved", "maintenance"] // reserved = empty but to be occupied soon
    },
    unit_listing:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
        required: true
    },
    current_student: // student with relation to said unit atm
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Verified Student",
    },
    transfer_request:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Transfer Request",
    }
})
