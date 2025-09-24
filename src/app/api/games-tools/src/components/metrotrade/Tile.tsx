"use client";
import type { Tile as T } from "../../../lib/metrotrade/types";
import { useMetroStore } from "../../hooks/useMetroStore";
import ui from "../../styles/metrotrade/board.module.css";

export default function Tile({ tile }: { tile: T }) {
  const state = useMetroStore((s) => s.state);
  const me = state.players[state.turn];
  const isHere = me.pos === tile.i;
  const classes = [ui[`t_${tile.type.toLowerCase()}`]];

  const ownerName =
    tile.property && tile.property.owner !== null
      ? state.players[tile.property.owner].name
      : "-";

  return (
    <div className={classes.join(" ")}> 
      <div className={ui.name}>{tile.name}</div>
      {tile.property && (
        <div className={ui.prop}>
          <div>${tile.property.cost}</div>
          <div>Lv: {tile.property.upgrades}</div>
          <div>Own: {ownerName}</div>
          {tile.property.mortgaged && <div className={ui.badge}>M</div>}
        </div>
      )}
      <div className={ui.pawns}>
        {state.players.map((p) => (
          <span
            key={p.id}
            className={ui.pawn}
            style={{ opacity: p.pos === tile.i ? 1 : 0.15 }}
          >
            {p.id + 1}
          </span>
        ))}
      </div>
      {isHere && <div className={ui.here} />}
    </div>
  );
}
