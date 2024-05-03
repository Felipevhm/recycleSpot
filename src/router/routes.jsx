import { createBrowserRouter } from "react-router-dom";
import App from "./../App"
import RegisterUser from "../pages/RegisterUser";
import Dashboard from "../pages/Dashboard";
import RegisterCollectPoint from "../pages/RegisterCollectPoint";
import ListCollectPoint from "../pages/ListCollectPoint";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
      {
       path: "/",
       element: <RegisterUser />,
     },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/register-collect-point",
        element: <RegisterCollectPoint />,
      },
      {
        path: "/list-collect-point",
        element: <ListCollectPoint />,
      },]
  },
]);

export default routes
