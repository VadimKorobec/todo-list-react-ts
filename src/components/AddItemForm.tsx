import { useState } from "react";

type AddItemFormPropsType = {
  addItem: (title: string) => void;
  
};

export const AddItemForm = ({ addItem }: AddItemFormPropsType) => {
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
    addItem(value);
    reset();
  };

  const reset = () => {
    setValue("");
  };
  return (
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
  );
};
