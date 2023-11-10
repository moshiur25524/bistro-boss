import SectionTitile from "../../../components/sectionTitle/SectionTitile";
import CustomButton from "../../../components/CustomButton/CustomButton";
import { FaClipboardList } from "react-icons/fa";
import { CgPhone } from "react-icons/cg";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

const Reservation = () => {
  const { user } = useAuth();

  const handleReservation = (e) => {
    e.preventDefault();
    const form = e.target;
    const date = form.date.value;
    const time = form.time.value;
    const guest = form.guest.value;
    const name = form.name.value;
    const phone = form.phone.value;
    const email = form.email.value;

    const resevedData = { date, time, guest, name, phone, email };
    console.log(resevedData);

    fetch("http://localhost:5000/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(resevedData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.insertedId) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Booking Successfull",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });

    form.reset();
  };

  // TODO: Have to complete the whole resevation page

  return (
    <div>
      <SectionTitile subHeading={"Reservation"} heading={"book a table"} />
      <form
        onSubmit={handleReservation}
        className="card-body grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      >
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Date*</span>
          </label>
          <input
            type="date"
            name="date"
            className="input rounded input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Time*</span>
          </label>
          <input
            type="time"
            name="time"
            className="input rounded input-bordered"
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text font-bold">Guest*</span>
          </label>
          <select
            name="guest"
            className="select select-bordered w-full max-w-xs"
            defaultValue={"1 Person"}
          >
            <option>1 Persons</option>
            <option>2 Persons</option>
            <option>3 Persons</option>
            <option>4 Persons</option>
            <option>5 Persons</option>
          </select>
        </div>
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
        <CustomButton text={"Book A Table"} Icon={FaClipboardList} />
      </form>
      <div>
        <SectionTitile subHeading={"Visit Us"} heading={"Our location"} />
        <div className="flex w-full">
          <div>
            <div className="text-center h-16 bg-[#D1A054]">
              <CgPhone />
            </div>
            <div className="flex flex-col justify-center items-center h-80 ">
              <h1 className="text-xl">Phone</h1>
              <p>+88 01854167548</p>
            </div>
          </div>
          <div>
            <div className="text-center h-16 bg-[#D1A054]">
              <CgPhone />
            </div>
            <div className="flex flex-col justify-center items-center h-80 ">
              <h1 className="text-xl">Phone</h1>
              <p>+88 01854167548</p>
            </div>
          </div>
          <div>
            <div className="text-center h-16 bg-[#D1A054]">
              <CgPhone />
            </div>
            <div className="flex flex-col justify-center items-center h-80 ">
              <h1 className="text-xl">Phone</h1>
              <p>+88 01854167548</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reservation;
