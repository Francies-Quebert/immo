import React from "react";
import TableData from "./TableData";
import TableHead from "./TableHead";
import CheckBox from "../../assets/images/check-mark.svg";
import CustomCheckbox from "../CustomCheckbox";
import { DetailTableData } from "../../models/propertyModel";

interface Props {
  allowSelect?: boolean;
  dataSource?: DetailTableData[];
  showPropertyType?: boolean;
  onCheckBoxChange?: (
    value: boolean,
    rowData: any,
    event: React.ChangeEvent<Element>
  ) => void;
  selectedData?: DetailTableData[];
}
// main Table component with table head ,table data compoennet to display data
const TableComponent: React.FC<Props> = ({
  allowSelect,
  dataSource,
  showPropertyType,
  onCheckBoxChange,
  selectedData,
}) => {
  return (
    <table className="data-table">
      <thead>
        <tr className="data-table__head">
          {allowSelect && (
            <TableHead maxWidth={"45px"}>
              <img src={CheckBox} alt="checkbox" className="check-mark" />
            </TableHead>
          )}
          <TableHead>Address</TableHead>
          <TableHead>Postcode</TableHead>
          {showPropertyType && <TableHead>Property Type</TableHead>}
          <TableHead>Number of rooms</TableHead>
          <TableHead>
            <div>Floor area(m{<sup className="">2</sup>})</div>
          </TableHead>
        </tr>
      </thead>
      <tbody>
        {dataSource?.map((row, idx) => {
          return (
            <tr key={idx} className="data-table__conatiner">
              {allowSelect && (
                <TableData>
                  <CustomCheckbox
                    value={row.isSelected}
                    rowData={row}
                    onChange={(value, rowData, event) => {
                      if (onCheckBoxChange) {
                        onCheckBoxChange(value, rowData, event);
                      }
                    }}
                  />
                </TableData>
              )}
              <TableData>{row.address}</TableData>
              <TableData>{row.postcode}</TableData>
              {showPropertyType && <TableData>{row.propertyType}</TableData>}
              <TableData>{row.numberOfRooms}</TableData>
              <TableData>{row.floorArea}</TableData>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableComponent;
