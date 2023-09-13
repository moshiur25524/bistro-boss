import SectionTitile from "../../components/sectionTitle/SectionTitile";
import MenuItem from "../Shared/MenuItem";
import useMenu from "../../hooks/useMenu";

const MenuItems = () => {
  const [menu] = useMenu();
  const popular = menu.filter((item) => item.category === "popular");
  return (
    <div>
      <section>
        <SectionTitile
          heading={"From our menu"}
          subHeading={"Check it out"}
        ></SectionTitile>
        <div className="grid md:grid-cols-2 gap-10 mb-10">
          {popular.map((item) => (
            <MenuItem key={item._id} item={item} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default MenuItems;
