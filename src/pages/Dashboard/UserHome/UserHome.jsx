import SectionTitile from "../../../components/sectionTitle/SectionTitile";
import useAuth from "../../../hooks/useAuth";

const UserHome = () => {
  const { user } = useAuth();

  return (
    <div>
      <SectionTitile subHeading={"User Home"} heading={"This is Your Home"} />
      <h1 className="text-2xl text-center text-primary">
        Welcome to User home{" "}
        <span className="text-orange-500">{user?.displayName}</span>
      </h1>
    </div>
  );
};

export default UserHome;
