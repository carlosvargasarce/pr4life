import { Schema, model, models } from "mongoose";

const personalRecordsSchema = new Schema({
    details: { type: String },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    entryDate: {
        type: Date, 
        default: Date.now
    }
});

const PersonalRecords = models.PersonalRecords || model('PersonalRecords', personalRecordsSchema);

export default PersonalRecords;