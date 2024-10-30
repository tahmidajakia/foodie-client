import { FaTrashAlt } from "react-icons/fa";
import useCart from "../../hooks/useCart";
import Swal from "sweetalert2";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { Link } from "react-router-dom";
import axios from "axios";

const CartPage = () => {
  const { user } = useContext(AuthContext);
  const [cart, refetch] = useCart();
  const [cartItems, setCartItems] = useState(cart || []);

  useEffect(() => {
    setCartItems(cart || []);
  }, [cart]);

  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  const handleDecrease = async (item) => {
    if (item.quantity > 1) {
      try {
        const response = await fetch(`https://demo-foodie-server.vercel.app/carts/${item._id}`, {
          method: "PUT",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify({ quantity: item.quantity - 1 }),
        });

        if (response.ok) {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem._id === item._id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });
          await refetch();
          setCartItems(updatedCart);
        } else {
          console.error("Failed to update quantity");
        }
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Item quantity cannot be less than 1!",
      });
    }
  };

  const handleIncrease = async (item) => {
    try {
      const response = await fetch(`https://demo-foodie-server.vercel.app/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity + 1 }),
      });

      if (response.ok) {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem._id === item._id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });
        await refetch();
        setCartItems(updatedCart);
      } else {
        console.error("Failed to update quantity");
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const cartSubTotal = Array.isArray(cart)
    ? cart.reduce((total, item) => total + calculatePrice(item), 0)
    : 0;

  const orderTotal = cartSubTotal;

  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`https://demo-foodie-server.vercel.app/carts/${item._id}`)
          .then((response) => {
            if (response) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your item has been deleted.",
                icon: "success",
              });
            } else {
              Swal.fire({
                title: "Error!",
                text: "Failed to delete the item.",
                icon: "error",
              });
            }
          })
          .catch((error) => {
            console.error("Error deleting item:", error);
            Swal.fire({
              title: "Error!",
              text: "An error occurred while deleting the item.",
              icon: "error",
            });
          });
      }
    });
  };

  return (
    <div className="section-container px-4 md:px-8">
      {cart.length > 0 ? (
        <div>
          <div className="bg-gradient-to-tr from-[#FAFAFA] to-[#FCFCFC]">
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <h2 className="text-3xl md:text-5xl font-bold leading-snug">
                Items Added To The <span className="text-green">Cart</span>
              </h2>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead className="bg-green text-white">
                <tr>
                  <th>#</th>
                  <th>Food</th>
                  <th>Item Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="flex items-center gap-3">
                        <div className="avatar">
                          <div className="mask mask-squircle h-12 w-12">
                            <img src={item.image} alt="Cart item" />
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="font-medium">{item.name}</td>
                    <td className="p-2 flex items-center gap-2 justify-center">
                      <button onClick={() => handleDecrease(item)} className="btn btn-xs">
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button onClick={() => handleIncrease(item)} className="btn btn-xs">
                        +
                      </button>
                    </td>
                    <td>${calculatePrice(item).toFixed(2)}</td>
                    <th>
                      <button onClick={() => handleDelete(item)} className="btn btn-ghost text-red">
                        <FaTrashAlt />
                      </button>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="my-10 flex flex-col md:flex-row justify-between gap-6">
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium">Customer Details</h3>
              <p>Name : {user?.displayName}</p>
              <p>Email : {user?.email}</p>
              <p>User ID : {user?.uid}</p>
            </div>
            <div className="md:w-1/2 space-y-3">
              <h3 className="font-medium">Shopping Details</h3>
              <p>Total Items : {cart.length}</p>
              <p>Total Price : ${orderTotal.toFixed(2)}</p>
              <Link to="/process-checkout">
                <button className="btn bg-green mt-5 text-white w-full md:w-auto">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <p className="text-3xl md:text-4xl font-semibold pt-40">Cart is Empty</p>
          <Link to="/menu">
            <button className="btn bg-green text-white mt-3">
              Back To Menu
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
