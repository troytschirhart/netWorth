import stockStore from "../stores/stockStore"
import { useFormik } from "formik";
import { createSchema } from "../schemas/allSchemas";

export default function CreateForm() {
  const store = stockStore();

  const onSubmit = async (values, actions) => {
    try {
      actions.resetForm();

      // get the stock symbol from values
      const stockSymbol = values.symbol;

      // use the stock symbol to pull current price per share from the api
      const pricePerShare = await store.getCurrentPrice(stockSymbol); // api result

      // use pricePerShare * shares to get the value of the stock position
      const stockValue = (Math.round(pricePerShare * values.shares * 100) / 100).toFixed(2);

      // use stockValue - cost to get the profit
      const stockProfit = (Math.round((stockValue - values.cost) * 100) / 100).toFixed(2);

      // set all of the values into an object
      const newStock = {
        symbol: values.symbol,
        name: values.name,
        shares: values.shares,
        cost: values.cost,
        price: pricePerShare,
        value: stockValue,
        profit: stockProfit
      }
      console.log(JSON.stringify(newStock));
      
      // use the object to set createForm values
      await store.setCreateForm(newStock);

      // create a stock in the db using the createForm object
      await store.createStock();

      // symbol: '',
      // name: '',
      // shares: null,
      // cost: null,
      // price: 0,
      // value: 0,
      // profit: 0,


      // put the values together into createForm
      // set createForm in state
      // call the function to create a stock

    } catch (err) {
      console.log(err);
    }
    
  }


  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: {
      symbol: '',
      name: '',
      shares: 0,
      cost: 0,
      price: 0,
      value: 0,
      profit: 0,
    },
    validationSchema: createSchema,
    onSubmit
  });

  return (
    <div>
        {!store.updateForm._id && <div>
        <h2>Add Stock</h2>

        <form onSubmit={handleSubmit}>

          <div className="signupForm">
            <label htmlFor="symbol">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Symbol:&nbsp;</label>
            <input 
              value={values.symbol} 
              onChange={handleChange}
              className={errors.symbol && touched.symbol ? "inputError" : "signupFormInput"} 
              id="symbol"
              type="text"
              placeholder="Symbol"
            />
            {errors.symbol && touched.symbol && <p className="errorMessage">&nbsp;{errors.symbol}</p>}
          </div>

          <div className="signupForm">
            <label htmlFor="name">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Name:&nbsp;</label>
            <input 
              value={values.name} 
              onChange={handleChange}
              className={errors.name && touched.name ? "inputError" : "signupFormInput"} 
              id="name"
              type="text"
              placeholder="Name"
            />
            {errors.name && touched.name && <p className="errorMessage">&nbsp;{errors.name}</p>}
          </div>

          <div className="signupForm">
            <label htmlFor="shares">Shares Owned:&nbsp;</label>
            <input 
              value={values.shares} 
              onChange={handleChange}
              className={errors.shares && touched.shares ? "inputError" : "signupFormInput"} 
              id="shares"
              type="number"
              // placeholder="Shares"
            />
            {errors.shares && touched.shares && <p className="errorMessage">&nbsp;{errors.shares}</p>}
          </div>

          <div className="signupForm">
            <label htmlFor="cost">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Total Paid:&nbsp;$&nbsp;</label>
            <input 
              value={values.cost} 
              onChange={handleChange}
              className={errors.cost && touched.cost ? "inputError" : "signupFormInput"} 
              id="cost"
              type="number"
              // placeholder="Cost"
            />
            {errors.cost && touched.cost && <p className="errorMessage">&nbsp;{errors.cost}</p>}
          </div>

          <div className="signupForm">
            <button type="submit" >Add Stock</button>
          </div>

        </form>
        
      </div>}
    </div>
  )
}