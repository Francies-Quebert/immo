import React from "react";

interface Props {}
const TableData: React.FC<Props> = ({ children }) => {
  return (
    <td className="data-table__conatiner--data">
      <div className="data-table__conatiner--data-div">{children}</div>
    </td>
  );
};

export default TableData;
