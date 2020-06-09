const module = "default-image-overrider";

const defaults = {
	actorImage: "icons/svg/mystery-man.svg",
	actorTokenImage: "icons/mystery-man.png",
	itemImage: "icons/svg/mystery-man.svg",
	ownedItemImage: "icons/svg/mystery-man.svg",
	macroImage: "icons/svg/dice-target.svg",
}

export function getSetting(key) {
	return game.settings.get(module, key) || defaults[key];
}

export function registerSetting(key, type) {
	let data = {
		type: type,
		scope: "world",
		config: true,
		name: game.i18n.localize(`${module}.${key}.name`),
		hint: game.i18n.localize(`${module}.${key}.hint`),
		default: defaults[key],
	};
	game.settings.register("default-image-overrider", key, data);
}