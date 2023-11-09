import { useEffect, useState } from "react";
import { GiConfirmed } from "react-icons/gi";
import SectionTitile from "../../../components/sectionTitle/SectionTitile";

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/bookings")
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        // console.log(data);
      });
  }, []);
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
          {/* TODO: have to retrieve booking data from banckend */}
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
                  <button className="btn btn-outline btn-xs">Pendding</button>
                </td>
                <td>
                  <button className="btn btn-outline">
                    <GiConfirmed style={{ color: "greenyellow" }} />
                  </button>
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
