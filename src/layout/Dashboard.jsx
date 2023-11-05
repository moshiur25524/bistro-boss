import { AiOutlineShoppingCart } from "react-icons/ai";
import {
  FaWallet,
  FaHome,
  FaCalendarAlt,
  FaShopify,
  FaCalendarCheck,
  FaUtensils,
  FaBook,
  FaUsers,
  FaHamburger,
} from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { MdReviews } from "react-icons/md";
import { TfiMenuAlt } from "react-icons/tfi";
import { NavLink, Outlet } from "react-router-dom";
import useCart from "../hooks/useCart";
import { BiSolidContact } from "react-icons/bi";
import useAdmin from "../hooks/useAdmin";
import Loading from "../pages/Shared/Loading";

const Dashboard = () => {
  const [cart] = useCart();

  // TODO: get the user from backend to check admin
  // let isAdmin = true;
  const [isAdmin, isAdminLaoding] = useAdmin();

  if (isAdminLaoding) {
    return <Loading />;
  }

  // Assuming isAdmin is an object with an 'admin' property
  const isAdminAdmin = isAdmin?.admin;

  return (
    <div className="drawer lg:drawer-open">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div
        style={{ backgroundColor: "#F6F6F6" }}
        className="drawer-content p-5"
      >
        <label
          htmlFor="my-drawer-2"
          className="btn btn-gray-900 drawer-button lg:hidden"
        >
          <FaHamburger />
        </label>
        <Outlet />
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-[#D1A054] text-base-content font-semibold">
          {/* Sidebar content here */}
          {isAdminAdmin ? (
            <>
              <li>
                <NavLink to={"/dashboard/Admin-home"}>
                  <FaHome /> Admin Home
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/add-item"}>
                  <FaUtensils /> Add Items
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/manage-item"}>
                  <TfiMenuAlt /> Manage Items
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/manage-booking"}>
                  <FaBook /> Manage Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/allusers"}>
                  <FaUsers /> All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
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
              <li>
                <NavLink to={"/dashboard/review"}>
                  <MdReviews /> Add Review
                </NavLink>
              </li>
              <li>
                <NavLink to={"/dashboard/booking"}>
                  <FaCalendarCheck /> My Booking
                </NavLink>
              </li>
            </>
          )}
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
