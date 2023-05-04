import { create } from 'zustand'
import axios from 'axios';

const path = "http://localhost:3000/stocks";

const stockStore = create((set) => ({
    stocks: null,

    createForm: {
        symbol: '',
        name: '',
        shares: 0,
        cost: 0,
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
        const res = await axios.get(path);

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
    
    createStock: async (e) => {
        e.preventDefault();

        // get values from state
        const {createForm, stocks} = stockStore.getState();
        
        // Create the Stock
        const res = await axios.post(path, createForm);
    
        // Update state
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
    },

    deleteStock: async (_id) => {
        // Delete the stock
        console.log(`${path}/${_id}`);
        const res = await axios.delete(`${path}/${_id}`)
        
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
        const res =  await axios.put(`${path}/${_id}`, {symbol, name, shares, cost});
    
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

        // setStocks(newStocks);
    
        // clear the update form
        // setUpdateForm({
        //   _id: null,
        //   symbol: '',
        //   name: '',
        //   shares: 0,
        //   cost: 0,
        //   price: 0,
        //   value: 0,
        //   profit: 0
        // })
    
    },

}));

export default stockStore;