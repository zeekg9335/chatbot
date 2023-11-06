import React, { useState} from 'react';
import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'https://2djzi835pk.execute-api.us-east-1.amazonaws.com/dev',  
    withCredentials: false  // Enable credentials
  });


  
  
const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async (event) => {
    event.preventDefault();

    if (input.trim() !== '') {
      const newMessages = [...messages, { text: input, user: 'user' }];
      setMessages(newMessages);
      setInput('');
      setLoading(true);

      // Simulate bot response
      try {
        const response = await axiosInstance.post('/', {
          question: input
        });
        const responseBody = JSON.parse(response.data.body); // response from the lambda function
        const botResponse = responseBody.message;
        console.log('Bot Response:', botResponse);
        const preFormatedResponse = <pre>{botResponse}</pre>
        setMessages([...newMessages, { text: preFormatedResponse, user: 'bot' }]);
      } catch (error) {
        console.error('Error sending message to the bot:', error);
      }finally {
        setLoading(false);
      }
    }
  };
  const clearChat = async () => {
    try {
      setMessages([]); // Clear the chat history in the frontend
      const response = await axiosInstance.post('https://gxvrtikdbl.execute-api.us-east-1.amazonaws.com/dev'); 
    } catch (error) {
      console.error('Error clearing chat history:', error);
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
      <div className="loading-gif-container">
        {loading && (
          <img src="/loading.gif" alt="Loading" 
          style={{ width: '128px', height: '23px' }}/>
          
        )}
      </div>
      <form onSubmit={handleSendMessage} className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          placeholder="Type a message..."
        />
        <button type="submit">Send</button>
        <button onClick={clearChat}>Clear Chat</button>
      </form>
    </div>
  );
};


export default Chatbot;


