import { Link } from "react-router-dom";
import notFound from "../../assets/404.gif";
import { AiOutlineHome } from "react-icons/ai";

const NotFoundPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <img src={notFound} alt="" />
          <Link to={"/"}>
            <div className="btn btn-primary rounded-none bg-gradient-to-r from-[#835D23] to-[#B58130] text-white border-0 mt-5">
              <AiOutlineHome />
              Back To Home
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
