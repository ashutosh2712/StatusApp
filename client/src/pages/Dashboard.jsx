import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is authenticated
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login"); // Redirect to login if not authenticated
    }
  }, [navigate]);
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 font-bold text-lg">StatusApp Dashboard</div>
        <nav className="flex-1">
          <ul>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/dashboard/services">Services</Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/dashboard/teams">Teams</Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/dashboard/incidents">Incidents</Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/dashboard/maintenances">Maintenances</Link>
            </li>
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-700">
          <Link to="/logout" className="text-red-500">
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
    </div>
  );
};

export default Dashboard;
