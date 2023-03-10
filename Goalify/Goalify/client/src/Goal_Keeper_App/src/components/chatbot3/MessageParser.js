class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse = (message) => {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("set a goal")) {
      this.actionProvider.setGoal();
      return this.actionProvider.createChatBotMessage(
        "Great, let's set a goal. What would you like to achieve?"
      );
    }

    if (lowerCaseMessage.includes("achieve")) {
      this.actionProvider.achieveGoal();
      return this.actionProvider.createChatBotMessage(
        "Awesome! Here are some tips for achieving your goal: ..."
      );
    }

    return this.actionProvider.createChatBotMessage(
      "I'm sorry, I'm not sure what you're asking. Please try again."
    );
  };
}

export default MessageParser;

// import { createChatBotMessage } from "react-chatbot-kit";

// class MessageParser {
//   constructor(actionProvider) {
//     this.actionProvider = actionProvider;
//   }

//   parse = (message) => {
//     const lowerCaseMessage = message.toLowerCase();

//     if (lowerCaseMessage.includes("set a goal")) {
//       this.actionProvider.setGoal();
//       return createChatBotMessage(
//         "Great, let's set a goal. What would you like to achieve?"
//       );
//     }

//     if (lowerCaseMessage.includes("achieve")) {
//       this.actionProvider.achieveGoal();
//       return createChatBotMessage(
//         "Awesome! Here are some tips for achieving your goal: ..."
//       );
//     }

//     return createChatBotMessage(
//       "I'm sorry, I'm not sure what you're asking. Please try again."
//     );
//   };
// }

// export default MessageParser;
