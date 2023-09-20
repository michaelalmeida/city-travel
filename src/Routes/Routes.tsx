import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Route} from "../Constants/Routes";
import {Home} from "../Screens/Home";

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: Route.HOME,
      element: <Home />,
    },
  ]);

  return <RouterProvider router={router} />;
};
