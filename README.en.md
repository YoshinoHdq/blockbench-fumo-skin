# Fumo Skin

[简体中文](README.md) | English

[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

<img src="docs/fumo_icon.png" alt="Fumo Skin icon" width="128">

> Paint Fumo plush textures the same way you paint a Minecraft skin.

**Disclaimer**
This is an unofficial community tool. It is not affiliated with KosherKomeiji (author of the Fumo mod), ZUN / Touhou Project, or Blockbench.

---

## Features

- One-click Fumo model: 12 groups and 14 cubes, with geometry derived from the mod's `ModelFumo`
- Per-face coloured blank template (128×128 pixels over a 64×64 UV space)
- **Edit → Toggle Skin Layer** switches the body layer and the outer shell layer for layered painting
- Load your own PNG as the texture
- Drops you into Paint mode, reusing Blockbench's brushes, palettes and colour picker
- Follows the Blockbench language: Chinese for `zh` / `zh_tw`, English for everything else
- Desktop only; public Blockbench API only; no disk, network or storage access

## Installation

1. Download `fumo_skin.js` from the [Releases](../../releases) page
2. Blockbench → File → Plugins → Load Plugin from File, then pick the file
3. Blockbench remembers the path and loads it on startup

Requires Blockbench 5.2.2 or newer. Verified on 5.2.2 (desktop, Windows).

Note: `min_version` refers to the Blockbench version, not the plugin version. A Blockbench older than 5.2.2 refuses to load this plugin.

## Usage

1. Start screen → "Fumo Skin" card → Create
2. Choose *Generated template* or *Upload PNG*
3. Paint in Paint mode; cubes whose names contain `Layer` form the shell layer
4. Export: right-click the texture → Save As → PNG

## Using the result in game

Put the exported PNG into your own resource pack at `assets/fumo/textures/entities/<your_name>.png`.
Prefer your own file name and an overlay resource pack rather than overwriting the art shipped inside the mod jar — that artwork belongs to reimuu.

## Texture resolution

The default template is 128×128 (2× the 64×64 UV space). A 256×256 PNG also works: UVs are still read in the 64×64 space, the same trick as HD Minecraft skins. Sizes that are not an integer multiple of 64 may trigger Blockbench's resolution prompt.

## Screenshot

![Fumo Skin in Blockbench](docs/screenshot.png)

![blank template](docs/fumo-template.png)

## License and attribution

- **Plugin:** [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) — Copyright (c) 2026 hemekewayoshino.
- **Upstream work:** *Fumo-Mcreator* by **KosherKomeiji** (credits: MCreator, reimuu), https://github.com/KosherKomeiji/Fumo-Mcreator , also CC BY-NC-SA 4.0.
- **Changes:** the upstream geometry is Java source; this plugin reverse-converts it into a Blockbench preset. Group naming, the `Layer` suffix and the layer-toggle action are added by this plugin and are not part of the upstream work.
- **Conditions:** redistribution must keep the attribution above, must not be used commercially, and derivative versions must be released under the same license.
- **Artwork:** this plugin bundles no third-party artwork. Textures you paint are yours.
- **Icon:** hemekewayoshino, CC BY-NC-SA 4.0, distributed with this plugin.
- **Warranty:** provided "as is", without warranties of any kind.

## Known limitations

- Desktop only; the web version is neither supported nor tested
- Requires Blockbench 5.2.2 or newer
- Layer toggling relies on cube names containing `Layer`; renaming those cubes breaks it
- UI language is resolved when the plugin loads; if the labels do not update after switching the Blockbench language, reload the plugin
- glTF/GLB can be exported for Blender, but groups become nodes or empties rather than bones; this format has no animation mode, so no animation is exported
- Texture painting only: no mod project export. Output is a PNG plus a `.bbmodel`

## Changelog

See [CHANGELOG.md](CHANGELOG.md).
