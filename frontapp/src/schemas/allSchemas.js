import * as yup from "yup";

const signupSchema = yup.object().shape({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required")
})

const createSchema = yup.object().shape({
  symbol: yup.string().required("Stock symbol is required"),
  name: yup.string().required("Stock name is required"),
  shares: yup.number("Must be a number").required("Number of shares is required"),
  cost: yup.number("Must be a number").required("Total purchase cost is required"),
})

const searchSchema = yup.object().shape({
  searchTerm: yup.string().required("Search term is required")
})

export {
  signupSchema, createSchema, searchSchema
}