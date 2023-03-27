import React, { useState } from "react";
import axios from "axios";

const OpenAIChatbot = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await axios.post(
        "https://localhost:5001/getresult",
        { prompt: message },
        { headers: { "Content-Type": "application/json" } }
      );
      setResponse(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" value={message} onChange={handleChange} />
        <button type="submit">Send</button>
      </form>
      <div>{response}</div>
    </div>
  );
};

export default OpenAIChatbot;
