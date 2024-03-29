import React, { useState, useEffect } from "react";
import './likeButton.css'
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import axios from "axios";
import dummy_response from '../../dummy_data/like_response.json'
import { delay } from '../../modules/setTimeout';

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
        let response;
        if (process.env.NODE_ENV === "development") {
          await delay(1000);
          response = dummy_response;
        } else {
          response = await axios.get(
            `${process.env.REACT_APP_BASE_URL}/posts/${postId}`,
            { headers: { Authorization: `Bearer ${currentUser?.token}` } }
          );
        }
        setIsLiked(response.data.isLiked);
        setLikeCount(response.data.likes.length);
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