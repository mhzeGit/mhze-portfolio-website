const blogPosts = {
  'farming-challenge-devlog': {
    title: 'Farming Challenge | The Game Mechanic Devlog',
    date: 'September 27, 2025',
    readTime: '16 min read',
    author: 'Mohammad Hassan',
    image: '../assets/BlogsContent/Blog_FarmingMechanic/BlogThumbnail_FarmingMechanic.png',
    description: 'Deep dive into creating a farming system for my latest game project, including challenges and solutions I went through.',
    tags: ['Game Mechanic', 'Farming', 'Devlog', 'Unity', 'C#'],
    content: `
    <h2>Introduction</h2>
    <p>In this post I’ll go over how I built my new farming mechanic and the main <strong>challenges</strong> I ran into. I’ll skip the basics like the first-person controller, pickup, and interaction systems, and focus on the interesting parts.</p>

    <p>Before touching code, I start with planning. At this stage I was already unsure how I’d pull some things off. I wrote down a rough step-by-step idea of how the farming loop should work, then went back and refined it. Most steps were familiar tasks, but two stood out: <strong>digging the soil</strong> and <strong>watering</strong>.</p>

    <p>Other farming games often take <strong>shortcuts</strong> here, but I wanted something more natural. Not full realism, but an experience where the player can dig soil step by step and actually water it to make it look wet. Great in theory, but I wasn’t sure if it was even possible or worth it.</p>

    <h2>Challenge 1: Digging the Soil</h2>
    <p>I started with digging since it seemed simpler. Instead of modifying the ground mesh directly, I went for a <strong>fake approach</strong> using models that look like dug soil without actually changing the terrain. Since farming only needs surface digging for seeds, this was enough.</p>

    

    <p>In Blender, I created 3–4 stages of dug soil. My plan was to swap them in-engine as the player digs. <br>I kept everything <strong>non-destructive</strong>, leaving subdivision and displacement modifiers unapplied so I could easily generate variations later.</p>
<div class="blog-image-card full">
        <img src="../assets/BlogsContent/Blog_FarmingMechanic/DiggedSoilStagesBlenderScreenshot.png" alt="Different stages of dug soil models">
        <p class="image-caption">Different stages of dug soil, showing progression from first dig attempt to fully digged and then covered by soil.</p>
    </div>
    <p><strong>Interesting fact!</strong> The “holes” aren’t real. The illusion of depth comes from raising the edges, not lowering the center. That way I avoid touching the terrain mesh at all.</p>

    <p>In Unity, I set up the hoe to spawn one of these models at the hit point. It worked, but something felt off. The dug soil looked separated from the terrain, even though the materials matched.</p>

    
    <p>After a closer look I realized the UVs of the dug soil didn’t line up with the terrain texture. This mismatch gave it a disconnected feeling. That means both the terrain and the dug soil share the same texture space, and the mismatch disappears.</p>
    <p>Setting it up with Unity’s Shader Graph wasn’t too hard, and it instantly made the patches blend in naturally.</p>

<div class="blog-image-card full">
        <img src="../assets/BlogsContent/Blog_FarmingMechanic/TriplanerVsUvDiggedSoil.gif" alt="Different stages of dug soil models">
        <p class="image-caption">Difference between triplaner vs defualt UV basedsoil material.</p>
    </div>

    <p>But soon I noticed another issue. Even though the textures now looked seamless, the edges where the dug soil touched the terrain were still sharp. It was clear these were separate objects, and that ruined the effect.</p>

    <p>More research showed me the fix. The normals of the contact vertices on the dug soil needed to point upward, matching the terrain. In Blender I solved this by using the <strong>Data Transfer</strong> modifier to transfer the ground’s normals onto the contact vertices of my dug soil models.</p>

    <p>With that final change, the dug soil now blended with the terrain properly. No mismatched textures, no hard edges, and no separated feeling. The system finally looked natural and worked without problems.</p>

    <h2>Challenge 2: Watering</h2>
    <p>(continue here…)</p>
  `
  },


  'player-arm-animation': {
    title: "The Creation Of Player's Arm",
    date: 'September 20, 2025',
    readTime: '12 min read',
    author: 'Mohammad Hassan',
    image: '../assets/BlogsContent/BlogThumbnail_PlayerArmAnimation.png',

    description: 'Techniques and lessons learned from developing four horror games that gained popularity on itch.io.',
    tags: ['Horror', 'Game Design', 'Atmosphere', 'Audio'],
    content: `
      <h2>The Art of Fear</h2>
      <p>After releasing four horror games, I've learned that atmosphere is everything in horror game design.</p>
      
      <h3>Sound Design is King</h3>
      <p>Visual scares get attention, but audio creates lasting dread. Subtle ambient sounds and strategic silence are your best tools.</p>
      
      <h3>Less is More</h3>
      <p>The most effective scares come from what players don't see, not what they do.</p>`
  },

  'blender-to-unity-workflow': {
    title: 'My Blender to Unity Workflow',
    date: 'September 15, 2025',
    readTime: '8 min read',
    author: 'Mohammad Hassan',
    image: '../assets/BlogsContent/BlogThumbnail_BlenderToUnity.png',

    description: 'Step-by-step guide to my optimized pipeline for getting 3D assets from Blender into Unity efficiently.',
    tags: ['Blender', 'Unity', 'Workflow', '3D Modeling', 'Optimization'],
    content: `
      <h2>Streamlined Asset Pipeline</h2>
      <p>After years of trial and error, I've developed a workflow that saves hours on every project.</p>
      
      <h3>Modeling Best Practices</h3>
      <p>Always model with the target platform in mind. Mobile games need different considerations than PC games.</p>
      
      <h3>Export Settings That Matter</h3>
      <p>These specific Blender export settings have saved me countless headaches in Unity...</p>`
  },
  'my-three-horror-games': {
    title: 'My 3 Horror Games That Got Popular on Itch.io',
    date: 'September 15, 2025',
    readTime: '8 min read',
    author: 'Mohammad Hassan',
    image: '../assets/BlogsContent/BlogThumbnail_My3HorrorGames.png',

    description: 'Step-by-step guide to my optimized pipeline for getting 3D assets from Blender into Unity efficiently.',
    tags: ['Indie Games', 'Unity', 'Horror', 'Beginer Works', 'Portfolio'],
    content: `
      <h2>Streamlined Asset Pipeline</h2>
      <p>After years of trial and error, I've developed a workflow that saves hours on every project.</p>
      
      <h3>Modeling Best Practices</h3>
      <p>Always model with the target platform in mind. Mobile games need different considerations than PC games.</p>
      
      <h3>Export Settings That Matter</h3>
      <p>These specific Blender export settings have saved me countless headaches in Unity...</p>`
  },
  'my-3d-modelling': {
    title: '3D Game Ready Assets & Modelling',
    date: 'September 15, 2025',
    readTime: '8 min read',
    author: 'Mohammad Hassan',
    image: '../assets/BlogsContent/BlogThumbnail_My3dModels.png',

    description: 'Step-by-step guide to my optimized pipeline for getting 3D assets from Blender into Unity efficiently.',
    tags: ['Indie Games', 'Unity', 'Horror', 'Beginer Works', 'Portfolio'],
    content: `
      <h2>Streamlined Asset Pipeline</h2>
      <p>After years of trial and error, I've developed a workflow that saves hours on every project.</p>
      
      <h3>Modeling Best Practices</h3>
      <p>Always model with the target platform in mind. Mobile games need different considerations than PC games.</p>
      
      <h3>Export Settings That Matter</h3>
      <p>These specific Blender export settings have saved me countless headaches in Unity...</p>`
  },
  'animation-works': {
    title: 'My Expereince In Animation',
    date: 'September 15, 2025',
    readTime: '8 min read',
    author: 'Mohammad Hassan',
    image: '../assets/BlogsContent/BlogThumbnail_MyExpereinceIn3DAnimation.png',

    description: 'Step-by-step guide to my optimized pipeline for getting 3D assets from Blender into Unity efficiently.',
    tags: ['Indie Games', 'Unity', 'Horror', 'Beginer Works', 'Portfolio'],
    content: `
      <h2>Streamlined Asset Pipeline</h2>
      <p>After years of trial and error, I've developed a workflow that saves hours on every project.</p>
      
      <h3>Modeling Best Practices</h3>
      <p>Always model with the target platform in mind. Mobile games need different considerations than PC games.</p>
      
      <h3>Export Settings That Matter</h3>
      <p>These specific Blender export settings have saved me countless headaches in Unity...</p>`
  }
  ,
  'unfinished-projects-showcase': {
    title: 'Unfinished Projects Showcase',
    date: 'September 15, 2025',
    readTime: '8 min read',
    author: 'Mohammad Hassan',
    image: '../assets/BlogsContent/BlogThumbnail_My3dModels.png',

    description: 'Step-by-step guide to my optimized pipeline for getting 3D assets from Blender into Unity efficiently.',
    tags: ['Indie Games', 'Unity', 'Horror', 'Beginer Works', 'Portfolio'],
    content: `
      <h2>Streamlined Asset Pipeline</h2>
      <p>After years of trial and error, I've developed a workflow that saves hours on every project.</p>
      
      <h3>Modeling Best Practices</h3>
      <p>Always model with the target platform in mind. Mobile games need different considerations than PC games.</p>
      
      <h3>Export Settings That Matter</h3>
      <p>These specific Blender export settings have saved me countless headaches in Unity...</p>`
  }
  ,
  'grass-optimization-techniques': {
    title: 'Grass Optimization Techniques',
    date: 'September 15, 2025',
    readTime: '8 min read',
    author: 'Mohammad Hassan',
    image: '../assets/BlogsContent/BlogThumbnail_My3dModels.png',

    description: 'Step-by-step guide to my optimized pipeline for getting 3D assets from Blender into Unity efficiently.',
    tags: ['Indie Games', 'Unity', 'Horror', 'Beginer Works', 'Portfolio'],
    content: `
      <h2>Streamlined Asset Pipeline</h2>
      <p>After years of trial and error, I've developed a workflow that saves hours on every project.</p>
      
      <h3>Modeling Best Practices</h3>
      <p>Always model with the target platform in mind. Mobile games need different considerations than PC games.</p>
      
      <h3>Export Settings That Matter</h3>
      <p>These specific Blender export settings have saved me countless headaches in Unity...</p>`
  }
  ,
  'uvseams-the-ultimate-fix': {
    title: 'UV Seams The Ultimate Fix!',
    date: 'September 15, 2025',
    readTime: '8 min read',
    author: 'Mohammad Hassan',
    image: '../assets/BlogsContent/BlogThumbnail_My3dModels.png',

    description: 'Step-by-step guide to my optimized pipeline for getting 3D assets from Blender into Unity efficiently.',
    tags: ['Indie Games', 'Unity', 'Horror', 'Beginer Works', 'Portfolio'],
    content: `
      <h2>Streamlined Asset Pipeline</h2>
      <p>After years of trial and error, I've developed a workflow that saves hours on every project.</p>
      
      <h3>Modeling Best Practices</h3>
      <p>Always model with the target platform in mind. Mobile games need different considerations than PC games.</p>
      
      <h3>Export Settings That Matter</h3>
      <p>These specific Blender export settings have saved me countless headaches in Unity...</p>`
  }
  ,
  'slime-tower-defence-project': {
    title: 'Slime Tower Defence Project',
    date: 'September 15, 2025',
    readTime: '8 min read',
    author: 'Mohammad Hassan',
    image: '../assets/BlogsContent/BlogThumbnail_My3dModels.png',

    description: 'Step-by-step guide to my optimized pipeline for getting 3D assets from Blender into Unity efficiently.',
    tags: ['Indie Games', 'Unity', 'Horror', 'Beginer Works', 'Portfolio'],
    content: `
      <h2>Streamlined Asset Pipeline</h2>
      <p>After years of trial and error, I've developed a workflow that saves hours on every project.</p>
      
      <h3>Modeling Best Practices</h3>
      <p>Always model with the target platform in mind. Mobile games need different considerations than PC games.</p>
      
      <h3>Export Settings That Matter</h3>
      <p>These specific Blender export settings have saved me countless headaches in Unity...</p>`
  }
};

// Export the blog posts data
window.blogPosts = blogPosts;