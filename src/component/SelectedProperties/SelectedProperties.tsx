import React from "react";
import TableComponent from "../TableComponent/TableComponent";
import TitleComponent from "../TitleComponent";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
interface Props {}
const SelectedProperties: React.FC<Props> = () => {
  const propertySelector = useSelector((state: RootState) => state.property);

  return (
    <div>
      <TitleComponent title="Selected Properties" />
      {/* data of selected property */}
      <TableComponent dataSource={propertySelector.selectedData} />
    </div>
  );
};

export default SelectedProperties;
