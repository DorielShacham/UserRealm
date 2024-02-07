import "./posts.css";
import { Link } from "react-router-dom";
import { PostAuthor } from "./PostAuthor";

export const PostItem = ({
  postID,
  category,
  title,
  description,
  developerID,
  thumbnail,
  createdAt,
}: {
  postID: number;
  category: string;
  title: string;
  description: string;
  developerID?: number;
  thumbnail: string;
  createdAt: any;
}): JSX.Element => {
  const shortTitle = title.length > 30 ? title.substr(0, 30) + "..." : title;
  const shortDescription =
    description.length > 145 ? description.substr(0, 145) + "..." : description;

    const imgUrl = thumbnail ? `${process.env.REACT_APP_ASSETS_URL}/API/${thumbnail}` : '';

  return (
    <article className="post">
      <Link to={`/posts/${postID}`}>
        <div className="post__thumbnail">
          <img className="thumbnail__img"
            src={imgUrl}
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
