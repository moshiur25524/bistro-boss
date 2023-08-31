import { useEffect, useState } from "react";
import SectionTitile from "../../components/sectionTitle/SectionTitile";
import MenuItem from "../Shared/menuItem";

const MenuItems = () => {
  const [menu, setMenu] = useState([]);
  useEffect(() => {
    fetch("menu.json")
      .then((res) => res.json())
      .then((data) => {
        const popularMenu = data.filter((item) => item.category === "popular");
        setMenu(popularMenu);
      });
  }, []);
  return (
    <div>
      <section>
        <SectionTitile
          heading={"From our menu"}
          subHeading={"Check it out"}
        ></SectionTitile>
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          {menu.map((item) => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MenuItems;
