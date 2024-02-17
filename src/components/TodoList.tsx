import { Button, Checkbox } from "@mui/material";
import { FilterValuesType } from "../App";
import { AddItemForm } from "./AddItemForm";
import { EditableSpan } from "./EditableSpan";
import DeleteIcon from "@mui/icons-material/Delete";
import { CheckBox } from "@mui/icons-material";

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
        <Button
          size="small"
          color="error"
          variant="contained"
          startIcon={<DeleteIcon />}
          onClick={handleDeleteList}
        >
          Delete List
        </Button>
      </h3>

      <AddItemForm addItem={handleAddTask} />
      <ul style={{ listStyle: "none" }}>
        {tasks.map(({ id, title, isDone }) => (
          <li className={isDone ? "is-done" : ""} key={id}>
            <Checkbox
              checked={isDone}
              onChange={() => onStatus(id, isDone, id)}
            />
            <EditableSpan title={title} onChange={handleChengeTask} />
            <Button
              size="small"
              color="error"
              variant="contained"
              startIcon={<DeleteIcon />}
              onClick={() => onDelete(id, id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <div style={{ gap: "5px", display: "flex" }}>
        <Button
          variant={"contained"}
          className={filter === "all" ? "active" : ""}
          onClick={() => onFilter("all", id)}
        >
          All
        </Button>
        <Button
          variant={"contained"}
          className={filter === "active" ? "active" : ""}
          onClick={() => onFilter("active", id)}
        >
          Active
        </Button>
        <Button
          variant={"contained"}
          className={filter === "completed" ? "active" : ""}
          onClick={() => onFilter("completed", id)}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};
