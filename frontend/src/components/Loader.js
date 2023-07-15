import loadingImage from "./auth/images/loading2.gif";

const loadingStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "10rem",
};

const Loader = () => {
  return (
    <div style={loadingStyle}>
      <img src={loadingImage} alt="loading..." style={{ width: "15%", textAlign:"center" }} />
    </div>
  );
};

export default Loader;
