import React from "react";
import { DetailTableData } from "../../models/propertyModel";
import TableComponent from "../TableComponent/TableComponent";
import TitleComponent from "../TitleComponent";
import {
  setSearchResults,
  setSelectedData,
} from "../../store/reducers/propertyReducer";
import { updateSearchResultCheckBox } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
interface Props {}
// Search Results component
const SearchResults: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const propertySelector = useAppSelector((state) => state.property);

  // on Check on change function
  const onCheckBoxChange = (value: boolean, rowData: DetailTableData) => {
    const findSelDataIdx = propertySelector.selectedData.findIndex(
      (aa) => aa.id === rowData.id
    );
    let tempSelectedData;
    if (findSelDataIdx < 0) {
      tempSelectedData = [...propertySelector.selectedData, rowData];
    } else {
      tempSelectedData = propertySelector.selectedData.filter(
        (aa) => aa.id !== rowData.id
      );
    }
    updateSearchResultCheckBox(
      tempSelectedData,
      propertySelector.searchResults
    ).then((res) => {
      dispatch(setSearchResults(res));
    });
    dispatch(setSelectedData(tempSelectedData));
  };

  return (
    <div>
      <TitleComponent title="Search results" />
      <TableComponent
        allowSelect={true}
        dataSource={propertySelector.searchResults.filter((dd) =>
          propertySelector.selectedProperty === "ALL"
            ? true
            : dd.propertyType === propertySelector.selectedProperty
        )}
        showPropertyType={true}
        onCheckBoxChange={onCheckBoxChange}
        selectedData={propertySelector.selectedData}
      />
    </div>
  );
};

export default SearchResults;
