import React from "react";
import { TextInputModel } from "../../models/propertyModel";
import TitleComponent from "../TitleComponent";
import SearchButton from "./SearchButton";
import SearchInput from "./SearchInput";
interface Props {
  onSearch: () => void;
  onChange: React.ChangeEventHandler<HTMLInputElement> | undefined;
  value: TextInputModel;
}
const SearchComponent: React.FC<Props> = ({ onSearch, value, onChange }) => {
  return (
    <form
      name="serach-address"
      onSubmit={(e) => {
        e.preventDefault();
        onSearch();
      }}
    >
      <TitleComponent title="Search" />
      <div className="search">
        <SearchInput value={value} onChange={onChange} />
        <SearchButton
          type="submit"
          // onClick={() => {
          //   onSearch();
          // }}
        />
      </div>
    </form>
  );
};

export default SearchComponent;
