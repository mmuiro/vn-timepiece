import mongoose from "mongoose";

const actionSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    vnApplied: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VN',
        required: true
    },
    readingEntry: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VNReadingEntry',
        required: true
    },
    originalPlayTime: {
        // only if type === "Modification"
        type: Number
    },
    modifiedPlayTime: {
        // only if type === "Modification"
        type: Number
    },
    readingTime: {
        // only if type === "Reading"
        type: Number
    }
});

export default mongoose.model('Action', actionSchema);