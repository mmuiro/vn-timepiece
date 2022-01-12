import mongoose from 'mongoose';

const vnReadingEntrySchema = mongoose.Schema({
    vn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VN',
        required: true
    },
    addedDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    startDate: {
        type: Date
    },
    completeDate: {
        type: Date
    },
    lastModifiedDate: {
        type: Date
    },
    playTime: {
        type: Number,
        required: true,
        default: 0
    },
    started: {
        type: Boolean,
        required: true,
        default: false
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    playStatus: {
        type: String,
        required: true,
        default: 'Not Started'
    }
});

export default mongoose.model('VNReadingEntry', vnReadingEntrySchema);