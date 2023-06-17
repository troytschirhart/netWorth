import { useFormik } from "formik";
import stockStore from "../stores/stockStore";
import { searchSchema } from "../schemas/allSchemas";
import { useState } from "react";

export default function SearchForm() {
  const store = stockStore();
  const [triedSearch, setTriedSearch] = useState(false);

  const onSubmit = async (values, actions) => {
    
    try {
      // reset the form 
      actions.resetForm();

      // call the api with the submitted searchTerm from the form
      await store.searchForTerm(values.searchTerm);

      // set the tried search flag to true so that results or "no results" will display
      setTriedSearch(true);

    } catch (err) {
      console.log(err);
    }
    
  }

  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: {
      searchTerm: "",
    },
    validationSchema: searchSchema,
    onSubmit,
  });


  return (
    <div>
      <h2>Symbol Search</h2>

      <form onSubmit={handleSubmit}>

        <div className="signupForm">
          <label htmlFor="searchTerm">Search Term:&nbsp;</label>
          <input 
            value={values.searchTerm}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.searchTerm && touched.searchTerm ? "inputError" : "signupFormInput"}
            id="searchTerm"
            type="text"
            placeholder="Search Term"
          />
          {errors.searchTerm && touched.searchTerm && <p className="errorMessage">&nbsp;{errors.searchTerm}</p>}
        </div>

        <div className="signupForm">
          <button type="submit">Search</button> 
        </div>

      </form>
     
      { (triedSearch && store.searchResults.length === 0) && (
        <div>
          <p>No results were found</p>
        </div>
      )}

      { (triedSearch && store.searchResults.length !== 0) && (
        <div>
          <table className="searchTable">
            <thead>
              <tr><th className="searchTableCell">Symbol</th><th className="searchTableCell">Name</th></tr>
            </thead>
            <tbody>
              {store.searchResults.map((result) => {
                return (
                  <tr key={result["1. symbol"]}><td className="searchTableCell">{result["1. symbol"]}</td><td className="searchTableCell">{result["2. name"]}</td></tr>
                )
              })}
            </tbody>
          </table>

        </div>
      )}

    </div>
  )
}