import { FilterValuesType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";

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
  changeTaskTitle: (id: string, newTitle: string, todoListId: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todoListId: string) => void;
  changeTodoListTitle: (id: string, newTitle: string) => void;
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
  changeTaskTitle,
  changeTodoListTitle,
}: TodoListProps) => {
  const handleDeleteList = () => {
    removeTodoList(id);
  };

  const handleAddTask = (title: string) => {
    addTask(title, id);
  };

  const handleChengeTask = (newValue: string) => {
    changeTaskTitle(id, newValue, id);
  };

  const handleChangeTodoListTitle = (newTitle: string) => {
    changeTodoListTitle(id, newTitle);
  };

  return (
    <div>
      <h3>
        <EditableSpan title={title} onChange={handleChangeTodoListTitle} />
      </h3>
      <button onClick={handleDeleteList}>Delete List</button>
      <AddItemForm addItem={handleAddTask} />
      <ul style={{ listStyle: "none" }}>
        {tasks.map(({ id, title, isDone }) => (
          <li className={isDone ? "is-done" : ""} key={id}>
            <input
              type="checkbox"
              checked={isDone}
              onChange={() => onStatus(id, isDone, id)}
            />
            <EditableSpan title={title} onChange={handleChengeTask} />
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


