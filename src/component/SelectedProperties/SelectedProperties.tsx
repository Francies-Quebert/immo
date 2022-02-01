import React from "react";
import { DetailTableData } from "../../models/propertyModel";
import TableComponent from "../TableComponent/TableComponent";
import TitleComponent from "../TitleComponent";
interface Props {
  data: DetailTableData[];
}
const SelectedProperties: React.FC<Props> = ({ data }) => {
  return (
    <div>
      <TitleComponent title="Selected Properties" />
      <TableComponent dataSource={data}  />
    </div>
  );
};

export default SelectedProperties;
