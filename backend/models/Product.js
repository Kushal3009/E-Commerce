const mongoose = require('mongoose')
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    sell_price: {
        type: Number,
        required: true
    },
    discount:{
        type: Number,
    },
    quantity: {
        type: Number,
        required: true
    },
    is_visible: {
        type: Boolean,
        default: true,
    },
},{ timestamps: true })

const Product = mongoose.model('Product',productSchema)

module.exports = Product