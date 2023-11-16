import { useContext, useEffect, useState } from "react";
import loginImage from "../../assets/others/authentication.gif";
import {
  loadCaptchaEnginge,
  LoadCanvasTemplate,
  validateCaptcha,
} from "react-simple-captcha";
import { AuthContext } from "../../Providers/AuthProviders";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { BiShow, BiHide } from "react-icons/bi";
import Swal from "sweetalert2";
import SocialLogin from "../Shared/SocialLogin";

const Login = () => {
  const [disabled, setDisabled] = useState(true);
  const [error, SetError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signin, resetPassword } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  useEffect(() => {
    loadCaptchaEnginge(6);
  }, []);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    console.log(email, password);
    signin(email, password)
      .then((result) => {
        const user = result.user;

        if (user) {
          Swal.fire({
            title: "Successfully Logged in",
            showClass: {
              popup: "animate__animated animate__fadeInDown",
            },
            hideClass: {
              popup: "animate__animated animate__fadeOutUp",
            },
          });
        }
        navigate(from, { replace: true });
        console.log(user);
      })
      .catch((error) => {
        const errorMessage = error.message;
        SetError(errorMessage);
        console.log("Error: ", errorMessage);
      });

    // document.getElementById("my_modal_2").showModal();
    // if (error) {
    //   return (
    //     <dialog id="my_modal_2" className="modal">
    //       <div className="modal-box">
    //         <h3 className="font-bold text-lg">Hello!</h3>
    //         <p className="py-4">Press ESC key or click outside to close</p>
    //       </div>
    //       <form method="dialog" className="modal-backdrop">
    //         <button>close</button>
    //       </form>
    //     </dialog>
    //   );
    // }

    // SetError("");
    form.reset();
  };

  const handleValidateCaptcha = (e) => {
    const user_captcha_value = e.target.value;
    if (validateCaptcha(user_captcha_value)) {
      setDisabled(false);
    }
  };

  const handleForgetPassword = () => {
    let email;
    email = prompt("Enter Your Email");
    resetPassword(email)
      .then(() => {
        if (email) {
          alert("Check your email");
        }
      })
      .catch((error) => SetError(error.message));
  };
  return (
    <>
      <Helmet>
        <title>Bistro Boss | Login</title>
      </Helmet>
      <div className={`hero min-h-screen bg-white`}>
        <div className="hero-content w-1/2 flex-col lg:flex-row">
          <div className="text-center lg:text-left">
            <img src={loginImage} alt="" />
          </div>
          <form
            onSubmit={handleLogin}
            className="card flex-shrink-0 w-1/2 max-w-sm shadow-2xl"
          >
            <div className="card-body">
              <h1 className="text-4xl font-bold">Login</h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="password"
                    name="password"
                    className="input input-bordered"
                  />
                  <span
                    className="absolute"
                    onClick={togglePasswordVisibility}
                    style={{ cursor: "pointer", right: "40px", top: "15px" }}
                  >
                    {showPassword ? <BiHide /> : <BiShow />}
                  </span>
                </div>

                <label className="label">
                  <p
                    onClick={handleForgetPassword}
                    href="#"
                    className="label-text-alt link link-hover"
                  >
                    Forgot password?
                  </p>
                </label>
              </div>
              <div className="form-control">
                <label className="label">
                  <LoadCanvasTemplate />
                </label>
                <input
                  type="text"
                  onBlur={handleValidateCaptcha}
                  placeholder="Please type the Captcha"
                  name="captcha"
                  className="input input-bordered"
                />
              </div>

              <p>
                <small>
                  New Here ? <Link to={"/signup"}>Create an Account</Link>
                </small>
              </p>
              {/* ToDo: add this if need chapcha disabled={disabled}*/}
              <div className="form-control mt-6">
                <input
                  disabled={false}
                  className="btn btn-primary"
                  type="submit"
                  value="Login"
                />
              </div>
              {error && (
                <p className="text-red-500 text-center font-semibold">
                  {error}
                </p>
              )}
            </div>
            <SocialLogin />
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
