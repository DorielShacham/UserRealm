import axios from "axios";
import { useState, useEffect } from "react";
import { PostItem } from "./PostItem";
import Loader from "../loader/Loader";
import { delay } from "../../modules/setTimeout";
import dummy_post from "../../dummy_data/post.json";
import { How } from "../how/How";

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
  const [posts, setPosts] = useState<Post[]>([]);
  const [isloading, setIsLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Post[]>([]);

  const loadMorePosts = async () => {
    const newVisiblePosts = visiblePosts + 3;
    setLoadingMore(true);
    try {
      const response = await axios.get<Post[]>(
        `${process.env.REACT_APP_BASE_URL}/posts/limited?limit=${newVisiblePosts}`
      );
      setPosts(response?.data || []);
      setVisiblePosts(newVisiblePosts);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  const searchPosts = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get<Post[]>(
        `${process.env.REACT_APP_BASE_URL}/posts/`
      );
      const filteredPosts = response.data.filter(
        (post) =>
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filteredPosts);
    } catch (error) {
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    searchPosts();
  };

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      try {
        let response;
        if (process.env.NODE_ENV === "development") {
          await delay(500);
          response = dummy_post as any;
        } else {
          response = await axios.get<Post[]>(
            `${process.env.REACT_APP_BASE_URL}/posts/limited`
          );
        }
        setPosts(response?.data || []);
        setVisiblePosts((prev) => prev + 3);
      } catch (error) {
        console.error(error);
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
          <h1>Hotthorn</h1>
          <h2>Showcasing Your Creativity</h2>
          <p>
            Connect with a community of passionate individuals. Share your
            latest projects, websites, and apps. Inspire others and get
            inspired!
          </p>
          <How />
        </div>
      </div>
      <h1 className="latest">Latest Projects</h1>
      <form onSubmit={handleSearchSubmit} className="search__container">
        <input
          type="text"
          name="search"
          className="search"
          id="search"
          value={searchQuery}
          placeholder="Search for blog post..."
          onChange={handleInputChange}
        />
        <button type="submit" className="btn">
          Search
        </button>
      </form>
      {searchQuery.trim() !== "" ? (
        <div className="container posts__container">
          {searchResults.length > 0 ? (
            searchResults.map(
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
            )
          ) : (
            <h2 className="center">No Posts Found</h2>
          )}
        </div>
      ) : (
        <div className="container posts__container">
          {posts.length > 0 ? (
            posts.map(
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
            )
          ) : (
            <h2 className="center">No Posts Found</h2>
          )}
        </div>
      )}
      {loadingMore ? (
        <div id="loader" className="btn category">
          Loading...
        </div>
      ) : (
        <button onClick={loadMorePosts} id="load" className="btn category">
          Load More
        </button>
      )}
    </section>
  );
};
