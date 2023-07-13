import {
  createData, deleteData, readData, updateData,
} from '../../crud.js';

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
  好き: () => ({
    type: 'text',
    text: 'Hello, world',
  }),
  セバスチャン: () => ({
    type: 'text',
    text: 'Hello, world',
  }),
  Create: async (event, appContext) => {
    const date = new Date();
    await createData(event.source.userId, 'testData', `Data created at ${date}`, appContext);
    return {
      type: 'text',
      text: 'データが作成されました',
    };
  },
  Read: async (event, appContext) => {
    const dbData = await readData(event.source.userId, 'testData', appContext);
    return {
      type: 'text',
      text: `DBには以下のデータが保存されています\n\n${dbData.Items[0].Data}`,
    };
  },
  Update: async (event, appContext) => {
    const date = new Date();
    await updateData(event.source.userId, 'testData', `Data created at ${date}`, appContext);
    return {
      type: 'text',
      text: 'データを更新しました',
    };
  },
  Delete: async (event, appContext) => {
    await deleteData(event.source.userId, 'testData', appContext);
    return {
      type: 'text',
      text: 'データを削除しました',
    };
  },
  メモ: async (event, appContext) => {
    const memoData = await readData(event.source.userId, 'memo', appContext);
    if (memoData.Items[0]) {
      return {
        type: 'text',
        text: `メモには以下のメッセージが保存されています\n\n${memoData.Items[0].Data}`,
      };
    }

    return {
      type: 'text',
      text: 'メモが存在しません',
    };
  },
  メモ開始: async (event, appContext) => {
    await createData(event.source.userId, 'context', 'memoMode', appContext);
    return {
      type: 'text',
      text: 'メモモードを開始しました',
    };
  },
};