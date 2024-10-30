import logo from "/logo.png";
import { Link, Outlet } from "react-router-dom";
import { MdOutlineDashboardCustomize } from "react-icons/md";
import {
  FaEdit,
  FaHome,
  FaLocationArrow,
  FaPlusCircle,
  FaQuestionCircle,
  FaRegUser,
  FaShoppingBag,
  FaUsers,
} from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";

const sharedMenu = (
  <>
    <li className="mt-3">
      <Link to="/">
        <FaHome />
        Home
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaCartShopping />
        Menu
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaLocationArrow />
        Orders Tracking
      </Link>
    </li>
    <li>
      <Link to="/menu">
        <FaQuestionCircle />
        Customer Support
      </Link>
    </li>
  </>
);

const DashboardLayout = () => {
  const { loading, user } = useAuth();
  const [isAdmin, isAdminLoading] = useAdmin();

  if (loading || isAdminLoading) {
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    return (
      <div className="h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl mb-4">You are not an admin.</h2>
        <Link to="/" className="btn btn-primary">
          Go Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="drawer sm:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col sm:items-start sm:justify-start my-2">
        <div className="flex items-center justify-between mx-4">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-primary drawer-button sm:hidden"
          >
            <MdOutlineDashboardCustomize />
          </label>
          <button className="btn flex items-center gap-2 rounded-full px-6 bg-green text-white sm:hidden">
            <FaRegUser /> Logout
          </button>
        </div>
        <div className="mt-5 md:mt-2 mx-4">
          <Outlet />
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li>
            <Link to="/dashboard" className="flex justify-start mb-3">
              <img src={logo} alt="" className="w-20" />
              <span className="indicator-item badge badge-primary">Admin</span>
            </Link>
          </li>
          <hr />
          <li>
            <Link to="/dashboard/manageBookings">
              <FaShoppingBag /> Manage Bookings
            </Link>
          </li>
          <li>
            <Link to="/dashboard/add-menu">
              <FaPlusCircle /> Add Menu
            </Link>
          </li>
          <li>
            <Link to="/dashboard/manageItems">
              <FaEdit /> Manage Items
            </Link>
          </li>
          <li className="mb-3">
            <Link to="/dashboard/users">
              <FaUsers /> Users
            </Link>
          </li>
          <hr />
          {sharedMenu}
        </ul>
      </div>
    </div>
  );
};

export default DashboardLayout;
