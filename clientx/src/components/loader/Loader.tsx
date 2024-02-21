import LoadingGif from "../../assets/Assetstest/Disk-0.3s-217px.gif";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__image">
        <div>
          <h3>Hotthorn<img src="../../../public/android-chrome-192x192.png"></img></h3>
        </div>
        <img src={LoadingGif} alt="Loading animation" />
      </div>
    </div>
  );
};

export default Loader;
