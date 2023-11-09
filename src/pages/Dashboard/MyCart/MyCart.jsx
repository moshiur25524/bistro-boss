import useCart from "../../../hooks/useCart";
import SectionTitile from "../../../components/sectionTitle/SectionTitile";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [cart, refetch] = useCart();
  const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure you want to Delete?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: " delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "success");
            }
          });
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Cart</title>
      </Helmet>
      <SectionTitile subHeading={"My Cart"} heading={"wanna add more?"} />
      {cart.length === 0 ? (
        <>
          <p className="text-red-500 text-center text-2xl font-bold">
            Cart is Empty
          </p>
          <p className="text-orange-500 text-center text-2xl font-bold">
            Order Food Please !
          </p>
        </>
      ) : (
        <div className="bg-white p-5">
          <div className="flex justify-between uppercase font-semibold font-[Cinzel] mb-5">
            <h3 className="text-3xl">Total Item: {cart.length}</h3>
            <h3 className="text-3xl">Total Price: $ {totalPrice}</h3>
            <Link to="/dashboard/payment">
              <button className="btn btn-warning btn-sm bg-[#D1A054] border-0">
                Pay
              </button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table ">
              {/* head */}
              <thead className="bg-[#D1A054] rounded-[12px] text-white uppercase ">
                <tr>
                  <th>#</th>
                  <th>item image</th>
                  <th>item name</th>
                  <th>price</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                    </td>

                    <td>{item.name}</td>
                    <td>$ {item.price}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(item)}
                        className="btn btn-ghost btn-md bg-red-600 text-white"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default MyCart;
