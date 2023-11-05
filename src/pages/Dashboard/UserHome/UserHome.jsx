import SectionTitile from "../../../components/sectionTitle/SectionTitile";

const UserHome = () => {
  return (
    <div>
      <SectionTitile subHeading={"User Home"} heading={"This is Your Home"} />
      <h1 className="text-2xl text-center text-primary">
        Welcome to User home
      </h1>
    </div>
  );
};

export default UserHome;
