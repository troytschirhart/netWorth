import { useEffect } from "react";
import stockStore from "../stores/stockStore";
import Stocks from "../components/Stocks";
import Header from "../components/Header";


export default function HomePage() {

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