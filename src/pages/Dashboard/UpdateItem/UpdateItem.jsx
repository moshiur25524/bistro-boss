import { useParams } from "react-router-dom";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { BsRocketTakeoff } from "react-icons/bs";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useMenu from "../../../hooks/useMenu";

const UpdateItem = () => {
  const { id } = useParams();
  const token = localStorage.getItem("access-token");

  const [menu] = useMenu();
  const { image, name, price, category, recipe } = menu.find(
    (item) => item?._id === id
  );

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const { name, price, category, recipe } = data;
    const newItem = {
      name,
      price: parseFloat(price),
      category,
      recipe,
      image: image,
    };
    fetch(`http://localhost:5000/menu/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(newItem),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log(response);
        if (response.modifiedCount) {
          reset();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Item Updated Successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  return (
    <div className="w-2/3 mx-auto mt-8">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Recipe name*</span>
          </label>
          <input
            type="text"
            placeholder="Recipe name"
            defaultValue={name}
            {...register("name", { required: true })}
            className="input input-bordered w-full rounded-sm"
          />
        </div>
        <div className="flex">
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Category*</span>
            </label>
            <select
              className="select select-bordered w-full rounded-sm"
              defaultValue={category}
              {...register("category", { required: true })}
            >
              <option>Salad</option>
              <option>Pizza</option>
              <option>Soups</option>
              <option>Deserts</option>
              <option>Drinks</option>
            </select>
          </div>
          <div className="form-control w-full ml-4">
            <label className="label">
              <span className="label-text font-semibold">Price*</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              defaultValue={price}
              {...register("price", { required: true })}
              className="input input-bordered w-full rounded-sm"
            />
          </div>
        </div>
        <div className="form-control w-full">
          <label className="label">
            <span className="label-text font-semibold">Recipe details*</span>
          </label>
          <textarea
            placeholder="recipe details"
            defaultValue={recipe}
            {...register("recipe", { required: true })}
            className="textarea textarea-bordered textarea-lg w-full rounded-sm"
          ></textarea>
        </div>

        <CustomButton text={"Update Item"} Icon={BsRocketTakeoff} />
      </form>
    </div>
  );
};

export default UpdateItem;
