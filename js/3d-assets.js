// 3D Assets Page Functionality
let currentAssetIndex = 0;
let filteredAssets = [];
let currentImageType = 'render';
let currentImageTypeIndex = 0;
let assetsPaginationManager;

// Image types array
const imageTypes = ['render', 'basecolor', 'wireframe', 'matcap'];
const imageTypeDisplayNames = {
    'render': 'Render',
    'basecolor': 'Base Color',
    'wireframe': 'Wireframe',
    'matcap': 'Matcap'
};

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the page
    initializeAssets();
    initializeFilters();
    initializeModal();
});

// Initialize and render all assets
function initializeAssets() {
    const assetsGrid = document.getElementById('assets-grid');
    if (!assetsGrid || !window.assetsData) {
        return;
    }

    const assets = Object.values(window.assetsData);
    filteredAssets = assets; // Initialize filtered assets
    
    // Asset card render function
    function renderAssetCard(asset) {
        const backgroundStyle = asset.backgroundImage ? `background-image: url('${asset.backgroundImage}');` : '';
        return `
            <div class="asset-card filtered-in" data-category="${asset.category}" data-asset-id="${asset.id}">
                <div class="asset-image" style="${backgroundStyle}">
                    <img src="${asset.image}" alt="${asset.title}" class="asset-model-image">
                </div>
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
        `;
    }

    // Initialize pagination for assets
    assetsPaginationManager = new PaginationManager({
        containerId: 'assets-grid',
        paginationId: 'assets-pagination',
        items: assets,
        renderItemFunction: renderAssetCard,
        onPageChange: (pageItems, currentPage) => {
            // Re-add click listeners to asset cards
            document.querySelectorAll('.asset-card').forEach(card => {
                card.addEventListener('click', () => {
                    const assetId = card.getAttribute('data-asset-id');
                    openAssetModal(assetId);
                });
            });
        }
    });
}

// Render assets to the grid (deprecated - now handled by pagination)
function renderAssets(assets) {
    // This function is kept for compatibility but pagination handles rendering now
    console.log('renderAssets called with', assets.length, 'assets');
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
    
    // Apply initial backgrounds to asset cards
    setTimeout(() => {
        applyAssetCardBackgrounds();
    }, 100); // Small delay to ensure DOM is ready
}

// Filter assets by category
function filterAssets(category) {
    // Get filtered assets for modal navigation and pagination
    if (category === 'all') {
        filteredAssets = Object.values(window.assetsData);
    } else {
        filteredAssets = Object.values(window.assetsData).filter(asset => asset.category === category);
    }
    
    // Update pagination with filtered assets
    if (assetsPaginationManager) {
        assetsPaginationManager.updateItems(filteredAssets);
        // Apply backgrounds after filtering
        setTimeout(() => {
            applyAssetCardBackgrounds();
        }, 100);
    }
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
    
    // Image type navigation handlers
    const imagePrevBtn = document.getElementById('image-prev');
    const imageNextBtn = document.getElementById('image-next');
    const currentImageTypeBtn = document.getElementById('current-image-type');
    
    // Verify elements exist
    if (!imagePrevBtn || !imageNextBtn || !currentImageTypeBtn) {
        console.error('Image control elements not found:', {
            imagePrevBtn: !!imagePrevBtn,
            imageNextBtn: !!imageNextBtn,
            currentImageTypeBtn: !!currentImageTypeBtn
        });
        return;
    }
    
    // Image navigation functions
    imagePrevBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Previous image clicked');
        currentImageTypeIndex = (currentImageTypeIndex - 1 + imageTypes.length) % imageTypes.length;
        updateImageTypeDisplay();
    });
    
    imageNextBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Next image clicked');
        currentImageTypeIndex = (currentImageTypeIndex + 1) % imageTypes.length;
        updateImageTypeDisplay();
    });
    
    currentImageTypeBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Center button clicked');
        // Optional: clicking the center button could cycle forward too
        currentImageTypeIndex = (currentImageTypeIndex + 1) % imageTypes.length;
        updateImageTypeDisplay();
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

// Test function to verify image controls are working
function testImageControls() {
    console.log('Testing image controls...');
    const imagePrevBtn = document.getElementById('image-prev');
    const imageNextBtn = document.getElementById('image-next');
    const currentImageTypeBtn = document.getElementById('current-image-type');
    
    console.log('Elements found:', {
        imagePrevBtn: !!imagePrevBtn,
        imageNextBtn: !!imageNextBtn,
        currentImageTypeBtn: !!currentImageTypeBtn
    });
    
    if (imagePrevBtn) {
        console.log('imagePrevBtn styles:', window.getComputedStyle(imagePrevBtn).getPropertyValue('pointer-events'));
        console.log('imagePrevBtn z-index:', window.getComputedStyle(imagePrevBtn).getPropertyValue('z-index'));
    }
}

// Open asset modal with detailed information
function openAssetModal(assetId) {
    const asset = window.assetsData[assetId];
    if (!asset) {
        return;
    }

    // Find current asset index in filtered assets
    currentAssetIndex = filteredAssets.findIndex(a => a.id === assetId);
    currentImageType = 'render'; // Reset to render view
    currentImageTypeIndex = 0; // Reset to first image type
    
    const modal = document.getElementById('asset-modal');
    
    // Populate modal content
    populateModalContent(asset);
    
    // Reset and update image type display
    updateImageTypeDisplay();
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Test image controls after modal opens
    setTimeout(() => {
        testImageControls();
    }, 100);
}

// Populate modal with asset data
function populateModalContent(asset) {
    const modalImg = document.getElementById('modal-img');
    const modalImageContainer = document.querySelector('.modal-image');
    
    modalImg.src = getImagePath(asset, currentImageType);
    modalImg.alt = asset.title;
    
    // Apply background to modal image container
    if (asset.backgroundImage) {
        modalImageContainer.style.backgroundImage = `url('${asset.backgroundImage}')`;
        modalImageContainer.style.backgroundSize = 'cover';
        modalImageContainer.style.backgroundPosition = 'center';
        modalImageContainer.style.backgroundRepeat = 'no-repeat';
    } else {
        modalImageContainer.style.backgroundImage = '';
    }
    
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
    
    // Reset image type display to "Render"
    currentImageTypeIndex = 0;
    updateImageTypeDisplay();
    
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

// Update image type display for new button design
function updateImageTypeDisplay() {
    const typeName = imageTypes[currentImageTypeIndex];
    const currentImageTypeBtn = document.getElementById('current-image-type');
    if (currentImageTypeBtn) {
        currentImageTypeBtn.textContent = imageTypeDisplayNames[typeName];
    }
    currentImageType = typeName;
    
    // Update the modal image
    const currentAsset = filteredAssets[currentAssetIndex];
    if (currentAsset) {
        const modalImg = document.getElementById('modal-img');
        modalImg.src = getImagePath(currentAsset, currentImageType);
        
        // Keep the background consistent for all image types
        const modalImageContainer = document.querySelector('.modal-image');
        if (currentAsset.backgroundImage) {
            modalImageContainer.style.backgroundImage = `url('${currentAsset.backgroundImage}')`;
            modalImageContainer.style.backgroundSize = 'cover';
            modalImageContainer.style.backgroundPosition = 'center';
            modalImageContainer.style.backgroundRepeat = 'no-repeat';
        }
    }
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