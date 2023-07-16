// ポストバックイベントが飛んできた時
import {
  readData, updateData,
} from '../Crud.js';

export const postbackHandler = async (event, appContext) => {
    let message;
    // ポストバックデータをpostbackDataに格納
    const postbackData = event.postback.data;
    // もしevent.postback.paramsが存在する場合
    if (event.postback.params) {
      const time = event.postback.params.time.split(':');
      await updateData(event.source.userId, 'Hour', time[0], appContext);
      await updateData(event.source.userId, 'Minute', time[1], appContext);
      // 返信するメッセージを作成
      message = {
        type: 'text',
        text: `日時データを受け取りました！\ndata: ${postbackData}\ntime: ${event.postback.params.time}`,
      };
      // 存在しない場合
    } else {
      // 返信するメッセージを作成
      message = {
        type: 'text',
        text: `ポストバックデータを受け取りました！\ndata: ${postbackData}`,
      };
    }
    // 関数の呼び出し元（bot.jsのindex）に返信するメッセージを返す
    return message;
  };