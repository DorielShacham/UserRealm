// Import React and other necessary libraries
import React, { useEffect, useState } from "react";
import "./chatbot.css";

// Define the Chatbot component
const Chatbot: React.FC = () => {
  // Define state variables
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  // Function to handle opening the chat
  const handleOpenChat = () => {
    setIsOpen(true);
    setShowOptions(true);
  };

  // Function to handle closing the chat
  const handleCloseChat = () => {
    setIsOpen(false);
  };

  // List of options
  const options = [
    "I need help with Creating a user",
    "I need help with Editing my Account",
    "I need help with creating my post",
    "I need help with Editing my post",
  ];

  // Function to handle when an option is clicked
  const handleOptionClick = (option: string) => {
    setMessages(prevMessages => [
      ...prevMessages,
      option,
      "Did you try to reload or clear cache and cookies?",
    ]);
  };

  // useEffect to update the HTML content with messages when the messages state changes
  useEffect(() => {
    const chatbotMessages = document.getElementById("chatbot-messages");
    if (chatbotMessages) {
      chatbotMessages.innerHTML = messages.map((message, index) => `<div key=${index} class="chatbot-message">${message}</div>`).join('');
    }
  }, [messages]);

  // Return the JSX for the Chatbot component
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
                  <button key={index} className="chatbot-button" onClick={() => handleOptionClick(option)}>
                    {option}
                  </button>
                ))}
              </div>
            ) : (
              <div id="chatbot-messages" className="chatbot-messages"></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Export the Chatbot component
export default Chatbot;
