import "./App.css";
import { TodoList } from "./components/TodoList";

const tasks1 = [
  { id: 1, title: "CSS", isDone: true },
  { id: 2, title: "JS", isDone: true },
  { id: 3, title: "React", isDone: false },
];

export const App = () => {
  return (
    <div className="App">
      <TodoList title="Movie" tasks={tasks1} />
    </div>
  );
};
