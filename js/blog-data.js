const blogPosts = {
  //#region Farming Mechanic Blog
  'farming-challenge-devlog': {
    title: 'Farming Challenges | Digging Mechanic',
    date: 'September 27, 2025',
    readTime: '5 min read',
    author: 'Mohammad Hassan',
    image: './assets/blog-content/blog-farming-mechanic/blog-thumbnail-farming-mechanic.png',
    description: 'Deep dive into soil digging mechanic for my latest farming game project and challenges I went through.',
    tags: ['Challenge', 'Problem Solving', 'Difficult', 'Game Mechanic', 'Unity', 'C#'],
    content: `
    <h2>Introduction</h2>
    <p>In this post I’ll go over how I built my new farming mechanic and the main <strong>challenges</strong> I ran into. I’ll skip the basics like the first-person controller, pickup, and interaction systems, and focus on the interesting parts.</p>

    <p>Before touching code, I start with planning. At this stage I was already unsure how I’d pull some things off. I wrote down a rough step-by-step idea of how the farming loop should work, then went back and refined it. Most steps were familiar tasks, but two stood out: <strong>digging the soil</strong> and <strong>watering</strong>.</p>

    <p>Other farming games often take <strong>shortcuts</strong> here, but I wanted something more natural. Not full realism, but an experience where the player can dig soil step by step and actually water it to make it look wet. Great in theory, but I wasn’t sure if it was even possible or worth it.</p>

    <h2>Challenge 1: Digging the Soil</h2>
    <p>I started with digging since it seemed simpler. Instead of modifying the ground mesh directly, I went for a <strong>fake approach</strong> using models that look like dug soil without actually changing the terrain. Since farming only needs surface digging for seeds, this was enough.</p>

    

    <p>In Blender, I created 3–4 stages of dug soil. My plan was to swap them in-engine as the player digs. <br>I kept everything <strong>non-destructive</strong>, leaving subdivision and displacement modifiers unapplied so I could easily generate variations later.</p>
<div class="blog-image-card full">
        <img src="./assets/blog-content/blog-farming-mechanic/digged-soil-stages-blender-screenshot.png" alt="Different stages of dug soil models">
        <p class="image-caption">Different stages of dug soil, showing progression from first dig attempt to fully digged and then covered by soil.</p>
    </div>
    <p><strong>Interesting fact!</strong> The “holes” aren’t real. The <strong>illusion</strong> of depth comes from raising the edges, not lowering the center. That way I avoid touching the terrain mesh at all.</p>

    <p>In Unity, I set up the hoe to spawn one of these models at the hit point. It worked, but something <strong>felt off</strong>. The dug soil looked <strong>separated</strong> from the terrain, even though the materials matched.</p>

    <div class="blog-image-card full">
        <img src="./assets/blog-content/blog-farming-mechanic/digging-ground-v1.gif" alt="Different stages of dug soil models">
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
        <img src="./assets/blog-content/blog-farming-mechanic/triplaner-vs-uv-digged-soil.gif" alt="Different stages of dug soil models">
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

  //#endregion

  //#region Player Arm Animation Blog
  'player-arm-animation': {
    title: "The Creation of Player's Arm",
    date: 'September 20, 2025',
    readTime: '12 min read',
    author: 'Mohammad Hassan',
    image: './assets/blog-content/blog-player-arm-animation/blog-thumbnail-player-arm-animation.png',

    description: 'Tips and Techniques I used making first person arm for my indie game and the challanges I faced.',
    tags: ['Technical Animation', 'Problem Solving', 'First Person', 'Efficency', 'Blender', 'Unreal Engine', 'Blueprints'],
    content:
      `<h2>Introduction</h2>
      

      <p>In this blog I will go through something I ran into while working on <strong>Blah Blah Family</strong> (a horror adventure game I've been developing).</p> 
      <p>Sometimes the smallest details end up taking the most time to solve. In this case, it was making the first person character hold different item types in a way that actually looked good and believable.</p>

      <div class="blog-image-card full">
      <img src="./assets/blog-content/blog-player-arm-animation/player-holding-rock-game-screenshot.png" alt="Blah Blah Family game">
      <p class="image-caption">Blah Blah Family - A Creepy Stylized Game.</p>
      </div>

      <h2>The Problem: Inconsistent Item Holding</h2>

      <p>The issue started when I was testing the pickup system. Everything worked functionally, the player could grab objects, the hand would close around them, and the items would follow the hand correctly. But visually, something was clearly off.</p>

      <p>The character would pick up a tiny key with a specific hand pose, then immediately pick up a massive boulder and hold it in exactly the same way. Same finger position, same grip angle, same everything. A delicate wooden stick? Same pose. A heavy metal crowbar? You guessed it, same pose again.</p>

      <p>It didn't look right at all. The hand felt robotic and lifeless, like it couldn't actually feel or respond to what it was holding.</p>

<div class="blog-image-card full">
  <img src="./assets/blog-content/blog-player-arm-animation/player-holding-rock-game-screenshot.png" alt="Awkward item holding">
  <p class="image-caption">Side-by-side comparison showing the awkward same-hand-position problem.</p>
</div>

      <p>This is actually a common challenge in game development. As indie developers with limited budgets and time, we simply can't create individual animations for every possible item interaction. </p>

      <p>Even AAA studios with their massive budgets don't spend resources creating unique animations for every single holding scenario. Instead, they use various techniques to optimize their animation workflow. In this blog, I'll walk you through the solution I came up with to tackle this problem efficiently.</p>


<h2>The Common Solution (And Its Limitations)</h2>

<p>The typical indie approach is to create one generic "holding" animation and use it for everything. Every item uses the same animation, which saves a lot of time. The problem is that it's immediately noticeable, and it breaks immersion.</p>

<p>I needed something that looked natural but didn't require animating every item individually.</p>

<div class="blog-image-card full">
  <img src="./assets/blog-content/blog-player-arm-animation/player-holding-rock-game-screenshot.png" alt="Generic animation example">
  <p class="image-caption">Examples showing the generic animation issue.</p>
</div>



<h2>My Solution: The Two-Category System</h2>

<p>After analyzing the different items in the game, I realized that most objects can be grouped into just <strong>two</strong> categories based on how you'd naturally hold them:</p>

<p><strong>1. Palm-Holding Items</strong><br>
These are things that sit in your palm, like keys (more on keys later), coins, small rocks, apples, that sort of stuff. Your fingers curl around them, but they're resting in your hand.</p>

<p><strong>2. Stick-Holding Items</strong><br>
These are things you grip like a handle, sticks (obviously), swords, crowbars, flashlights, baseball bats. You're grabbing onto them, not cradling them.</p>

<div class="blog-image-card full">
  <img src="./assets/blog-content/blog-player-arm-animation/player-holding-rock-game-screenshot.png" alt="Palm vs Stick holding">
  <p class="image-caption">Visual comparison of palm-holding vs stick-holding items.</p>
</div>

<p>Just by sorting items into these two groups, I reduced the animation work significantly. Instead of dozens of animations, I only needed two base animations.</p>

<p>But there was still room for improvement.</p>

<h2>Adding Hand Pressure</h2>

<p>Even within the same category, not everything should look identical. In real life, you don't hold a tiny key the same way you hold a heavy stone, even though they're both palm-held items. Your fingers naturally adjust based on the object's size and weight.</p>

<p>That's when I implemented what I call <strong>hand pressure</strong>.</p>

<div class="blog-image-card full">
  <img src="./assets/blog-content/blog-player-arm-animation/player-holding-rock-game-screenshot.png" alt="Hand pressure demonstration">
  <p class="image-caption">Hand pressure in action with different objects.</p>
</div>

<p>I defined hand pressure as a value that represents how tightly the fingers grip something, measured on a scale from 0% to 100%:</p>

<ul>
  <li><strong>0% pressure</strong> = The hand is completely open with the palm flat and fingers extended. This would be used for the moment right before you pick something up.</li>
  <li><strong>50% pressure</strong> = Fingers are moderately curled, suitable for medium-sized objects.</li>
  <li><strong>100% pressure</strong> = Full fist with fingers completely closed, used for very small objects that require the fingers to curl all the way in.</li>
</ul>

<p>Here's how this translates to actual items in the game based on their size:</p>

<ul>
  <li>A small coin or key? Around 80-90% hand pressure. The object is tiny, so your fingers need to curl in significantly to grip it properly.</li>
  <li>A medium-sized apple or baseball? Around 50-60% pressure. The object fits comfortably in your hand with a moderate finger curl.</li>
  <li>A large rock or thick book? Around 20-30% pressure. The object is big enough that your fingers don't need to curl much, they just wrap around the edges.</li>
</ul>
<p>The same logic applies to stick-holding items. Gripping a thick sword handle needs more finger curl than holding a thin stick. Meaning the tick sword would possibly go with something about 40% where as a thin stick would go with 90%</p>

<div class="blog-image-card full">
  <img src="./assets/blog-content/blog-player-arm-animation/player-holding-rock-game-screenshot.png" alt="Hand pressure comparison">
  <p class="image-caption">Side-by-side comparison showing different hand pressures on various items.</p>
</div>

<h2>How It Actually Works in the Game</h2>

<p>The system I built is surprisingly simple:</p>

<ol>
  <li>Each item in the game is tagged with two properties: its <strong>category</strong> (palm or stick) and its <strong>hand pressure</strong> (0-100%)</li>
  <li>When the player picks up an item, the game reads these properties</li>
  <li>The hand animation smoothly adjusts to match the pressure value</li>
  <li>The result is a natural-looking pickup that took seconds to set up instead of hours to animate</li>
</ol>

<div class="blog-image-card full">
  <iframe 
    width="100%" 
    height="350" 
    src="https://www.youtube.com/embed/YOUR_VIDEO_ID" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen
    style="max-width: 600px; display: block; margin: 0 auto;">
  </iframe>
  <p class="image-caption">Short clip showing the character picking up different items with different hand pressures.</p>
</div>


<h2>Why This Matters</h2>

<p>This might seem like a small detail, and most players won't consciously notice it. But that's the point.</p>

<p>Good game design comes from all those little details that players don't notice because everything feels right. When animations look natural, players stay immersed in the world. When things look off, it breaks the experience.</p>

<div class="blog-image-card full">
  <img src="./assets/blog-content/blog-player-arm-animation/player-holding-rock-game-screenshot.png" alt="Before and after comparison">
  <p class="image-caption">Before and after comparison of the pickup system.</p>
</div>

<p>This system also saved a significant amount of development time. Instead of creating unique animations for every item, I can add a new object to the game in under a minute, just assign it a category and a pressure value.</p>

<h2>The Results</h2>

<p>I'm happy with how this system turned out. The pickup animations in Blah Blah Family look more polished, and the development time stayed manageable.</p>

<p>It's a good example of finding a balance between quality and efficiency. Sometimes the best solution isn't the most complex one, it's about finding what works without overcomplicating things.</p>

<div class="blog-image-card full">
  <img src="./assets/blog-content/blog-player-arm-animation/player-holding-rock-game-screenshot.png" alt="Final system montage">
  <p class="image-caption">Montage of the character picking up various items, showing off the system.</p>
</div>

<p><strong>If you're working on your own game and dealing with similar issues, hopefully this approach helps.</strong> You can see this system in action in Blah Blah Family <a href="./blahblahfamily.html">here</a>.</p>

<p>Feel free to share your thoughts or similar challenges you've faced in the comments, or check out my other blogs <a href="./blog.html">here</a>.</p>`
  },
  //#endregion

  //#region blender to unity workflow blog

  'blender-to-unity-workflow': {
    title: 'My Blender to Unity Workflow',
    date: 'September 15, 2025',
    readTime: '8 min read',
    author: 'Mohammad Hassan',
    image: './assets/blog-content/blog-thumbnail-blender-to-unity.png',

    description: 'Step-by-step guide to my optimized pipeline for getting 3D assets from Blender into Unity efficiently.',
    tags: ['Blender', 'Unity', 'Workflow', '3D Modeling', 'Optimization'],
    content: `<p>This blog post is currently under construction. In the meantime, check out my other available blogs. Thanks for your patience!</p>`
  },
  //#endregion

  //#region My three horror games blog

  'my-three-horror-games': {
    title: 'My 3 Horror Games That Got Popular on Itch.io',
    date: 'September 15, 2025',
    readTime: '8 min read',
    author: 'Mohammad Hassan',
    image: './assets/blog-content/blog-thumbnail-my-3-horror-games.png',

    description: 'Step-by-step guide to my optimized pipeline for getting 3D assets from Blender into Unity efficiently.',
    tags: ['Indie Games', 'Unity', 'Horror', 'Beginer Works', 'Portfolio'],
    content: `<p>This blog post is currently under construction. In the meantime, check out my other available blogs. Thanks for your patience!</p>`
  },
  //#endregion

  //#region My 3d modelling blog

  'my-3d-modelling': {
    title: '3D Game Ready Assets & Modelling',
    date: 'September 15, 2025',
    readTime: '8 min read',
    author: 'Mohammad Hassan',
    image: './assets/blog-content/blog-thumbnail-my-3d-models.png',

    description: 'Step-by-step guide to my optimized pipeline for getting 3D assets from Blender into Unity efficiently.',
    tags: ['Indie Games', 'Unity', 'Horror', 'Beginer Works', 'Portfolio'],
    content: `<p>This blog post is currently under construction. In the meantime, check out my other available blogs. Thanks for your patience!</p>`
  },
  //#endregion

  //#region animation works blog

  'animation-works': {
    title: 'My Expereince In Animation',
    date: 'September 15, 2025',
    readTime: '8 min read',
    author: 'Mohammad Hassan',
    image: './assets/blog-content/blog-thumbnail-my-experience-in-3d-animation.png',

    description: 'Step-by-step guide to my optimized pipeline for getting 3D assets from Blender into Unity efficiently.',
    tags: ['Indie Games', 'Unity', 'Horror', 'Beginer Works', 'Portfolio'],
    content: `<p>This blog post is currently under construction. In the meantime, check out my other available blogs. Thanks for your patience!</p>`
  }
  //#endregion

  //#region  unfinished projects blog

  ,
  'unfinished-projects-showcase': {
    title: 'Unfinished Projects Showcase',
    date: 'September 15, 2025',
    readTime: '8 min read',
    author: 'Mohammad Hassan',
    image: './assets/blog-content/blog-thumbnail-my-3d-models.png',

    description: 'Step-by-step guide to my optimized pipeline for getting 3D assets from Blender into Unity efficiently.',
    tags: ['Indie Games', 'Unity', 'Horror', 'Beginer Works', 'Portfolio'],
    content: `<p>This blog post is currently under construction. In the meantime, check out my other available blogs. Thanks for your patience!</p>`
  }
  //#endregion

  //#region grass optimization blog

  ,
  'grass-optimization-techniques': {
    title: 'Grass Optimization Techniques',
    date: 'September 15, 2025',
    readTime: '8 min read',
    author: 'Mohammad Hassan',
    image: './assets/blog-content/blog-thumbnail-my-3d-models.png',

    description: 'Step-by-step guide to my optimized pipeline for getting 3D assets from Blender into Unity efficiently.',
    tags: ['Indie Games', 'Unity', 'Horror', 'Beginer Works', 'Portfolio'],
    content: `<p>This blog post is currently under construction. In the meantime, check out my other available blogs. Thanks for your patience!</p>`
  }
  //#endregion

  //#region uvseams the ultimate fix blog

  ,
  'uvseams-the-ultimate-fix': {
    title: 'UV Seams The Ultimate Fix!',
    date: 'September 15, 2025',
    readTime: '8 min read',
    author: 'Mohammad Hassan',
    image: './assets/blog-content/blog-thumbnail-my-3d-models.png',

    description: 'Step-by-step guide to my optimized pipeline for getting 3D assets from Blender into Unity efficiently.',
    tags: ['Indie Games', 'Unity', 'Horror', 'Beginer Works', 'Portfolio'],
    content: `<p>This blog post is currently under construction. In the meantime, check out my other available blogs. Thanks for your patience!</p>`
  }
  //#endregion

  //#region  slime tower defence project blog
  ,
  'slime-tower-defence-project': {
    title: 'Slime Tower Defence Project',
    date: 'September 15, 2025',
    readTime: '8 min read',
    author: 'Mohammad Hassan',
    image: './assets/blog-content/blog-thumbnail-my-3d-models.png',

    description: 'Step-by-step guide to my optimized pipeline for getting 3D assets from Blender into Unity efficiently.',
    tags: ['Indie Games', 'Unity', 'Horror', 'Beginer Works', 'Portfolio'],
    content: `<p>This blog post is currently under construction. In the meantime, check out my other available blogs. Thanks for your patience!</p>`
  }
  //#endregion

  ,
  'unity-optimization-tips': {
    title: 'Unity Optimization Tips & Tricks',
    date: 'September 10, 2025',
    readTime: '6 min read',
    author: 'Mohammad Hassan',
    image: './assets/blog-content/blog-thumbnail-blender-to-unity.png',
    description: 'Essential optimization techniques to improve performance in Unity games.',
    tags: ['Unity', 'Optimization', 'Performance', 'Tips'],
    content: `<p>This blog post is currently under construction. In the meantime, check out my other available blogs. Thanks for your patience!</p>`
  },
  'shader-fundamentals': {
    title: 'Shader Fundamentals for Game Developers',
    date: 'September 8, 2025',
    readTime: '10 min read',
    author: 'Mohammad Hassan',
    image: './assets/blog-content/blog-thumbnail-my-3d-models.png',
    description: 'Understanding the basics of shader programming for game development.',
    tags: ['Shaders', 'Graphics', 'Programming', 'Technical'],
    content: `<p>This blog post is currently under construction. In the meantime, check out my other available blogs. Thanks for your patience!</p>`
  },
  'level-design-principles': {
    title: 'Level Design Principles for Indie Games',
    date: 'September 5, 2025',
    readTime: '7 min read',
    author: 'Mohammad Hassan',
    image: './assets/blog-content/blog-thumbnail-my-experience-in-3d-animation.png',
    description: 'Key principles and techniques for creating engaging game levels.',
    tags: ['Level Design', 'Game Design', 'Indie', 'Principles'],
    content: `<p>This blog post is currently under construction. In the meantime, check out my other available blogs. Thanks for your patience!</p>`
  },
  'sound-design-horror': {
    title: 'Sound Design for Horror Games',
    date: 'September 3, 2025',
    readTime: '9 min read',
    author: 'Mohammad Hassan',
    image: './assets/blog-content/blog-thumbnail-my-3-horror-games.png',
    description: 'Creating atmospheric and terrifying soundscapes for horror games.',
    tags: ['Sound Design', 'Horror', 'Audio', 'Atmosphere'],
    content: `<p>This blog post is currently under construction. In the meantime, check out my other available blogs. Thanks for your patience!</p>`
  },
  'version-control-indie': {
    title: 'Version Control for Indie Game Development',
    date: 'September 1, 2025',
    readTime: '5 min read',
    author: 'Mohammad Hassan',
    image: './assets/blog-content/blog-thumbnail-blender-to-unity.png',
    description: 'Best practices for version control in small game development teams.',
    tags: ['Version Control', 'Git', 'Workflow', 'Team'],
    content: `<p>This blog post is currently under construction. In the meantime, check out my other available blogs. Thanks for your patience!</p>`
  }
  //#endregion
};

// Export the blog posts data
window.blogPosts = blogPosts;