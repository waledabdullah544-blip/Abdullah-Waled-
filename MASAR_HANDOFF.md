# Masar (مسار) — handoff for Claude Code

Masar is an Adobe Illustrator clone shipped as ONE HTML file: `masar.html` (build 158, ~1.1 MB).
Final product = **desktop app (Windows + Mac) only. Never design/test for mobile.**
Owner: Abdullah Walid (Egyptian Arabic speaker, graphic designer). Talk to him in Arabic (Egyptian dialect).

## Standing rules (from the owner — all still apply)
- Strict Illustrator parity in behaviour AND look (UI colours, menus, panels, cursors, shortcuts). When unsure how Illustrator behaves, research it (Adobe docs, tutorials) instead of asking him. When a difference is found, fix it right away.
- Zero regression: targeted edits only, never rewrite the file, never delete/shorten a working feature. No placeholder code, no dummy buttons/fake logic — real vector math.
- Every tool: all mouse states (click, drag, double-click, hover cursors), modifiers (Shift constrain, Alt from-center/duplicate, Space pan/move), undo/redo for every action, correct screen→world coordinates under zoom/pan.
- Shortcuts are shown as plain English words everywhere ("Shift+N", "Ctrl+Z"; Cmd/Option on Mac) — never glyphs like ⇧ ⌘ ⌥.
- Menu bar = Illustrator's: File, Edit, Object, Type, Select, Effect, View, Window, Help. Threaded Text commands live under Type > Threaded Text. UI panels/toolbar must be placeable/dockable anywhere (DK dock system).
- Layers search must find objects across all layers/groups regardless of selection; clicking a result selects IN PLACE (no z-order change), selection outline above everything, pan to it if off-screen.
- Testing to save credits: build and test yourself before delivering; each test script is run ONCE per task (no repeated runs).
- App UI colours = measured Illustrator UI colours (Dark default; Medium Dark/Medium Light/Light derived). UI accent #1473E6, canvas selection #4F80FF, 27 Illustrator layer colours. Toggle buttons are plain grey (never blue). Do not tint the UI with the logo colours except the Layers selected row = logo blue #123E78.
- Logo (final, from the owner's Canva PDF): rounded tile #123E78 + gold Eye of Horus #F0C374 with pen-anchor motif, no white background. Used in control bar (30x30), favicon, apple-touch-icon, About.

## Architecture cheat-sheet
- Canvas `#cv` / `#world` / `#layer` / `#selg`; objects in `objs[]` as `{g,bb,m}`; helpers `commit()/snap()/restore()`, `setTool`, `info()` (selection/control-bar refresh), `wbox`/`fitAll`, `aiAlert`, `DK` (dock system: DK.reg, DK.reset), `SGON` (smart guides), `LYC`/`LCN` (layer colours).
- Theme: CSS variables (`--bg --panel --field --line --ai --sel --on --on2 --on3 …`), Preferences > User Interface (4 themes), stored in localStorage `masar.ui.v1` (always try/catch).
- Cursors: classes on the canvas (`h`, `dsc`, zoom, etc.) re-applied on tool key / Space / Ctrl / Alt using the last pointer position.
- Build label `build NNN<` must appear exactly once; bump it each build. `loaderr.py` must print `[]`.

## Tests (Playwright/Python, real mouse+keyboard) — in /home/claude on the old machine
`smoke.py`, `tb1`…`tb12`, `tbfix151`, `tbuicol`, `tblogo4/5/6`, `tbcursor`, `tbdiff1`, `runreg.sh` (suite runner). 4 known failures that predate all recent work: patest3, patest5, thtest, tlinkhot. Convert every reported bug into a permanent regression check.

## Done recently (builds 153→158)
Illustrator-measured UI colours (4 themes), tooltip cards follow theme, new logo, Layers selected row colour, all toggle buttons grey, full cursor system for every tool (Hand/Zoom/Space/Ctrl/Alt, direct-selection variants, selection arrow, blob brush ring), English status-bar hints, Ctrl temporary tool switching, Medium Dark toggle contrast ≥ 4.5.

## Next, in the agreed order
1. Menus/shortcuts: missing menu items (Place, Save As, Document Setup, Brushes/Gradient/Info windows, Find and Replace, Select Same, Reselect…); ~20 shortcuts that do nothing (Ctrl+H, Ctrl+6, Ctrl+P, F5…); 11 tool keys that do nothing (Width, Shape Builder, Live Paint, Mesh…); Shift+M/L/P wrongly map to Rectangle/Ellipse/Pen (should be Shape Builder, Live Paint Selection, Perspective Grid).
2. New Document dialog + Home Screen; File>New save prompt; Preferences > General page (empty); exports at chosen size.
3. Missing tools: Reshape, Warp family (Warp, Twirl, Pucker, Bloat, Scallop, Crystallize, Wrinkle), Width, Puppet Warp, Blend, Mesh, Shape Builder, Live Paint (+Selection), Perspective Grid, Symbol Sprayer family, Graphs, Slice, Artboard (full), Measure, Rotate View. Panels: Brushes, Gradient, Image Trace, Pattern Options, Symbols, Glyphs, OpenType, Links, Asset Export.
4. Later: AI generation (logo/illustration from text), prepaid-credits payments.

## Known remaining differences
- Layers: clicking a member row of a group selects the whole group (member selection via search/target/isolation). Nested members select top-level only.
- Smart Guides: no snap to path/intersection in some cases; equal-spacing neighbour limit 150 px is an estimate.
- Align Distribute with Key Object unverified; Pathfinder Outline is 1px not hairline; Divide leaves multi-part faces as compound paths; Trim/Merge/Crop unverified.
- Path effects bake into the path (only Inner/Outer Glow, Drop Shadow, Blur, Feather are live).
- Tear-off toolbar size not persisted; "Collapse to icons" flyouts.
- Selected-anchor cursor in Direct Selection is unconfirmed vs Illustrator; Group Selection plain-arrow differs only by "+".
- Blob Brush ring disappears while drawing a stroke (live preview replaces it).
- Ctrl behaviour from Direct Selection → Selection is a judgement from two sources, not an Adobe-confirmed spec.
- Real pen pressure untested on hardware; Ctrl+W/N/T handlers are coded for the desktop shell but browsers may swallow them.
