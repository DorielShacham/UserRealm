import React, { useState, useEffect } from "react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";
import axios from "axios";
import dummy_response from '../../dummy_data/like_response.json'
import { delay } from '../../modules/setTimeout';

interface LikeButtonProps {
  postId: string;
  currentUser: any;
}

const LikeButton: React.FC<LikeButtonProps> = ({ postId, currentUser }) => {
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
        console.log("aaaaaaaaaa", response.data.likeCount);
        setIsLiked(response.data.isLiked);
        setLikeCount(response.data.likes.length);
        console.log(response);
      } catch (error) {
        console.error("Error checking if user liked post:", error);
      }
    };

    console.log('bbbbbbbb', currentUser)
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
    <div className="like-button-container">
      <button
        className="btn sm like"
        onClick={handleLikeClick}
        disabled={isLiked}
      >
        {isLiked ? <AiFillLike /> : <AiOutlineLike />}
      </button>
      <span className="like-count">{likeCount}</span>
    </div>
  );
};

export default LikeButton;
