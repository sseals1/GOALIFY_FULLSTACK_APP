import React, { useState } from "react";
import {
  Chatbot,
  MessageList,
  Message,
  QuickReply,
  TextInput,
  // ChatbotHeader,
  createChatBotMessage,
} from "react-chatbot-kit";
import { ChatbotHeader } from "react-chatbot-kit";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import config from "./config";

export const Chatbot3 = () => {
  const [messages, setMessages] = useState([]);

  const handleNewUserMessage = async (newMessage) => {
    // Add user message to messages array
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: 1, message: newMessage },
    ]);

    // Parse user message and determine action
    const message = await MessageParser.parse(newMessage);
    const action = message.action;

    // Generate chatbot response using ActionProvider
    ActionProvider[action]((message) =>
      setMessages((prevMessages) => [...prevMessages, message])
    );
    const response = createChatBotMessage(message.response);
  };

  return (
    <Chatbot
      handleNewUserMessage={handleNewUserMessage}
      messageParser={MessageParser}
      actionProvider={ActionProvider}
      config={config}
      // components={
      //   {
      //     // Customize the appearance of the chatbot components
      //     MessageList: (props) => (
      //       <MessageList {...props} className="custom-message-list" />
      //     ),
      //     Message: (props) => <Message {...props} className="custom-message" />,
      //     QuickReply: (props) => (
      //       <QuickReply {...props} className="custom-quick-reply" />
      //     ),
      //     TextInput: (props) => (
      //       <TextInput {...props} className="custom-text-input" />
      //     ),
      //   }
      // }
    />
  );
};
