import { useState } from "react";
import { FilterValuesType } from "../App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListProps = {
  title: string;
  tasks: TaskType[];
  onDelete: (id: string) => void;
  onFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
};

export const TodoList = ({
  title,
  tasks,
  onDelete,
  onFilter,
  addTask,
}: TodoListProps) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setValue("");
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={value} onChange={handleChange} />
          <button type="button" onClick={() => addTask(value)}>
            Add
          </button>
        </form>
      </div>
      <ul style={{ listStyle: "none" }}>
        {tasks.map(({ id, title, isDone }) => (
          <li key={id}>
            <input type="checkbox" checked={isDone} />
            <span>{title}</span>
            <button onClick={() => onDelete(id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={() => onFilter("all")}>All</button>
        <button onClick={() => onFilter("active")}>Active</button>
        <button onClick={() => onFilter("completed")}>Completed</button>
      </div>
    </div>
  );
};
