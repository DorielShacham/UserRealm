import "./editpost.css";
import { useContext, useEffect, useState } from "react";
import { FaFileImage } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../../contex/userContext";
import axios from "axios";

export const Editpost = () => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Uncategorized");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState<any>("");
  const [developerLink, setDeveloperLink] = useState<string>("");
  const [error, setError] = useState("");

  const { id } = useParams();

  const { currentUser } = useContext(UserContext);
  const navigate = useNavigate();

  const token = currentUser?.token;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const getPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        setTitle(response.data.title);
        setDescription(response.data.description);
        setDeveloperLink(response.data.developerLink || "");
        setCategory(response.data.category || "Uncategorized");
      } catch (error) {
        console.error(error);
      }
    };
    getPost();
  }, [id]);

  const editPost = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
  
    const postData = new FormData();
    postData.append("title", title);
    postData.append("category", category || "Uncategorized");
    postData.append("description", description);
    postData.append("thumbnail", thumbnail);
    if (thumbnail instanceof File) {
      postData.append("thumbnail", thumbnail);
    }
    if (developerLink.trim() !== "") {
      postData.append("developerLink", developerLink.trim());
    }

    try {
      const response = await axios.patch(
        `${process.env.REACT_APP_BASE_URL}/posts/${id}`,
        postData,
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        navigate("/");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.response.data.message);
    }
  };

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

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log(file)
      const base64 = await convertIntoBit64(file)
      setThumbnail(base64)
    }
  };

  const convertIntoBit64 = (file:File) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        //@ts-ignore
        resolve(reader.result)
      };
      reader.onerror = (error) => {
        //@ts-ignore
        reject(error)
      }
    })
  }
  

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
          <label htmlFor="thumbnailInput" className="file-input-label">
            Upload Image <FaFileImage />
            <input
              id="thumbnailInput"
              type="file"
              onChange={handleThumbnailChange}
              accept="image/png, image/jpeg"
            />
            <img className="uploadedImage" src={thumbnail} alt="Thumbnail" />
          </label>
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
