import React from "react";
interface Props {
  title: string;
}
const TitleComponent: React.FC<Props> = ({ title }) => {
  return <div className="title">{title}</div>;
};

export default TitleComponent;
