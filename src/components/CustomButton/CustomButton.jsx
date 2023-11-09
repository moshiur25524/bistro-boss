const CustomButton = ({ text, Icon }) => {
  return (
    <div className="form-control mt-6 relative">
      <input
        className="btn btn-primary rounded-none bg-gradient-to-r from-[#835D23] to-[#B58130] text-white border-0" // Add 'relative' class
        type="submit"
        value={text}
        style={{ paddingRight: "30px" }} // Add space for the icon
      />
      <Icon className="absolute top-1/2 right-20 transform -translate-y-1/2 text-white h-5 w-5" />
    </div>
  );
};

export default CustomButton;
