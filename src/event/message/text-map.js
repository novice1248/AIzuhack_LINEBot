import {
  readData, updateData,
} from '../../Crud.js';

// ユーザーのプロフィールを取得する関数
// const getUserProfile = (event, client) => client.getProfile(event.source.userId);

// 受け取ったメッセージと返信するメッセージ(を返す関数)をマッピング
export const messageMap = {
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
  使い方: () => ({
    type: 'text',
    text: 'ご要望がございましたら下のmenuからお選びくださいませ。「設定」にて指定していただいた時間に電気をつけ、カーテンをお開けいたします。',
  }),
  設定: () => ({
    type: 'text',
    text: 'a',
    quickReply: {
      items: [
        {
          type: 'action',
          action: {
            type: 'datetimepicker',
            label: '起きたい時間を教えてください',
            data: 'a',
            mode: 'time',
          },
        },
      ],
    },
  }),
  カーテン開けて: async (event, appContext) => {
    const dbdata = await readData(event.source.userId, 'Curtain_open', appContext);
    const dbcurtain = await readData(event.source.userId, 'Curtain', appContext);
    const flag = dbdata.Items[0].Status;
    const curtain = dbcurtain.Items[0].Status;
    if (curtain === true) {
      return {
        type: 'text',
        text: 'もうカーテンは開いていますよ',
      };
    }
    if (flag === false) {
      await updateData(event.source.userId, 'Curtain_open', true, appContext);
    }
    return {
      type: 'text',
      text: 'カーテンを開けました',
    };
  },
  カーテン閉めて: async (event, appContext) => {
    const dbdata = await readData(event.source.userId, 'Curtain_close', appContext);
    const dbcurtain = await readData(event.source.userId, 'Curtain', appContext);
    const flag = dbdata.Items[0].Status;
    const curtain = dbcurtain.Items[0].Status;
    if (curtain === false) {
      return {
        type: 'text',
        text: 'もうカーテンは閉まっていますよ',
      };
    }
    if (flag === false) {
      await updateData(event.source.userId, 'Curtain_close', true, appContext);
    }
    return {
      type: 'text',
      text: 'カーテンを閉めました',
    };
  },
  照明つけて: async (event, appContext) => {
    const dbdata = await readData(event.source.userId, 'Light_on', appContext);
    const dblight = await readData(event.source.userId, 'Light', appContext);
    const flag = dbdata.Items[0].Status;
    const light = dblight.Items[0].Status;
    if (light === true) {
      return {
        type: 'text',
        text: '電気はついています',
      };
    }
    if (flag === false) {
      await updateData(event.source.userId, 'Light_on', true, appContext);
    }
    return {
      type: 'text',
      text: '電気をつけました',
    };
  },
  照明消して: async (event, appContext) => {
    const dbdata = await readData(event.source.userId, 'Light_off', appContext);
    const dblight = await readData(event.source.userId, 'Light', appContext);
    const flag = dbdata.Items[0].Status;
    const light = dblight.Items[0].Status;
    if (light === false) {
      return {
        type: 'text',
        text: '電気は消えています',
      };
    }
    if (flag === false) {
      await updateData(event.source.userId, 'Light_off', true, appContext);
    }
    return {
      type: 'text',
      text: '電気を消しました',
    };
  },
};
