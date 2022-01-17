import mongoose from 'mongoose';
import VNReadingEntry from './VNReadingEntry.js';

const vnSchema = mongoose.Schema({
    vndbID: {
        type: Number,
        required: true,
        unique: true
    }, 
    title: {
        type: String,
        required: true
    }, 
    originalTitle: {
        type: String
    },
    imageLink: {
        type: String
    },
    imageNSFW: {
        type: Boolean
    }
});

vnSchema.virtual('averagePlayTime').get(async function() {
    await VNReadingEntry.find({vn: this.id, completed: true}, (err, entries) => {
        if (err) {
            return 0;
        } else {
            let total = 0;
            entries.forEach(entry => {
                total += entry.playTime;
            });
            return (total == 0 ? 0 : total / entries.length);
        }
    });
})

vnSchema.virtual('numCompletedUsers').get(async function() {
    await VNReadingEntry.find({vn: this.id, completed: true}, (err, entries) => {
        if (err) {
            return 0;
        } else {
            return entries.length;
        }
    });
})

export default mongoose.model('VN', vnSchema);