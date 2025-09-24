"use client";
import { useMemo, useState } from "react";
import { useMetroStore } from "../../hooks/useMetroStore";
import Board from "./Board";
import BoardOverlay from "./BoardOverlay";
import styles from "../../styles/metrotrade/ui.module.css";
import responsive from "../../styles/metrotrade/responsive.module.css";

export default function MetroTradeGame(){
  const [players, setPlayers] = useState(2);
  const [humans, setHumans] = useState(1);
  const [size, setSize] = useState<'default'|'small'|'large'>('default');
  const [shape, setShape] = useState<'auto'|'square'>('auto');
  const init = useMetroStore(s=>s.init);
  const state = useMetroStore(s=>s.state);

  const onStart = () => init({ players, humans });

  const bankruptCount = useMemo(()=> state.players.filter(p=>p.bankrupt).length, [state.players]);
  const gameOver = bankruptCount >= state.players.length-1;

  return (
    <div className={`${styles.container} ${size==='small'? styles.sizeSm : ''} ${size==='large'? styles.sizeLg : ''} ${shape==='square'? styles.squareMode : ''} ${responsive.container}`}>
      <div className={`${styles.topBar} ${responsive.topBar}`}>
        <div className={styles.brand}>MetroTrade</div>
        <div className={`${styles.controls} ${responsive.controls}`}>
          <label>Players
            <input type="number" min={2} max={5} value={players} onChange={e=>setPlayers(parseInt(e.target.value||"2"))}/>
          </label>
          <label>Humans
            <input type="number" min={1} max={Math.max(1, players-1)} value={humans} onChange={e=>setHumans(parseInt(e.target.value||"1"))}/>
          </label>
          <label>Size
            <select value={size} onChange={(e)=> setSize(e.target.value as 'default'|'small'|'large')}>
              <option value="default">Default</option>
              <option value="small">Small</option>
              <option value="large">Large</option>
            </select>
          </label>
          <label>Shape
            <select value={shape} onChange={(e)=> setShape(e.target.value as 'auto'|'square')}>
              <option value="auto">Auto</option>
              <option value="square">Square</option>
            </select>
          </label>
          <button onClick={onStart} className={styles.primary}>Start</button>
        </div>
      </div>
      <div className={`${styles.layout} ${responsive.layout}`}>
        <div className={`${styles.boardWrap} ${responsive.boardWrap}`}>
          <Board/>
          <BoardOverlay/>
        </div>
      </div>
      {gameOver && <div className={styles.overlay}><div className={styles.modal}><h2>Game Over</h2><p>Winner: {state.players.sort((a,b)=>b.netWorth-a.netWorth)[0].name}</p><button onClick={()=>init({ players, humans })}>Play again</button></div></div>}
    </div>
  );
}
