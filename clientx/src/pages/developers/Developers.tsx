import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";

// Define the type of developer object
interface Developer {
  _id: string;
  avatar: string;
  name: string;
  posts: number;
}

export const Developers = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userRole, setUserRole] = useState<string>("");

  const handleDelete = async (userId: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/users/${userId}`);
      setDevelopers(developers.filter((developer) => developer._id !== userId));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch developers data
        const developersResponse = await axios.get<Developer[]>(
          `${process.env.REACT_APP_BASE_URL}/users`
        );
        setDevelopers(developersResponse.data);

        // Fetch user's role
        const roleResponse = await axios.get<string>(
          `${process.env.REACT_APP_BASE_URL}/users/role`
        );
        setUserRole(roleResponse.data);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="developers">
      {developers.length > 0 ? (
        <div className="container developers__container">
          {developers.map((developer) => {
            const { _id, avatar, name, posts } = developer;
            const hasFiveOrMorePosts = posts >= 5;

            return (
              <div
                key={_id}
                className={`developer ${
                  hasFiveOrMorePosts ? "has-five-posts" : ""
                }`}
              >
                <Link to={`/posts/users/${_id}`} className="developer__link">
                  <div className="developer__avatar">
                    <img src={avatar} alt={`Image of ${name}`} />
                  </div>
                  <div className="developer__info">
                    <h4>{name}</h4>
                    <p>
                      <strong>Contribution:</strong> {posts}
                    </p>
                  </div>
                </Link>
                {/* Render delete button if user is admin */}
                {userRole === 'admin' && (
                  <button onClick={() => handleDelete(_id)}>Delete</button>
                )}
              </div>
            );
          })}
        </div>
      ) : (
        <h2 className="center">No Users/Developers Found</h2>
      )}
    </section>
  );
};
