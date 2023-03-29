import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavigationBar } from "./components/nav/NavigationBar";
import { OpenAIChatbot } from "./components/OpenAIChatBot/OpenAIChatBot";

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <div className="mx-3 col-md-3 offset-md-3">
        <OpenAIChatbot />
      </div>
      <header className="App-header"></header>
    </div>
  );
}

export default App;
