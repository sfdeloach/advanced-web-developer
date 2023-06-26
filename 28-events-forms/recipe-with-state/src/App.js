import Navbar from "./Navbar";
import { useState } from "react";

// 0 1 2 3 4 5 6 7 8 9 a b c d e f
// f e d c b a 9 8 7 6 5 4 3 2 1 0

const LIGHT_MODE = {
  text: "#000000",
  hover: "#777777",
  active: "#bbbbbb",
  gradient: "#eeeeee",
  background: "#ffffff",
};

const DARK_MODE = {
  text: "#ffffff",
  hover: "#888888",
  active: "#444444",
  gradient: "#111111",
  background: "#000000",
};

function App() {
  const [mode, setMode] = useState("dark_mode");

  return (
    <div className='App'>
      <Navbar
        displayMode={mode}
        onDisplayClick={() => {
          mode === "dark_mode" ? setMode("light_mode") : setMode("dark_mode");
        }}
      />
    </div>
  );
}

export default App;
