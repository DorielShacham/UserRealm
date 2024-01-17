import "./developerposts.css";
import { useEffect, useState } from "react";
import { PostItem } from "../../components/posts/PostItem";
import { Post } from "../../components/posts/Posts";
import Loader from "../../components/loader/Loader";
import { useParams } from "react-router-dom";
import axios from "axios";


export const Developerposts = () => {
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const {id} = useParams()

  const loadMorePosts = () => {
    const newVisiblePosts = visiblePosts + 3;
    setVisiblePosts(newVisiblePosts);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Post[]>(`${process.env.REACT_APP_BASE_URL}/posts/users/${id}`);
        setPosts(response?.data || []);
      } catch (error) {
        console.log(error);
        setPosts([]);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, [id]);

  if (isloading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(({_id: id, thumbnail, category, title, description, creator, createdAt}) => (
            <PostItem
              key={id} 
              postID={id}
              thumbnail={thumbnail}
              category={category}
              title={title}
              description={description}
              developerID={creator}
              createdAt={createdAt}
            />
          ))}
        </div>
      ) : (
        <h2 className="center">No Posts Found</h2>
      )}
      {visiblePosts < posts.length && (
        <button onClick={loadMorePosts} id="load" className="btn category">
          Load More
        </button>
      )}
    </section>
  );
};
