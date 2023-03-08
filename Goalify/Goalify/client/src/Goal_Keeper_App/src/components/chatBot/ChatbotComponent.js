import React, { useState } from "react";
import { Chatbot, createChatBotMessage } from "react-chatbot-kit";
import config from "./ChatbotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import "./ChatbotComponent.css";
import Button from "react-bootstrap/Button";

export const ChatbotComponent = () => {
  const [showBot, toggleBot] = useState(false);

  return (
    <div className="mb-2">
      <Button
        variant="outline-primary"
        size="lg"
        onClick={() => toggleBot(!showBot)}
      >
        Success Bot
      </Button>

      {showBot && (
        <Chatbot
          config={config}
          messageParser={MessageParser}
          actionProvider={ActionProvider}
        />
      )}
    </div>
  );
};
