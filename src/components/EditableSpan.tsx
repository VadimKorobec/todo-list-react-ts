type EditableSpanPropsType = {
  title: string;
};

export const EditableSpan = ({ title }: EditableSpanPropsType) => {
  return <span>{title}</span>;
};
