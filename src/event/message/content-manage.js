import { error } from '../../log.js';
import { createData, readData } from '../../CrudCurtain.js';
import { hasKey } from '../../haskey.js';

const contextMap = {
  memoMode: async (event, appContext) => {
    await createData(event.source.userId, 'memo', event.message.text, appContext);

    // await deleteData(event.source.userId, 'context', appContext);

    return {
      type: 'text',
      text: `"${event.message.text}"というメッセージをdbに追加しました`,
    };
  },
};
export const contextManage = async (event, appContext) => {
  let contextData = (await readData(event.source.userId, 'context', appContext)).Items[0];
  if (!contextData) {
    return undefined;
  }
  contextData = contextData.Data;

  if (hasKey(contextMap, contextData)) {
    return contextMap[contextData](event, appContext);
  }

  return undefined;
};
