import axios from "axios";
import { useState, useEffect } from "react";
import { PostItem } from "./PostItem";
import Loader from "../loader/Loader";

export interface Post {
  _id: any;
  id: any;
  thumbnail: string;
  category: string;
  title: string;
  description: string;
  creator: any;
  developerID?: number;
  createdAt: any;
}

export const Posts = () => {
  const [visiblePosts, setVisiblePosts] = useState(3);
  const [totalPosts, setTotalPosts] = useState(0);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const loadMorePosts = async () => {
    const newVisiblePosts = visiblePosts + 3;
    setLoadingMore(true);

    try {
      const response = await axios.get<Post[]>(
        `${process.env.REACT_APP_BASE_URL}/posts/limited?limit=${newVisiblePosts}`
      );
      setPosts(response?.data || []);
      setVisiblePosts((prev) => prev + 3);
    } catch (error) {
      console.log("API Error:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get<Post[]>(
          `${process.env.REACT_APP_BASE_URL}/posts/limited`
        );
        setPosts(response?.data || []);
        setTotalPosts(response?.data.length || 0);
      } catch (error) {
        console.log(error);
        setPosts([]);
      }
      setIsLoading(false);
    };
    fetchPosts();
  }, []);

  if (isloading) {
    return <Loader />;
  }

  return (
    <section className="posts">
      <div className="hero__box">
        <div className="subHero__box">
          <h1>UserRealm</h1>
          <h2>Showcasing Your Creativity</h2>
          <p>
            Connect with a community of passionate individuals. Share your
            latest projects, websites, and apps. Inspire others and get
            inspired!
          </p>
        </div>
      </div>
      <h1 className="latest">Latest Projects</h1>
      {posts.length > 0 ? (
        <div className="container posts__container">
          {posts.map(
            ({
              _id: id,
              thumbnail,
              category,
              title,
              description,
              creator,
              createdAt,
            }) => (
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
            )
          )}
        </div>
      ) : (
        <h2 className="center">No Posts Found</h2>
      )}
      {loadingMore ? (
        <div id="loader" className="btn category">Loading...</div>
      ) : (
        <button onClick={loadMorePosts} id="load" className="btn category">
          Load More
        </button>
      )}
    </section>
  );
};
