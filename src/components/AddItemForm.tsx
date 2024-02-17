import { useState } from "react";
import { Button, TextField } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

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
        <TextField
          error={!!error}
          type="text"
          value={value}
          onChange={handleChange}
          variant={'outlined'}
          label='Type value'
        />
        <Button
          size="small"
          color="success"
          variant="contained"
          type="submit"
          endIcon={<SendIcon />}
        >
          Add
        </Button>
        {error && <div className="error-message">Field is required</div>}
      </form>
    </div>
  );
};
