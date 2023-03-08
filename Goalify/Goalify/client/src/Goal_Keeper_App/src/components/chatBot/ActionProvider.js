// ActionProvider.js
class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  // Handles user messages related to goal setting
  handleGoalSetting = () => {
    const message = this.createChatBotMessage(
      "Here are some tips for setting achievable goals:"
    );
    const subMessage1 = this.createChatBotMessage(
      "- Start small and work your way up"
    );
    const subMessage2 = this.createChatBotMessage(
      "- Make your goals specific and measurable"
    );
    const subMessage3 = this.createChatBotMessage(
      "- Set a deadline for achieving your goal"
    );

    this.setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        message,
        subMessage1,
        subMessage2,
        subMessage3,
      ],
    }));
  };

  // Handles user messages related to tracking progress on a goal
  handleGoalTracking = () => {
    const message = this.createChatBotMessage(
      "Here are some tips for tracking progress on your goal:"
    );
    const subMessage1 = this.createChatBotMessage(
      "- Break your goal down into smaller tasks"
    );
    const subMessage2 = this.createChatBotMessage(
      "- Keep a journal or spreadsheet to track progress"
    );
    const subMessage3 = this.createChatBotMessage(
      "- Celebrate small wins along the way"
    );

    this.setState((prevState) => ({
      ...prevState,
      messages: [
        ...prevState.messages,
        message,
        subMessage1,
        subMessage2,
        subMessage3,
      ],
    }));
  };

  greet() {
    const greetingMessage = this.createChatBotMessage("Hello!");
    this.updateChatbotState(greetingMessage);
  }

  updateChatbotState(message) {
    // Retrieve the current state of the chatbot.
    const { messages } = this.getState();

    // Add the new message to the end of the messages array.
    const newMessages = [...messages, message];

    // Update the state of the chatbot with the new messages array.
    this.setState({ messages: newMessages });
  }
}

export default ActionProvider;
