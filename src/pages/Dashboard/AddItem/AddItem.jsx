import { Helmet } from "react-helmet-async";
import SectionTitile from "../../../components/sectionTitle/SectionTitile";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { BsRocketTakeoff } from "react-icons/bs";
import CustomButton from "../../../components/CustomButton/CustomButton";

const AddItem = () => {
  const image_hosting_token = import.meta.env.VITE_image_upload_token;
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;
  const token = localStorage.getItem("access-token");

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);

    fetch(image_hosting_url, {
      method: "Post",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgResponse) => {
        console.log(imgResponse);
        if (imgResponse.success) {
          const img_url = imgResponse.data.display_url;
          const { name, price, category, recipe } = data;
          const newItem = {
            name,
            price: parseFloat(price),
            category,
            recipe,
            image: img_url,
          };
          console.log(newItem);
          fetch("http://localhost:5000/menu", {
            method: "POST",
            headers: {
              "content-type": "application/json",
              authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newItem),
          })
            .then((res) => res.json())
            .then((response) => {
              console.log(response);
              if (response.insertedId) {
                reset();
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "An item is successfully added",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }
            });
        }
      });
    console.log(data);
  };

  return (
    <>
      <Helmet>
        <title>Bistro Boss | Add-item</title>
      </Helmet>
      <SectionTitile subHeading={"What's new?"} heading={"Add an item"} />
      <div className="w-1/2 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text font-semibold">Recipe name*</span>
            </label>
            <input
              type="text"
              placeholder="Recipe name"
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
                defaultValue={"Salad"}
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
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered textarea-lg w-full rounded-sm"
            ></textarea>
          </div>
          <div className="form-control w-full">
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input file-input-sm file-input-bordered w-full mt-5"
            />
          </div>
          <CustomButton text={"Add Item"} Icon={BsRocketTakeoff} />
        </form>
      </div>
    </>
  );
};

export default AddItem;
