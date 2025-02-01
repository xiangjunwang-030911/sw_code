import { EventOperationTypeEnum } from '@/enums/commonEnum';

export interface ProjectTreeListApiResultValue {
  projectID: number;
  isActiveProject: boolean;
  projectName: string;
  nameDisplayFormat: number;
  projectTypeID: number;
  supportProjectType: number;
  isSampleProject: boolean;
  isTemplateProject: boolean;
  customerBaseProjectID: number;
  crmLinkedKWBaseProjID: number;
  customerAs?: string;
}
export interface ProjectTreeListApiResult {
  value: ProjectTreeListApiResultValue;
  children: ProjectTreeListApiResult[] | [];
}

export interface ListColumnsApiResult {
  fieldID: number;
  fieldType: number;
  fieldName: string;
  supportFilter: number;
  supportSort: number;
}

export interface ListDataParams {
  projectId: number;
  userIds: string;
  statusId?: number;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: number;
  orderBy?: number;
  keyword?: string;
}

export interface ListDataApiResultItemsValues {
  id: number;
  value: string;
}

export interface ListDataApiResultItems {
  id: number;
  name: string;
  values: ListDataApiResultItemsValues[];
}

export interface ListDataApiResult {
  closetotal: number;
  opentotal: number;
  total: number;
  items: ListDataApiResultItems[];
}

export interface SysFieldsItemAttributes {
  SupportHTMLFormat: number;
}

export interface SysFieldsItem {
  fieldID: number;
  defaultName: string;
  fieldName: string;
  fieldTypeID: number;
  fieldSubTypeID: number;
  ifMandatory: number;
  ifMandatoryForCustomer: number;
  ifVisible: number;
  visibleToCustomer: number;
  helpMsg: string | null;
  attributes: SysFieldsItemAttributes | null;
}

export interface EwpIssueTypeNamesItem {
  id: number;
  name: string;
}

export interface FieldsOnPageItem {
  projectID: number;
  uiFieldID: number;
  guiPageID: number;
  name: string | null;
  top: number;
  left: number;
  height: number;
  width: number;
  tabOrder: number;
  ifMandatory: number;
  ifCustomerMandatory: number;
  ifVisible: number;
  ifCustomerVisible: number;
  showBorder: number;
  useBoldFont: number;
  ifNewEmployeeAtEWP: null | any;
}

export interface IssueTypeNamesItem {
  id: number;
  name: string;
}

export interface PageNamesItem {
  id: number;
  name: string;
}

export interface StmartIssueTypePagesItem {
  guiPageID: number;
  guiPageTemplate: number;
  incidentTypeID: number;
  projectID: number;
}

export interface DetailsFieldsApiResult {
  sysFields: SysFieldsItem[];
  customFields: SysFieldsItem[];
  pageNames: PageNamesItem[];
  enableStmartIssueTypePage: number;
  stmartIssueTypePages: StmartIssueTypePagesItem[];
  issueTypeNames: IssueTypeNamesItem[];
  ewpIssueTypeNames: EwpIssueTypeNamesItem[];
  fieldsOnPage: FieldsOnPageItem[];
  detailPageIds: number[];
  submitPageIds: number[];
}

export interface Employee {
  id: number;
  name: string;
  jobTitle: string | null;
  phone: string | null;
  email: string;
  address: string;
}

export interface Customer {
  id: number;
  name: string | null;
  phone: string | null;
  fax: string | null;
  web: string | null;
  address: string | null;
}

export interface PrimaryContact {
  id: number;
  name: string | null;
  phone: string | null;
  email: string | null;
  address: string | null;
}

export interface Field {
  id: number;
  value: string | null;
  dbValue: string | number | null;
}

export interface DetailsFieldsValueApiResult {
  employee: Employee;
  customer: Customer;
  primaryContact: PrimaryContact;
  projectID: number;
  id: number;
  name: string;
  subProjectID: number;
  subProjectPath: string | null;
  eventCount: number;
  attachmentCount: number;
  lastChangeNo: number;
  lastUpdateNo: number;
  fields: Field[];
  canEdit: boolean;
  canDelete: boolean;
  canChangeIncidentType: boolean;
  canChangeCustomer: boolean;
  oldStatusID: number;
  oldOwnerID: number;
  ifLinkedPlanStartDate: number;
  ifLinkedPlanEndDate: number;
  dataGridInfo: any | null;
}

export interface EventDetailsFlowApiResult {
  transitionId: number;
  transitionName: string;
  statusId: number;
  statusName: string;
  nextStatusId: number;
  nextStatusName: string;
  nextStatusIfClosed: number;
  selected: boolean;
}

export interface EventHistoryApiResult {
  projectID: number;
  bugID: number;
  sequenceNo: number;
  progressStatus: string;
  assignedByPerson?: string;
  personAssigned?: string;
  dateAssigned: string;
  transition: string;
  transitionType: number;
  progressStatusID: number;
  personIDAssigned: number;
  assignedByPersonID: number;
  transitionID: number;
}

export interface GetEventAddFieldsParams {
  ProjectID: number;
  TemplateID: number;
  OperationType: EventOperationTypeEnum;
}

export interface IncidentPostFields {
  FieldID: number;
  Value: string | number;
}

export interface UpdateEventParams {
  OperationType?: EventOperationTypeEnum;
  ProjectID?: number;
  ID?: number;
  Name?: string;
  LastUpdateNo?: number;
  Fields?: IncidentPostFields[];
}

export interface AddEventParams {
  OperationType: EventOperationTypeEnum;
  ProjectID: number;
  TemplateID: number;
  Name: string;
  LastTransitionID?: number;
  Fields?: IncidentPostFields[];
}
