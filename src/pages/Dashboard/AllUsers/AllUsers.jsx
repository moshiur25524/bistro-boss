import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import SectionTitile from "../../../components/sectionTitle/SectionTitile";
import { FaTrash, FaUserShield } from "react-icons/fa";
import Swal from "sweetalert2";

const AllUsers = () => {
  const token = localStorage.getItem("access-token");

  const { data: users = [], refetch } = useQuery(["users"], async () => {
    const res = await fetch("http://localhost:5000/users", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    return res.json();
  });

  // Make Admin
  const handleMakeAdmin = (user) => {
    fetch(`http://localhost:5000/users/admin/${user._id}`, {
      method: "PATCH",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.modifiedCount) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.name} is admin Now!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  // Delete User
  const handleUserDelete = (user) => {
    Swal.fire({
      title: `Are you sure you want to Delete ${user.name}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: " delete!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/users/${user._id}`, {
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
        <title>Bistro Boss | All Users</title>
      </Helmet>
      <SectionTitile subHeading={"How Many??"} heading={"manage all users"} />
      <div className="bg-white p-5">
        <h3 className="text-3xl uppercase font-semibold font-[Cinzel] mb-5">
          Total users: {users.length}
        </h3>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead className="bg-[#D1A054] rounded-[12px] text-white uppercase ">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.role === "admin" ? (
                      "Admin"
                    ) : (
                      <button
                        onClick={() => handleMakeAdmin(user)}
                        className="btn btn-ghost btn-md bg-orange-600 text-white"
                      >
                        <FaUserShield />
                      </button>
                    )}
                  </td>
                  <td>
                    {" "}
                    <td>
                      <button
                        onClick={() => handleUserDelete(user)}
                        className="btn btn-ghost btn-md bg-red-600 text-white"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AllUsers;
