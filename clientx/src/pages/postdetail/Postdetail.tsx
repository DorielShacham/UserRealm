import "./postdetail.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contex/userContext";
import Loader from "../../components/loader/Loader";
import { Deletepost } from "../deletepost/Deletepost";
import { PostAuthor } from "../../components/posts/PostAuthor";
import { Link, useParams } from "react-router-dom";
import { Post } from "../../components/posts/Posts";
import axios from "axios";

export const Postdetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [developerID, setDeveloperID] = useState(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [developerLink, setDeveloperLink] = useState<string | null>(null);
  const [screenshot, setScreenshot] = useState<string | null>(null);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getScreenshot = async () => {
      if (developerLink) {
        try {
          const response = await axios.post(
            `${process.env.REACT_APP_BASE_URL}/posts/${post?.creator}`,
            { url: developerLink }
          );
          setScreenshot(`data:image/png;base64,${response.data.screenshot}`);
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Axios error:", error.message);
          } else {
            console.error("Unknown error:", error);
          }
        }
      }
    };
    getScreenshot();
  }, [developerLink, post?.creator]);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${id}`
        );
        setPost(response.data);
        setDeveloperID(response.data.creator);
        setDeveloperLink(response.data.developerLink || null);
      } catch (error) {
        setError(error);
      }
      setIsLoading(false);
    };
    getPost();
  }, []);

  useEffect(() => {}, [currentUser, post]);

  if (isLoading) {
    return <Loader />;
  }

  const imgUrl = post?.thumbnail
    ? `${process.env.REACT_APP_ASSETS_URL}/API/uploads/${post.thumbnail}`
    : "";

  return (
    <section className="post-detail">
      {error && <p className="error">{error}</p>}
      {post && (
        <div className="container post-detail__container">
          <div className="post-detail__header">
            <PostAuthor developerID={post.creator} createdAt={post.createdAt} />
            {currentUser?.userId === post?.creator && (
              <div className="post-detail__buttons">
                <Link to={`/posts/${post._id}/edit`} className="btn sm primary">
                  Edit
                </Link>
                <Deletepost postId={id} />
              </div>
            )}
          </div>
          <h1>{post.title}</h1>
          <div className="post-detail__thumbnail">
            <img src={imgUrl} alt="Blog Picture" />
          </div>
          <p dangerouslySetInnerHTML={{ __html: post.description }}></p>
          {developerLink !== null && (
            <div className="post-detail__developer-link">
              <h3>
                <strong>
                  <a
                    className="post__title"
                    href={developerLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {developerLink}
                  </a>
                </strong>{" "}
              </h3>
              {screenshot && (
                <img src={screenshot} alt="Developer Link Screenshot" />
              )}
            </div>
          )}
        </div>
      )}
    </section>
  );
};
