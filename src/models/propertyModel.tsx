export interface Filters {
  value: string ;
  label: string;
}

export type TextInputModel = string | number | readonly string[] | undefined;

export interface DetailTableData {
  address: string;
  floorArea: number | null | undefined;
  id: string;
  numberOfRooms: number | null | undefined;
  postcode: string;
  propertyType: string;
  isSelected: boolean;
}

export interface CheckboxModel {
  value: boolean;
  rowData: any;
  event: React.ChangeEvent<Element>;
}
