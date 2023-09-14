import { Helmet } from "react-helmet-async";
import SectionTitile from "../../../components/sectionTitle/SectionTitile";
import { useForm } from "react-hook-form";

const AddItem = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);
  console.log(errors);
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Add-item</title>
      </Helmet>
      <SectionTitile subHeading={"What's new?"} heading={"Add an item"} />
      <div className="w-1/2 mx-auto">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-semibold">Recipe name*</span>
            </label>
            <input
              type="text"
              placeholder="Recipe name"
              {...register("recipe", { required: true })}
              className="input input-bordered w-full max-w-xs rounded-sm"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-semibold">Category*</span>
            </label>
            <select
              className="select select-bordered w-full max-w-xs rounded-sm"
              {...register("category", { required: true })}
            >
              <option disabled selected>
                category
              </option>
              <option>Salad</option>
              <option>Pizza</option>
              <option>Soups</option>
              <option>Deserts</option>
              <option>Drinks</option>
            </select>
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-semibold">Price*</span>
            </label>
            <input
              type="number"
              placeholder="Price"
              {...register("price", { required: true })}
              className="input input-bordered w-full max-w-xs rounded-sm"
            />
          </div>
          <div className="form-control w-full max-w-xs">
            <label className="label">
              <span className="label-text font-semibold">Recipe details*</span>
            </label>
            <textarea
              placeholder="recipe details"
              {...register("details", { required: true })}
              className="textarea textarea-bordered textarea-lg w-full max-w-xs"
            ></textarea>
          </div>
          <div className="form-control w-full max-w-xs">
            <input
              type="file"
              className="file-input file-input-sm file-input-bordered w-full max-w-xs"
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
