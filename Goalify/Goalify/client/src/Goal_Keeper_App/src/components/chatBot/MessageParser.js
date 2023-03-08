class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parseMessage = (message) => {
    const lowerCaseMessage = message.toLowerCase();

    if (lowerCaseMessage.includes("goal") && lowerCaseMessage.includes("set")) {
      this.actionProvider.handleGoalSetting();
    } else if (
      lowerCaseMessage.includes("goal") &&
      lowerCaseMessage.includes("track")
    ) {
      this.actionProvider.handleGoalTracking();
    } else {
      // Handle unrecognized input
      const message = this.actionProvider.createChatBotMessage(
        "I'm sorry, I didn't understand that. Can you please rephrase your question?"
      );
      this.actionProvider.updateChatbotState(message);
    }
  };
}

export default MessageParser;
