import { useState } from "react";

type EditableSpanPropsType = {
  title: string;
  editMode: boolean;
};

export const EditableSpan = ({ title }: EditableSpanPropsType) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      {show ? <input /> : <span>{title}</span>}
      <button type="button" onClick={() => setShow(!show)}>
        Change Title
      </button>
    </>
  );
};
