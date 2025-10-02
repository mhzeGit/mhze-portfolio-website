// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

console.log("Main.js initialized");

// JS: split each strong into per-letter spans and set a per-letter index (--i)
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('p.intro strong').forEach(el => {
    const chars = Array.from(el.textContent);
    el.innerHTML = '';
    chars.forEach((ch, i) => {
      const s = document.createElement('span');
      s.textContent = ch === ' ' ? '\u00A0' : ch;
      s.style.setProperty('--i', i);
      el.appendChild(s);
    });
  });

  // Generate portfolio cards from blog data
  generatePortfolioCards();
});

// Generate portfolio cards from blog data

function generatePortfolioCards() {
  // Helper to render cards into a grid
  function renderCards(gridElement, posts) {
    if (!gridElement) return;
    gridElement.innerHTML = posts.map(post => `
      <div class="portfolio-card" onclick="window.location.href='blog.html?post=${post.id}'">
        <div class="card-image" style="background-image: url('${post.image}'); background-size: cover; background-position: center;"></div>
        <div class="card-content">
          <h3>${post.title}</h3>
          <p>${post.description}</p>
          <div class="tech-stack">
            ${post.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `).join('');
  }

  if (!window.blogPosts) return;
  const posts = Object.keys(window.blogPosts).map(id => ({
    id,
    ...window.blogPosts[id]
  }));
  const displayPosts = posts.slice(0, 6);

  // Portfolio section (My Blogs)
  const portfolioGrid = document.querySelector('#portfolio .portfolio-grid');
  renderCards(portfolioGrid, displayPosts);


  // My Works section (custom cards)
  const myWorksGrid = document.getElementById('my-works-grid');
  if (myWorksGrid) {
    const works = [
      {
        title: 'My Created 3D Assets',
        description: 'A collection of my best 3D models and assets created for games and other projects.',
        image: './assets/BlogsContent/BlogThumbnail_My3DModels.png',
        link: 'my-3d-assets.html'
      },
      {
        title: 'Game Project: Blah Blah Family',
        description: 'A creepy stylized horror adventure game with unique mechanics and story.',
        image: './assets/BlogsContent/Blog_PlayerArmAnimation/BlogThumbnail_PlayerArmAnimation.png',
        link: 'blahblahfamily.html'
      },
      {
        title: 'Game Project: Slime Defence Game',
        description: 'A fun and strategic tower defense game featuring slimes and creative mechanics.',
        image: './assets/BlogsContent/BlogThumbnail_My3DModels.png',
        link: 'slime-defence.html'
      },
      {
        title: 'Game Project: Farming Game',
        description: 'A farming simulation game with innovative digging and soil mechanics.',
        image: './assets/BlogsContent/Blog_FarmingMechanic/BlogThumbnail_FarmingMechanic.png',
        link: 'farming-game.html'
      }
    ];
    myWorksGrid.innerHTML = works.map(work => `
      <div class="portfolio-card mywork-card" onclick="window.location.href='${work.link}'" style="cursor:pointer;">
        <div class="card-image" style="background-image: url('${work.image}'); background-size: cover; background-position: center;"></div>
        <div class="card-content">
          <h3>${work.title}</h3>
          <p>${work.description}</p>
        </div>
      </div>
    `).join('');
  }

  // Add "More Blogs?" button if there are more than 6 posts (only for Blogs section)
  if (posts.length > 6 && portfolioGrid) {
    const moreButton = document.createElement('div');
    moreButton.className = 'more-blogs-container';
    moreButton.innerHTML = '<a href="blog.html" class="btn btn-primary">More Blogs?</a>';
    portfolioGrid.parentElement.appendChild(moreButton);
  }

  console.log(`Generated ${displayPosts.length} portfolio cards for both Blogs and My Works sections`);
}

// Get all blog posts as an array
function getAllBlogPosts() {
  return Object.keys(window.blogPosts || {}).map(id => ({
    id,
    ...window.blogPosts[id]
  }));
}

// Get a specific blog post by ID
function getBlogPost(postId) {
  return window.blogPosts && window.blogPosts[postId] ? {
    id: postId,
    ...window.blogPosts[postId]
  } : null;
}