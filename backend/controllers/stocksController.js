
const Stock = require('../models/stock');

const fetchStocks = async (req, res) => {
    // find the notes
    const stocks = await Stock.find();

    // respond with the notes
    res.json({stocks});
}

const fetchStock = async (req, res) => {
    // get the id from the url
    const stockId = req.params.id;

    // find the note using the id
    const oneStock = await Stock.findById(stockId);

    // respond with the note
    res.json({oneStock});
}

const createStock = async (req, res) => {
    // get the sent in data off of request body
    const {symbol, name, shares, cost} = req.body;
    const price = value = profit = 0;

    // create a stock
    const stock = await Stock.create({symbol, name, shares, cost, price, value, profit})

    // respond with the new stock
    res.json({stock})
}

const updateStock = async (req, res) => {
    // get the id off of the url
    const stockId = req.params.id;

    // get the data off of the request body
    const {symbol, name, shares, cost} = req.body;

    // find and update the record
    await Stock.findByIdAndUpdate(stockId, {symbol, name, shares, cost});

    // get the updated stock
    const updatedStock = await Stock.findById(stockId);

    // respond with the updated stock
    res.json({updatedStock})
}

const deleteStock = async (req, res) => {
    // get the id off of the url
    const stockId = req.params.id;

    // find and delete the stock
    await Stock.deleteOne({_id: stockId});

    // send a response
    res.json({success: "record deleted"})
}

module.exports = {
    fetchStocks, fetchStock, createStock, updateStock, deleteStock
}