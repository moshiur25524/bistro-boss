import { Link } from "react-router-dom";
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
      <Link to={`/order/${title}`}>
        <button className="btn btn-outline uppercase border-0 border-b-4 mt-4">
          Order Food
        </button>
      </Link>
    </div>
  );
};

export default MenuCategory;
