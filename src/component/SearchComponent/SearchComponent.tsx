import React from "react";
import { fetchProperties, fetchPropertyDetails } from "../../api/api";
import TitleComponent from "../TitleComponent";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
import {
  setSearchResults,
  setSearchValue,
} from "../../store/reducers/propertyReducer";
import { updateSearchResultCheckBox } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
interface Props {}
// Search Results for address component
const SearchComponent: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const propertySelector = useAppSelector((state) => state.property);

  const fetchAddress = async () => {
    // checking if address is empty
    if (!propertySelector.searchValue || propertySelector.searchValue === "") {
      alert("Please Enter a Address");
      return;
    }
    let tempData = propertySelector.selectedData;
    //fetching data from fetchProperties
    let availableProperty = await fetchProperties({
      address: propertySelector.searchValue,
    }).catch((er) => {
      alert("Error Fetching Data..Try again later ");
    });

    // checking if data is not empty
    if (!availableProperty) return;
    else {
      if (availableProperty.properties.length <= 0) {
        alert("No Data Found");
        return;
      }
      // inserting  data searched
      let getPropertyDetails = await Promise.all(
        availableProperty.properties.map(async ({ id }) => {
          let tempIndex = tempData.findIndex((i) => i.id === id);

          if (tempIndex > -1) {
            return tempData[tempIndex];
          } else {
            let detailData = await fetchPropertyDetails(id);
            return { ...detailData?.property, isSelected: false };
          }
        })
      );
      // pushing back in the state
      if (getPropertyDetails) {
        updateSearchResultCheckBox(
          propertySelector.selectedData,
          getPropertyDetails
        ).then((res) => {
          dispatch(setSearchResults(res));
        });
      } else {
        alert("Try Again Later..Error Occured");
        return;
      }
    }
  };

  return (
    <form
      name="serach-address"
      onSubmit={(e) => {
        e.preventDefault();
        fetchAddress();
      }}
    >
      <TitleComponent title="Search" />
      <div className="search">
        <SearchInput
          value={propertySelector.searchValue}
          onChange={(e) => {
            dispatch(setSearchValue(e.target.value));
          }}
        />
        <SearchButton type="submit" name="Search" />
      </div>
    </form>
  );
};

export default SearchComponent;
