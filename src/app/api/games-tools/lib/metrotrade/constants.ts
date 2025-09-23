import type { Tile } from "./types";

// Board: 40 tiles with original names (no Monopoly IP).
export const START_CASH = 1500;
export const PASS_START_BONUS = 200;
export const JAIL_INDEX = 10;
export const GO_TO_JAIL_INDEX = 30;

export const BOARD: Tile[] = [
  { i:0, name:"Metro Hub", type:"GO" },
  { i:1, name:"Lime Street", type:"PROPERTY", property:{ cost:60, group:"Greenline", baseRent:[2,10,30,90,160,250], owner:null, upgrades:0 }},
  { i:2, name:"Transit Fund", type:"FUND" },
  { i:3, name:"Cedar Avenue", type:"PROPERTY", property:{ cost:60, group:"Greenline", baseRent:[4,20,60,180,320,450], owner:null, upgrades:0 }},
  { i:4, name:"City Tax", type:"TAX", taxAmount:200 },
  { i:5, name:"Central Station", type:"TRANSIT", property:{ cost:200, group:"Transit", baseRent:[25,50,100,200,200,200], owner:null, upgrades:0 }},
  { i:6, name:"Harbor Lane", type:"PROPERTY", property:{ cost:100, group:"Bluebelt", baseRent:[6,30,90,270,400,550], owner:null, upgrades:0 }},
  { i:7, name:"Event", type:"EVENT" },
  { i:8, name:"Violet Road", type:"PROPERTY", property:{ cost:100, group:"Bluebelt", baseRent:[6,30,90,270,400,550], owner:null, upgrades:0 }},
  { i:9, name:"Indigo Way", type:"PROPERTY", property:{ cost:120, group:"Bluebelt", baseRent:[8,40,100,300,450,600], owner:null, upgrades:0 }},
  { i:10, name:"Metro Detention (Visit)", type:"VISIT" },
  { i:11, name:"Bronze Street", type:"PROPERTY", property:{ cost:140, group:"Bronzeway", baseRent:[10,50,150,450,625,750], owner:null, upgrades:0 }},
  { i:12, name:"Utilities Co.", type:"UTILITY", property:{ cost:150, group:"Utility", baseRent:[4,10,30,90,160,250], owner:null, upgrades:0 }},
  { i:13, name:"Copper Lane", type:"PROPERTY", property:{ cost:140, group:"Bronzeway", baseRent:[10,50,150,450,625,750], owner:null, upgrades:0 }},
  { i:14, name:"Amber Alley", type:"PROPERTY", property:{ cost:160, group:"Bronzeway", baseRent:[12,60,180,500,700,900], owner:null, upgrades:0 }},
  { i:15, name:"Riverside Station", type:"TRANSIT", property:{ cost:200, group:"Transit", baseRent:[25,50,100,200,200,200], owner:null, upgrades:0 }},
  { i:16, name:"Lilac Terrace", type:"PROPERTY", property:{ cost:180, group:"Lilac Row", baseRent:[14,70,200,550,750,950], owner:null, upgrades:0 }},
  { i:17, name:"Transit Fund", type:"FUND" },
  { i:18, name:"Skyline Drive", type:"PROPERTY", property:{ cost:180, group:"Lilac Row", baseRent:[14,70,200,550,750,950], owner:null, upgrades:0 }},
  { i:19, name:"Cobalt Court", type:"PROPERTY", property:{ cost:200, group:"Lilac Row", baseRent:[16,80,220,600,800,1000], owner:null, upgrades:0 }},
  { i:20, name:"Free Parking", type:"PARKING" },
  { i:21, name:"Crimson Street", type:"PROPERTY", property:{ cost:220, group:"Crimson Block", baseRent:[18,90,250,700,875,1050], owner:null, upgrades:0 }},
  { i:22, name:"Event", type:"EVENT" },
  { i:23, name:"Ruby Road", type:"PROPERTY", property:{ cost:220, group:"Crimson Block", baseRent:[18,90,250,700,875,1050], owner:null, upgrades:0 }},
  { i:24, name:"Garnet Gate", type:"PROPERTY", property:{ cost:240, group:"Crimson Block", baseRent:[20,100,300,750,925,1100], owner:null, upgrades:0 }},
  { i:25, name:"Uptown Station", type:"TRANSIT", property:{ cost:200, group:"Transit", baseRent:[25,50,100,200,200,200], owner:null, upgrades:0 }},
  { i:26, name:"Emerald Esplanade", type:"PROPERTY", property:{ cost:260, group:"Emerald Row", baseRent:[22,110,330,800,975,1150], owner:null, upgrades:0 }},
  { i:27, name:"Opal Avenue", type:"PROPERTY", property:{ cost:260, group:"Emerald Row", baseRent:[22,110,330,800,975,1150], owner:null, upgrades:0 }},
  { i:28, name:"Grid Utilities", type:"UTILITY", property:{ cost:150, group:"Utility", baseRent:[4,10,30,90,160,250], owner:null, upgrades:0 }},
  { i:29, name:"Jade Junction", type:"PROPERTY", property:{ cost:280, group:"Emerald Row", baseRent:[24,120,360,850,1025,1200], owner:null, upgrades:0 }},
  { i:30, name:"Go To Detention", type:"GO_TO_JAIL" },
  { i:31, name:"Sunset Boulevard", type:"PROPERTY", property:{ cost:300, group:"Sunset", baseRent:[26,130,390,900,1100,1275], owner:null, upgrades:0 }},
  { i:32, name:"Coral Crescent", type:"PROPERTY", property:{ cost:300, group:"Sunset", baseRent:[26,130,390,900,1100,1275], owner:null, upgrades:0 }},
  { i:33, name:"Transit Fund", type:"FUND" },
  { i:34, name:"Topaz Trail", type:"PROPERTY", property:{ cost:320, group:"Sunset", baseRent:[28,150,450,1000,1200,1400], owner:null, upgrades:0 }},
  { i:35, name:"Harbor Station", type:"TRANSIT", property:{ cost:200, group:"Transit", baseRent:[25,50,100,200,200,200], owner:null, upgrades:0 }},
  { i:36, name:"Event", type:"EVENT" },
  { i:37, name:"Aurora Avenue", type:"PROPERTY", property:{ cost:350, group:"Aurora", baseRent:[35,175,500,1100,1300,1500], owner:null, upgrades:0 }},
  { i:38, name:"Luxury Tax", type:"TAX", taxAmount:100 },
  { i:39, name:"Crown Heights", type:"PROPERTY", property:{ cost:400, group:"Aurora", baseRent:[50,200,600,1400,1700,2000], owner:null, upgrades:0 }},
];
