import loadingImage from "../../assets/others/loader3.gif";

const Loading = () => {
  return (
    <div className="hero min-h-screen ">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <img src={loadingImage} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Loading;
