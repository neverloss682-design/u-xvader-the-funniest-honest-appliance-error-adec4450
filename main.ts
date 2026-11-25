// The Funniest Honest Appliance Error — make.fun entry
// A dishwasher reports, deadpan, the one fault it can actually see:
// the owner loaded the plates face-to-face into a wall, and the
// machine did its job perfectly — on the wall.
//
// Premise check (25 Nov 2026, 1,358 submissions scanned via API):
//   sock / unbalanced-load washing machine: 188 / 92 title hits — saturated
//   fridge "light works, cooling doesn't": 50 hits — saturated
//   toaster burnt bread: 45 hits — saturated
//   kettle boiled dry: 19 hits, incl. "out of habit" — taken
//   rice-cooker "brick": taken twice — saturated
//   blender spoon: "I blended the spoon. It won." — taken
//   dishwasher wall-of-plates: 0 collisions ("wall" appears only in two
//   unrelated titles). Dishwasher itself only 18 title hits.
// The punchline is a REVERSAL, not an escalation: nothing in the first
// clause lets the reader guess "The wall is clean."

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "ERROR: Dishes still dirty. You loaded them facing each other, like a wall. I sprayed the wall. The wall is clean.";

// Gate from RULES.txt: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only whitespace, a single line.
function gate(text: string): void {
  const chars = [...text];
  if (chars.length < 1 || chars.length > 200) {
    throw new Error(`entry is ${chars.length} chars, must be 1-200`);
  }
  if (text.trim().length === 0) {
    throw new Error("entry is only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  gate(ENTRY);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, ENTRY + "\n", "utf8");
  // Round-trip check: what landed on disk must be exactly the gated entry.
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== ENTRY + "\n") {
    throw new Error("round-trip mismatch: entry.txt does not match ENTRY");
  }
  console.log(`wrote ${ENTRY.length} chars to ${outPath}`);
}

main();
