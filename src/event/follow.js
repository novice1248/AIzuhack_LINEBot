// フォローイベントがとんできた時
import { createData } from '../Crud.js';

export const followHandler = async (event, appContext) => {
  await createData(event.source.userId, 'Curtain_open', false, appContext);
  await createData(event.source.userId, 'Curtain_close', false, appContext);
  await createData(event.source.userId, 'Light_on', false, appContext);
  await createData(event.source.userId, 'Light_off', false, appContext);
  await createData(event.source.userId, 'Curtain', false, appContext);
  await createData(event.source.userId, 'Light', false, appContext);
  // 返信するメッセージを作成
  const message = {
    type: 'text',
    text: '初めましてご主人様!なにかご要望がありましたら、下のmenuからお選びくださいませ!',
  };
  // 返信するメッセージをこの関数の呼び出し元（bot.js）に返す
  return message;
};
