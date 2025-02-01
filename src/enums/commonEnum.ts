export enum LanguageIdEnum {
  NOSET = 0,
  EN = 1,
  CN = 2,
}

export enum EventStatusEnum {
  OPEN = 1,
  CLOSED = 2,
  OPEN_AND_CLOSED = 3,
  RESOLVED = 4,
}

export enum FieldTypeEnum {
  EDIT_BOX = 1, //单行输入框
  MULTILINE_EDIT_BOX = 2, //多行输入框,富文本输入框,h5文本
  COMBOBOX = 3, //可输入创建一个新选项单选框
  DROPDOWN_LIST = 4, //单选框
  CHECKBOX = 5, //复选框
  STATIC_LABEL = 6, //静态文本
  DATE_TIME_FIELD = 7, //日期选择框
  MULTIPLE_SELECTION_LISTBOX = 9, //多选框
  TEAM_HIERARCHY = 17,
  CUSTOMER = 18,
}

export enum FieldIdEnum {
  TITLE = 101,
  EVENT_TICKET = 120,
  CURRENT_STATUS = 601,
  UPLOAD = 125,
  DATA_GRID = 630,
}

export enum FieldAuthorityEnum {
  HIDDEN = 0,
  EDIT = 1,
  READONLY = 2,
  EDIT_READONY = 3,
}

export enum EventOperationTypeEnum {
  ADD = 1,
  EDIT = 2,
  GET_FIELDS = 6,
}
