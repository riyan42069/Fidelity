import "./theme.scss";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react"; // Import Auth0 hook
import SignIn from "./pages/signIn";
import Register from "./pages/register";
import NotFound from "./pages/404";
import Budget from "./pages/budget";

function ProtectedRoute({ element, redirectTo = "/signIn" }) {
  const { isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? element : <Navigate to={redirectTo} />;
}

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/signIn" element={<SignIn />} />
          <Route path="/register" element={<Register />} />

          {/* Protected route for Budget page */}
          <Route path="/" element={<ProtectedRoute element={<Budget />} />} />

          {/* 404 Not Found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
