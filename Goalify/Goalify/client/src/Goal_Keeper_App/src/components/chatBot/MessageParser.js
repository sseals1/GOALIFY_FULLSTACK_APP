// MessageParser.js
class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    if (message.toLowerCase().includes("hello")) {
      this.actionProvider.greet();
    }
  }
}

export default MessageParser;
