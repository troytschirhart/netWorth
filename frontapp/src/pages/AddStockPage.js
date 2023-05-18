import CreateForm from "../components/CreateForm"
import Header from "../components/Header"
import UpdateForm from "../components/UpdateForm"

export default function AddStockPage() {

  return (
    <>
      <Header pade="addEdit" />

      <h3>add stocks</h3>
      <CreateForm />

      <h3>Update stocks</h3>
      <UpdateForm />

    </>
  )
}