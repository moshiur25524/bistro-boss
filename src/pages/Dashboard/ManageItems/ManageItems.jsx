import { Helmet } from "react-helmet-async";
import SectionTitile from "../../../components/sectionTitle/SectionTitile";
import useMenu from "../../../hooks/useMenu";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  // const [axiosSecure] = useAxiosSecure();

  const handleItemDelete = (item) => {
    Swal.fire({
      title: `Are you want to Delete ${item.name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        // const url = `/menu/${item._id}`;
        // axiosSecure.delete(url).then((res) => {
        //   console.log(url);
        //   console.log("delted res", res.data);
        fetch(`http://localhost:5000/menu/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", `${item.name} has been deleted`, "success");
            }
          });
      }
      console.log(item);
    });
  };
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Manage Items</title>
      </Helmet>
      <SectionTitile subHeading={"Hurry Up"} heading={"Manage all items"} />
      <div className="overflow-x-auto">
        <h1 className="text-center text-3xl uppercase font-semibold font-[Cinzel] mb-5">
          Total Item: {menu.length}
        </h1>
        <table className="table">
          {/* head */}
          <thead className=" bg-[#D1A054] rounded-[12px] text-white uppercase sticky top-0">
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
        {/* TODO: Have to implement pagination for menuItems */}
        {/* <PaginatedItems itemsPerPage={20} /> */}
      </div>
    </div>
  );
};

export default ManageItems;
