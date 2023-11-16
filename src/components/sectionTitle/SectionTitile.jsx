import { motion } from "framer-motion";
import { fadeIn } from "../../variants";

const SectionTitile = ({ heading, subHeading }) => {
  return (
    <motion.div
      variants={fadeIn("down", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: false, amount: 0.7 }}
      className="mx-auto text-center md:w-4/12 my-8"
    >
      <p className="text-orange-500 mb-4">---{subHeading}---</p>
      <h3 className="text-4xl uppercase border-y-4 py-4">{heading}</h3>
    </motion.div>
  );
};

export default SectionTitile;
