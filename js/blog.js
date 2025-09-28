// Blog functionality - handles display and navigation

// Initialize blog when page loads
document.addEventListener('DOMContentLoaded', function() {
  initializeBlog();
  
  // Handle browser back/forward buttons
  window.addEventListener('popstate', function(event) {
    if (event.state && event.state.postId) {
      showBlogPost(event.state.postId, false);
    } else {
      showBlogListing(false);
    }
  });

  // Check if we should show a specific post based on URL
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('post');
  if (postId) {
    showBlogPost(postId, false);
  }
});

// Initialize the blog system
function initializeBlog() {
  generateBlogCards();
  console.log("Blog system initialized");
}

// Generate blog cards from data
function generateBlogCards() {
  const blogGrid = document.getElementById('blog-grid');
  if (!blogGrid) return;

  const posts = getAllBlogPosts();
  
  blogGrid.innerHTML = posts.map(post => {
    return `
    <article class="blog-card" onclick="showBlogPost('${post.id}')">
      <div class="blog-card-image" style="background-image: url(${post.image}); background-size: cover; background-position: center;"></div>
      <div class="blog-content">
        <div class="blog-meta">
          <span class="blog-date">${post.date}</span>
          <span class="read-time">${post.readTime}</span>
        </div>
        <h3>${post.title}</h3>
        <p>${post.description}</p>
        <div class="blog-tags">
          ${post.tags.map(tag => `<span class="blog-tag">${tag}</span>`).join('')}
        </div>
      </div>
    </article>
  `;
  }).join('');
}

// Show individual blog post
function showBlogPost(postId, updateHistory = true) {
  console.log('Showing post:', postId);
  const post = getBlogPost(postId);
  if (!post) {
    console.error(`Blog post with id "${postId}" not found`);
    return;
  }
  console.log('Post data:', post);

  // Update URL and browser history
  if (updateHistory) {
    const url = new URL(window.location);
    url.searchParams.set('post', postId);
    window.history.pushState({ postId: postId }, '', url);
  }

  // Hide blog listing and show blog post
  document.getElementById('blog-listing').style.display = 'none';
  const blogPost = document.getElementById('blog-post');
  blogPost.style.display = 'block';

  // Update the meta information
  blogPost.querySelector('.date').textContent = post.date;
  blogPost.querySelector('.read-time').textContent = post.readTime;
  blogPost.querySelector('.author').textContent = post.author;

  // Update blog post content
  document.getElementById('post-image').style.backgroundImage = `url(${post.image})`;

  // Populate post data
  document.getElementById('post-title').textContent = post.title;
  document.getElementById('post-content').innerHTML = post.content;

  // Populate tags
  const tagsContainer = document.getElementById('post-tags');
  tagsContainer.innerHTML = post.tags.map(tag => 
    `<span class="blog-tag">${tag}</span>`
  ).join('');

  // Update page title
  document.title = `${post.title} - MHZE Blog`;

  // Scroll to top
  window.scrollTo(0, 0);
}

// Show blog listing page
function showBlogListing(updateHistory = true) {
  // Update URL and browser history
  if (updateHistory) {
    const url = new URL(window.location);
    url.searchParams.delete('post');
    window.history.pushState({ postId: null }, '', url);
  }

  document.getElementById('blog-post').style.display = 'none';
  document.getElementById('blog-listing').style.display = 'block';
  
  // Reset page title
  document.title = 'MHZE - Blog';
  
  // Scroll to top
  window.scrollTo(0, 0);
}

// Handle browser back/forward navigation
window.addEventListener('popstate', function(event) {
  if (event.state && event.state.postId) {
    showBlogPost(event.state.postId);
  } else {
    showBlogListing();
  }
});

// Add history state when showing a post
function showBlogPostWithHistory(postId) {
  showBlogPost(postId);
  history.pushState({ postId: postId }, '', `#${postId}`);
}

// Check URL on page load for direct post links
function checkUrlOnLoad() {
  const hash = window.location.hash.substring(1);
  if (hash && getBlogPost(hash)) {
    showBlogPost(hash);
  }
}

// Enhanced initialization
function initializeBlog() {
  generateBlogCards();
  checkUrlOnLoad();
  console.log("Blog system initialized");
}

// Smooth scrolling for navigation links (inherited from main.js pattern)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

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