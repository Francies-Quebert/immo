import React from "react";
import { TextInputModel } from "../../models/propertyModel";
interface Props {
  value: TextInputModel;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  defaultValue?: TextInputModel;
}
const SearchInput: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="search__container">
      <input
        className="search__container__input"
        placeholder="Address"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default SearchInput;
