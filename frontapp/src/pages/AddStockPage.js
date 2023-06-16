import CreateForm from "../components/CreateForm"
import Header from "../components/Header"
import UpdateForm from "../components/UpdateForm"
import SearchForm from "../components/SearchForm"

export default function AddStockPage() {

  return (
    <>
      <Header page="addEdit" />

      <div className="addContainer">
        <div className="addCard" >
          <SearchForm />
        </div>

        <div className="addCard" >
          <CreateForm />
        </div>
      </div>

      {/* <h3>Update stocks</h3>
      <UpdateForm /> */}

    </>
  )
}