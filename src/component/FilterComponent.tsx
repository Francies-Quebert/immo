import React from "react";
import TitleComponent from "./TitleComponent";
import { setSearchPropertyType } from "../store/reducers/propertyReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
interface Props {}

//filter property type
const FilterComponent: React.FC<Props> = () => {
  const dispatch = useAppDispatch();
  const propertySelector = useAppSelector((state) => state.property);
  return (
    <div className="filter">
      <TitleComponent title={`Property Types`} />
      <div className="filter__name">
        {/* mapping data to render property type */}
        {propertySelector.propertyTypes.length > 0 &&
          propertySelector.propertyTypes.map((row) => (
            <div
              key={row.value}
              className={`filter__name--container ${
                propertySelector.selectedProperty === row.value ? "active" : ""
              }`}
              onClick={() => dispatch(setSearchPropertyType(row.value))}
            >
              {row.label}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FilterComponent;
