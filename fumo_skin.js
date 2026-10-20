/*
 * Fumo 皮肤 / Fumo Skin (fumo_skin) — Blockbench 插件 / plugin for Blockbench
 * 作者 / Author: hemekewayoshino
 * 版权 / Copyright (c) 2026 hemekewayoshino
 * 许可 / License: CC BY-NC-SA 4.0
 *   https://creativecommons.org/licenses/by-nc-sa/4.0/
 * SPDX-License-Identifier: CC-BY-NC-SA-4.0
 *
 * 模型几何衍生自 / Geometry derived from:
 *   "Fumo-Mcreator" by KosherKomeiji
 *   https://github.com/KosherKomeiji/Fumo-Mcreator
 *   (credits: MCreator, reimuu), CC BY-NC-SA 4.0
 *
 * 修改说明 / Changes: 上游几何为 Java 源码，本插件将其逆向转换为
 *   Blockbench 预设；分组命名、外壳层 "Layer" 后缀与叠层切换均为本插件新增，
 *   不属于上游内容。
 *   The upstream geometry is Java source; this plugin reverse-converts it into a
 *   Blockbench preset. Group naming, the "Layer" suffix and layer toggling are
 *   added by this plugin and are not part of the upstream work.
 *
 * 本插件不打包任何第三方美术（无模组原画、无示例角色贴图）。
 * This plugin bundles no third-party artwork (no mod textures, no example character skins).
 *
 * 免责声明: 非官方社区工具，与 KosherKomeiji、ZUN / 东方 Project、Blockbench 官方均无关联。
 * Unofficial community tool; not affiliated with KosherKomeiji, ZUN / Touhou Project, or Blockbench.
 * 本作品按"现状"提供，不附带任何明示或暗示的担保。
 * Provided "as is", without warranties of any kind.
 */
(function () {

	const FORMAT_ID = 'fumo_skin';
	const TEX_UV_W = 64;
	const TEX_UV_H = 64;
	const TEX_PX = 128;

	// ---- 界面语言 / UI language ----
	// Blockbench 的语言代码：zh、zh_tw 走中文，其余走英文。
	// 语言在插件加载时确定；切换 Blockbench 语言后重新启用本插件即可生效。
	const UI_LANG = (typeof Language !== 'undefined' && Language.code) ? String(Language.code) : 'en';
	const IS_ZH = UI_LANG.indexOf('zh') === 0;
	const T = function (zh, en) { return IS_ZH ? zh : en; };

	// ---- Fumo 模型预设（从 ModelFumo 逆向核对，与仓库导出逐字节一致）----
	// 外壳层立方体命名带 "Layer" 后缀，供叠层切换识别（沿用官方皮肤格式约定）
	const GROUPS = [
		{ name: 'Fumo',            origin: [5, 1, 2],  rotation: [0, 0, 0] },
		{ name: 'Head',            origin: [0, 0, 0],  rotation: [0, 0, 0],    parent: 'Fumo' },
		{ name: 'LeftLeg',         origin: [5, 1, 2],  rotation: [0, 0, 0],    parent: 'Fumo' },
		{ name: 'LeftLegOver_r1',  origin: [-3, 1, -6], rotation: [0, 22.5, 0], parent: 'LeftLeg' },
		{ name: 'RightLeg',        origin: [11, 1, 2], rotation: [0, 0, 0],    parent: 'Fumo' },
		{ name: 'RightLegOver_r1', origin: [3, 1, -6], rotation: [0, -22.5, 0], parent: 'RightLeg' },
		{ name: 'Skirt',           origin: [0, 0, 0],  rotation: [0, 0, 0],    parent: 'Fumo' },
		{ name: 'Torso',           origin: [0, 0, 0],  rotation: [0, 0, 0],    parent: 'Fumo' },
		{ name: 'LeftArm',         origin: [5, 8, 8],  rotation: [0, 0, 0],    parent: 'Fumo' },
		{ name: 'LeftArmOver_r1',  origin: [-3, 8, 0], rotation: [0, 0, -45],  parent: 'LeftArm' },
		{ name: 'RightArm',        origin: [11, 8, 8], rotation: [0, 0, 0],    parent: 'Fumo' },
		{ name: 'RightArmOver_r1', origin: [3, 8, 0],  rotation: [0, 0, 45],   parent: 'RightArm' }
	];

	const CUBES = [
		{ name: 'Head',             from: [-4, 8, -4],    to: [4, 16, 4],   inflate: 0,    uv: [0, 17],  parent: 'Head' },
		{ name: 'Head Layer',       from: [-4, 8, -4],    to: [4, 16, 4],   inflate: 0.1,  uv: [0, 0],   parent: 'Head' },
		{ name: 'Left Leg',         from: [-4, 0, -5],    to: [-2, 2, -1],  inflate: 0.01, uv: [42, 39], parent: 'LeftLegOver_r1' },
		{ name: 'Left Leg Layer',   from: [-4, 0, -5],    to: [-2, 2, -1],  inflate: 0.1,  uv: [34, 3],  parent: 'LeftLegOver_r1' },
		{ name: 'Right Leg',        from: [2, 0, -5],     to: [4, 2, -1],   inflate: 0.01, uv: [33, 22], parent: 'RightLegOver_r1' },
		{ name: 'Right Leg Layer',  from: [2, 0, -5],     to: [4, 2, -1],   inflate: 0.1,  uv: [25, 0],  parent: 'RightLegOver_r1' },
		{ name: 'Skirt',            from: [-3.5, 0, -2.5], to: [3.5, 4, 2.5], inflate: 0,   uv: [28, 29], parent: 'Skirt' },
		{ name: 'Skirt Layer',      from: [-3.5, 0, -2.5], to: [3.5, 4, 2.5], inflate: 0.1, uv: [28, 12], parent: 'Skirt' },
		{ name: 'Torso',            from: [-3, 0, -2],    to: [3, 8, 2],    inflate: 0,    uv: [21, 39], parent: 'Torso' },
		{ name: 'Torso Layer',      from: [-3, 0, -2],    to: [3, 8, 2],    inflate: 0.1,  uv: [0, 34],  parent: 'Torso' },
		{ name: 'Left Arm',         from: [-3, 3, -1],    to: [-1, 8, 1],   inflate: 0,    uv: [9, 47],  parent: 'LeftArmOver_r1' },
		{ name: 'Left Arm Layer',   from: [-3, 3, -1],    to: [-1, 8, 1],   inflate: 0.1,  uv: [47, 0],  parent: 'LeftArmOver_r1' },
		{ name: 'Right Arm',        from: [1, 3, -1],     to: [3, 8, 1],    inflate: 0,    uv: [0, 47],  parent: 'RightArmOver_r1' },
		{ name: 'Right Arm Layer',  from: [1, 3, -1],     to: [3, 8, 1],    inflate: 0.1,  uv: [42, 46], parent: 'RightArmOver_r1' }
	];

	function buildModel() {
		const group_map = {};
		GROUPS.forEach(function (g) {
			const group = new Group({ name: g.name, origin: g.origin.slice(), rotation: g.rotation.slice() }).init();
			group.isOpen = true;
			group_map[g.name] = group;
			group.addTo(g.parent ? group_map[g.parent] : 'root');
		});
		CUBES.forEach(function (c) {
			const cube = new Cube({
				name: c.name,
				from: c.from.slice(),
				to: c.to.slice(),
				inflate: c.inflate,
				box_uv: true
			}).addTo(group_map[c.parent]).init();
			cube.uv_offset[0] = c.uv[0];
			cube.uv_offset[1] = c.uv[1];
		});
		Canvas.updateAll();
	}

	// 每面不同颜色的模板：复用官方皮肤模板的生成器；外壳层只画边框、内部留透明
	function makeTemplateTexture() {
		const canvas = document.createElement('canvas');
		canvas.width = TEX_PX;
		canvas.height = TEX_PX;
		const res_multiple = TEX_PX / TEX_UV_W;
		Cube.all.forEach(function (cube) {
			const is_layer = cube.name.toLowerCase().includes('layer');
			TextureGenerator.paintCubeBoxTemplate(cube, null, canvas, null, is_layer, res_multiple);
		});
		return new Texture({ name: 'fumo_template', mode: 'bitmap', keep_size: true })
			.fromDataURL(canvas.toDataURL())
			.add(false);
	}

	let format, new_dialog, toggle_action;

	BBPlugin.register(FORMAT_ID, {
		title: T('Fumo 皮肤', 'Fumo Skin'),
		author: 'hemekewayoshino',
		icon: 'fumo_icon.png',
		description: T(
			'非官方工具：用绘制 Minecraft 皮肤的方式绘制 Fumo 玩偶贴图。内置模型模板、逐面彩色模板图，并可像 Minecraft 皮肤一样在顶栏「编辑」菜单中切换皮肤叠层。模型几何基于 KosherKomeiji 的 Fumo 模组 (credits: MCreator, reimuu)，CC BY-NC-SA 4.0，禁止商用。与模组作者、ZUN / 东方 Project、Blockbench 官方均无关联。',
			'Unofficial tool for painting Fumo plush textures the way you paint Minecraft skins. Bundles the model template, a per-face coloured blank texture, and skin-layer toggling from the top-bar Edit menu, just like a Minecraft skin. Geometry derived from KosherKomeiji\'s Fumo mod (credits: MCreator, reimuu), CC BY-NC-SA 4.0, non-commercial. Not affiliated with the mod author, ZUN / Touhou Project, or Blockbench.'
		),
		version: '0.1.0',
		variant: 'desktop',
		tags: ['Minecraft: Java Edition', 'Texture'],
		min_version: '5.2.2',

		onload() {
			new_dialog = new Dialog({
				id: 'fumo_skin_new',
				title: T('创建 Fumo 皮肤', 'Create Fumo Skin'),
				form: {
					texture_source: {
						label: T('纹理来源', 'Texture source'),
						type: 'select',
						value: 'template',
						options: {
							template: T('生成模板', 'Generated template'),
							upload_texture: T('上传 PNG 文件', 'Upload PNG file')
						}
					},
					texture_file: {
						label: T('纹理文件', 'Texture file'),
						type: 'file',
						extensions: ['png'],
						readtype: 'image',
						filetype: 'PNG',
						return_as: 'file',
						condition: function (form) { return form.texture_source === 'upload_texture'; }
					},
					info: {
						type: 'info',
						text: T(
							'贴图规格：128×128 像素（UV 空间 64×64，1 UV = 2 像素）。外壳层立方体名称带 "Layer"，可像 Minecraft 皮肤一样在顶栏「编辑」→「切换皮肤叠层」中显隐。',
							'Texture size: 128×128 pixels (64×64 UV space, 1 UV unit = 2 pixels). Shell-layer cubes are named with a "Layer" suffix; switch them like a Minecraft skin via Edit → Toggle Skin Layer in the top bar.'
						)
					}
				},
				onConfirm(result) {
					if (!newProject(format)) return;
					Project.name = 'fumo_skin';
					Project.texture_width = TEX_UV_W;
					Project.texture_height = TEX_UV_H;
					buildModel();
					let texture;
					if (result.texture_source === 'upload_texture' && result.texture_file) {
						texture = new Texture({ name: result.texture_file.name }).fromFile(result.texture_file).add(false);
					} else {
						texture = makeTemplateTexture();
					}
					Cube.all.forEach(function (cube) { cube.applyTexture(texture, true); });
					texture.select();
					texture.load_callback = function () { Modes.options.paint.select(); };
					Canvas.updateAllFaces();
				}
			});

			format = new ModelFormat(FORMAT_ID, {
				name: T('Fumo 皮肤', 'Fumo Skin'),
				icon: 'icon-player',
				category: 'minecraft',
				target: 'Minecraft: Java Edition',
				bone_rig: true,
				box_uv: true,
				centered_grid: true,
				single_texture: true,
				integer_size: true,
				rotate_cubes: true,
				can_convert_to: false,
				model_identifier: false,
				codec: Codecs.project,
				format_page: {
					content: [
						{ type: 'h3', text: T('信息', 'About') },
						{
							text: T(
								'* Fumo 玩偶贴图绘制模板\n* 支持绘画模式直接在模型上上色\n* 像 Minecraft 皮肤一样切换皮肤叠层：顶栏「编辑」→「切换皮肤叠层」',
								'* A painting template for Fumo plush textures\n* Paint directly on the model in Paint mode\n* Switch skin layers like a Minecraft skin: Edit → Toggle Skin Layer in the top bar'
							)
						},
						{ type: 'h3', text: T('模型来源', 'Model source') },
						{
							text: T(
								'* 基于 [Fumo-Mcreator](https://github.com/KosherKomeiji/Fumo-Mcreator) by KosherKomeiji (credits: MCreator, reimuu)\n* CC BY-NC-SA 4.0，禁止商用',
								'* Derived from [Fumo-Mcreator](https://github.com/KosherKomeiji/Fumo-Mcreator) by KosherKomeiji (credits: MCreator, reimuu)\n* CC BY-NC-SA 4.0, non-commercial'
							)
						},
						{ type: 'h3', text: T('许可与署名', 'License and attribution') },
						{
							text: T(
								'* 本插件以 [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/) 发布：再分发须保留署名、不得商用、演绎版本沿用同一许可\n* 修改说明：几何由上游 Java 源码逆向转换，分组命名、Layer 后缀与叠层切换为本插件新增\n* 不打包任何第三方美术；你绘制出的贴图版权归你\n* 按"现状"提供，不附带任何担保',
								'* Released under [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/): keep attribution, no commercial use, derivatives under the same license\n* Changes: geometry reverse-converted from the upstream Java source; group naming, the Layer suffix and layer toggling are added here\n* No third-party artwork is bundled; textures you paint are yours\n* Provided "as is", without warranties of any kind'
							)
						},
						{ type: 'h3', text: T('免责声明', 'Disclaimer') },
						{
							text: T(
								'* 非官方社区工具，与 KosherKomeiji、ZUN / 东方 Project、Blockbench 官方均无关联',
								'* Unofficial community tool, not affiliated with KosherKomeiji, ZUN / Touhou Project, or Blockbench'
							)
						}
					]
				}
			});
			format.new = function () {
				new_dialog.show();
				return true;
			};

			toggle_action = new Action('fumo_toggle_layer', {
				name: T('切换皮肤叠层', 'Toggle Skin Layer'),
				icon: 'layers_clear',
				category: 'edit',
				condition: { formats: [FORMAT_ID] },
				click: function () {
					const edited = Cube.all.filter(function (cube) {
						return cube.name.toLowerCase().includes('layer');
					});
					if (!edited.length) return;
					Undo.initEdit({ elements: edited });
					const value = !edited[0].visibility;
					edited.forEach(function (cube) { cube.visibility = value; });
					Undo.finishEdit(T('切换皮肤叠层', 'Toggle skin layer'));
					Canvas.updateVisibility();
				}
			});
			MenuBar.addAction(toggle_action, 'edit');
		},

		onunload() {
			if (toggle_action) toggle_action.delete();
			if (format) format.delete();
			if (new_dialog && new_dialog.delete) new_dialog.delete();
		}
	});
})();
