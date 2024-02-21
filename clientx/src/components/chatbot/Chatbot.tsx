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
  
  // useEffect to log new messages when the messages state changes
  useEffect(() => {
    console.log("New messages:", messages);
  }, [messages]);

  // Return the JSX for the Chatbot component
  return (
    React.createElement("div", { className: `chatbot-container ${isOpen ? "open" : ""}` },
      React.createElement("button", { className: "chatbot-toggle-button", onClick: handleOpenChat }, "Open Chat"),
      isOpen && (
        React.createElement("div", null,
          React.createElement("button", { className: "chatbot-close-button", onClick: handleCloseChat }, "X"),
          React.createElement("div", { className: "chatbot-content" },
            showOptions ? (
              React.createElement("div", { className: "chatbot-options" },
                React.createElement("p", null, "Hello, I am Hotthorn helper. How can I help you today?"),
                options.map((option, index) => (
                  React.createElement("button", { key: index, className: "chatbot-button", onClick: () => handleOptionClick(option) }, option)
                ))
              )
            ) : (
              React.createElement("div", { className: "chatbot-messages" },
                messages.map((message, index) => (
                  React.createElement("div", { key: index, className: "chatbot-message" }, message)
                ))
              )
            )
          )
        )
      )
    )
  );
};

// Export the Chatbot component
export default Chatbot;
