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
    description: 'A weird fish character designed from pure creativity. Honestly not sure why I decided to make this. But the goal was to make something weird yet funny and memorable.',
    assetFolder: './assets/3d-assets/weird-fish',
    polyCount: '2,840 tris',
    textureResolution: '1024x1024',
    tools: 'Blender',
    tags: ['Character', 'Weird', 'Stylized', 'Rigged', 'Detailed'],
    sketchfabUrl: 'https://sketchfab.com/3d-models/goofy-fish-9c4b4626ef5145038ebe3f972b405466',
    preferredBackground: 'dark-green' // Fish looks good against blue background
  },

  'toaster-gun': {
    id: 'toaster-gun',
    title: 'Toaster Gun',
    category: 'weapons',
    description: 'A quirky toaster gun that shoots slices of bread. Perfect for comedic game scenarios.',
    assetFolder: './assets/3d-assets/toaster-gun',
    polyCount: '4,250 tris',
    textureResolution: '2048x2048',
    tools: 'Blender, Substance Painter',
    tags: ['Unique', 'Weapon', 'Stylized', 'Game-Ready'],
    sketchfabUrl: 'https://sketchfab.com/3d-models/stylized-toaster-gun-aa2fce1cc4aa4f4baa6602f7c2f9bb7b',
    preferredBackground: 'blue' // Quirky weapon suits purple background
  },

  // Props
  'berreta-m9': {
    id: 'berreta-m9',
    title: 'Berreta M9',
    category: 'weapons',
    description: 'A detailed Berreta M9 pistol model. Perfect for FPS games.',
    assetFolder: './assets/3d-assets/berreta-m9',
    polyCount: '1,200 tris',
    textureResolution: '1024x1024',
    tools: 'Blender, Substance Painter',
    tags: ['Gun', 'Pistol', 'Realistic', 'Prop'],
    sketchfabUrl: 'https://sketchfab.com/3d-models/beretta-m9-f84f07d6e52b477f9087a22a38af78ff',
    preferredBackground: 'black' // Realistic weapon looks good on black
  },

  'red-robot': {
    id: 'red-robot',
    title: 'Red Robot',
    category: 'characters',
    description: 'A cute red robot character designed for casual games. Features simple animations and a friendly design.',
    assetFolder: './assets/3d-assets/red-robot',
    polyCount: '800-1200 tris each',
    textureResolution: '512x512',
    tools: 'Blender, Substance Painter',
    tags: ['Robot', 'Sci-Fi', 'Character', 'Red', 'Detailed', 'Rigged'],
    sketchfabUrl: 'https://sketchfab.com/3d-models/cool-spine-robot-53b3dbf3b476438fa1a3a1f6800ee41f',
    preferredBackground: 'purple' // Farming tools suit natural green background
  },

 
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
