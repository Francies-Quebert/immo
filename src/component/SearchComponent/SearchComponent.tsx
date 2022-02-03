import React, { useContext } from "react";
import PropertyContext from "../../context/propertyContext";
import { fetchProperties, fetchPropertyDetails } from "../../store/api";
import TitleComponent from "../TitleComponent";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
interface Props {
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
}
// Search Results for address component
const SearchComponent: React.FC<Props> = ({ onChange = () => {} }) => {
  const contextType = useContext(PropertyContext);

  const fetchAddress = async () => {
    // checking if address is empty
    if (!contextType.searchValue || contextType.searchValue === "") {
      alert("Please Enter a Address");
      return;
    }
    let tempData = contextType.selectedData;
    //fetching data from fetchProperties
    let availableProperty = await fetchProperties({
      address: contextType.searchValue,
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
        contextType?.setSearchResults?.(getPropertyDetails);
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
          value={contextType.searchValue}
          onChange={(e) => {
            if (!contextType.setSearchValue) onChange(e);
            else {
              contextType.setSearchValue(e.target.value);
            }
          }}
        />
        <SearchButton type="submit" name="Search" />
      </div>
    </form>
  );
};

export default SearchComponent;
