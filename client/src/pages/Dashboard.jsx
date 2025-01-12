import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import React, { useEffect } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);

  const handleLogout = () => {
    logout(); // Call logout from AuthContext
    navigate("/login"); // Navigate to login after logout
  };
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 font-bold text-lg">StatusApp Dashboard</div>
        <nav className="flex-1">
          <ul>
            <li className="p-4">
              <NavLink
                to="/dashboard/organizations"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded ${
                    isActive
                      ? "bg-gray-700 text-white"
                      : "text-gray-400 hover:bg-gray-700"
                  }`
                }
              >
                Organizations
              </NavLink>
            </li>
            <li className="p-4">
              <NavLink
                to="/dashboard/services"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded ${
                    isActive
                      ? "bg-gray-700 text-white"
                      : "text-gray-400 hover:bg-gray-700"
                  }`
                }
              >
                Services
              </NavLink>
            </li>
            <li className="p-4">
              <NavLink
                to="/dashboard/incidents"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded ${
                    isActive
                      ? "bg-gray-700 text-white"
                      : "text-gray-400 hover:bg-gray-700"
                  }`
                }
              >
                Incidents
              </NavLink>
            </li>
            <li className="p-4">
              <NavLink
                to="/dashboard/maintenances"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded ${
                    isActive
                      ? "bg-gray-700 text-white"
                      : "text-gray-400 hover:bg-gray-700"
                  }`
                }
              >
                Maintenances
              </NavLink>
            </li>
            <li className="p-4">
              <NavLink
                to="/dashboard/teams"
                className={({ isActive }) =>
                  `block px-4 py-2 rounded ${
                    isActive
                      ? "bg-gray-700 text-white"
                      : "text-gray-400 hover:bg-gray-700"
                  }`
                }
              >
                Teams
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Button onClick={handleLogout} className="bg-gray-800 text-white">
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet /> {/* Render nested routes here */}
      </main>
    </div>
  );
};

export default Dashboard;
