import { useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [list, setList] = useState([]);

  function handleSubmit(e) {
    e.preventDefault();

    setList([
      ...list,
      <li
        onClick={(e) => (e.target.className = e.target.className === "strike" ? null : "strike")}
        key={`id_${list.length}`}
      >
        {todo}
      </li>,
    ]);

    setTodo("");

    return;
  }

  return (
    <div className='App'>
      <h1>Simple Todo App</h1>
      <form onSubmit={handleSubmit}>
        <input type='text' onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button type='submit'>Save</button>
      </form>
      <ol>{list}</ol>
    </div>
  );
}

export default App;
