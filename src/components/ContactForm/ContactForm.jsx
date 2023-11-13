import { BsFillSendFill } from "react-icons/bs";
import CustomButton from "../CustomButton/CustomButton";
import SectionTitile from "../sectionTitle/SectionTitile";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { useEffect, useState } from "react";

const ContactForm = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    emailjs.init("i450Eyy2msOZu4AcZ");
  }, []);
  const handleContactForm = async (e) => {
    e.preventDefault();
    const form = e.target;

    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;
    const message = form.message.value;

    const messages = { name, phone, email, message };

    await fetch("http://localhost:5000/contact", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(messages),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thanks For your Message ❤️‍🔥",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });

    // Email sending

    const serviceId = "service_fd1p744";
    const templateId = "template_s18aq6w";
    try {
      setLoading(true);
      await emailjs.send(serviceId, templateId, {
        name: name,
        recipient: email,
      });
      alert("email successfully sent check inbox");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    form.reset();

    console.log(messages);
    // form.reset();
  };

  if (loading) {
    return "loading...";
  }
  return (
    <div>
      <SectionTitile
        heading={"Send Us a Message"}
        subHeading={"contact form"}
      />
      <form className="w-2/3 mx-auto mb-36" onSubmit={handleContactForm}>
        <div className="">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Name*</span>
            </label>
            <input
              type="text"
              name="name"
              defaultValue={user?.displayName}
              placeholder="Your Name"
              className="input rounded input-bordered"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text font-bold">Email*</span>
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              placeholder="Email"
              className="input rounded input-bordered"
            />
          </div>
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Phone*</span>
          </label>
          <input
            type="text"
            name="phone"
            placeholder="Phone Number"
            className="input rounded input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Message*</span>
          </label>
          <textarea
            name="message"
            rows={20}
            placeholder="Write your message here"
            className="input input-bordered rounded-none"
          />
        </div>
        <CustomButton text={"Send Message"} Icon={BsFillSendFill} />
      </form>
    </div>
  );
};

export default ContactForm;
