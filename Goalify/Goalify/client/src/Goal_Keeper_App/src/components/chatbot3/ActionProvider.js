class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  setGoal = () => {
    const message = this.createChatBotMessage(
      "Great, let's set a goal. What would you like to achieve?"
    );
    this.addMessageToState(message);
  };

  achieveGoal = () => {
    const message = this.createChatBotMessage(
      "Awesome! Here are some tips for achieving your goal: ..."
    );
    this.addMessageToState(message);
  };

  handleGoalSuccess = () => {
    const message = this.createChatBotMessage(
      "Awesome job! You're well on your way to achieving your goal. Keep up the good work!"
    );
    this.addMessageToState(message);
  };

  handleGoalFailure = () => {
    const message = this.createChatBotMessage(
      "Don't give up! It's okay to stumble on your way to achieving your goal. Here are some tips to help you get back on track:"
    );
    const message2 = this.createChatBotMessage(
      "1. Break your goal down into smaller, more manageable steps."
    );
    const message3 = this.createChatBotMessage(
      "2. Find an accountability partner or support group to keep you motivated."
    );
    const message4 = this.createChatBotMessage(
      "3. Celebrate small successes along the way to keep yourself motivated."
    );
    this.addMessageToState(message);
    this.addMessageToState(message2);
    this.addMessageToState(message3);
    this.addMessageToState(message4);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;

// import { createChatBotMessage } from "react-chatbot-kit";

// class ActionProvider {
//   constructor(createChatBotMessage, setStateFunc) {
//     this.createChatBotMessage = createChatBotMessage;
//     this.setState = setStateFunc;
//   }

//   handleGoalSuccess = () => {
//     const message = this.createChatBotMessage(
//       "Awesome job! You're well on your way to achieving your goal. Keep up the good work!"
//     );
//     this.addMessageToState(message);
//   };

//   handleGoalFailure = () => {
//     const message = this.createChatBotMessage(
//       "Don't give up! It's okay to stumble on your way to achieving your goal. Here are some tips to help you get back on track:"
//     );
//     const message2 = this.createChatBotMessage(
//       "1. Break your goal down into smaller, more manageable steps."
//     );
//     const message3 = this.createChatBotMessage(
//       "2. Find an accountability partner or support group to keep you motivated."
//     );
//     const message4 = this.createChatBotMessage(
//       "3. Celebrate small successes along the way to keep yourself motivated."
//     );
//     this.addMessageToState(message);
//     this.addMessageToState(message2);
//     this.addMessageToState(message3);
//     this.addMessageToState(message4);
//   };

//   addMessageToState = (message) => {
//     this.setState((prevState) => ({
//       ...prevState,
//       messages: [...prevState.messages, message],
//     }));
//   };
// }

// export default ActionProvider;
