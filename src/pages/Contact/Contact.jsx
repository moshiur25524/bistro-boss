import contactImg from "../../assets/contact/banner.jpg";
import Location from "../../components/Location/Location";
import Cover from "../Shared/Cover";
import ContactForm from "../../components/ContactForm/ContactForm";

const Contact = () => {
  return (
    <div>
      <Cover
        img={contactImg}
        title={"Contact Us"}
        subTitle={"Would you like to try a dish?"}
      />
      <Location />
      {/* TODO: Have to make a standard Email teplate for sending to customers */}
      <ContactForm />
    </div>
  );
};

export default Contact;
