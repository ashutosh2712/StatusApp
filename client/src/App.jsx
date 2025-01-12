import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Organizations from "./pages/Organizations";
import Services from "./pages/Services";
import Incidents from "./pages/Incidents";
import Maintenance from "./pages/Maintenance";
import StatusPage from "./pages/StatusPage";
import Teams from "./pages/Teams";
import DashboardHome from "./pages/DashboardHome";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/status-page",
        element: <StatusPage />, // Add the Status Page route
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Register />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        children: [
          {
            index: true,
            element: <DashboardHome />,
          },
          {
            path: "organizations", // Nested route under /dashboard
            element: <Organizations />,
          },
          {
            path: "services", // Nested route under /dashboard
            element: <Services />,
          },
          {
            path: "incidents", // Nested route under /dashboard
            element: <Incidents />,
          },
          {
            path: "maintenances", // Nested route under /dashboard
            element: <Maintenance />,
          },
          {
            path: "teams", // Nested route under /dashboard
            element: <Teams />,
          },
        ],
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
