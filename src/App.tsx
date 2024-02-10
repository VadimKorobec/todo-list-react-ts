import "./App.css";
import { TodoList } from "./components/TodoList";

export const App = () => {
  return (
    <div className="App">
      <TodoList title='Movie'/>
    </div>
  );
};

