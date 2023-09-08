import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import Navbar from "../pages/Shared/Navbar";

const Main = () => {
  const location = useLocation();
  // console.log(location);
  const NoHeaderFooter =
    location.pathname.includes("/login") ||
    location.pathname.includes("/signup");
  return (
    <div className="max-w-screen-xl mx-auto">
      {NoHeaderFooter || <Navbar />}
      <Outlet></Outlet>
      {NoHeaderFooter || <Footer />}
    </div>
  );
};

export default Main;
