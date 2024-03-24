import "./developers.css";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Loader from "../../components/loader/Loader";

interface Developer {
  _id: string;
  avatar: string;
  name: string;
  posts: number;
}

export const Developers = () => {
  const [developers, setDevelopers] = useState<Developer[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userRoles, setUserRoles] = useState<{ [key: string]: string }>({}); // Explicitly define the shape of userRoles

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
        const response = await axios.get<Developer[]>(
          `${process.env.REACT_APP_BASE_URL}/users`
        );
        console.log('Response data:', response.data); 
  
        setDevelopers(response.data);
  
        const rolePromises = response.data.map(async (developer) => {
          console.log('Current developer:', developer); 
          const roleResponse = await axios.get<string>(
            `${process.env.REACT_APP_BASE_URL}/users/${developer._id}/role`
          );
          return { _id: developer._id, role: roleResponse.data };
        });
  
        const roles = await Promise.all(rolePromises);
        const roleMap = roles.reduce<{ [key: string]: string }>((acc, { _id, role }) => {
          acc[_id] = role;
          return acc;
        }, {});
        
  
        setUserRoles(roleMap);
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
            const role = userRoles[_id]; 
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
                {role === "admin" && role !== "admin" && (
                  <button
                    className="btn danger"
                    onClick={() => handleDelete(_id)}
                  >
                    Delete user
                  </button>
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
