import { Link } from "react-router-dom";
import "./header.css";
import { FaBars } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useContext } from "react";
import { UserContext } from "../../contex/userContext";
import Realm from "../posts/Realm";
import "hotthornlogo.png" from "../../assets/Assetstest/hotthornlogo.png"

export const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(
    window.innerWidth > 800 ? true : false
  );
  const { currentUser } = useContext(UserContext);

  const closeNavBar = () => {
    setIsNavShowing(!isNavShowing);

    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    }
  };

  return (
    <nav>
      <div className="container nav__container">
        <Link to={"/"} className="nav__logo" onClick={closeNavBar}>
          {/* <Realm /> */}
          <img src="../../assets/Assetstest/hotthornlogo.png" />
        </Link>
        {currentUser ? (
          <ul className={`nav__menu ${isNavShowing ? "show" : ""}`}>
            <li>
              <Link to={`/profile/${currentUser.userId}`} onClick={closeNavBar}>
                {currentUser?.userName || "Profile"}
              </Link>
            </li>
            <li>
              <Link to={"/create"} onClick={closeNavBar}>
                Create
              </Link>
            </li>
            <li>
              <Link to={"/developers"} onClick={closeNavBar}>
                Developers
              </Link>
            </li>
            <li>
              <Link to={"/about"} onClick={closeNavBar}>
                About
              </Link>
            </li>
            <li>
              <Link to={"/logout"} onClick={closeNavBar}>
                Logout
              </Link>
            </li>
          </ul>
        ) : (
          <ul className={`nav__menu ${isNavShowing ? "show" : ""}`}>
            <li>
              <Link to={"/developers"} onClick={closeNavBar}>
                Developers
              </Link>
            </li>
            <li>
              <Link to={"/about"} onClick={closeNavBar}>
                About
              </Link>
            </li>
            <li>
              <Link to={"/login"} onClick={closeNavBar}>
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
      <button
        className="nav__toggle-btn"
        onClick={() => setIsNavShowing(!isNavShowing)}
      >
        {isNavShowing ? <AiOutlineClose /> : <FaBars />}
      </button>
    </nav>
  );
};
