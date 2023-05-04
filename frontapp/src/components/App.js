
import { useState, useEffect } from "react";
import axios from "axios";
import stockStore from "../stores/stockStore";
import Stocks from "./Stocks";
import UpdateForm from "./UpdateForm";
import CreateForm from "./CreateForm";

function App() {
  const store = stockStore();
 
  // Use Effect
  useEffect(() => {
    store.fetchStocks();
  }, [])

  return (
    <div className="App">
      <Stocks />

      <UpdateForm />

      <CreateForm />

    </div>
  );
}

export default App;
