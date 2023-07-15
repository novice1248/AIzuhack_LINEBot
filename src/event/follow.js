// フォローイベントがとんできた時
export const followHandler = () => {
  // 返信するメッセージを作成
  const message = {
    type: 'text',
    text: '初めましてご主人様!なにかご要望がありましたら、下のmenuからお選びくださいませ!',
  };
  // 返信するメッセージをこの関数の呼び出し元（bot.js）に返す
  return message;
};
