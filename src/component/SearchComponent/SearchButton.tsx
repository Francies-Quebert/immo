import React from "react";
interface Props {
  type?: "button" | "submit" | "reset" | undefined;
  name: string;
}
const SearchButton: React.FC<Props> = ({ type, name }) => {
  return (
    <div>
      <button type={type} className="search__button" name="serach-btn">
      {name}
      </button>
    </div>
  );
};

export default SearchButton;
