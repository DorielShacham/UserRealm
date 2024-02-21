import React, { useState } from 'react';
import './chatbot.css';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  const handleOpenChat = () => {
    setIsOpen(true);
    setShowOptions(true);
  };

  const handleCloseChat = () => {
    setIsOpen(false);
  };

  const handleOptionClick = (option: string) => {
    setMessages([...messages, option]);
    setShowOptions(false);
    setMessages([...messages, 'Did you try to reload or clear cache and cookies?']);
  };

  const renderChatContent = () => {
    return (
      <div className={`chatbot-container ${isOpen ? 'open' : ''}`}>
        <button className="chatbot-toggle-button" onClick={handleOpenChat}>
          Open Chat
        </button>
        {isOpen && (
          <div>
            <button className="chatbot-close-button" onClick={handleCloseChat}>
              X
            </button>
            {showOptions && (
              <div className="chatbot-options">
                <p>Hello, I am Hotthorn helper. How can I help you today?</p>
                <button onClick={() => handleOptionClick('I need help with Creating a user')}>
                  I need help with Creating a user
                </button>
                <button onClick={() => handleOptionClick('I need help with Editing my Account')}>
                  I need help with Editing my Account
                </button>
                <button onClick={() => handleOptionClick('I need help with creating my post')}>
                  I need help with creating my post
                </button>
                <button onClick={() => handleOptionClick('I need help with Editing my post')}>
                  I need help with Editing my post
                </button>
              </div>
            )}
            {messages.length > 0 && (
              <div className="chatbot-messages">
                {messages.map((message, index) => (
                  <div key={index} className="chatbot-message">
                    {message}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return renderChatContent();
};

export default Chatbot;
