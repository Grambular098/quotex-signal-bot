import fetch from 'node-fetch';
import { EMA, RSI, MACD } from 'technicalindicators';

export default async function handler(req, res) {
  const { pair, interval } = req.query;
  const url=`https://api.binance.com/api/v3/klines?symbol=${pair}&interval=${interval}&limit=50`;
  const data=await fetch(url).then(r=>r.json());
  const closes=data.map(d=>+d[4]);
  const ema10=EMA.calculate({period:10,values:closes}).pop();
  const ema20=EMA.calculate({period:20,values:closes}).pop();
  const rsi=RSI.calculate({period:14,values:closes}).pop();
  const macd=MACD.calculate({values:closes,fastPeriod:12,slowPeriod:26,signalPeriod:9}).pop();

  const last=closes.slice(-1)[0];
  let signal='HOLD';
  if(last>ema10 && rsi>50 && macd.MACD>macd.signal) signal='BUY';
  else if(last<ema10 && rsi<50 && macd.MACD<macd.signal) signal='SELL';

  res.json({ signal });
}
