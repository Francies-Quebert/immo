import React from "react";
interface Props {
  maxWidth?: number | string;
}
const TableHead: React.FC<Props> = ({ children, maxWidth }) => {
  return (
    <th
      className="data-table__head--value"
      style={{ width: maxWidth ? maxWidth : "auto" }}
    >
      <div className="data-table__head--value--conatiner">{children}</div>
    </th>
  );
};

export default TableHead;
