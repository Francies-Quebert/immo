import React from "react";
interface Props {
  value: boolean;
  rowData?: any;
  onChange: (value: boolean, rowData: any, event: React.ChangeEvent) => void;
}
// checkbox component
const CustomCheckbox: React.FC<Props> = ({
  value = false,
  onChange,
  rowData = null,
}) => {
  return (
    <div className="checkbox-conatiner">
      <input
        className="checkbox-input"
        type={"checkbox"}
        onChange={(event) => {
          onChange(event.target.checked, rowData, event);
        }}
        checked={value}
      />
    </div>
  );
};

export default CustomCheckbox;
