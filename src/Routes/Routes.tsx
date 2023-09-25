import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Route} from "../Constants/Routes";
import {Home} from "../Screens/Home";
import {Result} from "../Screens/Result";

export const Routes = () => {
  const router = createBrowserRouter([
    {
      path: Route.HOME,
      element: <Home />,
    },
    {
      path: Route.RESULT,
      element: <Result />,
    },
  ]);

  return <RouterProvider router={router} />;
};
