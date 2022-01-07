import mongoose from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import Action from './Action';

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

historySchema.virtual('lastActiveDate').get(async function() {
    const res = await Action.find({user: this.user}).sort('date', 'descending').limit(1).exec();
    if (res !== null) {
        return res;
    } else {
        return this.user.registerDate;
    }
});

historySchema.plugin(uniqueValidator)
export default mongoose.model('History', historySchema);