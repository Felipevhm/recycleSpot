import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./../App";
import RegisterUser from "../pages/RegisterUser";
import Dashboard from "../pages/Dashboard";
import RegisterCollectPoint from "../pages/RegisterCollectPoint";
import ListCollectPoints from "../pages/ListCollectPoints";

import CepSearch from "../components/FormUser/index.jsx";

import FormCollectPoint from "../components/FormCollectPoint";

let isAuthenticated =
  JSON.parse(localStorage.getItem("userAuthentication")) || false;

const PrivateRoute = ({ children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const routes = createBrowserRouter([
  {
    path: "/login",
    element: <RegisterUser />,
  },
  {
  path: "/register-place",
  element: <FormCollectPoint />,
},
  {
    path: "/",
    element: (
      <PrivateRoute>
        <App />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/register-collect-point",
        element: <RegisterCollectPoint />,
      },
      {
        path: "/list-collect-points",
        element: <ListCollectPoints />,
      },


    ],
  },
]);

export default routes;
