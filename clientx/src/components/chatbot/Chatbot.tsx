import React, { useState } from 'react';
import './chatbot.css';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setMessages([...messages, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className="chatbot-message">
            {message}
          </div>
        ))}
      </div>
      <form onSubmit={handleMessageSubmit} className="chatbot-input-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type a message..."
          className="chatbot-input"
        />
        <button type="submit" className="chatbot-send-button">
          Send
        </button>
      </form>
    </div>
  );
};

export default Chatbot;