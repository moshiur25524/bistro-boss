import { Helmet } from "react-helmet-async";
import SectionTitile from "../../../components/sectionTitle/SectionTitile";
import useMenu from "../../../hooks/useMenu";
import { FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import { BiEdit } from "react-icons/bi";
import { Link } from "react-router-dom";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";
// import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManageItems = () => {
  const [menu, , refetch] = useMenu();
  const [itemOffset, setItemOffset] = useState(0);
  // const [axiosSecure] = useAxiosSecure();
  const itemsPerPage = 5;
  const endOffset = itemOffset + itemsPerPage;
  // const [axiosSecure] = useAxiosSecure();

  const menuItems = menu.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(menu.length / itemsPerPage);

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
        fetch(`http://localhost:5000/menu/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire("Deleted!", "success");
            }
          });
      }
      // if (result.isConfirmed) {
      //   const url = `/menu/${item._id}`;
      //   axiosSecure.delete(url).then((res) => {
      //     console.log(url);
      //     if (res.data?.deletedCount > 0) {
      //       refetch();
      //       Swal.fire("Deleted!", `${item.name} has been deleted`, "success");
      //     }
      //     console.log("delted res", res.data);
      //   });
      // }
      // fetch(`http://localhost:5000/menu/${item._id}`, {
      //   method: "DELETE",
      // })
      //   .then((res) => res.json())
      //   .then((data) => {
      //     console.log(data);
      //     if (data.deletedCount > 0) {
      //       refetch();
      //       Swal.fire("Deleted!", `${item.name} has been deleted`, "success");
      //     }
      //   });
    });
  };
  // console.log(item)
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % menu.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
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
              <th>Item</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Update</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {menuItems.map((item) => (
              <tr key={item._id}>
                <td>
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={item.image} alt={item.name} />
                    </div>
                  </div>
                </td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td>
                  <Link to={`/dashboard/update-item/${item._id}`}>
                    <button className="btn btn-ghost btn-md bg-[#D1A054] text-white">
                      <BiEdit style={{ fontSize: "18px" }} />
                    </button>
                  </Link>
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
        <div className="w-full mx-auto">
          <ReactPaginate
            breakLabel="..."
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel="< previous"
            renderOnZeroPageCount={null}
            containerClassName="join flex justify-center mt-8"
            pageClassName="join-item btn mr-3"
            previousClassName="join-item btn mr-2"
            nextClassName="join-item btn"
            breakClassName="join-item btn"
            activeClassName="btn-active bg-[#D1A054]  text-white"
          />
        </div>
      </div>
    </div>
  );
};

export default ManageItems;
