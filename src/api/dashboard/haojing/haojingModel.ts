export interface OrderSolutionInfoParams{
    projectId:number;
}

export interface OrderSolutionInfoResult{
    projectId:number;
    responseCounts:number;
    resolveCounts:number;
    responseOnTimeCounts:number;
    resolveOnTimeCounts:number;
}

export interface Get2IdNameCountGroupByCustomFieldParams {
    projectId: number;
    fieldId: number;    
    dtFrom: string;
    dtTo: string;
  }

  export interface GetIdNameCountGroupByFieldResult {
    id: number;
    name: string;
    count: number;
   // childIdNameCount: ChildIdNameCount[];
  }
  
  export interface ChildIdNameCount {
    id: number;
    name: string;
    count: number;
  }