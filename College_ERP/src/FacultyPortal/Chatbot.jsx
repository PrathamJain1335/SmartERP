import React, { useState } from "react";

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: "Hi! I can help with schedules, attendance and assignments." }]);
  const [input, setInput] = useState("");

  function send() {
    if(!input.trim()) return;
    setMessages(m => [...m, { from: "user", text: input }]);
    setInput("");
    setTimeout(()=> setMessages(m => [...m, { from: "bot", text: "Mock reply: We'll take care of that." }]), 600);
  }

  return (
    <>
      {open && (
        <div className="fixed right-6 bottom-20 z-50 w-80 bg-white dark:bg-[#071025] rounded shadow">
          <div className="px-3 py-2 bg-purple-600 text-white font-semibold">Faculty Bot</div>
          <div className="p-3 h-48 overflow-auto">
            {messages.map((m,i)=> <div key={i} className={`mb-2 ${m.from==='bot' ? 'text-left':'text-right'}`}>{m.text}</div>)}
          </div>
          <div className="p-2 border-t dark:border-gray-800">
            <div className="flex gap-2">
              <input className="flex-1 px-2 py-1 border rounded bg-white dark:bg-[#071025]" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>e.key==='Enter' && send()} />
              <button onClick={send} className="px-3 py-1 bg-indigo-600 text-white rounded">Send</button>
            </div>
          </div>
        </div>
      )}

      <button onClick={()=>setOpen(o=>!o)} className="fixed right-6 bottom-6 z-50 w-12 h-12 rounded-full bg-red-500 text-white shadow-lg">💬</button>
    </>
  );
}
