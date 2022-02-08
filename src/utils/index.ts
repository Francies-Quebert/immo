import { DetailTableData } from "../models/propertyModel";

export const updateSearchResultCheckBox = async (
  tempSelectedData: DetailTableData[],
  searchResults: DetailTableData[]
) => {
  const tempData: DetailTableData[] = searchResults.map((row) => {
    return {
      ...row,
      isSelected:
        tempSelectedData.findIndex(({ id }) => id === row.id) > -1
          ? true
          : false,
    };
  });
  return tempData;
};
