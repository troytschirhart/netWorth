const mongoose = require('mongoose');

const StockSchema = new mongoose.Schema({
    symbol: {type: String, required: true},
    name: {type: String, required: true},
    shares: {type: Number, required: true},
    cost: {type: Number, required: true},
    price: Number,
    value: Number,
    profit: Number,
    // user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

const Stock = mongoose.model('Stock', StockSchema)

module.exports = Stock;