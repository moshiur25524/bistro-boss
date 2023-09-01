import { Helmet } from "react-helmet-async";
import Banner from "./Banner";
import Category from "./Category";
import Featured from "./Featured";
import Testimonials from "./Testimonials";
import MenuItems from "./menuItems";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Home</title>
      </Helmet>
      <Banner />
      <Category />
      <MenuItems />
      <Featured />
      <Testimonials />
    </div>
  );
};

export default Home;
