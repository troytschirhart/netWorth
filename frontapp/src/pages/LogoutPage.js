import { useEffect } from "react";
import authStore from "../stores/authStore";
import Header from "../components/Header";


export default function LogoutPage() {
  const store = authStore();

  useEffect(() => {
    store.logout();
  } ,[])

  return (
    <>
      <Header page="logout" />
    
      <div className='explanation'>
        <h2>You are now logged out.</h2>
      </div>
    </>
  )
}