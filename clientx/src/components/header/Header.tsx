import { Link } from "react-router-dom";
import "./header.css";
import { FaBars } from "react-icons/fa6";
import { AiOutlineClose } from "react-icons/ai";
import { useState, useContext } from "react";
import { UserContext } from "../../contex/userContext";
import Realm from "../posts/Realm";

export const Header = () => {
  interface Post {
    _id: string;
    title: string;
  }

  const [isNavShowing, setIsNavShowing] = useState(
    window.innerWidth > 800 ? true : false
  );
  const { currentUser } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  const closeNavBar = () => {
    setIsNavShowing(!isNavShowing);

    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://userrealmbackend.onrender.com/api/posts/search?title=${searchQuery}`
      );
      const data: Post[] = await response.json();
      setSearchResults(data);
      console.log(data);
    } catch (error) {
      console.error("Error searching posts:", error);
    }
  };

  return (
    <nav>
      <div className="container nav__container">
        <Link to={"/"} className="nav__logo" onClick={closeNavBar}>
          <Realm />
        </Link>

        <div className="search-container">
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button className="btn" onClick={handleSearch}>
            Search
          </button>

          {searchResults.length > 0 && (
            <ul className="search-results">
              {searchResults.map((result) => (
                <li key={result._id}>
                  <Link to={`/post/${result._id}`} onClick={closeNavBar}>
                    {result.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

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
        <button
          className="nav__toggle-btn"
          onClick={() => setIsNavShowing(!isNavShowing)}
        >
          {isNavShowing ? <AiOutlineClose /> : <FaBars />}
        </button>
      </div>
    </nav>
  );
};
