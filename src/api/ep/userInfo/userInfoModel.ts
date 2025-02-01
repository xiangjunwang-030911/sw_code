export interface EmployeeGuiSettingApiResult {
  fields: Field[];
  pageNames: PageName[];
  fieldsOnPage: FieldsOnPage[];
}

export interface FieldsOnPage {
  projectID: number;
  uiFieldID: number;
  guiPageID: number;
  name: string;
  top: number;
  left: number;
  height: number;
  width: number;
  tabOrder: number;
  ifMandatory: number;
  ifCustomerMandatory: number;
  ifVisible: number;
  ifCustomerVisible: number;
  ifNewEmployeeAtEWP?: number;
  showBorder?: number;
  useBoldFont?: number;
  value?: string | number;
  fieldTypeID?: number;
  SupportHTMLFormat?: number;
  listChoice?: ChoiceItem[];
}

interface PageName {
  projectId: number;
  id: number;
  name: string;
}

export interface Field {
  fieldID: number;
  fieldName: string;
  fieldTypeID: number;
  fieldSubTypeID: number;
  ifMandatory: number;
  ifMandatoryForCustomer: number;
  ifVisible: number;
  visibleToCustomer: number;
  defaultName?: string;
  listChoice?: ChoiceItem[];
  attributes?: SysFieldsItemAttributes;
}

export interface ChoiceItem {
  id: number;
  name: string;
  isActive?: number;
  order?: number;
}
export interface SysFieldsItemAttributes {
  SupportHTMLFormat: number;
}

export interface EmployeeItemValuesApiResult {
  fieldId: number;
  value: string;
  choiceId?: number;
}

export interface SetEmployeeItemValuesData {
  fieldId: number;
  choiceId?: number;
  value: string;
  // fromChoiceId: number;
  // fromValue: string;
}

export interface SetEmployeeItemValuesApiResult {
  id: number;
  ok: boolean;
  msg: string;
}

export interface AssetInfoListParam {
  $top?: number;
  $skip?: number;
  $orderby?: string;
  $count?: boolean;
  $select?: string;
  $filter?: string;
}

export interface AssetInfoListApiResult {
  success?: boolean;
  data: DataItem[];
  count?: number;
}

export interface DataItem {
  projectID: number;
  assetNo: string;
  assetCategoryID: number;
  assetTemplateID: number;
  assetName: string;
  categoryName: string;
  templateName: string;
  inventoryStatus: string;
  serviceStatus: string;
}
