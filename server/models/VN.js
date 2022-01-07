import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const vnSchema = mongoose.Schema({
    vndbID: {
        type: Number,
        required: true,
        unique: true
    },
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

vnSchema.plugin(uniqueValidator);
export default mongoose.model('VN', vnSchema);