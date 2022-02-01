import React from "react";
import { Filters } from "../models/propertyModel";
import TitleComponent from "./TitleComponent";
interface Props {
  title: string;
  data: Filters[];
  selectedProperty: string;
  onSelectedvalue: (value: string) => void;
}

//filter property type
const FilterComponent: React.FC<Props> = ({
  title,
  data,
  selectedProperty,
  onSelectedvalue,
}) => {
  return (
    <div className="filter">
      <TitleComponent title={title} />
      <div className="filter__name">
        {/* mapping data to render property type */}
        {data.length > 0 &&
          data.map((row) => (
            <div
              key={row.value}
              className={`filter__name--container ${
                selectedProperty === row.value ? "active" : ""
              }`}
              onClick={() => onSelectedvalue(row.value)}
            >
              {row.label}
            </div>
          ))}
      </div>
    </div>
  );
};

export default FilterComponent;
