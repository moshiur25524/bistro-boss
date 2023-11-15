import { FaPhoneAlt } from "react-icons/fa";
import SectionTitile from "../sectionTitle/SectionTitile";
import { BiSolidTime } from "react-icons/bi";
import { MdLocationPin } from "react-icons/md";

const Location = () => {
  const items = [
    {
      id: 1,
      text: "phone",
      subTitle: ["+38 (012) 34 56 789"],
      icon: FaPhoneAlt,
    },
    {
      id: 2,
      text: "address",
      subTitle: ["Savar, Ashulia", "Dhaka, Bangladesh"],
      icon: MdLocationPin,
    },
    {
      id: 3,
      text: "working hours",
      subTitle: ["Mon - Fri: 08:00 - 22:00", " Sat - Sun: 10:00 - 23:00"],
      icon: BiSolidTime,
    },
  ];
  return (
    <div>
      <SectionTitile subHeading={"Visit Us"} heading={"our location"} />
      <div className=" grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <div key={item.id} className=" h-80 w-full">
            <div className=" flex justify-center items-center h-20 bg-[#D1A054] w-full">
              <item.icon style={{ fontSize: "30px", color: "#fff" }} />
            </div>
            <div className=" h-60 w-full flex flex-col justify-center items-center bg-[#ebe9e9]">
              <h1 className="text-[#151515] text-3xl font-semibold uppercase mb-5">
                {item.text}
              </h1>
              <p className="text-[#444]">
                {item.subTitle[0]} <br /> {item.subTitle[1]}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Location;
