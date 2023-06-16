import stockStore from "../stores/stockStore"
import { useFormik } from "formik";
import { createSchema } from "../schemas/allSchemas";

export default function CreateForm() {
  const store = stockStore();

  const onSubmit = async (values, actions) => {
    try {

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

        <form onSubmit={store.createStock}>
          Symbol: <input value={store.createForm.symbol} onChange={store.updateCreateFormField} name="symbol" />
          Name: <input value={store.createForm.name} onChange={store.updateCreateFormField} name="name" />
          Shares: <input value={store.createForm.shares} onChange={store.updateCreateFormField} name="shares" />
          Cost: <input value={store.createForm.cost} onChange={store.updateCreateFormField} name="cost" />
          <button type="submit" >Add Stock</button>

        </form>
        
      </div>}
    </div>
  )
}