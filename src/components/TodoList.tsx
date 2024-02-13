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
  filter: FilterValuesType;
};

export const TodoList = ({
  title,
  tasks,
  filter,
  onDelete,
  onFilter,
  addTask,
  onStatus,
}: TodoListProps) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 0) {
      setError(false);
    }
    setValue(e.target.value.trim());
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (value === "") {
      setError(!error);
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
          <input
            className={error ? "error" : ""}
            type="text"
            value={value}
            onChange={handleChange}
          />
          <button type="submit">Add</button>
          {error && <div className="error-message">Field is required</div>}
        </form>
      </div>
      <ul style={{ listStyle: "none" }}>
        {tasks.map(({ id, title, isDone }) => (
          <li className={isDone ?'is-done' : ''} key={id}>
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
        <button
          className={filter === 'all' ? "active" : ""}
          onClick={() => onFilter("all")}
        >
          All
        </button>
        <button
          className={filter === 'active' ? "active" : ""}
          onClick={() => onFilter("active")}
        >
          Active
        </button>
        <button
          className={filter === 'completed' ? "active" : ""}
          onClick={() => onFilter("completed")}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
