import { useState } from 'react'; import Layout from '../components/Layout'; import { api } from '../lib/api';
export default function Assets(){ const [token,setToken]=useState(''); const [items,setItems]=useState([]); const [msg,setMsg]=useState(''); const [form,setForm]=useState({title:'Sample',slug:'sample',playbackUrl:'https://example.com/hls.m3u8',type:'VOD'});
async function load(){ try{ setItems(await api('/assets',{token})); setMsg(''); } catch(e){ setMsg(e.message);} }
async function create(e){ e.preventDefault(); try{ const a=await api('/assets',{method:'POST',token,body:form}); setMsg('Created #'+a.id);} catch(e){ setMsg(e.message);} }
return (<Layout><h2>Assets</h2><textarea rows={4} value={token} onChange={e=>setToken(e.target.value)} style={{width:'100%'}} />
<div style={{display:'flex',gap:8,marginTop:8}}><button onClick={load}>Load Published</button></div>
<h3 style={{marginTop:16}}>Create (Admin)</h3>
<form onSubmit={create} style={{display:'grid',gap:8,maxWidth:500}}>
<input placeholder='title' value={form.title} onChange={e=>setForm({...form,title:e.target.value})}/>
<input placeholder='slug' value={form.slug} onChange={e=>setForm({...form,slug:e.target.value})}/>
<input placeholder='playbackUrl' value={form.playbackUrl} onChange={e=>setForm({...form,playbackUrl:e.target.value})}/>
<select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option value='VOD'>VOD</option><option value='LIVE'>LIVE</option></select>
<button>Create</button></form>{msg&&<p style={{color:'crimson'}}>{msg}</p>}<ul>{items.map(a=><li key={a.id}>{a.title}</li>)}</ul></Layout>); }