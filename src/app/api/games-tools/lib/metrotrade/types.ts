export type PlayerId = number;
export type TileIndex = number;

export interface InitOptions { players: number; humans: number; }

export type TileType = "GO" | "PROPERTY" | "TRANSIT" | "UTILITY" | "JAIL" | "VISIT" | "PARKING" | "GO_TO_JAIL" | "EVENT" | "FUND" | "TAX";

export interface Property {
  cost: number;
  group: string; // color/group name
  baseRent: number[]; // length 6 (0..5 upgrades)
  owner: PlayerId | null;
  upgrades: number; // 0..5
  mortgaged?: boolean;
}

export interface Tile {
  i: TileIndex;
  name: string;
  type: TileType;
  property?: Property;
  taxAmount?: number;
}

export interface Player {
  id: PlayerId;
  name: string;
  isHuman: boolean;
  cash: number;
  pos: TileIndex;
  inJail: boolean;
  jailTurns: number;
  bankrupt: boolean;
  netWorth: number; // cash + props value
}

export interface LogEntry { t: number; text: string; }

export interface GameState {
  turn: number; // index into players[]
  dice: [number, number] | null;
  tiles: Tile[];
  players: Player[];
  deckEvent: number[];
  deckFund: number[];
  /** Simple turn phase to gate UI actions */
  phase: 'await_roll' | 'await_resolve' | 'await_action' | 'await_end';
  prompts: {
    canBuy: boolean;
    mustPay: number; // rent/tax just computed
    landedTile: TileIndex | null;
  };
  lastActionAt: number; // timestamp
  rngSeed: number;
  settings: InitOptions;
  log: LogEntry[];
}
