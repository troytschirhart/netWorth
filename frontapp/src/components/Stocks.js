import stockStore from "../stores/stockStore"
import Stock from "./Stock";
import { useEffect } from "react";

export default function Stocks () {
    const store = stockStore();

    // let stocksToShow = store.stocks; 
    
    // Use Effect
    useEffect(() => {
      store.fetchStocks();
      // stocksToShow = store.stocks;
    }, [store.stocks]);

    return (
      <div className="tableScroll">
        <table className="stockTable">
          <thead>
            <tr><th className="searchTableCell">Edit</th><th className="searchTableCell">Delete</th>
              <th className="searchTableCell">Symbol</th><th className="searchTableCell">Name</th><th className="searchTableCell">Shares</th>
              <th className="searchTableCell">Total<br/>Paid</th><th className="searchTableCell">Current<br/>Share<br/>Price</th>
              <th className="searchTableCell">Value</th><th className="searchTableCell">Profit</th></tr>
          </thead>
          <tbody>
          {store.stocks && store.stocks.map(stock => {
              return <Stock key={stock._id} stock={stock} />
            })}

          <tr>
            <td></td><td></td><td></td><td></td><td></td><td></td>
            <td className="searchTableCell tableCellRight totals">Totals:</td>
            <td className="searchTableCell totals">$12341234</td>
            <td className="searchTableCell totals">$12341234</td>
          </tr>
          
          </tbody>
        </table>



      </div>  
    )
}