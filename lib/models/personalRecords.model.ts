import { Schema, model, models } from "mongoose";

const personalRecordsSchema = new Schema({
    name: { 
        type: String,
        required: true
    },
    details: { type: String },
    value: {
        type: String,
        required: true
    },
    unit: { 
        type: String,
        required: true
    },
    variation: { 
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    entryDate: {
        type: Date, 
        default: Date.now
    },
    group: {
        type: Schema.Types.ObjectId,
        ref: 'Group'
    }
});

const PersonalRecords = models.PersonalRecords || model('PersonalRecords', personalRecordsSchema);

export default PersonalRecords;