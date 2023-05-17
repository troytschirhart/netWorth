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
      case "signup":
        return (
          <div className="navContainer">
            <Link to="/front" className="navButton leftButton">Front</Link>
            <Link to="/login" className="navButton rightButton">Login</Link>
          </div>
        )
      case "login":
        return (
          <div className="navContainer">
            <Link to="/signup" className="navButton leftButton">Front</Link>
            <Link to="/login" className="navButton rightButton">Login</Link>
          </div>
        )
      default: 
      return (
        <div className="navContainer">
          <Link to="/signup" className="navButton leftButton">Signup</Link>
          <Link to="/login" className="navButton rightButton">Login</Link>
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