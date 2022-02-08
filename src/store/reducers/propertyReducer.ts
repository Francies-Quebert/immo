import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DetailTableData, Filters, MyState } from "../../models/propertyModel";
import { updateSearchResultCheckBox } from "../../utils";
import type { RootState } from "../index";

// Define a type for the slice state

// Define the initial state using that type
const initialState: MyState = {
  selectedProperty: "ALL",
  propertyTypes: [],
  searchValue: "",
  searchResults: [],
  selectedData: [],
};
interface selectedDataInterface {
  selectedData: DetailTableData[];
  searchResults: DetailTableData[];
}
export const propertySlice = createSlice({
  name: "property",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSearchResults: (state, action: PayloadAction<DetailTableData[]>) => {
      state.searchResults = action.payload;
    },
    setSearchPropertyType: (state, action: PayloadAction<string>) => {
      state.selectedProperty = action.payload;
    },
    setAvailablePropertyTypes: (state, action: PayloadAction<Filters[]>) => {
      state.propertyTypes = action.payload;
    },
    setSelectedData: (state, action: PayloadAction<selectedDataInterface>) => {
      state.selectedData = action.payload.selectedData;
      state.searchResults = action.payload.searchResults;
      return state;
    },
  },
});

export const {
  setSearchValue,
  setSearchResults,
  setSearchPropertyType,
  setAvailablePropertyTypes,
  setSelectedData,
} = propertySlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectProperty = (state: RootState) => state;

export default propertySlice.reducer;
