import React, {useState} from 'react'
import Chat from './components/Chat'
import Admin from './components/Admin'
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";

export default function App(){
  const [active,setActive] = useState('performance')
  const perf = {eff: 14.2, dollars: 76.35}
function EfficiencyWidget() {
  const [efficiencyData, setEfficiencyData] = useState([80, 82, 79, 85, 90, 88, 92]);
  const [labels, setLabels] = useState(["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]);

  // Simulate live data updates every few seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setEfficiencyData(prev => {
        const nextValue = prev[prev.length - 1] + (Math.random() * 4 - 2); // random fluctuation
        const newData = [...prev.slice(1), Math.max(70, Math.min(100, nextValue))];
        return newData;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const data = {
    labels,
    datasets: [
      {
        label: "Efficiency (%)",
        data: efficiencyData,
        borderColor: "#0078D7",
        backgroundColor: "rgba(0, 120, 215, 0.2)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="card" style={{ padding: 16, background: "#f7f9fb" }}>
      <h3>Technician Efficiency</h3>
      <Line data={data} />
      <EfficiencyWidget />
      <p style={{ marginTop: 8 }}>
        Live performance tracking — efficiency increases/decreases updated in real time.
      </p>
    </div>
  );
}

  return (
    <div className="app-shell">
      <header className="header"><div className="app-title">TechAI Assistant</div></header>
      <div className="content">
        <div className="tabs" role="tablist">
          <div className={`tab ${active!=='performance'?'inactive':''}`} onClick={()=>setActive('performance')}>Performance</div>
          <div className={`tab ${active!=='diagnostics'?'inactive':''}`} onClick={()=>setActive('diagnostics')}>Diagnostics</div>
          <div className={`tab ${active!=='resources'?'inactive':''}`} onClick={()=>setActive('resources')}>Resources</div>
          <div className={`tab ${active!=='multipoint'?'inactive':''}`} onClick={()=>setActive('multipoint')}>Multipoint</div>
        </div>

        {active==='performance' && <div className="card"><div className="small">Efficiency</div><div className="eff">{perf.eff}%</div><div className="small">Dollars / hour</div><div style={{fontWeight:700}}>${perf.dollars.toFixed(2)}</div></div>}
        {active==='diagnostics' && <div className="card"><h3>Diagnostics</h3><p className="small">VIN lookup and DTC guidance (FMCDealer integration via webview).</p></div>}
        {active==='resources' && <div className="card"><h3>Resource Library</h3><p className="small">Common diagnostic Resources.</p></div>}
        {active==='multipoint' && <div className="card"><h3>Multipoint Inspection</h3><p className="small">Checklist items with green/yellow/red statuses.</p></div>}

        <div style={{marginTop:12}}>
          <h4 style={{marginBottom:8}}>Assistant</h4>
          <Chat />
        </div>
      </div>

      <div className="footer"><button className="btn" onClick={()=>alert('Chat opened above')}>Open Chat</button></div>
      <div className="admin-link"><a href="#admin" onClick={(e)=>{e.preventDefault(); const code=prompt('Enter admin quick code'); if(code==='admin-secret') location.hash='admin'; }}>Admin</a></div>

      {location.hash==='admin' && <div style={{position:'fixed',top:40,left:10,right:10,zIndex:60}}><Admin /></div>}
    </div>
  )
}
