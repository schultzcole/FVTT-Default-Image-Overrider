/**
 * Author: Cole Schultz (cole#9640)
 * Software License: GNU GPLv3
 */

// Import JavaScript modules
import { registerSetting, getSetting } from './settings.js';
import Actor5e from "../../../../systems/dnd5e/module/actor/entity.js";

const mm = "icons/svg/mystery-man.svg";
const mmToken = "icons/mystery-man.png";
const dt = "icons/svg/dice-target.svg";

Hooks.once('setup', async function() {
	registerSetting("actorImage", String);
	registerSetting("actorTokenImage", String);
	registerSetting("itemImage", String);
	registerSetting("ownedItemImage", String);
	registerSetting("macroImage", String);

	// pre-retrieve/compile the appropriate sheets
	// so that they are cached by the time an entity is created.
	await Promise.all([
		getTemplate("systems/dnd5e/templates/actors/character-sheet.html"),
		getTemplate("systems/dnd5e/templates/actors/npc-sheet.html"),
		// Double slashes here because the dnd5e system for some reason
		// loads these templates with two slashes in the path, so we have to 
		// match that path to make sure it gets the cached value.
		getTemplate("systems/dnd5e/templates/items//backpack.html"),
		getTemplate("systems/dnd5e/templates/items//class.html"),
		getTemplate("systems/dnd5e/templates/items//consumable.html"),
		getTemplate("systems/dnd5e/templates/items//equipment.html"),
		getTemplate("systems/dnd5e/templates/items//feat.html"),
		getTemplate("systems/dnd5e/templates/items//loot.html"),
		getTemplate("systems/dnd5e/templates/items//spell.html"),
		getTemplate("systems/dnd5e/templates/items//tool.html"),
		getTemplate("systems/dnd5e/templates/items//weapon.html"),
	])

	patchActor5eCreateOwnedItem();
});

Hooks.on("createActor", actor => {
	let imgPath = getSetting("actorImage");
	let tokenPath = getSetting("actorTokenImage");
	let prevImg = actor.data.img;
	let prevToken = actor.data.token?.img;
	let data = {
		img: (!prevImg || prevImg === mm) ? imgPath : prevImg,
		token: { img: (!prevToken || prevToken === mmToken || prevToken === mm) ? tokenPath : prevToken }
	};
	actor.update(data);
});

Hooks.on("createItem", item => {
	let imgPath = getSetting("itemImage");
	let prevImg = item.data.img;
	item.update({ img: (!prevImg || prevImg === mm) ? imgPath : prevImg });
});

Hooks.on("createMacro", macro => {
	let imgPath = getSetting("macroImage");
	let prevImg = macro.data.img;
	macro.update({ img: (!prevImg || prevImg === dt) ? imgPath : prevImg });
});


function patchActor5eCreateOwnedItem() {
	let oldCreateOwnedItem = Actor5e.prototype.createOwnedItem;

	Actor5e.prototype.createOwnedItem = function(itemData, options) {
		if (!itemData.img || itemData.img === mm) itemData.img = getSetting("ownedItemImage");

		return oldCreateOwnedItem.call(this, itemData, options);
	}
}
