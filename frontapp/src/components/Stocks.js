import stockStore from "../stores/stockStore"
import Stock from "./Stock";

export default function Stocks () {
    const store = stockStore();
    return (
      <div>

        {store.stocks && store.stocks.map(stock => {
          return <Stock key={stock._id} stock={stock} />

        })}

      </div>  
    )
}