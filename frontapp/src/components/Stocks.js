import stockStore from "../stores/stockStore"
import Stock from "./Stock";

export default function Stocks () {
    const store = stockStore();

    let stocksToShow = store.stocks;

    return (
      <div>
        <table>
          <thead>
            <tr><th>Edit</th><th>Delete</th><th>Symbol</th><th>Name</th><th>Shares</th>
              <th>Total Paid</th><th>Current Share Price</th><th>Value</th><th>Profit</th></tr>
          </thead>
          <tbody>
            {stocksToShow && stocksToShow.map(stock => {
              return <Stock key={stock._id} stock={stock} />
            })}
          </tbody>
        </table>



      </div>  
    )
}