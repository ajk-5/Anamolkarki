"use client";
import { useMetroStore } from "../../hooks/useMetroStore";
import pcss from "../../styles/metrotrade/panels.module.css";

export default function PlayerPanel(){
  const state = useMetroStore(s=>s.state);
  const build = useMetroStore(s=>s.build);
  const mortgage = useMetroStore(s=>s.mortgage);
  const me = state.players[state.turn];
  return (
    <div className={pcss.wrap}>
      {state.players.map(p=> (
        <div key={p.id} className={pcss.card} data-active={p.id===me.id}>
          <div className={pcss.header}><span className={pcss.badge}>{p.id+1}</span> {p.name}</div>
          <div className={pcss.row}><span>Cash</span><span>{p.cash}</span></div>
          <div className={pcss.row}><span>Net worth</span><span>{p.netWorth}</span></div>
          <div className={pcss.props}>
            {state.tiles.filter(t=>t.property && t.property.owner===p.id).map(t=> (
              <div key={t.i} className={pcss.prop}>
                <div className={pcss.pname}>{t.name}</div>
                <div className={pcss.pmeta}>Lv {t.property!.upgrades} {t.property!.mortgaged?"(M)":""}</div>
                {p.id===me.id && (
                  <div className={pcss.actions}>
                    <button onClick={()=>build(t.i)} disabled={t.property!.upgrades>=5}>Build</button>
                    <button onClick={()=>mortgage(t.i)}>{t.property!.mortgaged?"Unmortgage":"Mortgage"}</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
