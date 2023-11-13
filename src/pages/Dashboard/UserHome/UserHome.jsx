import { FaCalendarAlt, FaPhoneAlt, FaWallet } from "react-icons/fa";
import { BiSolidCart } from "react-icons/bi";
import { AiTwotoneStar } from "react-icons/ai";
import { BsShopWindow } from "react-icons/bs";
import useAuth from "../../../hooks/useAuth";
import { Helmet } from "react-helmet-async";
// import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const UserHome = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/home-stats?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
      });
  }, []);

  // const { data: stats = {} } = useQuery({
  //   queryKey: ["home-stats", user?.email],
  //   queryFn: async () => {
  //     const res = await fetch(
  //       `http://localhost:5000/home-stats?email=${user?.email}`
  //     );
  //     return res.data;
  //   },
  // });

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | User-home</title>
      </Helmet>
      <h1 className="text-3xl font-semibold font-[Cinzel]">
        Hi, Welcome Back{" "}
        <span className="text-[#835D23]">{user?.displayName}</span>
      </h1>

      <div className="flex flex-col md:flex-row justify-center shadow mt-10 w-full">
        <div className="stat bg-gradient-to-r text-white from-[#BB34F5] to-[#f5c7f9]">
          <div className="stat-figure ">
            <FaWallet style={{ fontSize: "30px" }} />
          </div>
          <div className=" ">Menu</div>
          <div className="stat-value ">$10</div>
        </div>

        <div className="stat bg-gradient-to-r text-white from-[#835D23] to-[#B58130]">
          <div className="stat-figure ">
            <BsShopWindow style={{ fontSize: "30px" }} />
          </div>
          <div className=" ">Shop</div>
          <div className="stat-value ">10</div>
        </div>
        <div className="stat bg-gradient-to-r text-white from-[#FE4880] to-[#FECDE9]">
          <div className="stat-figure ">
            <FaPhoneAlt style={{ fontSize: "30px" }} />
          </div>
          <div className=" ">Contact</div>
          <div className="stat-value ">{stats.contactCount}</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row mt-8">
        <div className="flex flex-col h-[400px] w-full items-center justify-center border-r-0 md:border-r-2  border-orange-900 bg-[#FFEDD5]">
          <div>
            <img
              src={user?.photoURL}
              className=" w-48 h-48 rounded-full border-2 object-fill border-orange-900"
              width={"198px"}
              height={"198px"}
              alt=""
            />
          </div>
          <h1 className=" uppercase mt-5 text-4xl font-[Cinzel] text-[#151515]">
            {user?.displayName}
          </h1>
        </div>
        <div className="flex h-[400px] w-full items-center justify-center bg-[#e3da6e]">
          <div>
            <h1 className=" text-4xl mb-8 text-[#151515] font-[Cinzel]">
              Your Activities
            </h1>
            <p className="text-xl flex items-center text-blue-500">
              <BiSolidCart style={{ fontSize: "15px", marginRight: "5px" }} />{" "}
              Order: {stats.ordersCount || "Null"}
            </p>
            <p className="text-xl flex items-center text-green-500">
              <AiTwotoneStar style={{ fontSize: "15px", marginRight: "5px" }} />{" "}
              Reviews: {stats.reviewsCount || "Null"}
            </p>
            <p className="text-xl flex items-center text-orange-500">
              <FaCalendarAlt style={{ fontSize: "15px", marginRight: "5px" }} />{" "}
              Bookings: {stats.bookingsCount || "Null"}
            </p>
            <p className="text-xl flex items-center text-red-500">
              <FaWallet style={{ fontSize: "15px", marginRight: "5px" }} />{" "}
              Payment: {stats.paymentsCount || "Null"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;
