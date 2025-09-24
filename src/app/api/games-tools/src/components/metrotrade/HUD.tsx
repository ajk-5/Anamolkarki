"use client";
import { useMetroStore } from "../../hooks/useMetroStore";
import styles from "../../styles/metrotrade/ui.module.css";

export default function HUD(){
  const state = useMetroStore(s=>s.state);
  const roll = useMetroStore(s=>s.roll);
  const resolve = useMetroStore(s=>s.resolve);
  const end = useMetroStore(s=>s.end);
  const buy = useMetroStore(s=>s.buy);

  const me = state.players[state.turn];
  const canInteract = me.isHuman && !me.bankrupt;
  const canRoll = canInteract && state.phase === 'await_roll';
  const canResolve = canInteract && state.phase === 'await_resolve';
  const canBuy = canInteract && state.phase === 'await_action' && state.prompts.canBuy;
  const canEnd = canInteract && state.phase === 'await_end';

  return (
    <div className={styles.hud}>
      <div className={styles.turnRow}>
        <div><strong>Turn:</strong> {me.name}</div>
        <div><strong>Dice:</strong> {state.dice? `${state.dice[0]} + ${state.dice[1]}` : "-"}</div>
      </div>
      <div className={styles.turnRow}>
        <div><strong>Phase:</strong> {state.phase.replace('await_','')}</div>
        {state.prompts.mustPay > 0 && <div><strong>Pay:</strong> {state.prompts.mustPay}</div>}
      </div>
      <div className={styles.buttons}>
        <button disabled={!canRoll} title={!canRoll? 'You must end previous phase':'Roll the dice'} onClick={roll}>Roll</button>
        <button disabled={!canResolve} title={!canResolve? 'Roll first':'Resolve landing'} onClick={resolve}>Resolve</button>
        <button disabled={!canBuy} title={!canBuy? 'No property to buy':'Buy this tile'} onClick={buy}>Buy</button>
        <button disabled={!canEnd} title={!canEnd? 'Resolve first':'End your turn'} onClick={end}>End Turn</button>
      </div>
      <div className={styles.log}>
        {state.log.slice(-8).map((l,i)=> <div key={i} className={styles.logLine}>{l.text}</div>)}
      </div>
    </div>
  );
}

