import mongoose from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const actionSchema = mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
    },
    vnApplied: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VN'
    },
    originalPlayTime: {
        // only if type === "Modification"
        type: Number
    },
    modifiedPlayTime: {
        // only if type === "Modification"
        type:Number
    }
});

actionSchema.plugin(uniqueValidator);
export default mongoose.model('Action', actionSchema);