const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
},
    { timestamps: true }
);

const user = mongoose.model('user', userSchema);
module.exports = user; 