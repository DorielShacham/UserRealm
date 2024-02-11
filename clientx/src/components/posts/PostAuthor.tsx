import "./posts.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import axios from "axios";
import ReactTimeAgo from 'react-time-ago';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)


interface PostAuthorProps {
  developerID?: number | string; 
  createdAt?: any;
}

interface Developer {
  name: string; 
  avatar: string;
}

export const PostAuthor: React.FC<PostAuthorProps> = ({ developerID, createdAt }) => {
  const [developer, setDeveloper] = useState<Developer | null>(null);

  useEffect(() => {
    const getDeveloper = async () => {
      try {
        const response = await axios.get<Developer>(`${process.env.REACT_APP_BASE_URL}/users/${developerID}`);
        setDeveloper(response?.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (developerID) {
      getDeveloper();
    }
  }, [developerID]);

  return (
    <Link to={`/posts/users/${developerID}`} className="post__author">
      <div className="post__author-avatar">
      <img className="postAvatarImg" src={`${(developer as Developer)?.avatar}`} alt="user avatar" />
      </div>
      <div className="post__author-details">
        {developer && <h5>By: {developer.name}</h5>}
        {createdAt && <small><ReactTimeAgo date={new Date(createdAt)} locale='en-US' /></small>}
      </div>
    </Link>
  );
};