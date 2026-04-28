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

// Pagination managers for homepage sections
let blogsPaginationManager;
let worksPaginationManager;

// Generate portfolio cards from blog data
function generatePortfolioCards() {
  // Blog card render function
  function renderBlogCard(post) {
    return `
      <div class="portfolio-card" onclick="window.location.href='html/blog.html?post=${post.id}'">
        <div class="card-image" style="background-image: url('${post.image}'); background-size: cover; background-position: center;"></div>
        <div class="card-content">
          <h3>${post.title}</h3>
          <p>${post.description}</p>
          <div class="tech-stack">
            ${post.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }

  // Work card render function
  function renderWorkCard(work) {
    return `
      <div class="portfolio-card" onclick="window.location.href='${work.link}'" style="cursor:pointer;">
        <div class="card-image" style="background-image: url('${work.image}'); background-size: cover; background-position: center;"></div>
        <div class="card-content">
          <h3>${work.title}</h3>
          <p>${work.description}</p>
          <div class="tech-stack">
            ${(work.tags || []).map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
          </div>
        </div>
      </div>
    `;
  }

  if (!window.blogPosts) return;
  
  // Get all blog posts
  const posts = Object.keys(window.blogPosts).map(id => ({
    id,
    ...window.blogPosts[id]
  }));

  // Portfolio section (My Blogs) with pagination
  const portfolioGrid = document.querySelector('#portfolio .portfolio-grid');
  if (portfolioGrid && posts.length > 0) {
    // Ensure the grid has an ID for pagination
    if (!portfolioGrid.id) {
      portfolioGrid.id = 'portfolio-grid';
    }
    
    blogsPaginationManager = new PaginationManager({
      containerId: portfolioGrid.id,
      paginationId: 'blogs-pagination',
      items: posts,
      renderItemFunction: renderBlogCard,
      onPageChange: (pageItems, currentPage) => {
        // Re-add click handlers for cards
        portfolioGrid.querySelectorAll('.portfolio-card').forEach(card => {
          card.style.cursor = 'pointer';
        });
      }
    });
  }

  // My Works section (custom cards) with pagination
  const myWorksGrid = document.getElementById('my-works-grid');
  if (myWorksGrid) {
    const works = [
      {
        title: 'Uncanny Smile | The Last Harvest',
        description: 'A adventure farming horror game about weird pumpkins.',
        image: './assets/my-work-content/UncannySmileTheLastHarvest/BaseCapsuleArtThumbnailWithSteamLogo.webp',
        link: './html/uncanny-smile.html',
        tags: ['Indie Game Dev', 'Personal Project', 'Steam Game']
      },
      {
        title: 'Game Project: Blah Blah Family',
        description: 'A creepy stylized horror adventure game with unique mechanics and story.',
        image: './assets/my-work-content/blah-blah-family/blah-blah-family-game-thumbnail.webp',
        link: './html/blahblahfamily.html',
        tags: ['Unreal Engine', 'Game Design', 'Horror']
      },
      {
        title: 'Game Project: Slime Defence Game',
        description: 'A fun and strategic tower defense game featuring slimes and creative mechanics.',
        image: './assets/my-work-content/slime-defence-game-thumbnail.webp',
        link: './html/slime-defence.html',
        tags: ['Unity', 'C#', 'Tower Defense']
      },
      {
        title: 'My Top 10 Animation Works',
        description: 'A showcase of my top 10 animation works, highlighting my skills and creativity in 3D animation.',
        image: './assets/blog-content/blog-thumbnail-my-experience-in-3d-animation.webp',
        link: './html/my-animations.html',
        tags: ['Animation', 'Blender', 'Autodesk Maya']
      },
      {
        title: 'Action Game: Combat Arena',
        description: 'Fast-paced action combat game with dynamic environments and fluid controls.',
        image: './assets/blog-content/blog-thumbnail-blender-to-unity.webp',
        link: './html/combat-arena.html',
        tags: ['Unity', 'Action', 'C#']
      },
      {
        title: 'My Created 3D Assets',
        description: 'A collection of my best 3D models and assets created for games and other projects.',
        image: './assets/blog-content/blog-thumbnail-my-3d-models.webp',
        link: './html/my-3d-assets.html',
        tags: ['3D Modeling', 'Texturing', 'Blender']
      }
    ];

    worksPaginationManager = new PaginationManager({
      containerId: 'my-works-grid',
      paginationId: 'works-pagination',
      items: works,
      renderItemFunction: renderWorkCard,
      onPageChange: (pageItems, currentPage) => {
        // Re-add click handlers for cards
        myWorksGrid.querySelectorAll('.portfolio-card').forEach(card => {
          card.style.cursor = 'pointer';
        });
      }
    });
  }
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