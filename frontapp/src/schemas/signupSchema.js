import * as yup from "yup";

const signupSchema = yup.object().shape({
  username: yup.string().required("Required"),
  password: yup.string().required("Required")
})

export {
  signupSchema
}