import React, { useState, useEffect } from "react";
import './likeButton.css'
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import axios from "axios";

interface LikeButtonProps {
  postId: string;
  currentUser: any;
  className?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, currentUser, className }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const checkUserLikedPost = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/posts/${postId}/likes`,
          { headers: { Authorization: `Bearer ${currentUser?.token}` } }
        );
        const isLikedByUser = response.data.isLikedByUser;
        const likesCount = response.data.likesCount;
        setIsLiked(isLikedByUser);
        setLikeCount(likesCount);
      } catch (error) {
        console.error("Error checking if user liked post:", error);
      }
    };
    if (currentUser) {
      checkUserLikedPost();
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
      setLikeCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className={`like-button-container ${className}`}>
      <button
        className={`btn sm like ${className}`}
        onClick={handleLikeClick}
        disabled={isLiked}
      >
        {isLiked ? <AiFillLike /> : <AiOutlineLike />}
      </button>
      <span className={`like-count ${className}`}>{likeCount}</span>
    </div>
  );
};

export default LikeButton;
