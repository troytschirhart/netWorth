import stockStore from "../stores/stockStore"

export default function CreateForm() {
  const store = stockStore();

  if (store.updateForm._id) return <></>;

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