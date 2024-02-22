import LoadingGif from "../../assets/Assetstest/Disk-0.3s-217px.gif";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__image">
        <div className="hotthorn__loader">
          <h1>Hotthorn</h1>
        </div>
        <div className="loading-bar">
          <div className="blue-bar">

          </div>
        </div>
        {/* <img src={LoadingGif} alt="Loading animation" /> */}
      </div>
    </div>
  );
};

export default Loader;
