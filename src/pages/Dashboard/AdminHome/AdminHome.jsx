import { Helmet } from "react-helmet-async";
import { TfiWallet } from "react-icons/tfi";
import { LuChefHat } from "react-icons/lu";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminHome = () => {
  const { user } = useAuth();

  const [axiosSecure] = useAxiosSecure();

  const { data: stats = {} } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const res = await axiosSecure("/admin-stats");
      return res.data;
    },
  });

  console.log(stats);
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Admin Home</title>
      </Helmet>
      <h1 className="text-3xl text-[#151515] font-[Cinzel] uppercase font-semibold">
        Hi, welcome back{" "}
        <span className="text-orange-500">{user?.displayName}</span>
      </h1>
      <div className="grid md:grid-cols-4">
        <div className="flex justify-center items-center bg-gradient-to-r from-[#BB34F5] from-0% to-[#FCDBFF] to-100% h-24 m-6 rounded-sm text-white">
          <div>
            <TfiWallet />
          </div>
          <div>
            <p>{stats.revenue}</p>
            <p>revenue</p>
          </div>
        </div>
        <div className="flex justify-center items-center bg-gradient-to-r from-[#D3A256] from-0% to-[#FDE8C0] to-100% h-24 m-6 rounded-sm text-white">
          <div>
            <TfiWallet />
          </div>
          <div>
            <p>{stats.users}</p>
            <p>Customers</p>
          </div>
        </div>
        <div className="flex justify-center items-center bg-gradient-to-r from-[#BB34F5] from-0% to-[#FCDBFF] to-100% h-24 m-6 rounded-sm text-white">
          <div>
            <LuChefHat />
          </div>
          <div>
            <p>{stats.products}</p>
            <p>Products</p>
          </div>
        </div>
        <div className="flex justify-center items-center bg-gradient-to-r from-[#BB34F5] from-0% to-[#FCDBFF] to-100% h-24 m-6 rounded-sm text-white">
          <div>
            <TfiWallet />
          </div>
          <div>
            <p>{stats.orders}</p>
            <p>Orders</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
