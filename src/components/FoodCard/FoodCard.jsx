import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";

const FoodCard = ({ item }) => {
  const { name, image, recipe, price } = item;
  const { user } = useContext(AuthContext);

  const handleAddToCart = (item) => {
    console.log(item);
    if (user) {
      fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: { "content-type": "application/json" },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.insertedId) {
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500,
            });
          }
          console.log(data);
        });
    }
  };
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <figure>
        <img src={image} alt="Shoes" />
      </figure>
      <p className="absolute right-0 mr-4 mt-4 p-2 bg-slate-600 text-white">
        ${price}
      </p>
      <div className="card-body">
        <h2 className="card-title">{name}</h2>
        <p>{recipe}</p>
        <div className="card-actions justify-center">
          <button
            onClick={() => handleAddToCart(item)}
            className="btn btn-outline uppercase bg-slate-100 border-orange-300 border-0 border-b-4 mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
