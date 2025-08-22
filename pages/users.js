import { useState } from 'react'; import Layout from '../components/Layout'; import { api } from '../lib/api';
export default function Users(){ const [token,setToken]=useState(''); const [items,setItems]=useState([]); const [msg,setMsg]=useState('');
async function load(){ try{ setItems(await api('/users',{token})); setMsg(''); } catch(e){ setMsg(e.message);} }
return (<Layout><h2>Users</h2><textarea rows={4} value={token} onChange={e=>setToken(e.target.value)} style={{width:'100%'}} />
<div><button onClick={load}>Load Users</button></div><ul>{items.map(u=><li key={u.id}>{u.email} — {u.role}</li>)}</ul>{msg&&<p style={{color:'crimson'}}>{msg}</p>}</Layout>); }