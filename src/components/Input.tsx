import { useState } from "react";

export const Input = () => {
  //   const [name, setName] = useState<string>("");
  //   const [surName, setSurName] = useState<string>("");
    const [value, setValue] = useState("");
    console.log(value)

  const handleInputChange = (e: any) => {
    const { name , value } = e.currentTarget;

    setValue([name]:value);
  };

  //   const handleNameChange = (e: any) => {
  //     setName(e.currentTarget.value);
  //   };

  //   const handleSurNameChange = (e: any) => {
  //     setSurName(e.currentTarget.value);
  //   };

  return (
    <>
      <form action="">
        <label>
          Name
          <input type="text" name="name" onChange={handleInputChange} />
        </label>
        <label>
          Surname
          <input type="text" name="surname" onChange={handleInputChange} />
        </label>
      </form>
    </>
  );
};
