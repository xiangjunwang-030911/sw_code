export interface ChatbotOption {
  id: number;
  chatbotNodeId: number;
  title: string;
  message: string;
  keyword: string[];
  displayOrder: number;
  isDefault: number;
  isInvisible: number;
  isSystem: number;
}

export interface ChatbotNode {
  id: number;
  chatbotId: number;
  chatbotActionId: number;
  typeId: number;
  actionTypeId: number;
  title: string;
  message: string;
  question: string;
  positionX: number;
  positionY: number;
  sizeWidth: number;
  sizeHeight: number;
  referenceLink: string;
  supportNaturalLanguage: number;
  supportKnowledgeWise: number;
  supportCommonMessage: number;
  enforceOption: number;
  initialMode: number;
  initialMessageId: number;
  optionList: ChatbotOption[];
  linkedFileList: any[]; // 根据需要定义具体类型
  linkedChatbotList: any[]; // 根据需要定义具体类型
  enableKeyword: number;
  keywordList: string[]; // 根据需要定义具体类型
  inQuestionList: number;
}

export interface BotQuestionApiResult {
  code: number;
  data: ChatbotNode[];
  msg: string;
}
