import React, { useEffect, useState } from "react";
import "./chatbot.css";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(true); 

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowOptions(true);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const options = [
    "Cant create an account",
    "Cant edit my account",
    "Cant create a post",
    "Cant edit my post",
  ];

  const handleOptionClick = (option: string) => {
    let answer = "";
    switch (option) {
      case "Cant create an account":
        answer = "Did you try to clear cache and cookies? If yes, try to check your internet connection.";
        break;
      case "Cant edit my account":
        answer = "Did you try to clear cache and cookies? If yes, check the credentials again and note the profile picture is 500kb.";
        break;
      case "Cant create a post":
        answer = "Did you try to clear cache and cookies? If yes, check that the title, description, and category are filled, and the post thumbnail is 200kb max.";
        break;
      case "Cant edit my post":
        answer = "Did you try to clear cache and cookies? If yes, check that the title, description, and category are filled, and the post thumbnail is 200kb max.";
        break;
      default:
        break;
    }
    setMessages([option, answer]); 
    setShowOptions(false); 
  };
  
  useEffect(() => {
    console.log("New messages:", messages);
  }, [messages]);

  return (
    <div className={`chatbot-container ${isOpen ? "open" : ""}`}>
      <button className="chatbot-toggle-button" onClick={handleOpenChat}>
        Open Chat
      </button>
      {isOpen && (
        <div>
          <button className="chatbot-close-button" onClick={handleCloseChat}>
            X
          </button>
          <div className="chatbot-content">
            {showOptions ? (
              <div className="chatbot-options">
                <p>Hello, I am Hotthorn helper. How can I help you today?</p>
                {options.map((option, index) => (
                  <button
                    key={index}
                    className="chatbot-button"
                    onClick={() => handleOptionClick(option)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div className="chatbot-messages">
                <div className="chatbot-message">
                  <div className="question">{messages[0]}</div>
                  <div className="answer">{messages[1]}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;