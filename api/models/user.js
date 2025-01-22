const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    contactNumber: {
        type: String,
    },
    whatsappNumber: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true, 
    },
    state: {
        type: String,
    },
    referrelCode: {
        type: String,
    },
    businessPromoters: {
        type: String,
    },
    businessIncome: {
        type: String,
    },
    password: {
        type: String,
        required: true
    },
    paymentStatus: {
        type: Boolean,
        default: false, 
      },
},
    { timestamps: true }
);

const user = mongoose.model('user', userSchema);
module.exports  = user; 