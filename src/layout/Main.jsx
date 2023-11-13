import { Outlet, useLocation } from "react-router-dom";
import Footer from "../pages/Shared/Footer";
import Navbar from "../pages/Shared/Navbar";
import ScrollUpButton from "../components/ScrollUpButton/ScrollUpButton";

const Main = () => {
  const location = useLocation();
  // console.log(location);
  const NoHeaderFooter =
    location.pathname.includes("/login") ||
    location.pathname.includes("/signup");
  return (
    <div className="max-w-screen-x mx-auto container">
      {NoHeaderFooter || <Navbar />}
      <Outlet></Outlet>
      <ScrollUpButton />

      {NoHeaderFooter || <Footer />}
    </div>
  );
};

export default Main;
