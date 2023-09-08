import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaWallet, FaHome, FaCalendarAlt, FaShopify } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import { BiSolidContact } from "react-icons/bi";

const Dashboard = () => {
  const [cart] = useCart();
  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div
        style={{ backgroundColor: "#F6F6F6" }}
        className="drawer-content p-5"
      >
        <Outlet />
        {/* Page content here */}
        <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label>
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-[#D1A054] text-base-content font-semibold">
          {/* Sidebar content here */}
          <li>
            <NavLink to={"/dashboard/home"}>
              <FaHome /> User Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/reservation"}>
              <FaCalendarAlt /> Reservation
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/mycart">
              <AiOutlineShoppingCart /> My Cart
              <span className="badge badge-secondary">
                +{cart?.length || 0}{" "}
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink to={"/dashboard/payment"}>
              <FaWallet /> Payment History
            </NavLink>
          </li>
          <div className="divider"></div>
          <li>
            <NavLink to={"/"}>
              <FaHome />
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to={"/menu"}>
              <IoMdMenu />
              Menu
            </NavLink>
          </li>
          <li>
            <NavLink to={"/"}>
              <FaShopify />
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to={"/"}>
              <BiSolidContact />
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
