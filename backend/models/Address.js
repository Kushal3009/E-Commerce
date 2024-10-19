const mongoose = require('mongoose');


const addressSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    houseNo: {
        type: String, // Consider changing to String for flexibility
        required: true,
    },
    street: { // Fix the typo here
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        required: true,
    },
    pincode: {
        type: String, // Consider changing to String to support leading zeros
        required: true,
    },
    phoneNumber: { // Fix the field name here
        type: String, // Consider changing to String for flexibility
        required: true,
    },
});


module.exports = mongoose.model('Address', addressSchema);