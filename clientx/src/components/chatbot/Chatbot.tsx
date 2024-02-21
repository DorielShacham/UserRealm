// Chatbot.tsx
import React, { useEffect, useState } from "react";
import "./chatbot.css";

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowOptions(true);
    console.log("these are the messages" + messages, "these are the options" + showOptions)
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const options = [
    "I need help with Creating a user",
    "I need help with Editing my Account",
    "I need help with creating my post",
    "I need help with Editing my post",
  ];

  const handleOptionClick = (option: string) => {
    console.log("Previous messages:", messages);
    setMessages(prevMessages => [
      ...prevMessages,
      option,
      "Did you try to reload or clear cache and cookies?",
    ]);
    console.log("New messages:", messages);
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
                {messages.map((message, index) => (
                  <div key={index} className="chatbot-message">
                    {message}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
