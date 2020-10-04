/**
 * Author: Cole Schultz (cole#9640)
 * Software License: GNU GPLv3
 */

const moduleName = "default-image-overrider";

const mm = "icons/svg/mystery-man.svg";
const mmToken = "icons/mystery-man.png";
const dt = "icons/svg/dice-target.svg";

const defaults = {
    actorImage: "icons/svg/mystery-man.svg",
    actorTokenImage: "icons/mystery-man.png",
    itemImage: "icons/svg/mystery-man.svg",
    ownedItemImage: "icons/svg/mystery-man.svg",
    macroImage: "icons/svg/dice-target.svg",
};

Hooks.once("setup", async function () {
    registerSetting("actorImage", String);
    registerSetting("actorTokenImage", String);
    registerSetting("itemImage", String);
    registerSetting("ownedItemImage", String);
    registerSetting("macroImage", String);
});

Hooks.on("preCreateActor", (actorData) => {
    const imgPath = game.settings.get(moduleName, "actorImage");
    const tokenPath = game.settings.get(moduleName, "actorTokenImage");
    const prevImg = actorData.img;
    const prevToken = actorData.token?.img;
    actorData.img = !prevImg || prevImg === mm ? imgPath : prevImg;
    actorData.token.img = !prevToken || prevToken === mmToken || prevToken === mm ? tokenPath : prevToken;
});

Hooks.on("preCreateItem", (itemData) => setEntityImage(itemData, game.settings.get(moduleName, "itemImage")));
Hooks.on("preCreateMacro", (itemData) => setEntityImage(itemData, game.settings.get(moduleName, "macroImage")));
Hooks.on("preCreateOwnedItem", (actor, itemData) =>
    setEntityImage(itemData, game.settings.get(moduleName, "itemImage"))
);

function setEntityImage(entityData, imgPath) {
    const prevImg = entityData.img;
    entityData.img = !prevImg || prevImg === mm ? imgPath : prevImg;
}

export function registerSetting(key, type) {
    let data = {
        type: type,
        scope: "world",
        config: true,
        name: game.i18n.localize(`${moduleName}.${key}.name`),
        hint: game.i18n.localize(`${moduleName}.${key}.hint`),
        default: defaults[key],
    };
    game.settings.register(moduleName, key, data);
}
