import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/Home/Home";
import Menu from "../pages/Menu/Menu";
import Order from "../pages/Order/Order";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import PrivateRoute from "./PrivateRoute";
import Secret from "../pages/Shared/Secret";
import Dashboard from "../layout/Dashboard";
import MyCart from "../pages/Dashboard/MyCart/MyCart";
import NotFoundPage from "../pages/Shared/NotFoundPage";
import AllUsers from "../pages/Dashboard/AllUsers/AllUsers";
import Review from "../pages/Dashboard/Review/Review";
import ManageItems from "../pages/Dashboard/ManageItems/ManageItems";
import ManageBookings from "../pages/Dashboard/ManageBooking/ManageBookings";
import AddItem from "../pages/Dashboard/AddItem/AddItem";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";
import AdminRoutes from "./AdminRoutes";
import Payment from "../pages/Dashboard/Payment/Payment";
import MyBooking from "../pages/Dashboard/MyBooking/MyBooking";
import Reservation from "../pages/Dashboard/Reservation/Reservation";
import UserHome from "../pages/Dashboard/UserHome/UserHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "menu",
        element: <Menu />,
      },
      {
        path: "order/:category",
        element: <Order />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "secret",
        element: (
          <PrivateRoute>
            <Secret />
          </PrivateRoute>
        ),
      },
    ],
  },

  // DASHBOARD ROUTES

  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      {
        path: "mycart",
        element: <MyCart />,
      },
      {
        path: "review",
        element: <Review />,
      },
      {
        path: "payment",
        element: <Payment />,
      },
      // admin routes
      {
        path: "admin-home",
        element: <AdminHome />,
      },
      {
        path: "allusers",
        element: (
          <AdminRoutes>
            <AllUsers />
          </AdminRoutes>
        ),
      },
      {
        path: "manage-item",
        element: (
          <AdminRoutes>
            <ManageItems />
          </AdminRoutes>
        ),
      },
      {
        path: "manage-booking",
        element: <ManageBookings />,
      },
      {
        path: "user-home",
        element: <UserHome />,
      },
      {
        path: "booking",
        element: <MyBooking />,
      },
      {
        path: "reservation",
        element: <Reservation />,
      },
      {
        path: "add-item",
        element: (
          <AdminRoutes>
            <AddItem />
          </AdminRoutes>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
