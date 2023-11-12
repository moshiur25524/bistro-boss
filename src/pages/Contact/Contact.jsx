import contactImg from "../../assets/contact/banner.jpg";
import Location from "../../components/Location/Location";
import Cover from "../Shared/Cover";

const Contact = () => {
  return (
    <div>
      <Cover
        img={contactImg}
        title={"Contact Us"}
        subTitle={"Would you like to try a dish?"}
      />
      <Location />
      <h1>Welcome to Contact Page</h1>
    </div>
  );
};

export default Contact;
