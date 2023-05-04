import stockStore from "../stores/stockStore"

export default function Stock ({stock}) {
  const store = stockStore();

  return (
    <div key={stock._id}>
      <h3>{stock.symbol}</h3>
      <h3>{stock.name}</h3>
      <h3>{stock.shares}</h3>
      <h3>${stock.cost}</h3>
      <h3>${stock.price}</h3>
      <h3>${stock.value}</h3>
      <h3>${stock.profit}</h3>  
      <button onClick={() => store.deleteStock(stock._id)}>Delete Stock</button>    
      <button onClick={() => store.toggleUpdate(stock)}>Update Stock</button>        
    </div>
  )
}