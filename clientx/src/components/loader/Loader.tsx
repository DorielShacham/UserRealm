import LoadingGif from "../../assets/Assetstest/Disk-0.3s-217px.gif";
import "./loader.css";

const Loader = () => {
  return (
    <div className="loader">
      <div className="loader__image">
        <div className="hotthorn__loader">
          <h3>Hotthorn</h3>
        </div>
        <img src={LoadingGif} alt="Loading animation" />
      </div>
    </div>
  );
};

export default Loader;
