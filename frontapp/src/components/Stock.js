import stockStore from "../stores/stockStore"

export default function Stock ({stock}) {
  const store = stockStore();

  return (

    <tr key={stock._id}>
      <td className="searchTableCell tableCellCenter"><button onClick={() => store.toggleUpdate(stock)}>Edit</button></td>
      <td className="searchTableCell tableCellCenter"><button onClick={() => store.deleteStock(stock._id)}>Delete</button></td>
      <td className="searchTableCell tableCellCenter">{stock.symbol}</td>
      <td className="searchTableCell tableCellCenter">{stock.name}</td>
      <td className="searchTableCell tableCellCenter">{stock.shares}</td>
      <td className="searchTableCell tableCellRight tableCellMoney">${stock.cost.toFixed(2)}</td>
      <td className="searchTableCell tableCellRight tableCellMoney">${stock.price.toFixed(2)}</td>
      <td className="searchTableCell tableCellRight tableCellMoney">${stock.value.toFixed(2)}</td>
      <td className="searchTableCell tableCellRight tableCellMoney">${stock.profit.toFixed(2)}</td>
    </tr>


  )
}