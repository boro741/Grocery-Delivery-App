const mongoose = require('mongoose')
const Schema = mongoose.Schema

const grocerySchema = new Schema({
    name: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    unit: { type: String, required: true },
    groceryType: { type: String, required: true }
})

module.exports = mongoose.model('Grocery', grocerySchema)