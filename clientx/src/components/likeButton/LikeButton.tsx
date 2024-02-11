import React, { useState, useEffect } from 'react';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import axios from 'axios';

interface LikeButtonProps {
  postId: string;
  currentUser: any;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, currentUser }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${postId}/likes`,
          { headers: { Authorization: `Bearer ${currentUser?.token}` } }
        );
        setLikesCount(response.data.likes.length);
        setIsLiked(response.data.likes.includes(currentUser?.userId));
      } catch (error) {
        console.error('Error fetching likes:', error);
      }
    };

    if (currentUser) {
      fetchLikes();
    }
  }, [postId, currentUser]);

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${currentUser?.token}` } }
      );
      setIsLiked(true);
      setLikesCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };


  return (
    <div>
      <button className='btn sm like' onClick={handleLikeClick} disabled={isLiked}>
        {isLiked ? <AiFillLike /> : <AiOutlineLike />}
      </button>
      <span>{likesCount}</span>
    </div>
  );
};


export default LikeButton;
