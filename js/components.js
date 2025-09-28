// Load shared components
async function loadComponent(elementId, componentPath) {
  try {
    console.log(`Loading component: ${componentPath} into ${elementId}`);
    const response = await fetch(componentPath);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const html = await response.text();
    const element = document.getElementById(elementId);
    
    if (!element) {
      throw new Error(`Element with id "${elementId}" not found`);
    }
    
    element.innerHTML = html;
    console.log(`Successfully loaded ${componentPath}`);

    // Initialize mobile menu after nav is loaded
    if (elementId === 'nav-placeholder') {
      initMobileMenu();
    }
  } catch (error) {
    console.error(`Error loading component ${componentPath}:`, error);
  }
}

// Initialize mobile menu functionality
function initMobileMenu() {
  const menuButton = document.querySelector('.mobile-menu-button');
  const navLinks = document.querySelector('.nav-links');
  
  if (!menuButton || !navLinks) return;

  menuButton.addEventListener('click', () => {
    menuButton.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menuButton.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !menuButton.contains(e.target)) {
      menuButton.classList.remove('active');
      navLinks.classList.remove('active');
    }
  });
}

// Load all components when page loads
document.addEventListener('DOMContentLoaded', async function() {
  console.log('DOM loaded, loading components...');
  
  await loadComponent('nav-placeholder', 'components/nav.html');
  await loadComponent('footer-placeholder', 'components/footer.html');
  
  // Set active nav based on current page
  setActiveNav();
  
  console.log('Components loading complete');
});

function setActiveNav() {
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-links a');
  
  console.log(`Current page: ${currentPage}, Found ${navLinks.length} nav links`);
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (
      (currentPage === 'index.html' || currentPage === '') && link.getAttribute('href') === 'index.html' ||
      currentPage === 'blog.html' && link.getAttribute('href') === 'blog.html'
    ) {
      link.classList.add('active');
      console.log(`Set active nav for: ${link.getAttribute('href')}`);
    }
  });
}