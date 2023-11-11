import { Helmet } from "react-helmet-async";
import SectionTitile from "../../../components/sectionTitle/SectionTitile";
import { BsRocketTakeoff } from "react-icons/bs";
import { useState } from "react";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import CustomButton from "../../../components/CustomButton/CustomButton";

const Review = () => {
  const [rating, setRating] = useState(0);
  const { user } = useAuth();
  const myStyles = {
    itemShapes: ThinRoundedStar,
    activeFillColor: "orange",
    inactiveFillColor: "#D0D0D0",
  };

  const handleReview = (e) => {
    e.preventDefault();
    const form = e.target;
    const recipe = form.recipe.value;
    const suggestion = form.suggestion.value;
    const details = form.review.value;

    const review = {
      email: user?.email,
      recipe,
      suggestion,
      details,
      rating,
      name: user?.displayName,
    };
    console.log(review);

    fetch("http://localhost:5000/reviews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thanks For your Review ❤️‍🔥",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
    form.reset();
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Review</title>
      </Helmet>
      <SectionTitile
        subHeading={"Sharing is Caring!!!"}
        heading={"Give a review"}
      />
      <div className="hero min-h-screen w-full">
        <div className="card flex-shrink-0 w-full max-w-lg shadow-2xl bg-base-100 rounded-none">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl my-10 uppercase font-semibold font-[Cinzel]">
              Rate Us
            </h2>
            <div>
              <Rating
                style={{ maxWidth: 200 }}
                value={rating}
                onChange={setRating}
                itemStyles={myStyles}
              />
            </div>
          </div>

          <form onSubmit={handleReview} className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">
                  Which recipe you liked most?
                </span>
              </label>
              <input
                type="text"
                name="recipe"
                placeholder="Recipe you liked most"
                className="input input-bordered rounded-none"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">
                  Do you have any suggestion for us?
                </span>
              </label>
              <input
                type="text"
                name="suggestion"
                placeholder="suggestions"
                className="input input-bordered rounded-none"
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-bold">
                  Kindly express your care in a short way
                </span>
              </label>
              <textarea
                type="text"
                name="review"
                placeholder="Review in Details"
                className="input input-bordered rounded-none"
              />
            </div>
            <CustomButton text={"send review"} Icon={BsRocketTakeoff} />
          </form>
        </div>
      </div>
    </>
  );
};

export default Review;
