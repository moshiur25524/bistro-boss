import { BsFillSendFill } from "react-icons/bs";
import CustomButton from "../CustomButton/CustomButton";
import SectionTitile from "../sectionTitle/SectionTitile";
import useAuth from "../../hooks/useAuth";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";
import { useRef } from "react";

const ContactForm = () => {
  const { user } = useAuth();
  const service_id = "service_wbbgl5c";
  const template_id = "template_s18aq6w";
  const user_id = "i450Eyy2msOZu4AcZ";
  const form = useRef();

  const handleContactForm = async (e) => {
    e.preventDefault();
    const formData = e.target;

    const name = formData.name.value;
    const phone = formData.phone.value;
    const email = formData.email.value;
    const message = formData.message.value;

    const messages = { name, phone, email, message };

    await emailjs.sendForm(service_id, template_id, form.current, user_id).then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );

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

    formData.reset();

    console.log(messages);
  };

  return (
    <div>
      <SectionTitile
        heading={"Send Us a Message"}
        subHeading={"contact form"}
      />
      <form
        ref={form}
        className="w-2/3 mx-auto mb-36"
        onSubmit={handleContactForm}
      >
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
              required
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
              required
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
            required
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Message*</span>
          </label>
          <textarea
            name="message"
            required
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
