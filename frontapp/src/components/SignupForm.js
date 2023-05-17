import authStore from "../stores/authStore"
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signupSchema } from "../schemas/signupSchema";

export default function SignupForm() {
  const store = authStore();
  const navigate = useNavigate();

  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    
    actions.resetForm();

    // e.preventDefault();
    // await store.signup();

    // // todo: after signup, go to the homepage (login the user automatically)

    // navigate("/login");
  }

  const {values, errors, touched, handleBlur, handleChange, handleSubmit} = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: signupSchema,
    onSubmit
  });
 
  return (
    <div className="explanation">
      <form onSubmit={handleSubmit} className="signupForm">
        {/* <input onChange={store.updateSignupForm} value={store.signupForm.username} type="text" name="username" />
        <input onChange={store.updateSignupForm} value={store.signupForm.password} type="password" name="password" />
        <button type="submit">Signup</button> */}

        <div>
          <label htmlFor="username">Username: </label>
          <input 
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username && touched.username ? "input-error" : ""}
            id="username"
            type="text"
            placeholder="Username"
          />
          {errors.username && touched.username && <p>{errors.username}</p>}
        </div>

        <div>
          <label htmlFor="password">Password: </label>
          <input 
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "input-error" : ""}
            id="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && touched.password && <p>{errors.password}</p>}
        </div>

        <button type="submit">Signup</button> 

      </form>
    </div>

  )
}