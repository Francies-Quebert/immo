import React, { useContext } from "react";
import PropertyContext from "../context/propertyContext";
import TitleComponent from "./TitleComponent";
interface Props {}

//filter property type
const FilterComponent: React.FC<Props> = () => {
  const contextType = useContext(PropertyContext);
  return (
    <div className="filter">
      <TitleComponent title={`Property Types`} />
      <div className="filter__name">
        {/* mapping data to render property type */}
        {contextType.propertyTypes.length > 0 &&
          contextType.propertyTypes.map((row) => (
            <div
              key={row.value}
              className={`filter__name--container ${
                contextType.selectedProperty === row.value ? "active" : ""
              }`}
              onClick={() => contextType?.setSearchPropertyType?.(row.value)}
            >
              {row.label}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FilterComponent;
