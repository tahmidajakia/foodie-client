import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import SignUp from "../components/SignUp";
import PrivateRouter from "../PrivateRouter/PrivateRouter";
import UpdateProfile from "../pages/dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";
import DashboardLayout from "../layout/DashboardLayout";
import Dashboard from "../pages/dashboard/admin/Dashboard";
import Users from "../pages/dashboard/admin/Users";
import Login from "../components/Login";
import Modal from "../components/Modal";
import AddMenu from "../pages/dashboard/admin/AddMenu";
import ManageItem from "../pages/dashboard/admin/ManageItem";
import UpdateMenu from "../pages/dashboard/admin/UpdateMenu";
import Payment from "../pages/shop/Payment";
import Order from "../pages/dashboard/Order";
import ManageBookings from "../pages/dashboard/admin/ManageBookings"


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
          element:
            <Menu></Menu>
        },
        {
          path:'/updateProfile',
          element : <UpdateProfile></UpdateProfile>
        },
        {
          path:'/cartPage',
          element: <CartPage></CartPage>
        },
        {
          path: "/process-checkout",
          element: <Payment></Payment>
        },
        {
          path: '/order',
          element: <PrivateRouter><Order/></PrivateRouter>
        }
      ]
    },
    {
      path: '/signup',
      element: <SignUp></SignUp>
    },
    {
      path: "/login",
      element: <Login></Login>
    },
    // admin routes
    {
      path: 'dashboard',
      element: <PrivateRouter>
        <DashboardLayout></DashboardLayout>
      </PrivateRouter>,
      children: [
        {
          path: "",
          element: <Dashboard></Dashboard>
        },
        {
          path: 'manageBookings',
          element: <ManageBookings></ManageBookings>
        },
        {
          path: 'manageItems',
          element: <ManageItem></ManageItem>
        },
        {
          path: 'users',
          element: <Users></Users>
        },
        {
          path: 'add-menu',
          element: <AddMenu></AddMenu>
        },
        {
          path: 'manage-item',
          element: <ManageItem></ManageItem>
        },
        {
          path: 'update-menu/:id',
          element: <UpdateMenu></UpdateMenu>,
          loader: ({params}) => fetch(`http://localhost:5000/menu/${params.id}`)
        }
        
      ]
    }
  ]);

  export default router;
  