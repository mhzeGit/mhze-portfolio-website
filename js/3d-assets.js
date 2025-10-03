// 3D Assets Page Functionality
let currentAssetIndex = 0;
let filteredAssets = [];
let currentImageType = 'render';

document.addEventListener('DOMContentLoaded', function() {
    console.log('3D Assets page initialized');
    
    // Initialize the page
    initializeAssets();
    initializeFilters();
    initializeModal();
});

// Initialize and render all assets
function initializeAssets() {
    const assetsGrid = document.getElementById('assets-grid');
    if (!assetsGrid || !window.assetsData) {
        console.error('Assets grid or data not found');
        return;
    }

    const assets = Object.values(window.assetsData);
    filteredAssets = assets; // Initialize filtered assets
    renderAssets(assets);
}

// Render assets to the grid
function renderAssets(assets) {
    const assetsGrid = document.getElementById('assets-grid');
    
    assetsGrid.innerHTML = assets.map(asset => `
        <div class="asset-card filtered-in" data-category="${asset.category}" data-asset-id="${asset.id}">
            <div class="asset-image" style="background-image: url('${asset.image}')"></div>
            <div class="asset-content">
                <div class="asset-header">
                    <div class="asset-category">${getCategoryDisplayName(asset.category)}</div>
                    <h3 class="asset-title">${asset.title}</h3>
                </div>
                <p class="asset-description">${asset.description}</p>
                <div class="asset-tags">
                    ${asset.tags.map(tag => `<span class="asset-tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');

    // Add click listeners to asset cards
    document.querySelectorAll('.asset-card').forEach(card => {
        card.addEventListener('click', () => {
            const assetId = card.getAttribute('data-asset-id');
            openAssetModal(assetId);
        });
    });
}

// Get display name for categories
function getCategoryDisplayName(category) {
    const categoryNames = {
        'characters': 'Characters',
        'props': 'Props',
        'environments': 'Environments',
        'weapons': 'Weapons'
    };
    return categoryNames[category] || category;
}

// Initialize filter functionality
function initializeFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter assets
            const filterCategory = button.getAttribute('data-filter');
            filterAssets(filterCategory);
        });
    });
}

// Filter assets by category
function filterAssets(category) {
    const assetCards = document.querySelectorAll('.asset-card');
    
    // Get filtered assets for modal navigation
    if (category === 'all') {
        filteredAssets = Object.values(window.assetsData);
    } else {
        filteredAssets = Object.values(window.assetsData).filter(asset => asset.category === category);
    }
    
    // Step 1: Hide all cards first
    assetCards.forEach(card => {
        card.classList.add('filtered-out');
        card.classList.remove('filtered-in');
    });
    
    // Step 2: Wait for hide animation, then show relevant cards
    setTimeout(() => {
        assetCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            if (category === 'all' || cardCategory === category) {
                card.classList.remove('filtered-out');
                card.classList.add('filtered-in');
            }
        });
    }, 200); // Increased delay for smoother transition
}

// Initialize modal functionality
function initializeModal() {
    const modal = document.getElementById('asset-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');
    const modalPrev = document.getElementById('modal-prev');
    const modalNext = document.getElementById('modal-next');
    
    // Close modal handlers
    modalClose.addEventListener('click', closeAssetModal);
    modalOverlay.addEventListener('click', closeAssetModal);
    
    // Navigation handlers
    modalPrev.addEventListener('click', showPreviousAsset);
    modalNext.addEventListener('click', showNextAsset);
    
    // Image type buttons
    const imageButtons = document.querySelectorAll('.image-btn');
    imageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const imageType = btn.getAttribute('data-type');
            switchImageType(imageType);
            
            // Update active button
            imageButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === 'Escape') {
                closeAssetModal();
            } else if (e.key === 'ArrowLeft') {
                showPreviousAsset();
            } else if (e.key === 'ArrowRight') {
                showNextAsset();
            }
        }
    });
}

// Open asset modal with detailed information
function openAssetModal(assetId) {
    const asset = window.assetsData[assetId];
    if (!asset) {
        console.error('Asset not found:', assetId);
        return;
    }

    // Find current asset index in filtered assets
    currentAssetIndex = filteredAssets.findIndex(a => a.id === assetId);
    currentImageType = 'render'; // Reset to render view
    
    const modal = document.getElementById('asset-modal');
    
    // Populate modal content
    populateModalContent(asset);
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Populate modal with asset data
function populateModalContent(asset) {
    document.getElementById('modal-img').src = getImagePath(asset, currentImageType);
    document.getElementById('modal-img').alt = asset.title;
    document.getElementById('modal-title').textContent = asset.title;
    document.getElementById('modal-category').textContent = getCategoryDisplayName(asset.category);
    document.getElementById('modal-description').textContent = asset.detailedDescription || asset.description;
    document.getElementById('modal-polycount').textContent = asset.polyCount;
    document.getElementById('modal-textures').textContent = asset.textureResolution;
    document.getElementById('modal-engines').textContent = asset.engines;
    
    // Populate tags
    const modalTags = document.getElementById('modal-tags');
    modalTags.innerHTML = asset.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('');
    
    // Set up action buttons
    const sketchfabBtn = document.getElementById('modal-sketchfab');
    const downloadBtn = document.getElementById('modal-download');
    
    sketchfabBtn.href = asset.sketchfabUrl;
    
    downloadBtn.onclick = () => {
        if (asset.downloadUrl && asset.downloadUrl !== '#') {
            window.open(asset.downloadUrl, '_blank');
        } else {
            showDownloadMessage();
        }
    };
    
    // Reset image type buttons
    document.querySelectorAll('.image-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelector('.image-btn[data-type="render"]').classList.add('active');
    
    // Update navigation arrow states
    updateNavigationArrows();
}

// Update navigation arrow states
function updateNavigationArrows() {
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');
    
    if (filteredAssets.length <= 1) {
        prevBtn.classList.remove('visible');
        nextBtn.classList.remove('visible');
        prevBtn.disabled = true;
        nextBtn.disabled = true;
    } else {
        prevBtn.classList.add('visible');
        nextBtn.classList.add('visible');
        prevBtn.disabled = false;
        nextBtn.disabled = false;
    }
}

// Close asset modal
function closeAssetModal() {
    const modal = document.getElementById('asset-modal');
    const prevBtn = document.getElementById('modal-prev');
    const nextBtn = document.getElementById('modal-next');
    
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    
    // Hide navigation arrows when modal is closed
    prevBtn.classList.remove('visible');
    nextBtn.classList.remove('visible');
}

// Navigate to previous asset
function showPreviousAsset() {
    if (filteredAssets.length <= 1) return;
    
    currentAssetIndex = (currentAssetIndex - 1 + filteredAssets.length) % filteredAssets.length;
    const asset = filteredAssets[currentAssetIndex];
    populateModalContent(asset);
}

// Navigate to next asset
function showNextAsset() {
    if (filteredAssets.length <= 1) return;
    
    currentAssetIndex = (currentAssetIndex + 1) % filteredAssets.length;
    const asset = filteredAssets[currentAssetIndex];
    populateModalContent(asset);
}

// Switch image type (render, wireframe, matcap, basecolor)
function switchImageType(imageType) {
    currentImageType = imageType;
    const currentAsset = filteredAssets[currentAssetIndex];
    document.getElementById('modal-img').src = getImagePath(currentAsset, imageType);
}

// Get image path based on type
function getImagePath(asset, imageType) {
    if (imageType === 'render' || !asset.images || !asset.images[imageType]) {
        return asset.image; // Default to main image
    }
    return asset.images[imageType];
}

// Show download message (placeholder for now)
function showDownloadMessage() {
    alert('Download functionality coming soon! For now, please contact me directly for asset downloads.');
}

// Utility function to get all assets by category
function getAssetsByCategory(category) {
    if (category === 'all') {
        return Object.values(window.assetsData);
    }
    return Object.values(window.assetsData).filter(asset => asset.category === category);
}

// Search functionality (can be added later)
function searchAssets(query) {
    const assets = Object.values(window.assetsData);
    return assets.filter(asset => 
        asset.title.toLowerCase().includes(query.toLowerCase()) ||
        asset.description.toLowerCase().includes(query.toLowerCase()) ||
        asset.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );
}

console.log('3D Assets JavaScript loaded successfully');