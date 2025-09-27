const blogPosts = {
  'farming-challenge-devlog': {
    title: 'Farming Challenge | The Game Mechanic Devlog',
    date: 'September 27, 2025',
    readTime: '16 min read',
    author: 'Mohammad Hassan',
    image: '../assets/BlogsContent/FarmingMechanics/BlogThumbnail_FarmingMechanic.png',
    description: 'Deep dive into creating a farming system for my latest game project, including challenges and solutions.',
    tags: ['Game Mechanic', 'Farming', 'Devlog', 'Unity', 'C#'],
    content: `
      <h2>Building the Farming System</h2>
      <p>Creating a farming mechanic proved more challenging than I initially expected. Here's what I learned...</p>
      
      <h3>The Core Challenge</h3>
      <p>Players needed to feel engaged with the farming process without it becoming tedious. The balance between realism and fun gameplay was crucial.</p>
      
      <h3>Technical Implementation</h3>
      <p>I used Unity's Tilemap system combined with custom C# scripts to handle crop growth, soil states, and player interactions.</p>
      
      <h3>What I Learned</h3>
      <p>The importance of player feedback loops and visual clarity in game mechanics cannot be overstated.</p>
    `
  },

  'player-arm-animation': {
    title: "The Creation Of Player's Arm",
    date: 'September 20, 2025',
    readTime: '12 min read',
    author: 'Mohammad Hassan',
    image: '../assets/BlogsContent/FarmingMechanics/BlogThumbnail_PlayerArmAnimation.png',

    description: 'Techniques and lessons learned from developing four horror games that gained popularity on itch.io.',
    tags: ['Horror', 'Game Design', 'Atmosphere', 'Audio'],
    content: `
      <h2>The Art of Fear</h2>
      <p>After releasing four horror games, I've learned that atmosphere is everything in horror game design.</p>
      
      <h3>Sound Design is King</h3>
      <p>Visual scares get attention, but audio creates lasting dread. Subtle ambient sounds and strategic silence are your best tools.</p>
      
      <h3>Less is More</h3>
      <p>The most effective scares come from what players don't see, not what they do.</p>
    `
  },

  'blender-to-unity-workflow': {
    title: 'My Blender to Unity Workflow',
    date: 'September 15, 2025',
    readTime: '8 min read',
    author: 'Mohammad Hassan',
    image: '../assets/BlogsContent/FarmingMechanics/BlogThumbnail_FarmingMechanic.png',

    description: 'Step-by-step guide to my optimized pipeline for getting 3D assets from Blender into Unity efficiently.',
    tags: ['Blender', 'Unity', 'Workflow', '3D Modeling', 'Optimization'],
    content: `
      <h2>Streamlined Asset Pipeline</h2>
      <p>After years of trial and error, I've developed a workflow that saves hours on every project.</p>
      
      <h3>Modeling Best Practices</h3>
      <p>Always model with the target platform in mind. Mobile games need different considerations than PC games.</p>
      
      <h3>Export Settings That Matter</h3>
      <p>These specific Blender export settings have saved me countless headaches in Unity...</p>
    `
  }
};

// Export the blog posts data
window.blogPosts = blogPosts;