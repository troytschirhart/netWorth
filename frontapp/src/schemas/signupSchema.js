import * as yup from "yup";

const signupSchema = yup.object().shape({
  username: yup.string().required("Username is Required"),
  password: yup.string().required("Password is Required")
})

export {
  signupSchema
}