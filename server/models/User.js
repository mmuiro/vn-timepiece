import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    }, 
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        uniqueCaseInsensitive: true
    },
    history: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'History',
    },
    vnList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VNReadingEntry'
    }],
    settings: {
        type: Object
        // set a default
    },
    registerDate: {
        type: Date,
        required: true,
        default: Date.now
    }
});

userSchema.virtual("totalPlayTime").get(function() {
    let total = 0;
    this.vnList.forEach(entry => {
        total += entry.playTime;
    });
    return total;
});

userSchema.virtual("numVNsCompleted").get(function() {
    return this.vnList.filter(entry => entry.completed).length;
});

userSchema.virtual("numVNsStarted").get(function() {
    return this.vnList.filter(entry => entry.started).length;
});

userSchema.virtual("mostRecentEntry").get(function() {
    return this.vnList.length > 0 ? this.vnList.sort((entry1, entry2) => entry2.lastModifiedDate - entry1.lastModifiedDate)[0] : null;
});

userSchema.virtual("lastReadVN").get(function() {
    return this.mostRecentEntry && this.mostRecentEntry.vn;
});

userSchema.virtual("lastActiveDate").get(function() {
    return this.mostRecentEntry !== null && this.mostRecentEntry.lastModifiedDate !== undefined ? this.mostRecentEntry.lastModifiedDate : this.registerDate;
});

export default mongoose.model('User', userSchema);