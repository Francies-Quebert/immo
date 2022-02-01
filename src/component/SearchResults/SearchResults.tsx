import React from "react";
import { DetailTableData } from "../../models/propertyModel";
import TableComponent from "../TableComponent/TableComponent";
import TitleComponent from "../TitleComponent";
interface Props {
  selectedProperty: string;
  allowSelect?: boolean;
  data: DetailTableData[];
  onCheckBoxChange?: (
    value: boolean,
    rowData: any,
    event: React.ChangeEvent<Element>
  ) => void;
  selectedData?: DetailTableData[];
}
const SearchResults: React.FC<Props> = ({
  selectedProperty,
  allowSelect,
  data,
  onCheckBoxChange,
  selectedData,
}) => {
  return (
    <div>
      <TitleComponent title="Search results" />
      <TableComponent
        allowSelect={allowSelect}
        dataSource={data.filter((dd) =>
          selectedProperty === "ALL"
            ? true
            :  dd.propertyType === selectedProperty
        )}
        showPropertyType={true}
        onCheckBoxChange={onCheckBoxChange}
        selectedData={selectedData}
      />
    </div>
  );
};

export default SearchResults;
