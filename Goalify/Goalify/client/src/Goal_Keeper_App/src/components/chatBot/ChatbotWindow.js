import { useState } from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import axios from "axios";

function Chatbot() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: message,
        max_tokens: 60,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const answer = response.data.choices[0].text.trim();

    const newMessage = createChatBotMessage(answer);

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  return <div>{/* render chatbot component here */}</div>;
}

export default Chatbot;
