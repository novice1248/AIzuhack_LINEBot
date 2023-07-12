// モジュールの読み込み
import express from 'express';
import 'dotenv/config';

// ファイルの読み込み
import { webhook } from './webhook.js';
import { log } from '../log.js';

const PORT = process.env.PORT || 3000;
const { CHANNEL_SECRET } = process.env;
const app = express();

// /にアクセスがあった時、Deploy succeededと返す
app.get('/', (_req, res) => { res.send('Deploy succeeded'); });

// /time-open にアクセスがあった時、日時を取得して7時0~3分の時 succeededと返す
app.get('/time-open',(_req, res) => {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  if(hour === 7 && minute < 3) {
    res.send('succeeded');
  } else {
    res.send('Error\n');
  }
});

// /time-close にアクセスがあった時、日時を取得して8時0~3分の時 succeededと返す
app.get('/time-close',(_req, res) => {
  const hour = new Date().getHours();
  const minute = new Date().getMinutes();
  if(hour === 8 && minute < 3) {
    res.send('succeeded');
  } else {
    res.send('Error\n');
  }
});

// /webhookにアクセスがあったとき、bot.jsのindexを呼び出す
app.post('/webhook', webhook);

app.listen(PORT);
log(`Server running at ${PORT}`);