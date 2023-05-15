import { Component } from "react";
import TopBar from "./TopBar";
import RecipeList from "./RecipeList";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopBar />
        <RecipeList />
      </div>
    );
  }
}

export default App;
