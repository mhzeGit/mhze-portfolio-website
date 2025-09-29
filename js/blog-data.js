const blogPosts = {
  'farming-challenge-devlog': {
    title: 'Farming Challenges | The Digging Soil Mechanic',
    date: 'September 27, 2025',
    readTime: '5 min read',
    author: 'Mohammad Hassan',
    image: './assets/BlogsContent/Blog_FarmingMechanic/BlogThumbnail_FarmingMechanic.png',
    description: 'Deep dive into how I created soil digging system for my latest farming game project, including challenges and solutions I went through.',
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
        <img src="./assets/BlogsContent/Blog_FarmingMechanic/DiggedSoilStagesBlenderScreenshot.png" alt="Different stages of dug soil models">
        <p class="image-caption">Different stages of dug soil, showing progression from first dig attempt to fully digged and then covered by soil.</p>
    </div>
    <p><strong>Interesting fact!</strong> The “holes” aren’t real. The <strong>illusion</strong> of depth comes from raising the edges, not lowering the center. That way I avoid touching the terrain mesh at all.</p>

    <p>In Unity, I set up the hoe to spawn one of these models at the hit point. It worked, but something <strong>felt off</strong>. The dug soil looked <strong>separated</strong> from the terrain, even though the materials matched.</p>

    <div class="blog-image-card full">
        <img src="./assets/BlogsContent/Blog_FarmingMechanic/DiggingGround_V1.gif" alt="Different stages of dug soil models">
        <p class="image-caption">Using the hoe to dig, by spawning the dug soil.</p>
    </div>

    <h3>Seamless Textures Using Triplaner Projection</h3>

     <p> After a closer look I noticed how the dug soil and the ground feel like clearly seprate objects. I realized the <strong>UVs</strong> of the dug soil didn’t line up with the terrain texture. 

     <div> This mismatch gave it a disconnected feeling. This was because the soil texture was being <strong>projected to the UV map</strong> of each indivisual model, the ground mesh having its own and the dug soils also each have their own.</p>

     <p> Practiculy there is not much I could do in blender, since the dug soils position is <strong>varient</strong>, it's <strong>imposible</strong> to pre UV map the models insdie blender and expect it to look perfect in the game engine. I could have simply <strong>give up</strong> at this stage as this is not a very important feature, many other farming games have ignored such detials and no one blames them for it. </p>


     <p> <strong>However</strong>, that wasen't the case for me, I saw this as not just a issue that could be ignored, but rather as a <strong>challenge</strong> that acomplishing it may not grasticly change the experience of the players, but rather a challenge for myself, <strong>learn</strong> and <strong>imporve my skills!</strong> </p>

     <p> I had a bit of background to the solotion of this challange from <strong>unreal engine</strong>, the solution was to use a <strong>triplaner projection shader</strong> for the dug soil. This technique projects the texture from three directions (X, Y, and Z axes) based on <strong>world coordinates</strong>, rather than relying on UV maps. </p>

     <p> The only problem was I didn't know how to implement it in Unity. After some research, I found that Unity’s Shader Graph supports <strong>triplaner projection</strong>. I created a simple shader that uses the world position of the dug soil models to project the texture, ensuring it aligns perfectly with the terrain texture.</p>

     <p> That means both the terrain and the dug soil share the same texture space, and the mismatch disappears. Setting it up with Unity’s Shader Graph wasn’t too hard, and it instantly made the patches blend in naturally.</p>

<div class="blog-image-card full">
        <img src="./assets/BlogsContent/Blog_FarmingMechanic/TriplanerVsUvDiggedSoil.gif" alt="Different stages of dug soil models">
        <p class="image-caption">Difference between triplaner VS defualt UV soil material.</p>
    </div>

<h3>Fixing the Contact Point's Normal</h3>

    <p>But soon I noticed another issue. Even though the textures now looked seamless, the edges where the dug soil touched the terrain were still sharp. It was clear these were separate objects, and that ruined the effect.</p>

    <p>After some research, I realized why this was happening. By default, when two meshes are separate, their normals are calculated independently. This means that even if they align perfectly with the ground, they can still appear disconnected.<div> The fix was to adjust the contact points of the dug soil and force their normals to point upward instead of relying on automatic calculation. This would result in a smooth normal blend between the dug soils and the ground, making the transition completely seamless!</p>

<p>I achieved this using a Blender modifier called <strong>Data Transfer</strong>, which allows specific vertices of the 3D model to copy normal data directly from the ground mesh.</p>

<h3>The Final Result</h3>

<p>The final result speaks for itself: the sharp separation is completely gone, and the dug soil now looks as if it naturally belongs to the terrain. You can take a look at the short video I have provided, showing how the dug soil look like after all those changes.</p>

<div class="blog-image-card full">
    <iframe 
        width="100%" 
        height="350" 
        src="https://www.youtube.com/embed/LxDhOIBII0k" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen
        style="max-width: 600px; display: block; margin: 0 auto;">
    </iframe>
    <p class="image-caption">Final results of digging the soil.</p>
</div>

<p>In the future I will be providing more updates on other side of my farming game such as watering and planting, if you are intrested you can check out my other blogs <a href="./blog.html">here</a>.</p>
  `

  
  },


  'player-arm-animation': {
    title: "The Creation Of Player's Arm",
    date: 'September 20, 2025',
    readTime: '12 min read',
    author: 'Mohammad Hassan',
    image: './assets/BlogsContent/BlogThumbnail_PlayerArmAnimation.png',

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
    image: './assets/BlogsContent/BlogThumbnail_BlenderToUnity.png',

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
    image: './assets/BlogsContent/BlogThumbnail_My3HorrorGames.png',

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
    image: './assets/BlogsContent/BlogThumbnail_My3DModels.png',

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
    image: './assets/BlogsContent/BlogThumbnail_MyExpereinceIn3DAnimation.png',

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
    image: './assets/BlogsContent/BlogThumbnail_My3DModels.png',

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
    image: './assets/BlogsContent/BlogThumbnail_My3DModels.png',

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
    image: './assets/BlogsContent/BlogThumbnail_My3DModels.png',

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
    image: './assets/BlogsContent/BlogThumbnail_My3DModels.png',

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