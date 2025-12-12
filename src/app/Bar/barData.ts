export type Category = "methods" | "materials" | "glasses";

export interface Item {
  id: string;
  name: string;
  description: string;
  visualCue: string;
}

export const methods: Item[] = [
  { id: "shake", name: "Standard Shake", description: "Chill, dilute, and aerate with a crisp shoulder-height shake.", visualCue: "Fast back-and-forth motion with the shaker at shoulder height." },
  { id: "dry-shake", name: "Dry Shake", description: "Emulsify without ice, then add ice to finish with cold texture.", visualCue: "1) Shake without ice. 2) Add ice. 3) Shake again." },
  { id: "reverse-dry-shake", name: "Reverse Dry Shake", description: "Shake with ice first, strain, then foam hard without ice.", visualCue: "1) Shake with ice. 2) Remove ice. 3) Shake hard, no ice." },
  { id: "stir", name: "Stir", description: "Keep the drink glass-clear with a cold, silky stir.", visualCue: "Smooth circular motion with the back of the spoon against the glass wall." },
  { id: "muddle", name: "Muddle", description: "Press oils and aroma without shredding fruit or herbs.", visualCue: "Press down, then twist slightly. Do not smash aggressively." },
  { id: "build", name: "Build", description: "Layer ingredients in-glass for speed and clarity.", visualCue: "Ingredients added step by step into the same glass." },
  { id: "throwing", name: "Throwing (Rolling)", description: "Aerate without foam using a high arc between tins.", visualCue: "Smooth arc of liquid between two tins held at different heights." },
  { id: "strain", name: "Strain / Double Strain", description: "Hold back ice and pulp for silk-smooth pours.", visualCue: "Liquid passes through a main strainer, then through a small mesh." },
  { id: "flash-blend", name: "Flash Blend", description: "Hit the blender briefly to keep texture icy, not smooth.", visualCue: "Short blender pulse, the ice stays visibly chunky." },
  { id: "swizzle", name: "Swizzle", description: "Spin a swizzle stick to churn crushed ice and chill fast.", visualCue: "Stick held between palms and rotated quickly like a drill through the ice." },
  { id: "layer", name: "Layer / Float", description: "Pour to density for precise floating color bands.", visualCue: "Thin stream flows over the back of a spoon, forming neat liquid layers." },
  { id: "rim", name: "Rim the Glass", description: "Dress the rim for flavor on every sip.", visualCue: "Glass rim rolled on a plate after being moistened with citrus or syrup." },
];

export const materials: Item[] = [
  { id: "boston", name: "Boston Shaker", description: "Tin-on-tin workhorse, fast seals, clean releases.", visualCue: "Two cups lock at an angle and separate with a tap." },
  { id: "cobbler", name: "Cobbler Shaker", description: "Built-in strainer and cap for friendly, compact builds.", visualCue: "Body, strainer top, and small cap stack together." },
  { id: "jigger", name: "Jigger", description: "Accurate dual-sided pours keep specs consistent.", visualCue: "Hourglass shape: small measure on one side, large on the other." },
  { id: "hawthorne", name: "Hawthorne Strainer", description: "Spring-loaded guard for tight, no-ice pours.", visualCue: "Flat metal disk with a coiled spring around the edge." },
  { id: "julep", name: "Julep Strainer", description: "Perforated bowl that rides the mixing glass just right.", visualCue: "Looks like a large perforated spoon fitted just inside the glass." },
  { id: "muddler-tool", name: "Muddler", description: "Weighty press to unlock oils without tearing produce.", visualCue: "Short stick with a flat or toothed end pressing ingredients." },
  { id: "barspoon", name: "Bar Spoon", description: "Twisted spine for precise stirring and layering.", visualCue: "Very long handle rotated smoothly between fingers." },
  { id: "fine-strainer", name: "Fine Mesh Strainer", description: "Catches ice shards when double-straining citrus builds.", visualCue: "Fine mesh basket catching tiny ice shards and pulp." },
  { id: "citrus-press", name: "Citrus Press", description: "Fast leverage for bright, clean juice.", visualCue: "Lemon half placed inside, handles pressed together." },
  { id: "peeler", name: "Channel Knife / Peeler", description: "Ribbon peels for visuals and aromatics.", visualCue: "Thin curls of peel coming off the fruit." },
  { id: "zester", name: "Microplane Zester", description: "Snowy zest or nutmeg to finish the nose.", visualCue: "Small flakes falling from the grater onto the drink surface." },
  { id: "ice-mold", name: "Ice Mold", description: "Slow-melt cubes and spheres for spirit-forward drinks.", visualCue: "Clear big cubes or spheres in a rocks glass." },
  { id: "pour-spouts", name: "Speed Pour Spouts", description: "Tight streams for spec-perfect counts.", visualCue: "Thin stream from a bottle with a metal spout." },
  { id: "blender", name: "Bar Blender", description: "Frozen builds with torque for crushed ice.", visualCue: "Pitcher on a base, swirling frozen mixture inside." },
];

export const glasses: Item[] = [
  { id: "coupe", name: "Coupe", description: "Stemmed, wide, and elegant for no-ice serves.", visualCue: "Shallow rounded bowl on a slim stem." },
  { id: "martini", name: "Martini", description: "Iconic V silhouette for crisp up-style cocktails.", visualCue: "Sharp V shape on a stem, often filled close to the rim." },
  { id: "rocks", name: "Rocks", description: "Heavy base with room for a single clear cube.", visualCue: "Short cylinder with a large cube inside." },
  { id: "highball", name: "Highball", description: "Tall column for carbonated high-volume mixers.", visualCue: "Tall cylinder full of ice and bubbles." },
  { id: "nick-nora", name: "Nick & Nora", description: "Forward-leaning bowl with restrained capacity.", visualCue: "Bell-shaped bowl slightly leaning forward." },
  { id: "hurricane", name: "Hurricane", description: "Curved S-line glass for vivid tiki and tropical builds.", visualCue: "Tall S-shaped glass with colorful drink inside." },
  { id: "copper", name: "Copper Mug", description: "Conductive chill for mule-style service.", visualCue: "Shiny metal mug with frosty surface." },
  { id: "wine", name: "Wine Glass", description: "Rounded bowl to let aromatics evolve.", visualCue: "Curved bowl tapering slightly at the top." },
  { id: "flute", name: "Champagne Flute", description: "Narrow profile to keep bubbles alive.", visualCue: "Slim glass with rising bubbles." },
  { id: "pilsner", name: "Pilsner Glass", description: "Tall slight flare, perfect for spritzes and beer.", visualCue: "Tall glass wider at the top than the bottom." },
  { id: "shot", name: "Shot Glass", description: "Direct, measured, and fast.", visualCue: "Very short glass filled in one go." },
  { id: "tiki", name: "Tiki Mug", description: "Sculpted ceramic statement for playful builds.", visualCue: "Colorful sculpted mug with a bold face design." },
  { id: "snifter", name: "Snifter", description: "Wide bowl, narrow lip to capture deep aromas.", visualCue: "Round bowl cradled in the hand, small opening at the top." },
];

export function getVisualClass(id: string): string {
  switch (id) {
    case "shake":
      return "visual--shake-standard";
    case "dry-shake":
      return "visual--shake-dry";
    case "reverse-dry-shake":
      return "visual--shake-reverse";
    case "stir":
      return "visual--stir";
    case "swizzle":
      return "visual--swizzle";
    case "throwing":
      return "visual--throw";
    case "strain":
      return "visual--strain";
    case "layer":
      return "visual--layer";
    case "flash-blend":
      return "visual--blend";
    case "build":
      return "visual--build";
    case "muddle":
    case "muddler-tool":
      return "visual--muddle";
    case "rim":
      return "visual--rim";
    default:
      return "visual--generic";
  }
}

export const categoryMeta: Record<Category, { title: string; subtitle: string; accent: string; count: number }> = {
  methods: { title: "Techniques", subtitle: "Motion-led routines for consistent builds", accent: "#22d3ee", count: methods.length },
  materials: { title: "Tools", subtitle: "Hardware that keeps the pace under pressure", accent: "#a855f7", count: materials.length },
  glasses: { title: "Glassware", subtitle: "Form factors that frame flavor", accent: "#f97316", count: glasses.length },
};
