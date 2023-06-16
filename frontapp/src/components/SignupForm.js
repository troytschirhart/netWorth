import authStore from "../stores/authStore"
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { signupSchema } from "../schemas/allSchemas";
import { useState } from "react";

export default function SignupForm() {
  const store = authStore();
  const navigate = useNavigate();
  const [inUse, setInUse] = useState(false);

  const onSubmit = async (values, actions) => {

    actions.resetForm();

    // e.preventDefault();
    const res = await store.signupFormik(values);

    if (res.status === 200) {
      setInUse(false);
      const newLoginForm = {
          username: values.username,
          password: values.password
        }
      await store.setLoginForm(newLoginForm);
      await store.login();
      navigate("/stocks");
    } else if (res.message !== undefined && res.message.trim() === "Request failed with status code 432") {
      setInUse(true);
    } else {
      console.log(res.status);   // need to provide feedback - failure probably due to non-unique username
    }
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
      <form onSubmit={handleSubmit}>
        {/* <input onChange={store.updateSignupForm} value={store.signupForm.username} type="text" name="username" />
        <input onChange={store.updateSignupForm} value={store.signupForm.password} type="password" name="password" />
        <button type="submit">Signup</button> */}

        <div className="signupForm">
          <label htmlFor="username">Username:&nbsp;</label>
          <input 
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.username && touched.username ? "inputError" : "signupFormInput"}
            id="username"
            type="text"
            placeholder="Username"
          />
          {errors.username && touched.username && <p className="errorMessage">&nbsp;{errors.username}</p>}
        </div>

        <div className="signupForm">
          <label htmlFor="password">&nbsp;Password:&nbsp;</label>
          <input 
            value={values.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className={errors.password && touched.password ? "inputError" : "signupFormInput"}
            id="password"
            type="password"
            placeholder="Password"
          />
          {errors.password && touched.password && <p className="errorMessage">&nbsp;{errors.password}</p>}
        </div>

        <div className="signupForm">
          <button type="submit">Signup</button> 
        </div>
        {inUse && (<div><p className="errorMessage">That username is already in use.</p>
        <p className="errorMessage">Please try another username.</p></div>)}
      </form>
    </div>

  )
}