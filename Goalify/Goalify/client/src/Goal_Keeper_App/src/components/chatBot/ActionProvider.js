// ActionProvider.js
class ActionProvider {
  constructor(createChatBotMessage) {
    this.createChatBotMessage = createChatBotMessage;
  }

  greet() {
    const greetingMessage = this.createChatBotMessage("Hello!");
    this.updateChatbotState(greetingMessage);
  }

  updateChatbotState(message) {
    // TODO: Update the chatbot state with the given message
  }
}

export default ActionProvider;
