import { request } from '@/utils/axios';

import { ErrorMessageMode } from '@/types/axios';
import { useSysStoreWithOut } from '@/store/modules/sys';
import { BotQuestionApiResult } from './botModal';

enum Api {
  BotQuestion = '/MeetingServer/chatbot/question_list',
}

export function getBotQuestionApi(
  params: { chatbotId: number },
  mode: ErrorMessageMode = 'modal',
) {
  const sysStore = useSysStoreWithOut();
  return request.get<BotQuestionApiResult>(
    {
      url: sysStore.getKloudApiSyncDomain + Api.BotQuestion,
      params,
    },
    {
      errorMessageMode: mode,
      isTransformResponse: false,
    },
  );
}
