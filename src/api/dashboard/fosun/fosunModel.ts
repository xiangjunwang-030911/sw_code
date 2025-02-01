export interface LoginApiParams {
  username: string;
  password: string;
}

export interface LoginApiResult {
  token: string;
  userId: number;
  fName: string;
  lName: string;
  projectIds: number[];
}

export interface OrderSolutionInfoParams {
  projectId: number;
}

export interface OrderSolutionInfoResult {
  projectId: number;
  counts: number;
  responseCounts:number;
  resolveCounts:number;
  responseOnTimeCounts: number;
  resolveOnTimeCounts: number;
}

// export interface OrderSolutionInfoResult {
//   projectId: number;
//   counts: number;
//   responseOnTimeCounts: number;
//   resolveOnTimeCounts: number;
// }

export interface GetIdNameCountGroupByFieldParams {
  projectId: number;
  fieldId: number;
  fieldId2: number;
  dtFrom: string;
  dtTo: string;
}

export interface GetIdNameCountGroupByFieldResult {
  id: number;
  name: string;
  count: number;
  childIdNameCount: ChildIdNameCount[];
}

export interface ChildIdNameCount {
  id: number;
  name: string;
  count: number;
}

export interface LatestBugReportParams {
  projectId: number;
  count: number;
}

export interface LatestBugReportResult {
  projectId: number;
  bugId: number;
  title: string;
  currentOwnerId: number;
  currentOwnerName: string;
  progressStatusID: number;
  progressStatusName?: string;
  dateCreated: string;
  index?: number;
}

export interface OrderTimeDistributionParams {
  projectId: number;
  yearFrom: number;
  monthFrom: number;
  yearTo: number;
  monthTo: number;
}

export interface OrderTimeDistributionResult {
  year: number;
  month: number;
  count: number;
}

export interface OrderSubmissionParams {
  projectId: number;
  year: number;
  month: number;
  day: number;
}

export interface OrderSubmissionResult {
  projectId: number;
  countOfCrntWeek: number;
  countOfCrntMonth: number;
  countOfCrntYear: number;
}

export interface GetIdNameCountGroupByCustomerFieldParams {
  projectId: number;
  fieldId: number;
  dtTo: string;
  dtFrom: string;
}

export interface GetIdNameCountGroupByCustomerFieldResult {
  id: number;
  name: string;
  count: number;
}

export interface OrderSourceDateParams {
  projectId: number;
  fieldId: number;
  dtTo: string;
  dtFrom: string;
}

export interface OrderSourceDateResult {
  id: number;
  name: string;
  count: number;
}

export interface SystemNoticeParams {
  projectId: number;
  strItemIDs: number;
}

export interface SystemNoticeResult {
  projectID: number;
  settingItemID: number;
  settingValue: number;
  settingText: string;
  settingNote: string;
}
