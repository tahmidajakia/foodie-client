import { useContext, useEffect, useState } from "react";
import logo from "/logo.png"; // Ensure the logo path is correct
import { LuPhoneCall } from "react-icons/lu";
import { FaRegUser } from "react-icons/fa";
import Modal from "./Modal";
import useAuth from '../hooks/useAuth';
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";

const Navbar = () => {
  const { user, loading } = useAuth();
  const [cart, refetch] = useCart();
  const [isSticky, setSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setSticky(offset > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItem = (
    <>
      <li><a href="/" className="text-green">Home</a></li>
      <li tabIndex={0}>
        <details>
          <summary>Menu</summary>
          <ul className="p-2">
            <li><a href="/menu">All</a></li>
            <li><a>Salad</a></li>
            <li><a>Pizza</a></li>
          </ul>
        </details>
      </li>
      <li tabIndex={0}>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li><a>Online Order</a></li>
            <li><a>Table Booking</a></li>
            <li><a>Order Tracking</a></li>
          </ul>
        </details>
      </li>
      <li><a>Offers</a></li>
    </>
  );

  return (
    <div className={`bg-gradient-to-tr from-[#FAFAFA] to-[#FCFCFC] ${isSticky ? 'shadow-md' : ''}`}>
      <div className={`max-w-screen-2xl container mx-auto fixed top-0 left-0 right-0 z-50 ${isSticky ? "bg-white" : "bg-transparent"} transition-all duration-300`}>
        <div className="navbar xl:px-24">
          <div className="navbar-start">
            <div className="dropdown">
              <button tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </button>
              <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                {navItem}
              </ul>
            </div>
            <a href="/"><img src={logo} alt="Logo" className="h-8" /></a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItem}</ul>
          </div>
          <div className="navbar-end flex items-center">
            <button className="btn hidden lg:flex btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
            <Link to="cartPage">
              <button tabIndex={0} role="button" className="btn btn-ghost btn-circle flex items-center justify-center mr-5">
                <div className="indicator">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                  <span className="badge badge-sm indicator-item">{cart.length || 0}</span>
                </div>
              </button>
            </Link>
            {user ? (
              <Profile user={user}></Profile>
            ) : (
              <button onClick={() => document.getElementById("my_modal_5").showModal()} className="btn bg-green rounded-full px-4 text-white flex items-center gap-2 ">
                <FaRegUser /> Login
              </button>
            )}
            <Modal></Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
