import { useEffect } from "react";
import stockStore from "../stores/stockStore";
import Stocks from "../components/Stocks";
import UpdateForm from "../components/UpdateForm";
import CreateForm from "../components/CreateForm";
import Header from "../components/Header";


export default function StocksPage() {

  const store = stockStore();
 
  // Use Effect
  useEffect(() => {
    store.fetchStocks();
  }, [])

  return (
    <div>
      <Header page="home" />
      
      <Stocks />

    </div>
  )
}