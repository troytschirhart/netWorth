
import { useState, useEffect } from "react";
import axios from "axios";

function App() {

  // State
  const [stocks, setStocks] = useState(null);
  const [createForm, setCreateForm] = useState({
    symbol: '',
    name: '',
    shares: 0,
    cost: 0,
    price: 0,
    value: 0,
    profit: 0
  })
  
  // Use Effect
  useEffect(() => {
    fetchStocks();
  }, [])

  // path constant
  const path = "http://localhost:3000/stocks";

  // stock functions
  const fetchStocks = async () => {
    // fetch the stocks
    const res = await axios.get(path);

    // set the stocks to state
    setStocks(res.data.stocks)
    console.log(res);
  }

  const updateCreateFormField = (e) => {
    const {name, value} = e.target;
    setCreateForm({
      ...createForm,
      [name]: value
    })
  }

  const createStock = async (e) => {
    e.preventDefault();
    
    // Create the Stock
    const res = await axios.post(path, createForm);

    // Update state
    setStocks([...stocks, res.data.stock]);

    // Clear form state
    setCreateForm({
      symbol: '',
      name: '',
      shares: 0,
      cost: 0,
      price: 0,
      value: 0,
      profit: 0
    })
  }

  const deleteStock = async (_id) => {
    // Delete the stock
    console.log(`${path}/${_id}`);
    const res = await axios.delete(`${path}/${_id}`)

    // Update the state
    const newStocks = [...stocks].filter(stock => {
      return stock._id !== _id
    })

    // update the state
    setStocks(newStocks);
  }

  return (
    <div className="App">

      <h2>Stocks:</h2>

      {stocks && stocks.map(stock => {
        return <div key={stock._id}>
          <h3>{stock.symbol}</h3>
          <h3>{stock.name}</h3>
          <h3>{stock.shares}</h3>
          <h3>${stock.cost}</h3>
          <h3>${stock.price}</h3>
          <h3>${stock.value}</h3>
          <h3>${stock.profit}</h3>  
          <button onClick={() => deleteStock(stock._id)}>Delete Stock</button>        
        </div>

      })}

      <div>
        <h2>Add Stock</h2>

        <form onSubmit={createStock}>
          Symbol: <input value={createForm.symbol} onChange={updateCreateFormField} name="symbol" />
          Name: <input value={createForm.name} onChange={updateCreateFormField} name="name" />
          Shares: <input value={createForm.shares} onChange={updateCreateFormField} name="shares" />
          Cost: <input value={createForm.cost} onChange={updateCreateFormField} name="cost" />
          <button type="submit" >Add Stock</button>

        </form>
        
      </div>

    </div>
  );
}

export default App;
