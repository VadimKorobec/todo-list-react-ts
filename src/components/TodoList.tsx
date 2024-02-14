import { useState } from "react";
import { FilterValuesType } from "../App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type TodoListProps = {
  id: string;
  title: string;
  tasks: TaskType[];
  onDelete: (id: string, todoListId: string) => void;
  onFilter: (value: FilterValuesType, id: string) => void;
  addTask: (title: string, todoListId: string) => void;
  onStatus: (id: string, isDone: boolean, todoListId: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todoListId: string) => void;
};

export const TodoList = ({
  id,
  title,
  tasks,
  filter,
  onDelete,
  onFilter,
  addTask,
  onStatus,
  removeTodoList,
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
    addTask(value, id);
    reset();
  };

  const reset = () => {
    setValue("");
  };

  const handleDeleteList = () => {
   removeTodoList(id)
  }

  return (
    <div>
      <h3>{title}</h3>
      <button onClick={handleDeleteList}>Delete List</button>
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
          <li className={isDone ? "is-done" : ""} key={id}>
            <input
              type="checkbox"
              checked={isDone}
              onChange={() => onStatus(id, isDone, id)}
            />
            <span>{title}</span>
            <button onClick={() => onDelete(id, id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => onFilter("all", id)}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => onFilter("active", id)}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => onFilter("completed", id)}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
