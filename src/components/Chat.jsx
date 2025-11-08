import React, {useState, useRef, useEffect} from 'react'

export default function Chat(){ 
  const [messages, setMessages] = useState([
    {from: 'bot', text: 'Welcome to TechAI Assistant chat.'}
  ]);
  const [input, setInput] = useState('');
  const boxRef = useRef();
  useEffect(()=>{ if(boxRef.current) boxRef.current.scrollTop = boxRef.current.scrollHeight },[messages]);
  function send(){ if(!input) return; setMessages([...messages, {from:'user', text:input}]); setInput(''); setTimeout(()=>{ setMessages(m=>[...m, {from:'bot', text:'(sample reply) This will be powered by OpenAI once you add a key.'}]) },700) }
  return (
    <div className="chat-window">
      <div className="chat-messages" ref={boxRef}>
        {messages.map((m,i)=> <div key={i} style={{display:'flex',justifyContent: m.from==='user' ? 'flex-end' : 'flex-start'}}><div className={`chat-bubble ${m.from==='user' ? 'user' : 'bot'}`}>{m.text}</div></div>)}
      </div>
      <div className="chat-input">
        <input value={input} onChange={e=>setInput(e.target.value)} placeholder="Ask a repair question..." />
        <button className="btn" onClick={send}>Send</button>
      </div>
    </div>
  )
}
