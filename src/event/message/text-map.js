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
};