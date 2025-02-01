export interface IntegratedSystemApiResult {
  settingItemID: number;
  settingValue: number;
  settingText?: string;
  settingNote?: string;
}

export interface KloudTokenApiResult {
  DetailMessage: string | null;
  ErrorMessage: string | null;
  RetCode: number;
  RetData: string;
}

export interface KloudCompanyApiData {
  apiUrl: string;
  companyId: number;
  createDate: number;
  integrationUrl: string;
  subSystemId: number;
  subSystemName: string;
  type: number;
}

export interface KloudCompanyApiResult {
  code: number;
  data: KloudCompanyApiData;
  msg: string;
}
