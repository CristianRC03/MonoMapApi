import mongoose from 'mongoose';

const schemaOptions = {
    timestamps: { createdAt: 'creationDate', updatedAt: 'updateDate' }
};

const caseSchema = new mongoose.Schema({
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    isSent: {
        type: Boolean,
        required: false,
        default: false
    },
    genre: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    creationDate: {
        type: Date,
        default: Date.now
    },
    schemaOptions
})

export const caseModel = mongoose.model('Case', caseSchema);