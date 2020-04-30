import * as reactIcons from 'react-icons/all';
import {
    FaBone,
    GiBestialFangs,
    GiDinosaurBones,
    GiLockedBox,
    GiMusicSpell,
    GiNewspaper,
    GiOpenedFoodCan,
    GiPawPrint,
    GiPerson,
    GiSkeleton,
    GiSkullMask,
    GiWaterBottle
} from 'react-icons/all';

let CURSE_ICONS = Object.keys(reactIcons)
    .filter(k => k.startsWith('GiAbstract'))
    .map(k => reactIcons[k]);

let ICON_MAP = {
    event(item) {
        if(item.ctx.locked) {
            return GiLockedBox;
        }
        return GiNewspaper;
    },
    person(item) {
        if(item.emote === 'witch') {
            return GiSkullMask;
        }
        return GiPerson;
    },
    food() {
        return GiOpenedFoodCan;
    },
    juice() {
        return GiWaterBottle;
    },
    dino(item) {
        return item.emote === 'angry' ? GiBestialFangs : GiPawPrint;
    },
    skeleton(item) {
        return item.aliveType === 'dino' ? GiDinosaurBones :
            item.aliveType === 'person' ? GiSkeleton
                : FaBone;
    },
    curse(item) {
        return CURSE_ICONS[+item.date % CURSE_ICONS.length];
    },
    music() {
        return GiMusicSpell;
    }
};

export function findItemIconSync(item) {
    return item.icon || (ICON_MAP.hasOwnProperty(item.type) ? ICON_MAP[item.type](item) : null);
}