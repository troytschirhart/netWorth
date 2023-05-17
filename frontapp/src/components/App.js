// import functionality
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

// import styles
import "../styles/style.css";

// import components
import StocksPage from "../pages/StocksPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import LogoutPage from "../pages/LogoutPage";
import FrontPage from "../pages/FrontPage";

function App() {

  return (
    <div className="pageBackground">
      <BrowserRouter>
        {/* <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul> */}

        <Routes>
          <Route path="/front" index element={<FrontPage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/logout" element={<LogoutPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
