import { useContext } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Providers/AuthProviders";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin";
import { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

const Signup = () => {
  const { createUser, updateUserProfile, logOut } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const {
    register,
    reset,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    createUser(data.email, data.password).then((result) => {
      const loggedUser = result.user;

      updateUserProfile(data.name, data.PhotoURL)
        .then(() => {
          const userinfo = { name: data?.name, email: data?.email };

          fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(userinfo),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              if (data.insertedId) {
                reset();
                Swal.fire({
                  title: "Sign up Successfully",
                  showClass: {
                    popup: "animate__animated animate__fadeInDown",
                  },
                  hideClass: {
                    popup: "animate__animated animate__fadeOutUp",
                  },
                });
              }
            });
          if (loggedUser) {
            logOut();
            navigate("/login");
          }
        })
        .catch((error) => console.log(error));
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  console.log(watch("example"));
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Signup</title>
      </Helmet>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Signup now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  {...register("name", { required: true })}
                  placeholder="Name"
                  className="input input-bordered"
                />
                {errors.name && (
                  <span className="text-red-600">Name is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo URL</span>
                </label>
                <input
                  type="text"
                  // name="photo_url"
                  {...register("PhotoURL", { required: true })}
                  placeholder="Photo_URL"
                  defaultValue={
                    "https://pbs.twimg.com/profile_images/511333573119320064/3q1981fx_400x400.jpeg"
                  }
                  className="input input-bordered"
                />
                {errors.PhotoURL && (
                  <span className="text-red-600">Photo URL is required</span>
                )}
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  {...register("email", { required: true })}
                  placeholder="email"
                  className="input input-bordered"
                />
                {errors.email && (
                  <span className="text-red-600">Email is required</span>
                )}
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    // pattern:
                    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9_])/,
                  })}
                  placeholder="password"
                  className="input input-bordered"
                />
                <span
                  className="absolute"
                  onClick={togglePasswordVisibility}
                  style={{ cursor: "pointer", right: "40px", top: "55px" }}
                >
                  {showPassword ? <BiHide /> : <BiShow />}
                </span>
                {errors.password?.type === "required" && (
                  <span className="text-red-600">Password is required</span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-600">
                    Password must be 6 character
                  </span>
                )}
                {errors.password?.type === "maxLength" && (
                  <span className="text-red-600">
                    Password must be less then 20 characters
                  </span>
                )}
                {/* {errors.password?.type === "pattern" && (
                  <span className="text-red-600">
                    Password must have one uppercase, one lowercaase, one number
                    and one special character
                  </span>
                )} */}
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <input
                  className="btn btn-primary"
                  type="submit"
                  value="Signup"
                />
              </div>
              <p>
                <small>
                  Already have an account ?{" "}
                  <Link to={"/login"}>Signin please !!</Link>
                </small>
              </p>
              <SocialLogin />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
