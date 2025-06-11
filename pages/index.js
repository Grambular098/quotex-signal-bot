import { useState } from 'react';
export default function Home() {
  const [pair,setPair]=useState('BTCUSDT');
  const [tf,setTf]=useState('1m');
  const [sig,setSig]=useState('');
  const [load,setLoad]=useState(false);
  async function getSignal(){
    setLoad(true);
    const r=await fetch(`/api/signal?pair=${pair}&interval=${tf}`);
    const j=await r.json();
    setSig(j.signal);
    setLoad(false);
  }
  return <div style={{padding:20,fontFamily:'sans-serif'}}>
    <h2>Quotex Signal Bot</h2>
    <div><select value={pair} onChange={e=>setPair(e.target.value)}>
      <option>BTCUSDT</option><option>ETHUSDT</option><option>EURUSDT</option>
    </select></div>
    <div><select value={tf} onChange={e=>setTf(e.target.value)}>
      <option>1m</option><option>5m</option><option>15m</option>
    </select></div>
    <div><button onClick={getSignal} disabled={load}>
      {load?'Loading...':'Get Signal'}
    </button></div>
    {sig && <h3>Signal: {sig}</h3>}
  </div>;
    }
