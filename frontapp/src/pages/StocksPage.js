import { useEffect } from "react";
import stockStore from "../stores/stockStore";
import Stocks from "../components/Stocks";
import UpdateForm from "../components/UpdateForm";
import CreateForm from "../components/CreateForm";


export default function StocksPage() {

  const store = stockStore();
 
  // Use Effect
  useEffect(() => {
    store.fetchStocks();
  }, [])

  return (
    <div>
      <Stocks />
      <UpdateForm />
      <CreateForm />
    </div>
  )
}