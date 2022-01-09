import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const vnReadingEntrySchema = mongoose.Schema({
    vn: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VN',
        required: true
    },
    startDate: {
        type: Date,
        required: true,
        default: Date.now
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
    completed: {
        type: Boolean,
        required: true,
        completed: false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    startingEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Action'
    },
    endingEvent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Action'
    },
    playStatus: {
        type: String,
        required: true,
        default: 'Not Started'
    }
});

vnReadingEntrySchema.plugin(uniqueValidator);
export default mongoose.model('VNReadingEntry', vnReadingEntrySchema);