// Universal Pagination System
// This module provides pagination functionality for any card-based section

// Global Configuration - Change this value to update items per page across the entire site
const PAGINATION_CONFIG = {
    itemsPerPage: 6  // Change this number to 6 (or any other value) to update globally
};

class PaginationManager {
    constructor(options) {
        this.itemsPerPage = options.itemsPerPage || PAGINATION_CONFIG.itemsPerPage;
        this.containerId = options.containerId;
        this.paginationId = options.paginationId;
        this.items = options.items || [];
        this.currentPage = 1;
        this.renderItemFunction = options.renderItemFunction;
        this.onPageChange = options.onPageChange || (() => {});
        
        this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
        
        this.init();
    }
    
    init() {
        this.createPaginationContainer();
        this.renderCurrentPage();
        this.renderPaginationControls();
    }
    
    createPaginationContainer() {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        
        // Create pagination container if it doesn't exist
        let paginationContainer = document.getElementById(this.paginationId);
        if (!paginationContainer) {
            paginationContainer = document.createElement('div');
            paginationContainer.id = this.paginationId;
            paginationContainer.className = 'pagination-container';
            container.parentNode.insertBefore(paginationContainer, container.nextSibling);
        }
    }
    
    updateItems(newItems) {
        this.items = newItems;
        this.totalPages = Math.ceil(this.items.length / this.itemsPerPage);
        this.currentPage = 1; // Reset to first page
        this.renderCurrentPage();
        this.renderPaginationControls();
    }
    
    renderCurrentPage() {
        const container = document.getElementById(this.containerId);
        if (!container) return;
        
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        const pageItems = this.items.slice(startIndex, endIndex);
        
        if (this.renderItemFunction) {
            container.innerHTML = pageItems.map(this.renderItemFunction).join('');
        }
        
        // Call the onPageChange callback
        this.onPageChange(pageItems, this.currentPage);
    }
    
    renderPaginationControls() {
        const paginationContainer = document.getElementById(this.paginationId);
        if (!paginationContainer || this.totalPages <= 1) {
            paginationContainer.style.display = 'none';
            return;
        }
        
        paginationContainer.style.display = 'flex';
        paginationContainer.innerHTML = this.generatePaginationHTML();
        this.addPaginationEventListeners();
    }
    
    generatePaginationHTML() {
        let html = '<div class="pagination">';
        
        // Previous button
        const prevDisabled = this.currentPage === 1 ? 'disabled' : '';
        html += `<button class="pagination-btn pagination-prev ${prevDisabled}" data-page="${this.currentPage - 1}">‹</button>`;
        
        // Page numbers
        const pageNumbers = this.getPageNumbers();
        pageNumbers.forEach(page => {
            if (page === '...') {
                html += '<span class="pagination-ellipsis">...</span>';
            } else {
                const activeClass = page === this.currentPage ? 'active' : '';
                html += `<button class="pagination-btn pagination-number ${activeClass}" data-page="${page}">${page}</button>`;
            }
        });
        
        // Next button
        const nextDisabled = this.currentPage === this.totalPages ? 'disabled' : '';
        html += `<button class="pagination-btn pagination-next ${nextDisabled}" data-page="${this.currentPage + 1}">›</button>`;
        
        html += '</div>';
        return html;
    }
    
    getPageNumbers() {
        const pages = [];
        const maxVisiblePages = 7; // Maximum number of page buttons to show
        
        if (this.totalPages <= maxVisiblePages) {
            // Show all pages if total is small
            for (let i = 1; i <= this.totalPages; i++) {
                pages.push(i);
            }
        } else {
            // Smart pagination with ellipsis
            const startEllipsis = this.currentPage > 4;
            const endEllipsis = this.currentPage < this.totalPages - 3;
            
            // Always show first page
            pages.push(1);
            
            if (startEllipsis) {
                pages.push('...');
            }
            
            // Show pages around current page
            const start = Math.max(2, this.currentPage - 1);
            const end = Math.min(this.totalPages - 1, this.currentPage + 1);
            
            for (let i = start; i <= end; i++) {
                if (i !== 1 && i !== this.totalPages) {
                    pages.push(i);
                }
            }
            
            if (endEllipsis) {
                pages.push('...');
            }
            
            // Always show last page
            if (this.totalPages > 1) {
                pages.push(this.totalPages);
            }
        }
        
        return pages;
    }
    
    addPaginationEventListeners() {
        const paginationContainer = document.getElementById(this.paginationId);
        if (!paginationContainer) return;
        
        paginationContainer.addEventListener('click', (e) => {
            const button = e.target.closest('.pagination-btn');
            if (!button || button.classList.contains('disabled')) return;
            
            const page = parseInt(button.getAttribute('data-page'));
            if (page && page !== this.currentPage) {
                this.goToPage(page);
            }
        });
    }
    
    goToPage(page) {
        if (page < 1 || page > this.totalPages) return;
        
        this.currentPage = page;
        this.renderCurrentPage();
        this.renderPaginationControls();
        
        // Smooth scroll to top of the container
        const container = document.getElementById(this.containerId);
        if (container) {
            container.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
    
    // Public methods
    nextPage() {
        if (this.currentPage < this.totalPages) {
            this.goToPage(this.currentPage + 1);
        }
    }
    
    prevPage() {
        if (this.currentPage > 1) {
            this.goToPage(this.currentPage - 1);
        }
    }
    
    getInfo() {
        return {
            currentPage: this.currentPage,
            totalPages: this.totalPages,
            itemsPerPage: this.itemsPerPage,
            totalItems: this.items.length
        };
    }
}

// Export for use in other modules
window.PaginationManager = PaginationManager;