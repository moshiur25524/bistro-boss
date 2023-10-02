import { Helmet } from "react-helmet-async";
import { TfiWallet } from "react-icons/tfi";
import { LuChefHat } from "react-icons/lu";

const AdminHome = () => {
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Admin Home</title>
      </Helmet>
      <h1 className="text-3xl text-[#151515] font-[Cinzel] uppercase font-semibold">
        Hi, welcome back
      </h1>
      <div className="grid md:grid-cols-4">
        <div className="flex justify-center items-center bg-gradient-to-r from-[#BB34F5] from-0% to-[#FCDBFF] to-100% h-24 m-6 rounded-sm text-white">
          <div>
            <TfiWallet />
          </div>
          <div>
            <p>1000</p>
            <p>revenue</p>
          </div>
        </div>
        <div className="flex justify-center items-center bg-gradient-to-r from-[#D3A256] from-0% to-[#FDE8C0] to-100% h-24 m-6 rounded-sm text-white">
          <div>
            <TfiWallet />
          </div>
          <div>
            <p>1500</p>
            <p>Customers</p>
          </div>
        </div>
        <div className="flex justify-center items-center bg-gradient-to-r from-[#BB34F5] from-0% to-[#FCDBFF] to-100% h-24 m-6 rounded-sm text-white">
          <div>
            <LuChefHat />
          </div>
          <div>
            <p>103</p>
            <p>Products</p>
          </div>
        </div>
        <div className="flex justify-center items-center bg-gradient-to-r from-[#BB34F5] from-0% to-[#FCDBFF] to-100% h-24 m-6 rounded-sm text-white">
          <div>
            <TfiWallet />
          </div>
          <div>
            <p>500</p>
            <p>Orders</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminHome;
