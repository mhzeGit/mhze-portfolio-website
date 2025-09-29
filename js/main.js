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
  const portfolioGrid = document.querySelector('.portfolio-grid');
  if (!portfolioGrid || !window.blogPosts) return;

  // Get all blog posts
  const posts = Object.keys(window.blogPosts).map(id => ({
    id,
    ...window.blogPosts[id]
  }));

  // Only show first 6 posts on home page
  const displayPosts = posts.slice(0, 6);

  // Generate cards HTML
  portfolioGrid.innerHTML = displayPosts.map(post => `
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

  // Add "More Blogs?" button if there are more than 6 posts
  if (posts.length > 6) {
    const moreButton = document.createElement('div');
    moreButton.className = 'more-blogs-container';
    moreButton.innerHTML = '<a href="blog.html" class="btn btn-primary">More Blogs?</a>';
    portfolioGrid.parentElement.appendChild(moreButton);
  }

  console.log(`Generated ${displayPosts.length} portfolio cards from blog data`);
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