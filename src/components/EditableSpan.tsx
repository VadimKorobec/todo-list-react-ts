import { useState } from "react";

type EditableSpanPropsType = {
  title: string;
};

export const EditableSpan = ({ title }: EditableSpanPropsType) => {
  const [show, setShow] = useState<boolean>(false);
  return (
    <>
      {!show ? <span onClick={() => setShow(show)}>{title}</span> : <input />}
    </>
  );
};
