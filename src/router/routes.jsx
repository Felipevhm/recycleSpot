import { createBrowserRouter } from "react-router-dom";
import App from "./../App"
import RegisterUser from "../pages/RegisterUser";
import Dashboard from "../pages/Dashboard";
import RegisterCollectPoint from "../pages/RegisterCollectPoint";
import ListCollectPoints from "../pages/ListCollectPoints";

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
        path: "/list-collect-points",
        element: <ListCollectPoints />,
      },]
  },
]);

export default routes
