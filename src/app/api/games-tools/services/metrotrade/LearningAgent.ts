import type { GameState } from '../../lib/metrotrade/types';

export class LearningAgent {
  constructor(private readonly playerId: number) {}

  decideBuy(state: GameState): boolean {
    const me = state.players[this.playerId];
    if (!me) {
      return true;
    }

    const owned = state.tiles.filter(
      (tile) => tile.property?.owner === this.playerId
    ).length;

    return me.cash > 150 || owned < 3;
  }

  decideBuild(state: GameState, tileIndex: number): boolean {
    const me = state.players[this.playerId];
    if (!me) {
      return false;
    }

    const tile = state.tiles[tileIndex];
    if (!tile?.property || tile.property.owner !== this.playerId) {
      return false;
    }

    return me.cash > 250 && tile.property.upgrades < 5;
  }

  learnBuy(before: GameState, after: GameState, success: boolean): void {
    const delta =
      (after.players[this.playerId]?.netWorth ?? 0) -
      (before.players[this.playerId]?.netWorth ?? 0);

    void delta;
    void success;
  }

  learnBuild(before: GameState, after: GameState, success: boolean): void {
    const beforeWorth = before.players[this.playerId]?.netWorth ?? 0;
    const afterWorth = after.players[this.playerId]?.netWorth ?? 0;

    void beforeWorth;
    void afterWorth;
    void success;
  }
}
