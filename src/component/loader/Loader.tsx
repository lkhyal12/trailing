import "./Loader.css";
const Loader = ({
  size,
  borderBg = "rgba(255, 255, 255, 0.486)",
  borderColor = "white",
}: {
  size: number;
  borderBg: string;
  borderColor: string;
}) => {
  return (
    <div className="loaderContainer h-full w-full flex items-center justify-center ">
      <div
        className="loader"
        style={{
          width: size + "px",
          height: size + "px",
          borderColor: borderBg,
          borderTopColor: borderColor,
        }}
      ></div>
    </div>
  );
};

export default Loader;
