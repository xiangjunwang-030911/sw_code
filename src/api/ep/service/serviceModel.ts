export interface ServiceListApiResult {
  projectID: number;
  templateID: number;
  templateName: string;
  incidentID: number;
  ifAutoCreate4NewCustomer: number;
  defaultOwnerID: number;
  defaultStatusID: number;
  ifIncludeWorkDescription: number;
  ifIncludeNoteFile: number;
  ifIncludeLinks: number;
  selectedCustomerType: string;
  subProjectID: number;
  subProjectTemplateID: string;
  ifPowerUserCanCreate: number;
  ifUserCanCreate: number;
  ifTeamMemberCanCreate: number;
  primaryEventTemplateID: number;
  primaryAttachmentID: number;
  attachmentTypeID: number;
  templateType: number;
  userCreateNotes: string;
  categoryID: number;
  createdByID: number;
  createdDate: string;
  lastModifiedByID: number;
  lastModifiedDate: string;
  applicableUserType: number;
  applicableTeam: number;
  isSelfServiceItemAtEWP: number;
  customIconPath: string;
  ifUseCustomIcon: number;
  ifCommon: number;
  displayOrder?: number;
}

export interface ChildIncidentTemplate {
  projectID: number;
  templateID: number;
  templateName: string;
  incidentID: number;
  ifAutoCreate4NewCustomer: number;
  defaultOwnerID: number;
  defaultStatusID: number;
  ifIncludeWorkDescription: number;
  ifIncludeNoteFile: number;
  ifIncludeLinks: number;
  selectedCustomerType: string;
  subProjectID: number;
  subProjectTemplateID: string;
  ifPowerUserCanCreate: number;
  ifUserCanCreate: number;
  ifTeamMemberCanCreate: number;
  primaryEventTemplateID: number;
  primaryAttachmentID: number;
  attachmentTypeID: number;
  templateType: number;
  userCreateNotes: string;
  categoryID: number;
  createdByID: number;
  createdDate: string;
  lastModifiedByID: number;
  lastModifiedDate: string;
  applicableUserType: number;
  applicableTeam: number;
  isSelfServiceItemAtEWP: number;
  customIconPath: string;
  ifUseCustomIcon: number;
  ifCommon: number;
}

export interface ServiceGroupApiResult {
  projectID: number;
  groupID: number;
  groupName: string;
  groupNote: string;
  displayOrder: number;
  parentGroupID: number;
  childGroup: ServiceGroupApiResult[];
  childIncidentTemplate: ChildIncidentTemplate[];
}
