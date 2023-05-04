import stockStore from "../stores/stockStore"
import Stock from "./Stock";

export default function Stocks () {
    const store = stockStore();
    return (
      <div>
        <h2>Stocks:</h2>

        {store.stocks && store.stocks.map(stock => {
          return <Stock key={stock._id} stock={stock} />

        })}

      </div>  
    )
}