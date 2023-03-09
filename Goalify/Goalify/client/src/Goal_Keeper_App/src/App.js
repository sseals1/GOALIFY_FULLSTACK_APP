import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavigationBar } from "./components/nav/NavigationBar";
import { Chatbot } from "react-chatbot-kit";

function App() {
  const config = {
    initialMessages: [
      {
        type: "text",
        content: "Hello! I'm a chatbot. How can I assist you today?",
      },
    ],
  };

  return (
    <div className="App">
      <NavigationBar />
      <Chatbot config={config} />
      <header className="App-header"></header>
    </div>
  );
}

export default App;

// {
/* <header className="App-header">
        
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */
// }

// import React from "react";
// import Header from "./Header";

// function App() {
// return (

// // Using the newly created Header
// // component in this main component
// <Header/>
// );
// }
// export default App;
