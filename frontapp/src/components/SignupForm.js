import authStore from "../stores/authStore"

export default function SignupForm() {
  const store = authStore();

  const handleSignup = () => {
    
  }

  return (
    <form onSubmit={handleSignup}>
      <input onChange={store.updateSignupForm} value={store.signupForm.username} type="text" name="username" />
      <input onChange={store.updateSignupForm} value={store.signupForm.password} type="password" name="password" />
      <button type="submit">Signup</button>
    </form>

  )
}