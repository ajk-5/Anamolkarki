"use client";
import { useMetroStore } from "@/hooks/useMetroStore";
import { BOARD } from "@/lib/metrotrade/constants";
import Tile from "./Tile";
import boardCss from "@/styles/metrotrade/board.module.css";

export default function Board(){
  const state = useMetroStore(s=>s.state);
  return (
    <div className={boardCss.grid}>
      {BOARD.map((tile)=> {
        const t = state.tiles[tile.i];
        const group = tile.property?.group ?? '';
        const slug = group.toLowerCase().replace(/[^a-z0-9]+/g, '_');
        const map = boardCss as unknown as Record<string,string>;
        const groupClass = slug && map[`g_${slug}`] ? map[`g_${slug}`] : '';
        return (
          <div key={tile.i} className={`${boardCss.tile} ${groupClass}`.trim()}>
            <Tile tile={t} />
          </div>
        );
      })}
    </div>
  );
}
