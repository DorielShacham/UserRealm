import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../contex/userContext';
import axios from 'axios';
import Loader from '../../components/loader/Loader';
import './deletepost.css';
import { useState } from 'react';

interface DeletepostProps {
  postId: any;
}

export const Deletepost: React.FC<DeletepostProps> = ({ postId }: DeletepostProps) => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const token = currentUser?.token;

  const removePost = async () => {
    setIsLoading(true);
    try {
      const response = await axios.delete(`${process.env.REACT_APP_BASE_URL}/posts/${postId}`, {
        withCredentials: true,
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.status === 200) {
        if (location.pathname === `/myposts/${currentUser?.userId}`) {
          navigate(0);
        } else {
          navigate('/');
        }
      }
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Redirect to login page for offline users
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  if(isLoading){
    <Loader />
  }

  return (
    <button className="btn sm danger" onClick={removePost}>
      Delete
    </button>
  );
};
