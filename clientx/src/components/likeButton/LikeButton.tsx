import React, { useState, useEffect } from 'react';
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import axios from 'axios';

interface LikeButtonProps {
  postId: string;
  currentUser: any;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, currentUser }) => {
  const [likeCount, setLikeCount] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${postId}/likes`,
          { headers: { Authorization: `Bearer ${currentUser?.token}` } }
        );
        setLikeCount(response.data.likes.length);
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
      setLikeCount((prevCount) => prevCount + 1);
      setIsLiked(true);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="like-button-container">
      <button className='btn sm like' onClick={handleLikeClick} disabled={isLiked}>
        {isLiked ? <AiFillLike /> : <AiOutlineLike />}
      </button>
      <span className="like-count">{likeCount}</span>
    </div>
  );
};

export default LikeButton;
