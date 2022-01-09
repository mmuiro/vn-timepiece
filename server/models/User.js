import mongoose from 'mongoose';
import validator from 'validator';
import uniqueValidator from 'mongoose-unique-validator';
import VNReadingEntry from './VNReadingEntry.js';

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
        uniqueCaseInsensitive: true,
        validate: { validator: validator.isEmail, message: 'Invalid email.' }
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

userSchema.virtual("totalPlayTime").get(async function() {
    await VNReadingEntry.find({ user: this.id }, (err, readingList) => {
        if (err) {
            return 0;
        } else {
            let total = 0;
            readingList.forEach(entry => {
                total += entry.playTime;
            });
            return total;
        }
    })
});

userSchema.plugin(uniqueValidator);
export default mongoose.model('User', userSchema);