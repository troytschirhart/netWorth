import { Link } from "react-router-dom";

export default function Header({page}) {

  const buttonSwitch = (page) => {

    switch(page){
      case "front":
        return (
          <div className="navContainer">
            <Link to="/signup" className="navButton leftButton">Signup</Link>
            <Link to="/login" className="navButton rightButton">Login</Link>
          </div>
        )
        break;
      case "login":
        return (
          <div>
            <Link to="/signup">Signup</Link>
            <Link to="/login">Login</Link>
          </div>
        )
        break;
      default: 
      return (
        <div>
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </div>
      )      
    }
  }


  return (
    <div>
      <div className="titleContainer">
        <h1 className="appTitle">Net Worth</h1>
      </div>

      {buttonSwitch(page)}
      
    </div>
  )
}