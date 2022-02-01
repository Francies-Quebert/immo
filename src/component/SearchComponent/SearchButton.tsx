import React from "react";
interface Props {
  type: "button" | "submit" | "reset" | undefined;
}
const SearchButton: React.FC<Props> = ({ type }) => {
  return (
    <div>
      <button
        type={type}
        className="search__button"
        name="serach-btn"
      >
        Search
      </button>
    </div>
  );
};

export default SearchButton;
