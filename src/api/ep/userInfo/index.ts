import { request } from '@/utils/axios';
import { ErrorMessageMode } from '@/types/axios';
import {
  EmployeeGuiSettingApiResult,
  EmployeeItemValuesApiResult,
  SetEmployeeItemValuesData,
  SetEmployeeItemValuesApiResult,
  AssetInfoListParam,
  AssetInfoListApiResult,
} from './userInfoModel';

enum Api {
  EmployeeGuiSetting = 'api/EmployeeGuiSetting/EmployeeGuiSetting',
  EmployeeItemValues = 'api/EmployeeInfo/EmployeeItemValues',
  SetEmployeeItemValues = 'api/EmployeeInfo/SetEmployeeItemValues',
  AssetInfoList = 'api/EmployeeInfo/AssetInfoList',
}

/**
 * 获取EP员工信息表单字段名
 * @param projectId
 * @param mode
 * @returns
 */
export function getEmployeeGuiSettingApi(
  projectId: number,
  mode: ErrorMessageMode = 'modal',
) {
  const params = { projectId };
  return request.get<EmployeeGuiSettingApiResult>(
    {
      url: Api.EmployeeGuiSetting,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * 获取EP员工信息表单字段值
 * @param projectId
 * @param itemId 用户id
 * @param strFieldIds 表单字段ID 'getEmployeeGuiSettingApi'这个函数中返回的uiFieldid
 * @param mode
 * @returns
 */
export function getEmployeeItemValuesApi(
  projectId: number,
  itemId: number,
  strFieldIds: string,
  mode: ErrorMessageMode = 'modal',
) {
  const params = { projectId, itemId, strFieldIds };
  return request.get<EmployeeItemValuesApiResult[]>(
    {
      url: Api.EmployeeItemValues,
      params,
    },
    {
      errorMessageMode: mode,
    },
  );
}

export function setEmployeeItemValuesApi(
  projectId: number,
  itemId: number,
  data: SetEmployeeItemValuesData[],
  mode: ErrorMessageMode = 'modal',
) {
  const params = { projectId, itemId };
  return request.post<SetEmployeeItemValuesApiResult[]>(
    {
      url: Api.SetEmployeeItemValues,
      params,
      data,
    },
    {
      errorMessageMode: mode,
    },
  );
}

/**
 * 获取资产表格数据
 * @param params $top:获取多少条数据,$skip:从第几条开始获取,$orderby:排序,$count:是否返回总数
 * @returns
 */
export function getAssetInfoListApi(params: AssetInfoListParam) {
  return request.get<AssetInfoListApiResult>(
    {
      url: Api.AssetInfoList,
      params,
    },
    { isTransformResponse: false },
  );
}
