import { Helmet } from "react-helmet-async";
import SectionTitile from "../../../components/sectionTitle/SectionTitile";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";

const MyBooking = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/booking?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
      });
  }, [user]);
  // const [cart, refetch] = useCart();
  // const totalPrice = cart.reduce((sum, item) => item.price + sum, 0);
  // TODO: have to delete a booking
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
        fetch(`http://localhost:5000/booking/${item?._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              // refetch();
              Swal.fire("Deleted!", "success");
            }
          });
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Bookings</title>
      </Helmet>
      <SectionTitile
        subHeading={"Excellent Ambience"}
        heading={"my bookings"}
      />
      {bookings.length === 0 ? (
        <>
          <p className="text-red-500 text-center text-2xl font-bold">
            No Booking
          </p>
          <p className="text-orange-500 text-center text-2xl font-bold">
            Booking Please !
          </p>
        </>
      ) : (
        <div className="bg-white p-5">
          <div className="flex justify-between uppercase font-semibold font-[Cinzel] mb-5">
            <h3 className="text-3xl">Total Bookings: {bookings.length}</h3>
            {/* <h3 className="text-3xl">Total Price: $ {totalPrice}</h3> */}
            <Link to="/dashboard/payment">
              <button className="btn btn-warning btn-sm bg-[#D1A054] border-0">
                Pay
              </button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="table ">
              <thead className="bg-[#D1A054] rounded-[12px] text-white uppercase ">
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Price</th>
                  <th>Guest</th>
                  <th>action</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((item, index) => (
                  <tr key={item._id}>
                    <td>{index + 1}</td>
                    {/* <td>
                      <div className="avatar">
                        <div className="mask mask-squircle w-12 h-12">
                          <img src={item.image} alt={item.name} />
                        </div>
                      </div>
                    </td> */}

                    <td>{item.date}</td>
                    <td>{item.time}</td>
                    <td>${parseInt(item.guest) * 14}</td>
                    <td>{item.guest}</td>
                    {/* <td>$ {item.price}</td> */}
                    <td>
                      <button
                        onClick={() => handleDelete(item?._id)}
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

export default MyBooking;
