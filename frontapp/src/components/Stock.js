import stockStore from "../stores/stockStore"

export default function Stock ({stock}) {
  const store = stockStore();

  return (

    <tr key={stock._id}>
      <td><button onClick={() => store.toggleUpdate(stock)}>Edit</button></td>
      <td><button onClick={() => store.deleteStock(stock._id)}>Delete</button></td>
      <td>{stock.symbol}</td>
      <td>{stock.name}</td>
      <td>{stock.shares}</td>
      <td>${stock.cost}</td>
      <td>${stock.price}</td>
      <td>${stock.value}</td>
      <td>${stock.profit}</td>
    </tr>


    // <div key={stock._id}>
    //   <h3>{stock.symbol}</h3>
    //   <h3>{stock.name}</h3>
    //   <h3>{stock.shares}</h3>
    //   <h3>${stock.cost}</h3>
    //   <h3>${stock.price}</h3>
    //   <h3>${stock.value}</h3>
    //   <h3>${stock.profit}</h3>  
    //   <button onClick={() => store.deleteStock(stock._id)}>Delete Stock</button>    
    //   <button onClick={() => store.toggleUpdate(stock)}>Update Stock</button>        
    // </div>
  )
}