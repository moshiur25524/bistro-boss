import { useEffect, useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import SectionTitile from "../../../components/sectionTitle/SectionTitile";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);
  // const [active, setActive] = useState(false);

  useEffect(() => {
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => {
        const enhancedData = data.map((booking) => ({
          ...booking,
          active: false, // Initialize 'active' property as false for each booking
        }));
        setBookings(enhancedData);
        // console.log(data);
      });
  }, []);

  const handleActive = (id) => {
    setBookings((prevBookings) =>
      prevBookings.map((booking) =>
        booking._id === id ? { ...booking, active: !booking.active } : booking
      )
    );
  };
  return (
    <div>
      <SectionTitile subHeading={"at a glance"} heading={"manage bookings"} />
      <div className="overflow-x-auto">
        <h1 className="text-center text-3xl uppercase font-semibold font-[Cinzel] mb-5">
          Total Item: {bookings.length}
        </h1>
        <table className="table">
          {/* head */}
          <thead className=" bg-[#D1A054] rounded-[12px] text-white uppercase sticky top-0">
            <tr>
              <th>#</th>
              <th>User Email</th>
              <th>phone number</th>
              <th>Booking date</th>
              <th>booking time</th>
              <th>activity</th>
              <th>action</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((book, index) => (
              <tr key={book?._id}>
                <td>{index + 1}</td>
                <td>{book?.email}</td>
                <td>{book?.phone}</td>
                <td>{book?.date}</td>
                <td>{book?.time}</td>
                {/* TODO: Task on action and activity is  incomplete */}
                <td>
                  {typeof book.active !== "undefined" && book.active ? (
                    <button className="btn btn-outline text-[#287855] btn-xs">
                      Done
                    </button>
                  ) : (
                    <button className="btn btn-outline text-[#AE7B2B] btn-xs">
                      Pending
                    </button>
                  )}
                </td>
                <td>
                  {typeof book.active !== "undefined" && book.active ? (
                    <button
                      className={`btn btn-outline bg-green-400 rounded-full`}
                    >
                      <GiConfirmed
                        style={{ color: "green", fontSize: "25px" }}
                      />
                    </button>
                  ) : (
                    <button
                      onClick={() => handleActive(book._id)}
                      className={`btn btn-outline hover:bg-green-300 rounded-full`}
                    >
                      <GiConfirmed
                        style={{ color: "green", fontSize: "25px" }}
                      />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* TODO: Have to implement pagination for bookings */}
        {/* <PaginatedItems itemsPerPage={20} /> */}
      </div>
    </div>
  );
};

export default ManageBookings;
