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
  onStatus: (id: string, isDone: boolean) => void;
};

export const TodoList = ({
  title,
  tasks,
  onDelete,
  onFilter,
  addTask,
  onStatus,
}: TodoListProps) => {
  const [value, setValue] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value.trim());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === "") {
      return;
    }
    addTask(value);
    reset();
  };

  const reset = () => {
    setValue("");
  };

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <form onSubmit={handleSubmit}>
          <input type="text" value={value} onChange={handleChange} />
          <button type="submit">Add</button>
        </form>
      </div>
      <ul style={{ listStyle: "none" }}>
        {tasks.map(({ id, title, isDone }) => (
          <li key={id}>
            <input
              type="checkbox"
              checked={isDone}
              onChange={() => onStatus(id, isDone)}
            />
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
