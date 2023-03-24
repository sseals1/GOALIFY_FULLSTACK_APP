import { createChatBotMessage } from "react-chatbot-kit";

const config = {
  initialMessages: [
    createChatBotMessage(
      "Hi, I'm Success Bot. How can I help you with your goals today?"
    ),
  ],
  botName: "Chatbot",
  customStyles: {
    botMessageBox: {
      backgroundColor: "#f0ad4e",
    },
    chatButton: {
      backgroundColor: "#00FF7F",
    },
  },
};

export default config;
