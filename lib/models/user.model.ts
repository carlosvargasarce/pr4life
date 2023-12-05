import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    id: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    image: String,
    bio: String, 
    height: Number, 
    weight: Number, 
    personalRecords: [
        {
            type: Schema.Types.ObjectId,
            ref: 'PersonalRecord'
        }
    ],
    onboarded: {
        type: Boolean,
        default: false
    },
    groups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Group'
        }
    ],
    createdAt: {
        type: Date, 
        default: Date.now
    }
});

const User = models.User || model('User', userSchema);

export default User;