(function () {
  // Category filtering
  const categoryTabs = document.querySelectorAll('.category-tab');
  const listingCards = document.querySelectorAll('.listing-card');
  const listingsCount = document.querySelector('.listings-count strong');

  if (categoryTabs.length > 0) {
    categoryTabs.forEach(tab => {
      tab.addEventListener('click', function () {
        // Remove active class from all tabs
        categoryTabs.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked tab
        this.classList.add('active');
        
        // Get selected category
        const selectedCategory = this.getAttribute('data-category');
        
        // Filter listings
        let visibleCount = 0;
        listingCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          
          if (selectedCategory === 'all' || cardCategory === selectedCategory) {
            card.style.display = 'block';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });
        
        // Update count
        if (listingsCount) {
          listingsCount.textContent = `${visibleCount} result${visibleCount !== 1 ? 's' : ''}`;
        }
      });
    });
  }

  // Filter pills (Bedrooms)
  const filterPills = document.querySelectorAll('.filter-pill');
  if (filterPills.length > 0) {
    filterPills.forEach(pill => {
      pill.addEventListener('click', function () {
        this.classList.toggle('active');
      });
    });
  }

  // Reset filters
  const resetBtn = document.querySelector('.btn-filter-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      // Reset checkboxes
      document.querySelectorAll('.filter-checkbox input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
      });
      
      // Reset range inputs
      document.querySelectorAll('.filter-range-input').forEach(input => {
        input.value = '';
      });
      
      // Reset pills
      filterPills.forEach(pill => {
        pill.classList.remove('active');
      });
      
      // Reset select
      const governorateSelect = document.querySelector('.filter-select');
      if (governorateSelect) {
        governorateSelect.value = '';
      }
      
      // Show all listings
      listingCards.forEach(card => {
        card.style.display = 'block';
      });
      
      // Reset category to "All"
      categoryTabs.forEach(tab => {
        if (tab.getAttribute('data-category') === 'all') {
          tab.classList.add('active');
        } else {
          tab.classList.remove('active');
        }
      });
      
      if (listingsCount) {
        listingsCount.textContent = `${listingCards.length} result${listingCards.length !== 1 ? 's' : ''}`;
      }
    });
  }

  // Apply filters
  const applyBtn = document.querySelector('.btn-filter-apply');
  if (applyBtn) {
    applyBtn.addEventListener('click', function () {
      const activeTab = document.querySelector('.category-tab.active');
      const selectedCategory = activeTab ? activeTab.getAttribute('data-category') : 'all';
      
      const selectedTypes = [];
      document.querySelectorAll('.filter-checkbox input[type="checkbox"]:checked').forEach(checkbox => {
        selectedTypes.push(checkbox.value);
      });
      
      alert('Filters applied! Category: ' + selectedCategory);
    });
  }

  // Search functionality
  const searchInput = document.getElementById('listingsSearch');
  const searchBtn = document.querySelector('.listings-search-btn');
  
  if (searchBtn && searchInput) {
    searchBtn.addEventListener('click', function () {
      const searchTerm = searchInput.value.trim().toLowerCase();
      
      if (!searchTerm) {
        listingCards.forEach(card => {
          card.style.display = 'block';
        });
        return;
      }
      
      let visibleCount = 0;
      listingCards.forEach(card => {
        const title = card.querySelector('.listing-title').textContent.toLowerCase();
        const location = card.querySelector('.listing-location').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || location.includes(searchTerm)) {
          card.style.display = 'block';
          visibleCount++;
        } else {
          card.style.display = 'none';
        }
      });
      
      if (listingsCount) {
        listingsCount.textContent = `${visibleCount} result${visibleCount !== 1 ? 's' : ''}`;
      }
    });
    
    searchInput.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        searchBtn.click();
      }
    });
  }
})();
