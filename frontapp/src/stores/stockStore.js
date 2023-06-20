import { create } from 'zustand'
import axios from 'axios';

const stockStore = create((set) => ({
    stocks: null,

    searchResults: null,

    triedSearch: false,

    createForm: {
        symbol: '',
        name: '',
        shares: null,
        cost: null,
        price: 0,
        value: 0,
        profit: 0,
    },

    updateForm: {
        _id: null,
        symbol: '',
        name: '',
        shares: 0,
        cost: 0,
        price: 0,
        value: 0,
        profit: 0
    },

    fetchStocks: async () => {
        // fetch the stocks
        const res = await axios.get('/stocks');

        // set the stocks to state
        set({
            stocks: res.data.stocks
        })
    },

    updateCreateFormField: (e) => {
        const {name, value} = e.target;

        set((state) => {
            return {
                createForm: {
                    ...state.createForm,
                    [name]: value,
                }
            }
        })
    },
    
    createStock: async () => {
        // e.preventDefault();

        // get values from state
        const {createForm, stocks} = stockStore.getState();
        
        // Create the Stock
        const res = await axios.post("/stocks", createForm);
    
        // Update state
        if (stocks === null) {
            set({
                stocks: res.data.stock,
            })
        } else {
            set({
                stocks: [...stocks, res.data.stock],
                createForm: {
                    symbol: '',
                    name: '',
                    shares: 0,
                    cost: 0,
                    price: 0,
                    value: 0,
                    profit: 0
            }})
        }
    },

    deleteStock: async (_id) => {
        // Delete the stock
        console.log(`/stocks/${_id}`);
        const res = await axios.delete(`/stocks/${_id}`)
        
        // get values from state
        const {stocks} = stockStore.getState();

        // filter out the deleted stock
        const newStocks = stocks.filter(stock => {
          return stock._id !== _id
        })
    
        // update the state
        set({
            stocks: newStocks
        });
      },

    handleUpdateFieldChange: (e) => {
        const {name, value} = e.target;

        set((state) => {
            return {
                updateForm: {
                ...state.updateForm,
                [name]: value,
            },
        }
    })},

    toggleUpdate: ({_id, symbol, name, shares, cost, price, value, profit }) => {
        // set state on update form
        set({
            updateForm: {
                _id,
                symbol,
                name,
                shares,
                cost,
                price,
                value,
                profit
            }
        })
    },

    updateStock: async (e) => {
        e.preventDefault();
    
        // get the updated values

        const {
            updateForm: {_id, symbol, name, shares, cost},
            stocks,
         } = stockStore.getState();
    
        // send the update request
        const res =  await axios.put(`/stocks/${_id}`, {symbol, name, shares, cost});
    
        // update state
        // create a copy of the stocks
        const newStocks = [...stocks];
    
        // find the index of the stock to be updated
        const stockIndex = stocks.findIndex(stock => {
          return stock._id === _id;
        })
    
        // set the targeted stock to equal the updated values
        newStocks[stockIndex] = res.data.updatedStock;
    
        // set the new state
        set({
            stocks: newStocks,
            updateForm: {
                _id: null,
                symbol: '',
                name: '',
                shares: 0,
                cost: 0,
                price: 0,
                value: 0,
                profit: 0
            }
        })
    
    },

    searchForTerm: async (searchTerm) => {
        const searchUrl = 'https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=' + searchTerm + '&apikey=IQMFD5277KOIHK9H';

        const res = await axios.get(searchUrl, { withCredentials: false, });

        set({
            searchResults: res.data.bestMatches
        }) 

        return res.data.bestMatches;
    },

    setTriedSearch: (value) => {
        console.log("value: " + value);
        // set({triedSearch: value});
    },

    getCurrentPrice: async (symbol) => {
        const quoteUrl = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=IQMFD5277KOIHK9H";

        const res = await axios.get(quoteUrl, { withCredentials: false, });

        const quotedPrice = res["data"]["Global Quote"]["05. price"];

        const stockPrice = (Math.round(quotedPrice * 100) / 100).toFixed(2);

        console.log(stockPrice);

        return stockPrice;
    },

    setCreateForm: (newStock) => {
        set ({
            createForm: {
                symbol: newStock.symbol,
                name: newStock.name,
                shares: newStock.shares,
                cost: newStock.cost,
                price: newStock.price,
                value: newStock.value,
                profit: newStock.profit,
            },
        })
      },

}));

export default stockStore;