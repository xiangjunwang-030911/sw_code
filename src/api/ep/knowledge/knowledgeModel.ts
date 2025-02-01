export interface KnowledgeFolders {
  childFolders: KnowledgeFolders[];
  id: number;
  name: string;
  status: string;
  childCount: number;
}

export interface KnowLedgeFolderTreeApiResult {
  knowledgeFolders: KnowledgeFolders[];
}

export interface KnowledgeListItem {
  projectID: number;
  knowledgeID: number;
  title: string;
  description: string;
  imageID: number;
  itemTypeID: number;
  dateLastModified: string;
  dateCreated: string;
  createdBy: string;
  crntOwner: string;
  totalOpens: number;
  attachmentCount: number;
  stateName: string;
  crntStateID: number;
}

export interface KnowledgeListApiResult {
  knowledgeItems: KnowledgeListItem[];
  totalCount: number;
}

interface KnowledgeInfoItemValue {
  fieldID: number;
  value: string;
  valueHTML?: string;
}

export interface KnowledgeInfoApiResult {
  itemValues: KnowledgeInfoItemValue[];
  projectId: number;
  knowledgeId: number;
}
