
import StocksPage from "../pages/StocksPage";
import LoginPage from "../pages/LoginPage";
import RequireAuth from "./RequireAuth";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import SignupPage from "../pages/SignupPage";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signup">Signup</Link>
          </li>
        </ul>

        <Routes>
          <Route index element={<RequireAuth><StocksPage /></RequireAuth>}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
