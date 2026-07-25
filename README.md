# GPT-5.6 (Sol/Terra/Luna) vs Claude Fable 5 — interactive keynote

A single-page, keyboard-driven presentation for a YouTube comparison video. No backend,
no build step — plain HTML/CSS/JS.

## Run it

```bash
npm start
```

This runs `npx serve` on **http://localhost:5500**. If you don't have Node, just open
`index.html` directly in a browser, or serve the folder any other way
(`python -m http.server 5500`).

## Controls

| Key | Action |
|---|---|
| `→` / `Space` | Reveal next beat, or advance to the next chapter |
| `←` | Reverse one beat / chapter |
| `0`–`7` | Jump straight to a chapter |
| `F` | Toggle fullscreen (record at 1920×1080) |
| Click left edge / right side of the screen | Same as `←` / `→` |

Every chapter also has its own interactive controls — click tier cards, accordions,
the Input/Output switch, benchmark rows, and opinion pills. These don't advance the deck;
only the arrow keys / space bar / clicks in the margins do.

## Structure

- `index.html` — all eight chapters (00 Title → 07 Sources), marked up with `data-beat`
  attributes that drive the reveal engine
- `styles.css` — the cream/grid editorial design system
- `app.js` — the reveal engine (chapter/beat state machine, progress bar, keyboard nav)
  plus the per-chapter interactivity (accordions, switches, pinning, tabs)
- `RESEARCH.md` — every on-screen number traced to a source and the date it was checked
  (2026-07-25), including the places where sources disagreed and how that's handled

## Why the numbers look the way they do

This was built by live web research, not from the seed brief. A few things that changed
along the way, verified against official docs and cross-checked against independent
coverage:

- Anthropic's Claude API already ships a five-level `effort` parameter
  (`low`/`medium`/`high`/`xhigh`/`max`) that's nearly identical to GPT-5.6's ladder — the
  real difference is OpenAI's `ultra`, which is parallel multi-agent execution, not a
  deeper single-agent effort level.
- Benchmark "wins" split down the middle depending on who ran the eval and whose
  scaffolding was used — SWE-bench Pro and Agents' Last Exam are flagged on-screen as
  vendor-reported rather than presented as neutral facts.
- GDPval was researched and then dropped from the deck entirely because the two published
  figures used mismatched benchmark versions.

See `RESEARCH.md` for the full trail.
