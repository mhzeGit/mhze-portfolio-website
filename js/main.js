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
    `;
  }

  // Work card render function
  function renderWorkCard(work) {
    return `
      <div class="portfolio-card mywork-card" onclick="window.location.href='${work.link}'" style="cursor:pointer;">
        <div class="card-image" style="background-image: url('${work.image}'); background-size: cover; background-position: center;"></div>
        <div class="card-content">
          <h3>${work.title}</h3>
          <p>${work.description}</p>
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
        title: 'My Created 3D Assets',
        description: 'A collection of my best 3D models and assets created for games and other projects.',
        image: './assets/blog-content/blog-thumbnail-my-3d-models.png',
        link: 'my-3d-assets.html'
      },
      {
        title: 'Game Project: Blah Blah Family',
        description: 'A creepy stylized horror adventure game with unique mechanics and story.',
        image: './assets/my-work-content/blah-blah-family-game-thumbnail.png',
        link: 'blahblahfamily.html'
      },
      {
        title: 'Game Project: Slime Defence Game',
        description: 'A fun and strategic tower defense game featuring slimes and creative mechanics.',
        image: './assets/my-work-content/slime-defence-game-thumbnail.png',
        link: 'slime-defence.html'
      },
      {
        title: 'Game Project: Farming Game',
        description: 'A farming simulation game with innovative digging and soil mechanics.',
        image: './assets/blog-content/blog-farming-mechanic/blog-thumbnail-farming-mechanic.png',
        link: 'farming-game.html'
      },
      {
        title: 'Horror Game: Midnight Terrors',
        description: 'A spine-chilling horror experience with atmospheric environments and terrifying encounters.',
        image: './assets/blog-content/blog-thumbnail-my-3-horror-games.png',
        link: 'midnight-terrors.html'
      },
      {
        title: 'RPG Project: Fantasy Realms',
        description: 'An open-world RPG featuring rich storytelling and immersive gameplay mechanics.',
        image: './assets/blog-content/blog-thumbnail-my-experience-in-3d-animation.png',
        link: 'fantasy-realms.html'
      },
      {
        title: 'Action Game: Combat Arena',
        description: 'Fast-paced action combat game with dynamic environments and fluid controls.',
        image: './assets/blog-content/blog-thumbnail-blender-to-unity.png',
        link: 'combat-arena.html'
      },
      {
        title: 'Puzzle Game: Mind Bender',
        description: 'A challenging puzzle game that tests your logic and problem-solving skills.',
        image: './assets/blog-content/blog-thumbnail-my-3d-models.png',
        link: 'mind-bender.html'
      },
      {
        title: 'Simulation: City Builder Pro',
        description: 'A comprehensive city building simulation with realistic economic systems.',
        image: './assets/blog-content/blog-farming-mechanic/blog-thumbnail-farming-mechanic.png',
        link: 'city-builder.html'
      },
      {
        title: 'Adventure: Lost Kingdoms',
        description: 'An epic adventure through mysterious lands filled with secrets and treasures.',
        image: './assets/blog-content/blog-thumbnail-my-experience-in-3d-animation.png',
        link: 'lost-kingdoms.html'
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