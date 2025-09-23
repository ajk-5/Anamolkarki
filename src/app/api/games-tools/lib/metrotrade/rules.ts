import type { GameState, Player, Tile } from "./types";
import { PASS_START_BONUS, JAIL_INDEX } from "./constants";

export function passStartBonus(player: Player) { player.cash += PASS_START_BONUS; }

export function computeRent(tile: Tile, ownerPropsInGroup: number): number {
  if (!tile.property) return 0;
  const lvl = tile.property.upgrades;
  const base = tile.property.baseRent[Math.min(lvl, tile.property.baseRent.length-1)] || 0;
  // small group bonus: +50% if owner holds 3+ in group and tile has <1 upgrade
  const monoBonus = (ownerPropsInGroup >= 3 && lvl === 0) ? Math.floor(base * 1.5) : base;
  return tile.property.mortgaged ? 0 : monoBonus;
}

export function jailPlayer(p: Player) { p.inJail = true; p.jailTurns = 0; p.pos = JAIL_INDEX; }
export function leaveJail(p: Player) { p.inJail = false; p.jailTurns = 0; }

export function adjustNetWorth(g: GameState) {
  for (const p of g.players) {
    // rough estimate of property value
    const propVal = g.tiles.reduce((sum, t) => sum + (t.property && t.property.owner===p.id ? Math.floor(t.property.cost * (1 + 0.5*t.property.upgrades)) : 0), 0);
    p.netWorth = p.cash + propVal;
    if (p.cash < -500) p.bankrupt = true; // simple bankruptcy condition
  }
}
