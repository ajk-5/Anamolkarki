"use client";
export default function Dice({ d1, d2 }: { d1:number; d2:number; }){
  return <div style={{display:"inline-flex",gap:8}}><Die v={d1}/><Die v={d2}/></div>;
}
function Die({ v }:{ v:number }){
  return <div style={{width:28,height:28,border:"1px solid #777",borderRadius:6,display:"grid",placeItems:"center"}}>{v}</div>;
}
