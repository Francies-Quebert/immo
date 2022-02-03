// state and context provider type refrence
export interface MyState {
  selectedProperty: string;
  propertyTypes: Filters[];
  searchValue: string;
  searchResults: DetailTableData[];
  selectedData: DetailTableData[];
  setSearchValue?: (data: string) => void;
  setSearchResults?: (data: DetailTableData[]) => void;
  setSearchPropertyType?: (value: string) => void;
  setSelectedData?: (data: DetailTableData[]) => void;
}


// property type refrence
export interface Filters {
  value: string;
  label: string;
}
// text input type refrence
export type TextInputModel = string | number | readonly string[] | undefined;

//API data type refrence
export interface DetailTableData {
  address: string;
  floorArea: number | null | undefined;
  id: string;
  numberOfRooms: number | null | undefined;
  postcode: string;
  propertyType: string;
  isSelected: boolean;
}

// cheeck box type refrence
export interface CheckboxModel {
  value: boolean;
  rowData: any;
  event: React.ChangeEvent<Element>;
}
