import React, {useState} from 'react'
import Chat from './components/Chat'
import Admin from './components/Admin'

export default function App(){
  const [active,setActive] = useState('performance')
  const perf = {eff: 14.2, dollars: 76.35}

  return (
    <div className="app-shell">
      <header className="header"><div className="app-title">TechAI Assistant</div></header>
      <div className="content">
        <div className="tabs" role="tablist">
          <div className={`tab ${active!=='performance'?'inactive':''}`} onClick={()=>setActive('performance')}>Performance</div>
          <div className={`tab ${active!=='diagnostics'?'inactive':''}`} onClick={()=>setActive('diagnostics')}>Diagnostics</div>
          <div className={`tab ${active!=='waveforms'?'inactive':''}`} onClick={()=>setActive('waveforms')}>Waveforms</div>
          <div className={`tab ${active!=='multipoint'?'inactive':''}`} onClick={()=>setActive('multipoint')}>Multipoint</div>
        </div>

        {active==='performance' && <div className="card"><div className="small">Efficiency</div><div className="eff">{perf.eff}%</div><div className="small">Dollars / hour</div><div style={{fontWeight:700}}>${perf.dollars.toFixed(2)}</div></div>}
        {active==='diagnostics' && <div className="card"><h3>Diagnostics</h3><p className="small">VIN lookup and DTC guidance (FMCDealer integration via webview).</p></div>}
        {active==='waveforms' && <div className="card"><h3>Waveform Library</h3><p className="small">Common diagnostic waveforms.</p></div>}
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
