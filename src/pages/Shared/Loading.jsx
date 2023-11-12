import cupCake from "../../assets/others/cupcake.gif";

const Loading = () => {
  return (
    <div className="hero min-h-screen ">
      <div className=" text-center">
        <div className="max-w-md">
          <img src={cupCake} alt="" />
        </div>
        <h1 className="text-3xl text-white mt-5 font-bold font-[Cinzel]">
          Welcome to Bistro Boss Resturant
        </h1>
      </div>
    </div>
  );
};

export default Loading;
