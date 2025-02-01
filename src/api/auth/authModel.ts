export interface LoginApiResult {
  token: string;
  userId: number;
  fName: string;
  lName: string;
  eMail: string;
  projectIds: number[];
  baseProjectId: number;
}

export interface LoginApiParams {
  username: string;
  password: string;
}

export interface GetLanguageListApiResult {
  projectID: number;
  appID: number;
  languageID: number;
  name: string;
  ifApplicable: number;
}
