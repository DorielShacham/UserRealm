import "./createpost.css";
import { useState, useContext, useEffect } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contex/userContext";
import "react-quill/dist/quill.snow.css";
import axios from "axios";

export const Createpost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<any>("");
  const [developerLink, setDeveloperLink] = useState("");
  const [error, setError] = useState<any>(null);

  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const token = currentUser?.token;

  //redirect to login page for offline users
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

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

  const createPost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    const postData = new FormData();
    postData.set("title", title);
    postData.set("category", category);
    postData.set("description", description);
    postData.set("thumbnail", thumbnail);

    if (developerLink.trim() !== "") {
      postData.set("developerLink", developerLink.trim());
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts`,
        postData,
        { withCredentials: true, headers: { Authorization: `Bearer ${token}` } }
      );
      if (response.status == 201) {
        return navigate("/");
      }
    } catch (err: any) {
      setError(err.response.data.message);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = (e.target.files as FileList)?.[0];
    setThumbnail(file);
  };

  return (
    <section className="create-post">
      <div className="container">
        <h2>Create Post</h2>
        {error && <p className="form__error-message">{error}</p>}
        <form className="form create-post__form" onSubmit={createPost}>
          <input
            type="text"
            placeholder="Title"
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
              <option key={cat}>{cat}</option>
            ))}
          </select>
          <ReactQuill
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
            value={developerLink}
            onChange={(e) => setDeveloperLink(e.target.value)}
          />
          <button type="submit" className="btn primary">
            Create
          </button>
        </form>
      </div>
    </section>
  );
};
