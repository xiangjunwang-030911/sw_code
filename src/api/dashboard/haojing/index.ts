import { 
    OrderSolutionInfoParams,
    OrderSolutionInfoResult,
    Get2IdNameCountGroupByCustomFieldParams,
    GetIdNameCountGroupByFieldResult 
} from "./haojingModel";
import { ErrorMessageMode } from "@/types/axios";
import { request} from '@/utils/axios';

enum Api{
    GetRAROTimeWithOutNullCounts = '/api/ServiceBoardRpt/GetResponseAndResolveWithOutNullOnTimeCounts',
    Get2NameCountGroupByCustomerField='api/ServiceBoardRpt/Get2IdNameCountGroupByFieldInteger5',
    GetCityCountGroupByCustomerField='api/ServiceBoardRpt/GetCityCountGroupByCustomerField'
}

//工单解决情况
export function getOrderSolutionInfo(
    params:OrderSolutionInfoParams,
    mode:ErrorMessageMode='modal',
)
{
    return request.get<OrderSolutionInfoResult>(
       { url:Api.GetRAROTimeWithOutNullCounts,
        params,
       },
       {
         errorMessageMode:mode,
       },
    );
}

//工单分类
export function getNameCountGroupByCustomerField(
    data: Get2IdNameCountGroupByCustomFieldParams,
    mode: ErrorMessageMode = 'modal',
  ) {
    return request.post<GetIdNameCountGroupByFieldResult[]>(
      {
        url: Api.Get2NameCountGroupByCustomerField,
        data,
      },
      {
        errorMessageMode: mode,
      },
    );
  }


  // 部门占比
export function getCityCountGroupByCustomerField(
    data: Get2IdNameCountGroupByCustomFieldParams,
    mode: ErrorMessageMode = 'modal',
  ) {
    return request.post<GetIdNameCountGroupByFieldResult[]>(
      {
        url: Api.GetCityCountGroupByCustomerField,
        data,
      },
      {
        errorMessageMode: mode,
      },
    );
  }
  

// 工单解决情况
// export function getOrderSolutionInfo(
//     params: OrderSolutionInfoParams,
//     mode: ErrorMessageMode = 'modal',
//   ) {
//     return request.get<OrderSolutionInfoResult>(
//       {
//         url: Api.GetRAROTimeWithOutNullCounts,
//         params,
//       },
//       {
//         errorMessageMode: mode,
//       },
//     );
//   }
  