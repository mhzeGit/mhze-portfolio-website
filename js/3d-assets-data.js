// 3D Assets Data
// Helper function to generate image paths automatically
function generateImagePaths(basePath, assetName) {
  return {
    render: `${basePath}/${assetName}-full-render.webp`,
    wireframe: `${basePath}/${assetName}-wireframe.webp`,
    matcap: `${basePath}/${assetName}-matcap.webp`,
    basecolor: `${basePath}/${assetName}-base-color.webp`
  };
}

// Available background images
const availableBackgrounds = {
  'black': './assets/3d-assets/backgrounds/background-black.webp',
  'blue': './assets/3d-assets/backgrounds/background-blue.webp',
  'dark-green': './assets/3d-assets/backgrounds/background-dark-green.webp',
  'green': './assets/3d-assets/backgrounds/background-green.webp',
  'purple': './assets/3d-assets/backgrounds/background-purple.webp',
  'red': './assets/3d-assets/backgrounds/background-red.webp'
};

const assetsData = {
  // Characters
  'weird-fish': {
    id: 'weird-fish',
    title: 'Weird Fish',
    category: 'characters',
    description: 'A low-poly stylized fish character designed for mobile and indie games. Features hand-painted textures and optimized topology.',
    detailedDescription: 'This stylized fish was created with a focus on readability and performance. The character features a unique art style that balances detail with optimization, making it perfect for real-time applications. The model includes multiple LODs and is rigged for animation.',
    assetFolder: './assets/3d-assets/weird-fish',
    polyCount: '2,840 tris',
    textureResolution: '1024x1024',
    engines: 'Unity, Unreal, Godot',
    tags: ['Character', 'Fantasy', 'Low-Poly', 'Rigged'],
    sketchfabUrl: 'https://sketchfab.com/Mhze',
    downloadUrl: '#',
    preferredBackground: 'dark-green' // Fish looks good against blue background
  },

  'toaster-gun': {
    id: 'toaster-gun',
    title: 'Toaster Gun',
    category: 'weapons',
    description: 'A quirky toaster gun that shoots slices of bread. Perfect for comedic game scenarios.',
    detailedDescription: 'This toaster gun features a unique design with exaggerated proportions. The model is fully animated and includes a variety of bread types as projectiles. Ideal for adding humor to your game.',
    assetFolder: './assets/3d-assets/toaster-gun',
    polyCount: '4,250 tris',
    textureResolution: '2048x2048',
    engines: 'Unity, Unreal',
    tags: ['Horror', 'Creature', 'Detailed', 'Game-Ready'],
    sketchfabUrl: 'https://sketchfab.com/Mhze',
    downloadUrl: '#',
    preferredBackground: 'blue' // Quirky weapon suits purple background
  },

  // Props
  'berreta-m9': {
    id: 'berreta-m9',
    title: 'Berreta M9',
    category: 'weapons',
    description: 'A detailed Berreta M9 pistol model. Perfect for FPS games.',
    detailedDescription: 'This Berreta M9 model features realistic details and is optimized for use in first-person shooter games. The model includes separate parts for the slide, trigger, and magazine, allowing for detailed animations.',
    assetFolder: './assets/3d-assets/berreta-m9',
    polyCount: '1,200 tris',
    textureResolution: '1024x1024',
    engines: 'Unity, Unreal, Blender',
    tags: ['Medieval', 'Interactive', 'PBR', 'Prop'],
    sketchfabUrl: 'https://sketchfab.com/Mhze',
    downloadUrl: '#',
    preferredBackground: 'black' // Realistic weapon looks good on black
  },

  'farming-tools': {
    id: 'farming-tools',
    title: 'Farming Tools Set',
    category: 'props',
    description: 'A complete set of farming tools including hoe, shovel, and watering can. Optimized for first-person gameplay.',
    detailedDescription: 'This comprehensive farming tools set was created for my farming game project. Each tool is optimized for first-person view with high-detail areas where the player will see them most. The set includes proper pivot points for realistic handling animations.',
    image: './assets/blog-content/blog-farming-mechanic/blog-thumbnail-farming-mechanic.webp',
    polyCount: '800-1200 tris each',
    textureResolution: '512x512',
    engines: 'Unity, Unreal',
    tags: ['Farming', 'Tools', 'First-Person', 'Set'],
    sketchfabUrl: 'https://sketchfab.com/Mhze',
    downloadUrl: '#',
    preferredBackground: 'green' // Farming tools suit natural green background
  },

  'horror-lantern': {
    id: 'horror-lantern',
    title: 'Vintage Horror Lantern',
    category: 'props',
    description: 'An atmospheric lantern with flickering light effects. Features rust and damage details for horror environments.',
    detailedDescription: 'This vintage lantern was designed to enhance the atmospheric tension in horror games. The model features carefully crafted rust patterns, scratches, and wear marks that tell a story. The glass is designed to work with various lighting setups for dynamic shadow casting.',
    image: './assets/blog-content/blog-thumbnail-my-3d-models.webp',
    polyCount: '1,450 tris',
    textureResolution: '1024x1024',
    engines: 'Unity, Unreal',
    tags: ['Horror', 'Atmospheric', 'Lighting', 'Vintage'],
    sketchfabUrl: 'https://sketchfab.com/Mhze',
    downloadUrl: '#',
    preferredBackground: 'black' // Horror lantern looks ominous on black
  },

  // Weapons
  'fantasy-sword': {
    id: 'fantasy-sword',
    title: 'Enchanted Crystal Sword',
    category: 'weapons',
    description: 'A magical sword with crystal elements and glowing effects. Designed for fantasy RPG games.',
    detailedDescription: 'This enchanted sword combines traditional metalwork with magical crystal elements. The blade features intricate engravings and the crystal components are designed to support emission mapping for glowing effects. The model includes a detailed scabbard and is perfectly balanced for combat animations.',
    image: './assets/blog-content/blog-thumbnail-my-experience-in-3d-animation.webp',
    polyCount: '2,100 tris',
    textureResolution: '1024x1024',
    engines: 'Unity, Unreal, Godot',
    tags: ['Fantasy', 'Magic', 'Sword', 'Glowing'],
    sketchfabUrl: 'https://sketchfab.com/Mhze',
    downloadUrl: '#',
    preferredBackground: 'purple' // Magical sword suits mystical purple background
  },

  'modern-pistol': {
    id: 'modern-pistol',
    title: 'Tactical Handgun',
    category: 'weapons',
    description: 'A realistic modern handgun with detailed mechanics. Perfect for action and shooter games.',
    detailedDescription: 'This tactical handgun features accurate proportions and realistic mechanical details. The model includes separate moving parts for the slide and trigger, enabling realistic reload animations. Every component is meticulously modeled based on real firearm references.',
    image: './assets/blog-content/blog-thumbnail-blender-to-unity.webp',
    polyCount: '3,200 tris',
    textureResolution: '2048x2048',
    engines: 'Unity, Unreal',
    tags: ['Modern', 'Realistic', 'Tactical', 'Detailed'],
    sketchfabUrl: 'https://sketchfab.com/Mhze',
    downloadUrl: '#',
    preferredBackground: 'black' // Tactical weapon looks professional on black
  },

  // Environments
  'horror-room': {
    id: 'horror-room',
    title: 'Abandoned Hospital Room',
    category: 'environments',
    description: 'A detailed horror environment with atmospheric props and lighting setup. Modular design for easy customization.',
    detailedDescription: 'This abandoned hospital room captures the eerie atmosphere perfect for horror games. The environment includes modular wall pieces, detailed medical equipment, and various props that can be rearranged. Every surface tells a story of decay and abandonment through carefully crafted textures.',
    image: './assets/blog-content/blog-thumbnail-my-3-horror-games.webp',
    polyCount: '15,000-20,000 tris',
    textureResolution: '2048x2048',
    engines: 'Unity, Unreal',
    tags: ['Horror', 'Environment', 'Modular', 'Atmospheric'],
    sketchfabUrl: 'https://sketchfab.com/Mhze',
    downloadUrl: '#',
    preferredBackground: 'red' // Horror environment suits dramatic red background
  },

  'farmland-scene': {
    id: 'farmland-scene',
    title: 'Peaceful Farmland Environment',
    category: 'environments',
    description: 'A serene farming environment with fields, barn, and various agricultural elements. Optimized for open-world games.',
    detailedDescription: 'This farmland environment was designed to create a peaceful, productive atmosphere for farming gameplay. The scene includes optimized terrain with different soil types, modular fence systems, and a variety of crops and vegetation. The lighting setup emphasizes the natural beauty of rural life.',
    image: './assets/blog-content/blog-farming-mechanic/blog-thumbnail-farming-mechanic.webp',
    polyCount: '25,000-30,000 tris',
    textureResolution: '1024x1024 tiling',
    engines: 'Unity, Unreal',
    tags: ['Farming', 'Peaceful', 'Open-World', 'Nature'],
    sketchfabUrl: 'https://sketchfab.com/Mhze',
    downloadUrl: '#',
    preferredBackground: 'green' // Farmland environment suits natural green
  },

  'dungeon-corridor': {
    id: 'dungeon-corridor',
    title: 'Medieval Dungeon Corridor',
    category: 'environments',
    description: 'A dark medieval dungeon with modular pieces. Features torch lighting and atmospheric details.',
    detailedDescription: 'This medieval dungeon corridor system provides a foundation for creating expansive underground environments. The modular design allows for countless layout combinations while maintaining visual consistency. Stone textures show years of wear, and the lighting setup creates dramatic shadows and atmosphere.',
    image: './assets/blog-content/blog-thumbnail-my-3d-models.webp',
    polyCount: '8,000-12,000 tris per section',
    textureResolution: '1024x1024',
    engines: 'Unity, Unreal, Godot',
    tags: ['Medieval', 'Dungeon', 'Modular', 'Dark'],
    sketchfabUrl: 'https://sketchfab.com/Mhze',
    downloadUrl: '#',
    preferredBackground: 'dark-green' // Medieval dungeon suits dark green
  },

  'sci-fi-rifle': {
    id: 'sci-fi-rifle',
    title: 'Sci-Fi Plasma Rifle',
    category: 'weapons',
    description: 'A futuristic plasma rifle with glowing energy components and modular attachments.',
    detailedDescription: 'This sci-fi plasma rifle features advanced energy containment systems and modular design. The weapon includes animated energy flows and particle effects support for muzzle flashes and energy discharge.',
    image: './assets/blog-content/blog-thumbnail-blender-to-unity.webp',
    polyCount: '3,800 tris',
    textureResolution: '2048x2048',
    engines: 'Unity, Unreal',
    tags: ['Sci-Fi', 'Energy', 'Modular', 'Animated'],
    sketchfabUrl: 'https://sketchfab.com/Mhze',
    downloadUrl: '#',
    preferredBackground: 'blue' // Sci-fi weapon suits futuristic blue
  },

  'magic-staff': {
    id: 'magic-staff',
    title: 'Ancient Magic Staff',
    category: 'weapons',
    description: 'An ornate magic staff with crystal focus and intricate runic engravings.',
    detailedDescription: 'This ancient magic staff was designed for high-fantasy RPG games. The crystal focus supports emission mapping for magical effects, while the runic engravings tell a story of ancient power.',
    image: './assets/blog-content/blog-thumbnail-my-experience-in-3d-animation.webp',
    polyCount: '1,900 tris',
    textureResolution: '1024x1024',
    engines: 'Unity, Unreal, Godot',
    tags: ['Fantasy', 'Magic', 'Ancient', 'Ornate'],
    sketchfabUrl: 'https://sketchfab.com/Mhze',
    downloadUrl: '#',
    preferredBackground: 'purple' // Magic staff suits mystical purple
  },

  'robot-companion': {
    id: 'robot-companion',
    title: 'AI Robot Companion',
    category: 'characters',
    description: 'A friendly AI companion robot with expressive LED displays and articulated joints.',
    detailedDescription: 'This AI companion robot features a modular design with interchangeable parts. The LED displays can show various emotions and status indicators, making it perfect for narrative-driven games.',
    image: './assets/blog-content/blog-thumbnail-my-3d-models.webp',
    polyCount: '3,500 tris',
    textureResolution: '1024x1024',
    engines: 'Unity, Unreal',
    tags: ['Sci-Fi', 'Companion', 'AI', 'Expressive'],
    sketchfabUrl: 'https://sketchfab.com/Mhze',
    downloadUrl: '#',
    preferredBackground: 'blue' // Robot companion suits futuristic blue
  },

  'haunted-chair': {
    id: 'haunted-chair',
    title: 'Haunted Victorian Chair',
    category: 'props',
    description: 'An eerie Victorian-era chair with supernatural wear and ghostly influences.',
    detailedDescription: 'This haunted chair shows signs of supernatural activity with mysterious wear patterns and ethereal energy. Perfect for horror environments, it includes support for particle effects and dynamic lighting.',
    image: './assets/blog-content/blog-thumbnail-my-3-horror-games.webp',
    polyCount: '2,200 tris',
    textureResolution: '1024x1024',
    engines: 'Unity, Unreal',
    tags: ['Horror', 'Victorian', 'Haunted', 'Atmospheric'],
    sketchfabUrl: 'https://sketchfab.com/Mhze',
    downloadUrl: '#',
    preferredBackground: 'red' // Haunted chair suits dramatic red
  },

  'space-station-module': {
    id: 'space-station-module',
    title: 'Space Station Module',
    category: 'environments',
    description: 'A modular space station environment with advanced life support systems.',
    detailedDescription: 'This space station module provides a complete sci-fi environment with detailed control panels, life support systems, and modular connection points for building larger stations.',
    image: './assets/blog-content/blog-thumbnail-blender-to-unity.webp',
    polyCount: '18,000-22,000 tris',
    textureResolution: '2048x2048',
    engines: 'Unity, Unreal',
    tags: ['Sci-Fi', 'Space', 'Modular', 'Technical'],
    sketchfabUrl: 'https://sketchfab.com/Mhze',
    downloadUrl: '#',
    preferredBackground: 'black' // Space station suits cosmic black
  }
};

// Process assets to generate image paths automatically
Object.keys(assetsData).forEach(assetId => {
  const asset = assetsData[assetId];
  
  // If asset has assetFolder, generate the image paths automatically
  if (asset.assetFolder) {
    asset.image = `${asset.assetFolder}/${assetId}-full-render.webp`;
    asset.images = generateImagePaths(asset.assetFolder, assetId);
  }
  
  // Set default background if none specified
  if (!asset.preferredBackground) {
    asset.preferredBackground = 'black'; // Default to black background
  }
  
  // Add background image path
  asset.backgroundImage = availableBackgrounds[asset.preferredBackground];
  
  // For assets without assetFolder (using blog thumbnails), keep the existing image
  if (!asset.image && !asset.assetFolder) {
    console.warn(`Asset ${assetId} is missing both image and assetFolder properties`);
  }
});

// Export the assets data and background utilities
window.assetsData = assetsData;
window.availableBackgrounds = availableBackgrounds;
