import { useState } from "react";

type User = {
  name: string;
  surname: string;
};

export const SecondForm = () => {
  const [value, setValue] = useState<User>({ name: "", surname: "" });
  console.log(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prevState) => ({ ...prevState, [name] : value }));
  };

  return (
    <form>
      <label>
        <span>Name</span>
        <input
          type="text"
          name="name"
          value={value.name}
          onChange={handleChange}
        />
      </label>
      <label>
        <span>Surname</span>
        <input
          type="text"
          name="surname"
          value={value.surname}
          onChange={handleChange}
        />
      </label>
      <button type="submit">Add</button>
    </form>
  );
};
