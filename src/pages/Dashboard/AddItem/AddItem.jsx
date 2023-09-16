import { Helmet } from "react-helmet-async";
import SectionTitile from "../../../components/sectionTitle/SectionTitile";
import { useForm } from "react-hook-form";

const AddItem = () => {
  const image_hosting_token = import.meta.env.VITE_image_upload_token;
  const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_hosting_token}`;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
        }
      });
    console.log(data);
  };

  console.log(errors);
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
          <div className=" mt-6">
            <input
              className="btn btn-primary rounded-none bg-gradient-to-r from-[#835D23] to-[#B58130] text-white border-0"
              type="submit"
              value={`Send Review`}
            ></input>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddItem;
