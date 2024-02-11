import './developers.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../components/loader/Loader';

export const Developers = () => {
  const [developers, setDevelopers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getDevelopers = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/users`);
        setDevelopers(response.data)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false);
    }
    getDevelopers()
  }, [])

  if (isLoading) {
    return <Loader />;
  }

  return (
    <section className="developers">
      {developers.length > 0 ? (
        <div className="container developers__container">
          {developers.map((developer) => {
            const { _id: id, avatar, name, posts } = developer;

            return (
              <Link key={id} to={`/posts/users/${id}`} className="developer">
                <div className="developer__avatar">
                  <img src={`${avatar}`} alt={`Image of ${name}`} />
                </div>
                <div className="developer__info">
                  <h4>{name}</h4>
                  <p>{posts}</p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <h2 className='center'>No Users/Developers Found</h2>
      )}
    </section>
  );
};
