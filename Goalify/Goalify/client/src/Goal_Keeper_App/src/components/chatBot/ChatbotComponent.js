import { useState } from "react";
import { createChatBotMessage } from "react-chatbot-kit";
import axios from "axios";
// import Chatbot from "react-chatbot-kit";
import Chatbot from "react-chatbot-kit";
import config from "./ChatbotConfig";
import MessageParser from "./MessageParser";
import ActionProvider from "./ActionProvider";
import "./ChatbotComponent.css";
import Button from "react-bootstrap/Button";

export const ChatbotComponent = () => {
  const [messages, setMessages] = useState([]);
  const [showBot, toggleBot] = useState(false);

  // create a new instance of the MessageParser class
  const actionProvider = new ActionProvider(createChatBotMessage, setStateFunc);
  const messageParser = new MessageParser(actionProvider); // use new keyword
  // create a new instance of the ActionProvider class

  const handleSendMessage = async (message) => {
    console.log("handleSendMessage called");

    const response = await axios.post(
      "https://api.openai.com/v1/engines/davinci-codex/completions",
      {
        prompt: message,
        max_tokens: 60,
        temperature: 0.5,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.izbiatIWCQfisGjltQlMT3BlbkFJjO0Yu8b4B9cR2u5N544c}`,
          "Content-Type": "application/json",
          // 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
        },
      }
    );

    const answer = response.data.choices[0].text.trim();
    console.log(answer);

    const newMessage = createChatBotMessage(answer);

    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

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
        <div style={{ maxWidth: "400px" }}>
          <Chatbot
            config={config}
            messageParser={messageParser}
            actionProvider={actionProvider} // pass the instance of ActionProvider
            handleSendMessage={handleSendMessage}
          />
        </div>
      )}
    </div>
  );
};

// import React, { useState } from "react";
// import { createChatBotMessage } from "react-chatbot-kit";
// import axios from "axios";
// import { Chatbot } from "react-chatbot-kit"; // replace with the name of your Chatbot component file

// import config from "./ChatbotConfig";
// import MessageParser from "./MessageParser";
// import ActionProvider from "./ActionProvider";
// import "./ChatbotComponent.css";
// import Button from "react-bootstrap/Button";

// export const ChatbotComponent = () => {
//   const [showBot, toggleBot] = useState(false);

//   return (
//     <div className="mb-2">
//       <Button
//         variant="outline-primary"
//         size="lg"
//         onClick={() => toggleBot(!showBot)}
//       >
//         Success Bot
//       </Button>

//       {showBot && (
//         <div style={{ maxWidth: "400px" }}>
//           <Chatbot
//             config={config}
//             messageParser={MessageParser}
//             actionProvider={ActionProvider}
//           />
//         </div>
//       )}
//     </div>
//   );
// };

// import React, { useState } from "react";
// import config from "./ChatbotConfig";
// import MessageParser from "./MessageParser";
// import ActionProvider from "./ActionProvider";
// import "./ChatbotComponent.css";
// import Button from "react-bootstrap/Button";
// import { Chatbot, createChatBotMessage } from "react-chatbot-kit";
// import axios from "axios";

// export const ChatbotComponent = () => {
//   const [showBot, toggleBot] = useState(false);

//   return (
//     <div className="mb-2">
//       <Button
//         variant="outline-primary"
//         size="lg"
//         onClick={() => toggleBot(!showBot)}
//       >
//         Success Bot
//       </Button>

//       {showBot && (
//         <div style={{ maxWidth: "400px" }}>
//           <Chatbot
//             config={config}
//             messageParser={MessageParser}
//             actionProvider={ActionProvider}
//             handleSendMessage={handleSendMessage}
//           />
//         </div>
//       )}
//     </div>
//   );
// };
