import "./editpost.css";
import { useContext, useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../contex/userContext";
import axios from 'axios';

export const Editpost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<any>("");
  const [developerLink, setDeveloperLink] = useState<string>("");
  const [error, setError] = useState("");

  const {id} = useParams();

  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const token = currentUser?.token;

  useEffect(() => {
    if(!token){
      navigate('/login')
    }
  },[])

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/posts/${id}`);
        setTitle(response.data.title);
        setDescription(response.data.description);
        setDeveloperLink(response.data.developerLink || "");
        setCategory(response.data.category || "Uncategorized");
      } catch (error) {
        console.error(error);
      }
    }
    getPost();
  }, [id])

  const editPost = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    const postData = new FormData();
    postData.set('title', title);
    postData.set('category', category || "Uncategorized");
    postData.set('description', description);
    postData.set('thumbnail', thumbnail);
    if (developerLink.trim() !== "") {
      postData.set("developerLink", developerLink.trim());
    }

    try {
      const response = await axios.patch(`${process.env.REACT_APP_BASE_URL}/posts/${id}`, postData, {withCredentials:true, headers: {Authorization: `Bearer ${token}`}});
      if(response.status === 200){
        navigate('/');
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response.data.message);
    }
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const POST_CATEGORIES = [
    "Portfolio",
    "Blog",
    "E-Commerce",
    "Social",
    "AI",
    "Educational",
    "Weather",
    "Real Estate",
    "Job Board",
    "Gaming",
    "Streaming",
    "Pet",
    "Space",
    "News",
    "Health",
    "Entertainment",
    "Travel",
    "Food",
    "Music",
    "Fashion",
    "Sports",
    "Crypto",
    "Mobile App",
    "Photography",
    "Dashboard",
    "Government",
    "Uncategorized",
  ];

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)?.[0];
    setThumbnail(file ? URL.createObjectURL(file) : null);
  };

  return (
    <section className="create-post">
      <div className="container">
        <h2>Edit Post</h2>
        {error && <p className="form__error-message">{error}</p>}
        <form className="form create-post__form" onSubmit={editPost}>
          <input
            type="text"
            placeholder="My amazing Website"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {POST_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          <ReactQuill
            placeholder="empty for now..."
            modules={modules}
            formats={formats}
            value={description}
            onChange={setDescription}
          />
          <input
            type="file"
            onChange={handleThumbnailChange}
            accept="png, jpg, jpeg"
          />
          <input
            type="text"
            placeholder="Project Link (optional)"
            value={developerLink || ""} 
            onChange={(e) => setDeveloperLink(e.target.value)}
          />
          <button type="submit" className="btn primary">
            Edit Post
          </button>
        </form>
      </div>
    </section>
  );
};
