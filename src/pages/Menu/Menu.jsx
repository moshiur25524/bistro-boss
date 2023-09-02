import { Helmet } from "react-helmet-async";
import Cover from "../Shared/Cover";
import menuImg from "../../../../assets/menu/banner3.jpg";
import dessertImg from "../../../../assets/menu/dessert-bg.jpeg";
import pizzaImg from "../../../../assets/menu/pizza-bg.jpg";
import soupImg from "../../../../assets/menu/soup-bg.jpg";
import saladImg from "../../../../assets/menu/salad-bg.jpg";
import useMenu from "../../hooks/useMenu";
import MenuCategory from "../Shared/MenuCategory";

const Menu = () => {
  const [menu] = useMenu();

  const desserts = menu.filter((item) => item.category === "dessert");
  const pizza = menu.filter((item) => item.category === "pizza");
  const soup = menu.filter((item) => item.category === "soup");
  const salad = menu.filter((item) => item.category === "salad");
  const offered = menu.filter((item) => item.category === "offered");

  return (
    <div>
      <Helmet>
        <title>Bistro Boss | Menu</title>
      </Helmet>
      <Cover img={menuImg} title={"our menu"} />
      {/* Offered Category */}
      <MenuCategory items={offered} />
      <MenuCategory items={desserts} title={"dessert"} coverImg={dessertImg} />
      <MenuCategory items={pizza} title={"pizza"} coverImg={pizzaImg} />
      <MenuCategory items={salad} title={"salad"} coverImg={saladImg} />
      <MenuCategory items={soup} title={"soup"} coverImg={soupImg} />
    </div>
  );
};

export default Menu;
