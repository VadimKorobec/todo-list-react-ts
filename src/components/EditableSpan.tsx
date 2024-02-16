import { useState } from "react";

type EditableSpanPropsType = {
  title: string;
};

export const EditableSpan = ({ title }: EditableSpanPropsType) => {
  const [show, setShow] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('')
  
  const handleChange = (e:React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value)
  }

  const handleChangeTitle = () => {
    setShow(true);
  };

  const handleViewClick = () => {
   setShow(false)
  }

  return (
    <>
      {show ? (
        <input type="text"  value={newTitle} onBlur={handleViewClick} autoFocus onChange={handleChange} />
      ) : (
        <span onDoubleClick={handleChangeTitle}>{title}</span>
      )}
    </>
  );
};
