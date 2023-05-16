
const Stock = require('../models/stock');

const fetchStocks = async (req, res) => {
    try {
        // find the notes
        const stocks = await Stock.find({ user: req.user._id });

        // respond with the notes
        res.json({stocks});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const fetchStock = async (req, res) => {
    try {
        // get the id from the url
        const stockId = req.params.id;

        // find the note using the id
        const oneStock = await Stock.findOne({_id: stockId, user: req.user._id});

        // respond with the note
        res.json({oneStock});
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const createStock = async (req, res) => {
    try {
        // get the sent in data off of request body
        const {symbol, name, shares, cost} = req.body;
        const price = value = profit = 0;

        // create a stock
        const stock = await Stock.create({symbol, name, shares, cost, price, value, profit, user: req.user._id});

        // respond with the new stock
        res.json({stock})
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const updateStock = async (req, res) => {
    try {
        // get the id off of the url
        const stockId = req.params.id;

        // get the data off of the request body
        const {symbol, name, shares, cost} = req.body;

        // find and update the record
        await Stock.findOneAndUpdate({_id: stockId, user: req.user._id}, {symbol, name, shares, cost});

        // get the updated stock
        const updatedStock = await Stock.findById(stockId);

        // respond with the updated stock
        res.json({updatedStock})
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

const deleteStock = async (req, res) => {
    try {
        // get the id off of the url
        const stockId = req.params.id;

        // find and delete the stock
        await Stock.deleteOne({_id: stockId, user: req.user._id});

        // send a response
        res.json({success: "record deleted"})
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
}

module.exports = {
    fetchStocks, fetchStock, createStock, updateStock, deleteStock
}