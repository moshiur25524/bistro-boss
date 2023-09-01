import Banner from "./Banner";
import Category from "./Category";
import Featured from "./Featured";
import Testimonials from "./Testimonials";
import MenuItems from "./menuItems";

const Home = () => {
  return (
    <div>
      <Banner />
      <Category />
      <MenuItems />
      <Featured />
      <Testimonials />
    </div>
  );
};

export default Home;
