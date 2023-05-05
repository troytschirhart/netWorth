
// load env variables
if (process.env.NODE_ENV != "production") {
    require("dotenv").config();
}

const PORT = process.env.PORT || 8000;

// Import dependencies
const express = require('express');
const connectToDb = require('./config/connectToDb');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const stocksController = require('./controllers/stocksController');
const usersController = require('./controllers/usersController');
const requireAuth = require('./middleware/requireAuth');


// create an express app
const app = express();

// connect to database
connectToDb();

// configure express app
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}));

// routing for users
app.post('/signup', usersController.signup);
app.post('/login', usersController.login);
app.get('/logout', usersController.logout);
app.get('/check-auth', requireAuth, usersController.checkAuth);

// routing for stocks
app.get('/stocks', stocksController.fetchStocks);
app.get('/stocks/:id', stocksController.fetchStock);
app.post('/stocks', stocksController.createStock);
app.put('/stocks/:id', stocksController.updateStock);
app.delete('/stocks/:id', stocksController.deleteStock);

// start the server
app.listen(PORT, () => {
    console.log("listening on PORT " + PORT);
})