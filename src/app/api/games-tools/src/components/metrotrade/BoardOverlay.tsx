"use client";
import { useMetroStore } from "../../hooks/useMetroStore";
import styles from "../../styles/metrotrade/overlay.module.css";

export default function BoardOverlay(){
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
    <div className={styles.overlay}>
      <div className={styles.row}>
        <div className={styles.meta}>
          <span className={styles.badge}>{me.id + 1}</span>
          <span className={styles.turn}>Turn: {me.name}</span>
          <span className={styles.dice}>Dice: {state.dice? `${state.dice[0]} + ${state.dice[1]}` : '-'}</span>
        </div>
        <div className={styles.controls}>
          <button disabled={!canRoll} onClick={roll}>Roll</button>
          <button disabled={!canResolve} onClick={resolve}>Resolve</button>
          <button disabled={!canBuy} onClick={buy}>Buy</button>
          <button disabled={!canEnd} onClick={end}>End</button>
        </div>
      </div>
    </div>
  );
}

