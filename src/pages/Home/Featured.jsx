import SectioinTitile from "../../components/sectionTitle/SectionTitile";
import featuredImage from "../../assets/home/featured.jpg";
import "./Featured.css";
import { Link } from "react-router-dom";

const Featured = () => {
  return (
    <div className="featured-item bg-fixed text-white pt-10">
      <SectioinTitile
        heading={"From our Menu"}
        subHeading={"Check it out"}
      ></SectioinTitile>
      <div className="md:flex justify-center items-center py-20 px-36  bg-slate-500 bg-opacity-50">
        <div>
          <img src={featuredImage} alt="" />
        </div>
        <div className="md:ms-10">
          <p>March 20, 2023</p>
          <p className="uppercase">Where can i get some ?</p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quidem
            modi quo provident culpa exercitationem dignissimos illo inventore
            accusamus ad nihil minus unde repudiandae facere, error dolorem esse
            vitae labore magnam debitis consectetur mollitia hic non quis
            tempora! Aspernatur voluptate minus blanditiis quo voluptatum
            pariatur asperiores doloremque, explicabo ducimus voluptatibus
            nobis!
          </p>
          <Link to={"/menu"}>
            <button className="btn btn-outline uppercase bg-slate-700 text-white border-0 border-b-4 mt-4">
              Read More
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Featured;
