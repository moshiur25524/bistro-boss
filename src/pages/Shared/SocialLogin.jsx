import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../Providers/AuthProviders";
import { useLocation, useNavigate } from "react-router-dom";

const SocialLogin = () => {
  const { googleSignIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  let from = location.state?.from?.pathname || "/";

  const handleGoogleSignIn = () => {
    googleSignIn().then((result) => {
      const loggedInUser = result.user;
      const userinfo = {
        name: loggedInUser?.displayName,
        email: loggedInUser?.email,
      };
      console.log(loggedInUser);
      fetch("https://bistro-server-tau.vercel.app/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(userinfo),
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
        });
      if (loggedInUser) {
        navigate(from, { replace: true });
      }
    });
  };
  return (
    <div>
      <div className="divider">OR</div>
      <div className="w-full text-center my-4">
        <button
          onClick={handleGoogleSignIn}
          className="btn btn-square btn-outline"
        >
          <FaGoogle />
        </button>
      </div>
    </div>
  );
};

export default SocialLogin;
