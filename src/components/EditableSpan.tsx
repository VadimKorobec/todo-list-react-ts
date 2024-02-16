import { useState } from "react";

type EditableSpanPropsType = {
  title: string;
};

export const EditableSpan = ({ title }: EditableSpanPropsType) => {
  const [show, setShow] = useState<boolean>(false);

  const handleChangeTitle = () => {
    setShow(!show);
  };

  const handleViewClick = () => {
   console.log('blur')
  }

  return (
    <>
      {show ? (
        <input value={title} onBlur={handleViewClick} />
      ) : (
        <span onDoubleClick={handleChangeTitle}>{title}</span>
      )}
    </>
  );
};
