import { FilterValuesType } from "../App";

export type TaskType = {
  id: number;
  title: string;
  isDone: boolean;
};

type TodoListProps = {
  title: string;
  tasks: TaskType[];
  onDelete: (id:number) => void;
  onFilter: (value: FilterValuesType) => void;
};

export const TodoList = ({
  title,
  tasks,
  onDelete,
  onFilter,
}: TodoListProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input type="text" />
        <button type="button">+</button>
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
