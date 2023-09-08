import { AiOutlineShoppingCart } from "react-icons/ai";
import { FaWallet, FaHome, FaCalendarAlt } from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
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
            <Link>
              <FaHome /> User Home
            </Link>
          </li>
          <li>
            <Link>
              <FaCalendarAlt /> Reservation
            </Link>
          </li>
          <li>
            <Link to="/dashboard/mycart">
              <AiOutlineShoppingCart /> My Cart
            </Link>
          </li>
          <li>
            <Link>
              <FaWallet /> Payment History
            </Link>
          </li>
          <div className="divider"></div>
          <li>
            <Link to={"/"}>
              <FaHome />
              Home
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
