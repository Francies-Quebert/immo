import React, { useContext } from "react";
import PropertyContext from "../../context/propertyContext";
import { DetailTableData } from "../../models/propertyModel";
import TableComponent from "../TableComponent/TableComponent";
import TitleComponent from "../TitleComponent";
interface Props {
}
// Search Results component 
const SearchResults: React.FC<Props> = ( ) => {
  const contextType = useContext(PropertyContext);

  // on Check on change function
  const onCheckBoxChange = (value: boolean, rowData: DetailTableData) => {
    let tempSelectedData = contextType.selectedData;
    let tempSearchResult = contextType.searchResults;
    const tempSelIdx = tempSelectedData.findIndex((dd) => dd.id === rowData.id);
    const tempIdx = tempSearchResult.findIndex((dd) => dd.id === rowData.id);
    if (tempSelIdx < 0) {
      tempSelectedData.push({
        ...rowData,
        isSelected: true,
      });
      tempSearchResult[tempIdx].isSelected = true;
    } else {
      tempSearchResult[tempIdx].isSelected = false;
      tempSelectedData = tempSelectedData.filter((dd) => dd.id !== rowData.id);
    }
    
    contextType?.setSelectedData?.(tempSelectedData);
    contextType.setSearchResults?.(tempSearchResult);
  };
  return (
    <div>
      <TitleComponent title="Search results" />
      <TableComponent
        allowSelect={true}
        dataSource={contextType.searchResults.filter((dd) =>
          contextType.selectedProperty === "ALL"
            ? true
            : dd.propertyType === contextType.selectedProperty
        )}
        showPropertyType={true}
        onCheckBoxChange={onCheckBoxChange}
        selectedData={contextType.selectedData}
      />
    </div>
  );
};

export default SearchResults;
