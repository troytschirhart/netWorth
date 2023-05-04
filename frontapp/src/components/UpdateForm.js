import stockStore from "../stores/stockStore"

export default function UpdateForm() {
  const store = stockStore();

  if (!store.updateForm._id) return <></>;

  return (
    <div>
      {store.updateForm._id && <div>

      <h2>Update Stock</h2>
      <form onSubmit={store.updateStock}>
        Symbol: <input value={store.updateForm.symbol} onChange={store.handleUpdateFieldChange} name="symbol" />
        Name: <input value={store.updateForm.name} onChange={store.handleUpdateFieldChange} name="name" />
        Shares: <input value={store.updateForm.shares} onChange={store.handleUpdateFieldChange} name="shares" />
        Cost: <input value={store.updateForm.cost} onChange={store.handleUpdateFieldChange} name="cost" />
        <button type="submit" >Update Stock</button>

      </form>

      </div>}
    </div>
  )
}