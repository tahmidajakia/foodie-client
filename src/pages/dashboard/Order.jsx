import { useQuery } from "@tanstack/react-query";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";

const Order = () => {
  const { user } = useAuth();
  const token = localStorage.getItem("access-token");
  const { refetch, data: orders = [] } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      const res = await fetch(
        `http://localhost:5000/payments?email=${user?.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      return res.json();
    },
  });

  const formDate = (createdAt) => {
    const createdAtDate = new Date(createdAt)
    return createdAtDate.toLocaleDateString()
  }
  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      <div className="bg-gradient-to-tr from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <div className="py-40 flex flex-col  items-center justify-center gap-8">
          {/* text */}
          <div className=" space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Track All Your <span className="text-green">Orders</span>
            </h2>
          </div>
        </div>

        <div className="section-container">
          {/* cart table */}
          {orders.length > 0 ? (
            <div>
              {/* banner */}
              <div className="bg-gradient-to-tr from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
                <div className="flex flex-col items-center justify-center gap-8">
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="table">
                  {/* head */}
                  <thead className="bg-green text-white">
                    <tr>
                      <th>#</th>
                      <th>Order Date</th>
                      <th>TransitionId</th>
                      <th>Price</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* row 1 */}
                    {orders.map((item, index) => (
                      <tr key={item._id}>
                        <td>{index + 1}</td>
                        <td>
                          {formDate(item.createdAt)}
                        </td>
                        <td className="font-medium">{item.transitionId}</td>
                        <td>
                          ${item.price}
                        </td>
                        <td>{item.status}</td>
                        <th>
                          <Link to='/contact'
                            
                            className="btn btn-ghost text-red"
                          >
                            Contact
                          </Link>
                        </th>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {/* customer details */}
            </div>
          ) : (
            <div className="text-center mt-64">
              <p className="text-4xl font-semibold">Cart is Empty</p>
              <Link to="/menu">
                <button className="btn bg-green text-white mt-3">
                  Back To Menu
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Order;
