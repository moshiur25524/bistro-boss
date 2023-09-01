import Cover from "./Cover";
import MenuItem from "./menuItem";

const MenuCategory = ({ items, title, coverImg }) => {
  return (
    <div className="pt-10">
      {title && <Cover img={coverImg} title={title} />}
      <div className="grid md:grid-cols-2 gap-10 mb-10 my-16">
        {items.map((item) => (
          <MenuItem key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuCategory;
