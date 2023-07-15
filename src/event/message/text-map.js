import {
  createData, readData, updateData,
} from '../../CrudCurtain.js';

// ユーザーのプロフィールを取得する関数
const getUserProfile = (event, client) => client.getProfile(event.source.userId);

// 受け取ったメッセージと返信するメッセージ(を返す関数)をマッピング
export const messageMap = {
  機能: () => ({
    type: 'text',
    text: '朝7:00に照明をつけて、カーテンを開けます!',
  }),
  ありがとう: () => ({
    type: 'text',
    text: 'Hello, world',
  }),
  よろしく: () => ({
    type: 'text',
    text: 'Hello, world',
  }),
  かっこいい: () => ({
    type: 'text',
    text: 'Hello, world',
  }),
  カーテン閉めて: () => ({
    type: 'text',
    text: 'Hello, world',
  }),
  照明つけて: () => ({
    type: 'text',
    text: 'Hello, world',
  }),
  照明けして: () => ({
    type: 'text',
    text: 'Hello, world',
  }),
  設定: () => ({
    type: 'text',
    text: 'Hello, world',
  }),
  使い方: () => ({
    type: 'text',
    text: 'ご要望がございましたら下のmenuからお選びくださいませ。「設定」にて指定していただいた時間に電気をつけ、カーテンをお開けいたします。',
  }),
  カーテン開けて: async (event, appContext) => {
    const Openflag = readData;
    if (Openflag === false) {
      await updateData(event.source.userId, 'testData', true, appContext);
    }
    return {
      type: 'text',
      text: 'カーテンを開けました',
    };
  },
};
