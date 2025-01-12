import { Link, useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { useAuth } from "@/context/AuthContext";
const Navbar = () => {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate("/login"); // Navigate to login after logout
  };

  return (
    <header className="bg-white shadow">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/">
          <h1 className="text-2xl font-bold text-gray-800">StatusApp</h1>
        </Link>
        <nav className="space-x-4">
          {/* <a href="#features" className="text-gray-600 hover:text-gray-900">
            Features
          </a> */}
          <Link to="/status-page" className="text-gray-600 hover:text-gray-900">
            Status
          </Link>
          <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
            Dashboard
          </Link>
          {user ? (
            <>
              <span className="text-gray-600">Hello, {user}</span>
              <Button onClick={handleLogout} className="bg-red-500 text-white">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-gray-600 hover:text-gray-900">
                Login
              </Link>
              <Link to="/signup">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
