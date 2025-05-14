const mongoose = require("mongoose");
const candidateSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    experience: {
        type: Number,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        required: true,

    },
    position: {
        type: String,
        required: true,
    },
    resume: {
        type: String,
        required: true,

    },
    status: {
        type: String,
        enum: ['scheduled', 'ongoing', 'selected', 'rejected'], // allowed values
        required: true,
        default: 'ongoing',
    },
    isEmployee: {
        type: Boolean,
        default: false,
    },
    dateOfJoining: {
        type: String,
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }

},
    { timestamps: true }
);

const candidate = mongoose.model('candidate', candidateSchema);
module.exports = candidate; 