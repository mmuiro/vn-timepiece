import mongoose from 'mongoose';

const historySchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    actionList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Action'
    }]
});

export default mongoose.model('History', historySchema);