import React, { useState} from 'react';
import axios from 'axios';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (input.trim() !== '') {
      const newMessages = [...messages, { text: input, user: 'user' }];
      setMessages(newMessages);
      setInput('');

      // Simulate bot response
      try {
        const response = await axios.post('YOUR_API_ENDPOINT', {
          message: input
        });
        setMessages([...newMessages, { text: response.data.message, user: 'bot' }]);
      } catch (error) {
        console.error('Error sending message to the bot:', error);
      }
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div key={index} className={message.user}>
            {message.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbot;
