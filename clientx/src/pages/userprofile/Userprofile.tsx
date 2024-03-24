import "./userprofile.css";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaCheckCircle } from "react-icons/fa";
import { FaArrowLeft } from "react-icons/fa";
import { UserContext } from "../../contex/userContext";
import  axios  from 'axios';

export const Userprofile = () => {
  
  const [avatar, setAvatar] = useState<any>("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [isAvatarTouched, setIsAvatarTouched] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  const imgUrl = avatar ? `${process.env.REACT_APP_ASSETS_URL}/API/${avatar}` : '';

  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const token = currentUser?.token;
  
  useEffect(() => {
    const redirectTimeout = setTimeout(() => {
      if (!currentUser || !token) {
        navigate("/login");
      }
    }, 200);
  
    return () => clearTimeout(redirectTimeout);
  }, [currentUser, token]);
  
  

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users/${currentUser?.userId}`, {withCredentials:true, headers: {Authorization: `Bearer ${token}`}});
        const {name, email, avatar} = response.data;
        setName(name);
        setEmail(email);
        setAvatar(avatar);
      } catch (error) {
        console.error(error)
      }

    }
    getUser();
  },[])

  const changeAvatar = async () => {
    setIsAvatarTouched(false);
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        try {
          const avatarDataUrl = reader.result; 
          const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/change-avatar`, { avatar: avatarDataUrl }, { headers: { Authorization: `Bearer ${token}` } });
          setAvatar(avatarDataUrl);
        } catch (error) {
          console.error(error);
        }
      };
      if (avatar) {
        reader.readAsDataURL(avatar);
      }
    } catch (error) {
      console.error(error);
    }
  };
  

  const updateUserDetails = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const userData = new FormData();
      userData.set('name', name);
      userData.set('email', email);
      userData.set('currentPassword', currentPassword);
      userData.set('newPassword', newPassword);
      userData.set('confirmNewPassword', confirmNewPassword);
  
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/users/edit-user`, userData, {withCredentials: true, headers: {Authorization: `Bearer ${token}`}});
      if(response.status === 200) {
        navigate('/logout')
      }
    } catch (error: any) {
      setError(error.response.data.message);
    }
  }

  return (
    <section className="profile">
      <div className="container profile__container" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
        <Link to={`/myposts/${currentUser?.userId}`} className="btn">
          My Posts
        </Link>

        <div className="profile__details">
          <div className="avatar__wrapper">
            <div className="profile__avatar" onMouseEnter={handleHover} onMouseLeave={handleLeave}>
              <img className="imageText" src={avatar} alt="" />
            </div>
            {isHovered && !imgUrl && (
              <div className="avatar__guide">
                <br />
                <br />
                <br />
                <h3>Edit your image by clicking on the Edit Icon</h3>
                <h1><FaArrowLeft /></h1>
              </div>
            )}
            <form className="avatar__form">
              <input
                type="file"
                name="avatar"
                id="avatar"
                onChange={(e) => e.target.files && setAvatar(e.target.files[0])}
                accept="png, jpg, jpeg"
              />
              <label htmlFor="avatar" onClick={() => setIsAvatarTouched(true)}>
                <FaEdit />
              </label>
            </form>
            {isAvatarTouched && (
              <button className="profile__avatar-btn" onClick={changeAvatar}>
                <FaCheckCircle />
              </button>
            )}
          </div>

          {<h1>{currentUser?.userName}</h1>}

          <form action="" className="form profile__form" onSubmit={updateUserDetails}>
            {error && <p className="form__error-message">{error}</p>}
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              autoFocus
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              autoComplete={"off"}
            />
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
              }}
              autoComplete={"off"}
            />
            <input
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
              }}
              autoComplete={"off"}
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmNewPassword}
              onChange={(e) => {
                setConfirmNewPassword(e.target.value);
              }}
              autoComplete={"off"}
            />
            <button type="submit" className="btn primary">
              Update details
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};
