import type { GameState, InitOptions, Player } from "./types";
import { BOARD, START_CASH, PASS_START_BONUS } from "./constants";
import { rollDice, wrap, nextSeed } from "./utils";
import { adjustNetWorth, computeRent, jailPlayer, leaveJail } from "./rules";
import { LearningAgent } from "../../services/metrotrade/LearningAgent";

function clone<T>(x:T):T { return JSON.parse(JSON.stringify(x)); }

function makePlayers(opts: InitOptions): Player[] {
  const players: Player[] = [];
  for (let i=0;i<opts.players;i++) {
    const isHuman = i < opts.humans;
    players.push({ id:i, name: isHuman?`You ${i+1}`:`CPU ${i+1}`, isHuman, cash: START_CASH, pos:0, inJail:false, jailTurns:0, bankrupt:false, netWorth:START_CASH });
  }
  return players;
}

function shuffledDeck(len: number, seed: number){
  const arr = [...Array(len).keys()];
  let s = seed; for (let i=arr.length-1;i>0;i--){ s = nextSeed(s); const j = Math.floor(((s>>>0)%1000)/1000 * (i+1)); const k = (j % (i+1)); [arr[i],arr[k]]=[arr[k],arr[i]]; }
  return arr;
}

export function initGame(opts: InitOptions): GameState {
  const seed = Date.now() >>> 0;
  const g: GameState = {
    turn: 0,
    dice: null,
    tiles: clone(BOARD),
    players: makePlayers(opts),
    deckEvent: shuffledDeck(14, seed^0xabc),
    deckFund: shuffledDeck(14, seed^0xdef),
    phase: 'await_roll',
    prompts: { canBuy:false, mustPay:0, landedTile:null },
    lastActionAt: Date.now(),
    rngSeed: seed,
    settings: opts,
    log: [{ t: Date.now(), text: `Game started with ${opts.players} players (${opts.humans} human).` }]
  };
  adjustNetWorth(g);
  return g;
}

export function rollAndAdvance(g: GameState): GameState {
  g = clone(g);
  const me = g.players[g.turn];
  if (me.bankrupt) return g;
  if (g.phase !== 'await_roll') { g.log.push({t:Date.now(), text:`Wait: already rolled. Resolve first.`}); return g; }
  if (me.inJail) {
    // Try to leave jail after 1 turn by paying 50
    me.jailTurns++;
    if (me.jailTurns >= 1 && me.cash >= 50) { me.cash -= 50; leaveJail(me); g.log.push({t:Date.now(), text:`${me.name} paid 50 to leave Detention.`}); }
    else { g.log.push({t:Date.now(), text:`${me.name} waits in Detention.`}); return g; }
  }
  const r = rollDice(g.rngSeed); g.rngSeed = r.seed; g.dice = [r.d1, r.d2];
  const steps = r.d1 + r.d2;
  const old = me.pos; const next = wrap(old + steps);
  if (next < old) { me.cash += PASS_START_BONUS; g.log.push({ t:Date.now(), text:`${me.name} passed Metro Hub (+${PASS_START_BONUS}).`}); }
  me.pos = next;
  g.prompts.landedTile = me.pos; g.prompts.canBuy = false; g.prompts.mustPay = 0;
  g.phase = 'await_resolve';
  return g;
}

function countOwnedInGroup(g: GameState, ownerId: number, group: string){
  return g.tiles.filter(t => t.property && t.property.owner===ownerId && t.property.group===group).length;
}

export function resolveLanding(g: GameState): GameState {
  g = clone(g);
  const me = g.players[g.turn];
  const tile = g.tiles[me.pos];
  if (!tile) return g;
  if (g.phase !== 'await_resolve') { g.log.push({t:Date.now(), text:`Wait: roll first.`}); return g; }

  switch(tile.type){
    case "GO": g.log.push({t:Date.now(), text:`${me.name} is at Metro Hub.`}); break;
    case "PROPERTY":
    case "TRANSIT":
    case "UTILITY": {
      if (!tile.property) break;
      if (tile.property.owner===null) {
        g.prompts.canBuy = true; g.log.push({t:Date.now(), text:`${me.name} can buy ${tile.name} for ${tile.property.cost}.`});
      } else if (tile.property.owner!==me.id && !tile.property.mortgaged) {
        const owner = g.players[tile.property.owner];
        const count = countOwnedInGroup(g, owner.id, tile.property.group);
        const rent = computeRent(tile, count);
        me.cash -= rent; owner.cash += rent; g.prompts.mustPay = rent;
        g.log.push({t:Date.now(), text:`${me.name} pays ${rent} to ${owner.name} for ${tile.name}.`});
      }
      break;
    }
    case "TAX": { const amt = tile.taxAmount||0; me.cash -= amt; g.prompts.mustPay = amt; g.log.push({t:Date.now(), text:`${me.name} pays tax ${amt}.`}); break; }
    case "EVENT": { // simple events
      const r = (g.rngSeed % 6) - 3; g.rngSeed = nextSeed(g.rngSeed);
      const amt = r*50; me.cash += amt; g.log.push({t:Date.now(), text:`Event card: ${(amt>=0?"Gain":"Lose")} ${Math.abs(amt)}.`});
      break; }
    case "FUND": { const amt = 100; me.cash += amt; g.log.push({t:Date.now(), text:`Transit fund grant +${amt}.`}); break; }
    case "GO_TO_JAIL": { jailPlayer(me); g.log.push({t:Date.now(), text:`${me.name} sent to Detention.`}); break; }
    case "VISIT": case "PARKING": default: { g.log.push({t:Date.now(), text:`${me.name} is safe at ${tile.name}.`}); }
  }
  adjustNetWorth(g);
  // Next phase: if can buy, await action, else await end
  g.phase = g.prompts.canBuy ? 'await_action' : 'await_end';
  return g;
}

export function buyCurrent(g: GameState): GameState {
  g = clone(g);
  const me = g.players[g.turn];
  const tile = g.tiles[me.pos];
  if (g.phase !== 'await_action') { g.log.push({t:Date.now(), text:`Wait: nothing to buy now.`}); return g; }
  if (tile.property && tile.property.owner===null && me.cash >= tile.property.cost){
    const before = clone(g);
    me.cash -= tile.property.cost; tile.property.owner = me.id;
    g.prompts.canBuy = false; g.log.push({t:Date.now(), text:`${me.name} bought ${tile.name}.`});
    adjustNetWorth(g);
    // learning
    if (!me.isHuman) new LearningAgent(me.id).learnBuy(before, g, true);
  } else if (!tile.property?.owner && !me.isHuman) {
    // learning negative signal for skipping when cannot afford
    const before = clone(g); adjustNetWorth(before); const after = clone(g); adjustNetWorth(after);
    new LearningAgent(me.id).learnBuy(before, after, false);
  }
  g.phase = 'await_end';
  return g;
}

export function buildOnOwned(g: GameState, tileIndex: number): GameState {
  g = clone(g);
  const me = g.players[g.turn];
  const tile = g.tiles[tileIndex];
  if (!tile.property || tile.property.owner!==me.id) return g;
  const cost = Math.floor(tile.property.cost * 0.6);
  if (tile.property.upgrades < 5 && me.cash >= cost) {
    const before = clone(g);
    me.cash -= cost; tile.property.upgrades += 1;
    g.log.push({t:Date.now(), text:`${me.name} upgraded ${tile.name} (lvl ${tile.property.upgrades}).`});
    adjustNetWorth(g);
    if (!me.isHuman) new LearningAgent(me.id).learnBuild(before, g, true);
  }
  return g;
}

export function toggleMortgage(g: GameState, tileIndex: number): GameState {
  g = clone(g);
  const me = g.players[g.turn];
  const tile = g.tiles[tileIndex];
  if (!tile.property || tile.property.owner!==me.id) return g;
  if (tile.property.mortgaged){ tile.property.mortgaged=false; me.cash -= Math.floor(tile.property.cost*0.55); }
  else { tile.property.mortgaged=true; me.cash += Math.floor(tile.property.cost*0.5); }
  adjustNetWorth(g);
  return g;
}

export function endTurn(g: GameState): GameState {
  g = clone(g);
  if (g.phase === 'await_resolve' || g.phase === 'await_action') {
    g.log.push({t:Date.now(), text:`Resolve your move before ending turn.`});
    return g;
  }
  g.turn = (g.turn + 1) % g.players.length;
  g.dice = null; g.prompts = { canBuy:false, mustPay:0, landedTile:null };
  g.phase = 'await_roll';
  adjustNetWorth(g);
  return runUntilHuman(g);
}

export function runUntilHuman(g: GameState): GameState {
  let state = clone(g);
  let guard = 0;
  while (!state.players[state.turn].isHuman && !state.players[state.turn].bankrupt && guard < 20) {
    state = aiTakeTurn(state);
    guard++;
  }
  return state;
}

export function aiTakeTurn(g: GameState): GameState {
  let state = clone(g);
  const actor = state.players[state.turn];
  if (actor.isHuman || actor.bankrupt) return state;
  const agent = new LearningAgent(actor.id);

  // 1) Roll & resolve
  state = rollAndAdvance(state);
  const before = clone(state);
  state = resolveLanding(state);

  // 2) If can buy, decide
  const tile = state.tiles[state.players[state.turn].pos];
  if (tile.property && tile.property.owner===null) {
    const want = agent.decideBuy(before);
    if (want && state.players[state.turn].cash >= tile.property.cost) state = buyCurrent(state);
    else agent.learnBuy(before, state, false);
  }
  // 3) Opportunistic build on owned groups if cash healthy
  const me = state.players[state.turn];
  if (me.cash > 250) {
    for (let i=0;i<state.tiles.length;i++) {
      const t = state.tiles[i];
      if (t.property && t.property.owner===me.id && t.property.upgrades<5) {
        if (agent.decideBuild(state, i)) state = buildOnOwned(state, i);
      }
    }
  }
  // 4) End turn (human-safe: no recursive AI)
  state.turn = (state.turn + 1) % state.players.length;
  state.dice = null; state.prompts = { canBuy:false, mustPay:0, landedTile:null }; state.phase = 'await_roll';
  adjustNetWorth(state);
  return state;
}

export function resetGame(opts?: InitOptions){ return initGame(opts || { players:2, humans:1 }); }
