import React from "react";
import { MyState, DetailTableData } from "../models/propertyModel";

const PropertyContext = React.createContext<MyState>({
  selectedProperty: "ALL",
  propertyTypes: [],
  searchValue: "",
  searchResults: [],
  selectedData: [],
  setSearchValue: (value: string) => {},
  setSearchResults: (data: DetailTableData[]) => {},
});

export const PropertyProvider = PropertyContext.Provider;
export const PropertyConsumer = PropertyContext.Consumer;

export default PropertyContext;
