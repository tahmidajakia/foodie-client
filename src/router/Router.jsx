import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import SignUp from "../components/SignUp";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main></Main>,
      children :[
        {
            path : '/',
            element : <Home></Home>
        },
        {
          path: '/menu',
          element: <Menu></Menu>
        }
      ]
    },
    {
      path: '/signUp',
      element: <SignUp></SignUp>
    }
  ]);

  export default router;
  