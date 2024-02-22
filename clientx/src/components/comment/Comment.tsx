import React from 'react';

interface CommentProps {
  commenter: string;
  text: string;
}

const Comment: React.FC<CommentProps> = ({ commenter, text }) => {
  return (
    <div className="comment">
      <h4>{commenter}</h4>
      <p>{text}</p>
    </div>
  );
};

export default Comment;
