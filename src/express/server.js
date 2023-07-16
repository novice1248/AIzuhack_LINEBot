// モジュールの読み込み
import express from 'express';
import { middleware } from '@line/bot-sdk';
import 'dotenv/config';

// ファイルの読み込み
import aws from 'aws-sdk';
import { DynamoDBContext } from '../db.js';
import { webhook } from './webhook.js';
import { log } from '../log.js';

// DBの読み込み
import { readData, updateData } from '../Crud.js';

const PORT = process.env.PORT || 3000;
const { CHANNEL_SECRET } = process.env;
const app = express();

const dynamoDocument = new aws.DynamoDB.DocumentClient({
  endpoint: 'http://localhost:8000',
  region: 'ap-northeast-1',
});

const dynamoDBContext = new DynamoDBContext(dynamoDocument);

// /にアクセスがあった時、Deploy succeededと返す
app.get('/', (_req, res) => { res.send('Deploy succeeded'); });

// /curtain-open にアクセスがあった時、Please Open と返す
app.get('/curtain-open', async (_req, res) => {
  const dbdata = await readData(process.env.LINE_USERID, 'Curtain_open', { dynamoDBContext });
  const flag = dbdata.Items[0].Status;
  if (flag === true) {
    res.send('Please Open');
    await updateData(process.env.LINE_USERID, 'Curtain_open', false, { dynamoDBContext });
    await updateData(process.env.LINE_USERID, 'Curtain', true, { dynamoDBContext });
  } else {
    res.send('false');
  }
});

// /time-open にアクセスがあった時、日時を取得して7時0~3分の時 succeededと返す
app.get('/time-open1', async (_req, res) => {
  const dbcurtain = await readData(process.env.LINE_USERID, 'Curtain', { dynamoDBContext });
  const curtain_flag = dbcurtain.Items[0].Status;
  const posthour = await readData(process.env.LINE_USERID, 'Hour', { dynamoDBContext });
  const sethour = posthour.Items[0].Status;
  const postminute = await readData(process.env.LINE_USERID, 'Minute', { dynamoDBContext });
  const setminute = postminute.Items[0].Status;
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const padhour = String(hour).padStart(2, '0');
  const padminute = String(minute).padStart(2, '0');
  if (padhour ===  sethour && padminute === setminute) {
    if(curtain_flag === false) {
      res.send('Please Open');
      await updateData(process.env.LINE_USERID, 'Curtain', true, { dynamoDBContext });
    }
  } else {
    res.send("false");
  }
});

app.get('/time-open2', async (_req, res) => {
  const dblight = await readData(process.env.LINE_USERID, 'Light', { dynamoDBContext });
  const flag = dblight.Items[0].Status;
  const posthour =await readData(process.env.LINE_USERID, 'Hour', { dynamoDBContext });
  const sethour = posthour.Items[0].Status;
  const postminute =await readData(process.env.LINE_USERID, 'Minute', { dynamoDBContext });
  const setminute = postminute.Items[0].Status;
  const date = new Date();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const padhour = String(hour).padStart(2, '0');
  const padminute = String(minute).padStart(2, '0');
  if (padhour ===  sethour && padminute === setminute) {
    if(flag === false) {
      res.send('Please Turn on');
      await updateData(process.env.LINE_USERID, 'Light', true, { dynamoDBContext });
    }
  } else {
    res.send('false');
  }
});

// /curtain-close にアクセスがあった時、Please Close と返す
app.get('/curtain-close', async (_req, res) => {
  const dbdata = await readData(process.env.LINE_USERID, 'Curtain_close', { dynamoDBContext });
  const flag = dbdata.Items[0].Status;
  if (flag === true) {
    res.send('Please close');
    await updateData(process.env.LINE_USERID, 'Curtain_close', false, { dynamoDBContext });
    await updateData(process.env.LINE_USERID, 'Curtain', false, { dynamoDBContext });
  } else {
    res.send('false');
  }
});

// /Light-on にアクセスがあった時、Please Turn on と返す
app.get('/light-on', async (_req, res) => {
  const dbdata = await readData(process.env.LINE_USERID, 'Light_on', { dynamoDBContext });
  const flag = dbdata.Items[0].Status;
  if (flag === true) {
    res.send('Please Turn on');
    await updateData(process.env.LINE_USERID, 'Light_on', false, { dynamoDBContext });
    await updateData(process.env.LINE_USERID, 'Light', true, { dynamoDBContext });
  } else {
    res.send('false');
  }
});

// /Light-off にアクセスがあった時、Please Turn off と返す
app.get('/light-off', async (_req, res) => {
  const dbdata = await readData(process.env.LINE_USERID, 'Light_off', { dynamoDBContext });
  const flag = dbdata.Items[0].Status;
  if (flag === true) {
    res.send('Please Turn off');
    await updateData(process.env.LINE_USERID, 'Light_off', false, { dynamoDBContext });
    await updateData(process.env.LINE_USERID, 'Light', false, { dynamoDBContext });
  } else {
    res.send('false');
  }
});

// /webhookにアクセスがあったとき、bot.jsのindexを呼び出す
app.post('/webhook', middleware({
  channelSecret: CHANNEL_SECRET,
}), webhook);

app.listen(PORT);
log(`Server running at ${PORT}`);
