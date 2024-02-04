import React, { useState } from 'react';
import "./likeButton.css";
import axios from 'axios';

interface LikeButtonProps {
  postId: string;
  currentUser: any;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, currentUser }) => {
  const [isLiked, setIsLiked] = useState(false);

  const handleLikeClick = async () => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/posts/${postId}/like`,
        {},
        { headers: { Authorization: `Bearer ${currentUser?.token}` } }
      );
      setIsLiked(true);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <button className='btn sm like' onClick={handleLikeClick} disabled={isLiked}>
      {isLiked ? 'Liked' : 'Like'}
    </button>
  );
};

export default LikeButton;
