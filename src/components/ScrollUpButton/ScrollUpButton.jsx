import { useEffect, useState } from "react";
import { BsArrowUpSquareFill } from "react-icons/bs";

const ScrollUpButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Add a scroll event listener to track when to show the button
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    // Conditional rendering of the scroll-up button
    showButton && (
      <button
        className="fixed right-4 bottom-4 p-4 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600 transition duration-300"
        onClick={scrollToTop}
      >
        <BsArrowUpSquareFill className="text-2xl" />
      </button>
    )
  );
};

export default ScrollUpButton;
