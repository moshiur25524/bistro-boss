const MenuItem = ({ item }) => {
  const { name, image, recipe, price } = item;
  return (
    <div className="flex space-x-2">
      <img
        style={{ borderRadius: "0 200px 200px 200px" }}
        className="w-[120px]"
        src={image}
        alt=""
      />
      <div>
        <h2 className="uppercase">{name}--------------</h2>
        <p>{recipe}</p>
      </div>
      <p className="text-orange-400">${price}</p>
    </div>
  );
};

export default MenuItem;
