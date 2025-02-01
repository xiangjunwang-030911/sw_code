import { request } from '@/utils/axios';
import { ErrorMessageMode } from '@/types/axios';
import {
  LoginApiParams,
  LoginApiResult,
  OrderSolutionInfoParams,
  OrderSolutionInfoResult,
  GetIdNameCountGroupByFieldParams,
  GetIdNameCountGroupByFieldResult,
  LatestBugReportParams,
  LatestBugReportResult,
  OrderTimeDistributionParams,
  OrderTimeDistributionResult,
  OrderSubmissionParams,
  OrderSubmissionResult,
  GetIdNameCountGroupByCustomerFieldParams,
  GetIdNameCountGroupByCustomerFieldResult,
  OrderSourceDateParams,
  OrderSourceDateResult,
  SystemNoticeParams,
  SystemNoticeResult,
} from './fosunModel';
enum Api {
  DashboardLogin = '/api/Login/Login',
  GetRAROTimeCounts = '/api/ServiceBoardRpt/GetResponseAndResolveOnTimeCounts',
  GetRAROTimeWithOutNullCounts = '/api/ServiceBoardRpt/GetResponseAndResolveWithOutNullOnTimeCounts',
  GetNameCountGroupByField = '/api/ServiceBoardRpt/Get2IdNameCountGroupBy2Field',
  GetLatestBugReport = '/api/ServiceBoardRpt/GetLatestBugReport1',
  GetCreatedCountByMonth = '/api/ServiceBoardRpt/GetCreatedCountsByMonth',
  GetCreatedCounts = '/api/ServiceBoardRpt/GetCreatedCounts',
  GetNameCountGroupByCustomerField = '/api/ServiceBoardRpt/GetIdNameCountGroupByCustomerField',
  GetNameCountGroupByListField = '/api/ServiceBoardRpt/GetIdNameCountGroupByListField',
  GetProjectSettingList = '/api/ProjectSettingLists/Lists',
}

/**
 * @description: user login api
 */
export function login(
  params: LoginApiParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.post<LoginApiResult>(
    {
      url: Api.DashboardLogin,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 工单解决情况
export function getOrderSolutionInfo(
  params: OrderSolutionInfoParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.get<OrderSolutionInfoResult>(
    {
      url: Api.GetRAROTimeWithOutNullCounts,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 工单分配情况, 热点故障, 工单分类
export function get2IdNameCountGroupBy2Field(
  data: GetIdNameCountGroupByFieldParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.post<GetIdNameCountGroupByFieldResult[]>(
    {
      url: Api.GetNameCountGroupByField,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 最近新增工单
export function getLatestBugReport(
  params: LatestBugReportParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.get<LatestBugReportResult[]>(
    {
      url: Api.GetLatestBugReport,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 工单时间分布
export function getOrderTimeDistributionData(
  params: OrderTimeDistributionParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.get<OrderTimeDistributionResult[]>(
    {
      url: Api.GetCreatedCountByMonth,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 年 月 周 工单提交数量
export function getOrderSubmissionStatistics(
  params: OrderSubmissionParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.get<OrderSubmissionResult>(
    {
      url: Api.GetCreatedCounts,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 部门占比
export function getIdNameCountGroupByCustomerField(
  data: GetIdNameCountGroupByCustomerFieldParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.post<GetIdNameCountGroupByCustomerFieldResult[]>(
    {
      url: Api.GetNameCountGroupByCustomerField,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 工单来源渠道分析
export function getOrderSourceData(
  data: OrderSourceDateParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.post<OrderSourceDateResult[]>(
    {
      url: Api.GetNameCountGroupByListField,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

// 系统公告
export function getSystemNoticeData(
  params: SystemNoticeParams,
  mode: ErrorMessageMode = 'modal',
) {
  return request.get<SystemNoticeResult[]>(
    {
      url: Api.GetProjectSettingList,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}
