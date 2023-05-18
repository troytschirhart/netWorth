import authStore from "../stores/authStore";
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import { signupSchema } from "../schemas/signupSchema";
import { useState } from "react";


export default function LoginForm() {
  const [failedLogin, setFailedLogin] = useState(false);
  const store = authStore();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    await store.login();

    // navigate to home page
    navigate("/");

  }

  const onSubmit = async (values, actions) => {
    try {
      actions.resetForm();
      const newLoginForm = {
        username: values.username,
        password: values.password
      }
      await store.setLoginForm(newLoginForm);
      await store.login();

      const loggedIn = store.getLoggedIn();
      
      if (loggedIn) {
        setFailedLogin(false);
        navigate("/home");
      } else {
        setFailedLogin(true);
      }
    } catch (err) {
      console.log(err);
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
    // <form onSubmit={handleLogin}>
    //   <input onChange={store.updateLoginForm} value={store.loginForm.username} type="text" name="username" />
    //   <input onChange={store.updateLoginForm} value={store.loginForm.password} type="password" name="password" />
    //   <button type="submit">Login</button>
    // </form>


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
        <button type="submit">Login</button> 
      </div>

      {failedLogin && (<div><p className="errorMessage">The username and/or password are not correct.</p></div>)}

    </form>
  </div>

  )
}