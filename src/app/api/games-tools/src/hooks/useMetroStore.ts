"use client";
import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import type { GameState, InitOptions } from "@/lib/metrotrade/types";
import { initGame, rollAndAdvance, resolveLanding, endTurn, buyCurrent, buildOnOwned, toggleMortgage, runUntilHuman } from "@/lib/metrotrade/engine";

interface Store {
  state: GameState;
  init: (opts: InitOptions) => void;
  roll: () => void;
  resolve: () => void;
  end: () => void;
  buy: () => void;
  build: (tileIndex: number) => void;
  mortgage: (tileIndex: number) => void;
  reset: (opts?: InitOptions) => void;
}

export const useMetroStore = create<Store>()(immer((set) => ({
  state: initGame({ players: 2, humans: 1 }),
  init: (opts) => set(draft => { draft.state = runUntilHuman(initGame(opts)); }),
  reset: (opts) => set(draft => { draft.state = runUntilHuman(initGame(opts || { players: 2, humans: 1 })); }),
  roll: () => set(draft => { draft.state = rollAndAdvance(draft.state); }),
  resolve: () => set(draft => { draft.state = resolveLanding(draft.state); }),
  end: () => set(draft => { draft.state = endTurn(draft.state); }),
  buy: () => set(draft => { draft.state = buyCurrent(draft.state); }),
  build: (tileIndex) => set(draft => { draft.state = buildOnOwned(draft.state, tileIndex); }),
  mortgage: (tileIndex) => set(draft => { draft.state = toggleMortgage(draft.state, tileIndex); }),
})));
