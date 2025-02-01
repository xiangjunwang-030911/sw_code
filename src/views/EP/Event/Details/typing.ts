import { SysFieldsItem } from '@/api/ep/event/eventModel';
import { ChoiceItem } from '@/api/ep/userInfo/userInfoModel';

export interface FieldListItem extends SysFieldsItem {
  width: number;
  height: number;
  tabOrder: number;
  listChoice?: ChoiceItem[];
}

export interface FieldsValueObj {
  dbValue: string | number;
  value: string;
}

export interface FieldsValue {
  [key: number]: FieldsValueObj;
}

export interface EditFieldsValue {
  [key: number]: number | string;
}
