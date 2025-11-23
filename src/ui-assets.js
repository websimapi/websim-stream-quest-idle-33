import { SKILLS } from './skills.js';
import { ITEM_ICONS } from './ui-inventory.js';

const UI_ASSETS = [
    'logo.png',
    'energy_icon.png',
    'user_default_pfp.png',
    'woodcutting_icon.png',
    'scavenging_icon.png',
    'fishing_icon.png'
];

const SCENE_ASSETS = [
    'scene_wood_beginner.png',
    'scene_wood_intermediate.png',
    'scene_wood_advanced.png',
    'scene_wood_expert.png',
    'scene_wood_legendary.png',
    'scene_scav_beginner.png',
    'scene_scav_intermediate.png',
    'scene_scav_advanced.png',
    'scene_scav_expert.png',
    'scene_scav_legendary.png',
    'scene_fish_beginner.png',
    'scene_fish_intermediate.png',
    'scene_fish_advanced.png',
    'scene_fish_expert.png',
    'scene_fish_legendary.png'
];

export async function preloadGameAssets() {
    const allImages = new Set();

    // 1. UI Assets
    UI_ASSETS.forEach(src => allImages.add(src));

    // 2. Scene Assets
    SCENE_ASSETS.forEach(src => allImages.add(src));

    // 3. Item Icons
    Object.values(ITEM_ICONS).forEach(src => allImages.add(src));

    // 4. Skill Icons
    Object.values(SKILLS).forEach(skill => {
        if (skill.icon) allImages.add(skill.icon);
    });

    console.log(`[Loader] Preloading ${allImages.size} assets...`);

    const promises = Array.from(allImages).map(src => {
        return new Promise((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve(src);
            img.onerror = () => {
                console.warn('Failed to load asset:', src);
                resolve(src); // Resolve anyway to not block app
            };
        });
    });

    await Promise.all(promises);
    console.log(`[Loader] All assets loaded.`);
}