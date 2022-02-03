import React, { useContext } from "react";
import PropertyContext from "../../context/propertyContext";
import TableComponent from "../TableComponent/TableComponent";
import TitleComponent from "../TitleComponent";
interface Props {}
const SelectedProperties: React.FC<Props> = () => {
  const contextType = useContext(PropertyContext);
  return (
    <div>
      <TitleComponent title="Selected Properties" />
      {/* data of selected property */}
      <TableComponent dataSource={contextType.selectedData} />
    </div>
  );
};

export default SelectedProperties;
