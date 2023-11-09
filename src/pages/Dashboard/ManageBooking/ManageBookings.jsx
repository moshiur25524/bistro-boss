import SectionTitile from "../../../components/sectionTitle/SectionTitile";

const ManageBookings = () => {
  return (
    <div>
      <SectionTitile subHeading={"at a glance"} heading={"manage bookings"} />
      <div className="overflow-x-auto">
        <h1 className="text-center text-3xl uppercase font-semibold font-[Cinzel] mb-5">
          Total Item:
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
          {/* <tbody>
            {menu.map((item, index) => (
              <tr key={item._id}>
                <td>{index + 1}</td>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={item.image}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">details</button>
                </td>
                <td>
                  <button
                    onClick={() => handleItemDelete(item)}
                    className="btn btn-ghost btn-md bg-red-600 text-white"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
        {/* TODO: Have to implement pagination for menuItems */}
        {/* <PaginatedItems itemsPerPage={20} /> */}
      </div>
    </div>
  );
};

export default ManageBookings;
