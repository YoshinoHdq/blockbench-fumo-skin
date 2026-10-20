# 更新日志 / Changelog

## 0.1.0 — 2026-10-20

首个公开版本 / First public release.

- 新增 `Fumo 皮肤 / Fumo Skin` ModelFormat：bone rig、Box UV、单纹理、居中原点、可旋转方块
- 新建对话框：纹理来源可选「生成模板」或「上传 PNG」
- 逐面着色的空白模板纹理，由 Blockbench 官方 `TextureGenerator` 生成（128×128 / UV 64×64）
- 外壳层方块命名带 `Layer` 后缀
- 新增动作「切换皮肤叠层 / Toggle Skin Layer」，注册到编辑菜单，翻转外壳层可见性
- 创建项目后自动进入绘画模式
- 界面跟随 Blockbench 语言：简体中文与繁體中文使用中文文案，其余语言使用英文
- 仅桌面版（`variant: desktop`），最低要求 Blockbench 5.2.2
- 只使用公开 API，无磁盘、网络与存储访问
- 模型几何衍生自 KosherKomeiji 的 [Fumo-Mcreator](https://github.com/KosherKomeiji/Fumo-Mcreator)（CC BY-NC-SA 4.0，credits: MCreator, reimuu）

- Adds the `Fumo Skin` ModelFormat: bone rig, Box UV, single texture, centred origin, rotatable cubes
- New-project dialog with a choice of generated template or uploaded PNG
- Per-face coloured blank template produced by Blockbench's own `TextureGenerator` (128×128 over a 64×64 UV space)
- Shell-layer cubes are named with a `Layer` suffix
- Adds the "Toggle Skin Layer" action to the Edit menu, flipping shell-layer visibility
- Enters Paint mode automatically after creating a project
- UI follows the Blockbench language: Simplified and Traditional Chinese use Chinese strings, everything else uses English
- Desktop only (`variant: desktop`), requires Blockbench 5.2.2 or newer
- Public API only, no disk, network or storage access
- Model geometry derived from KosherKomeiji's [Fumo-Mcreator](https://github.com/KosherKomeiji/Fumo-Mcreator) (CC BY-NC-SA 4.0, credits: MCreator, reimuu)
