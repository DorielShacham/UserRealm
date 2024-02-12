import "./postdetail.css";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contex/userContext";
import Loader from "../../components/loader/Loader";
import { Deletepost } from "../deletepost/Deletepost";
import { PostAuthor } from "../../components/posts/PostAuthor";
import { Link, useParams } from "react-router-dom";
import { Post } from "../../components/posts/Posts";
import LikeButton from "../../components/likeButton/LikeButton";
import axios from "axios";
import { delay } from "../../modules/setTimeout";
import dummy_full_post from "../../dummy_data/post_full.json";

export const Postdetail = () => {
  const { id } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [developerID, setDeveloperID] = useState(null);
  const [error, setError] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [developerLink, setDeveloperLink] = useState<string | null>(null);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    const getPost = async () => {
      setIsLoading(true);
      try {
        let response;
        if (process.env.NODE_ENV === "development") {
          await delay(500);
          response = dummy_full_post as any;
        } else {
          response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/posts/${id}`
          );
        }
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
            {currentUser && (
              <LikeButton postId={id || ""} currentUser={currentUser} className="post-detail__like-button" />

            )}
          </div>
          <h1>{post.title}</h1>
          <div className="post-detail__thumbnail">
            <img src={post?.thumbnail} alt="Blog Picture" />
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
            </div>
          )}
        </div>
      )}
    </section>
  );
};
