import "./posts.css";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";
import LikeButton from "../../components/likeButton/LikeButton";

export const PostItem = ({
  postID,
  category,
  title,
  description,
  developerID,
  thumbnail,
  createdAt,
  likeCount, // Add likeCount prop
}: {
  postID: number;
  category: string;
  title: string;
  description: string;
  developerID?: number;
  thumbnail: string;
  createdAt: any;
  likeCount: number; // Add likeCount prop
}): JSX.Element => {
  const shortTitle = title.length > 30 ? title.substr(0, 30) + "..." : title;
  const shortDescription =
    description.length > 145 ? description.substr(0, 145) + "..." : description;

  return (
    <article className="post">
      <Link to={`/posts/${postID}`}>
        <div className="post__thumbnail">
          <img className="thumbnail__img"
            src={thumbnail}
            alt={title}
          />
        </div>
      </Link>
      <div className="post__content">
        <Link to={`/posts/${postID}`}>
          <h3 className="post__title">{shortTitle}</h3>
        </Link>
        <p dangerouslySetInnerHTML={{__html: shortDescription}}/>
        <div className="post__footer">
          <PostAuthor developerID={developerID} createdAt={createdAt} />
          <span className="like-count">{likeCount}</span> {/* Display like count */}
          <LikeButton postId={postID.toString()} currentUser={undefined} /> {/* Pass postId to LikeButton */}
          <Link
            to={`/posts/categories/${category}`}
            className="btn category"
            id="btnCategory"
          >
            {category}
          </Link>
        </div>
      </div>
    </article>
  );
};
