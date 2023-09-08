import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">404</h1>
          <p className="py-6">The page you are looking for is not found</p>
          <Link to={"/"}>
            <button className="btn btn-warning">Home</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
