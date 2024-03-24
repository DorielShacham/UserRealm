import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../../contex/userContext';
import axios from 'axios';
import Loader from '../../components/loader/Loader';
import './deletepost.css';

interface DeletepostProps {
  postId: any;
}

export const Deletepost: React.FC<DeletepostProps> = ({ postId }: DeletepostProps) => {
  const { currentUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const token = currentUser?.token;

  const handleDelete = () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      removePost();
    }
  };

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
      console.error(error);
    }
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <button className="btn sm danger" onClick={handleDelete}>
      Delete
    </button>
  );
};
