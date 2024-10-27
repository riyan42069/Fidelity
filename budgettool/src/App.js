import "./theme.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import SignIn from "./pages/signIn";
import Register from "./pages/register";
import NotFound from "./pages/404";
import Budget from "./pages/budget";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Authentication routes */}
          <Route path="/" element={<Budget />} />
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/register" element={<Register />} />

          {/* 404 Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
