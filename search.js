// Search Functionality for Visited Websites
document.getElementById('searchButton').addEventListener('click', function () {
    const searchQuery = document.getElementById('searchInput').value.trim();
    searchVisitedWebsites(searchQuery);
  });
  
  // Also trigger search when pressing Enter in the input field
  document.getElementById('searchInput').addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      searchVisitedWebsites(this.value.trim());
    }
  });
  
  // Function to filter and display searched websites
  function searchVisitedWebsites(filter = '') {
    chrome.storage.local.get(['visitedWebsites'], function (result) {
      let visitedWebsites = result.visitedWebsites || [];
      const websitesList = document.getElementById('visitedWebsites');
  
      websitesList.innerHTML = ''; // Clear the list
  
      // Ensure it's an array
      if (!Array.isArray(visitedWebsites)) {
        console.error('Error: visitedWebsites is not an array', visitedWebsites);
        visitedWebsites = [];
      }
  
      // Filter websites based on search input
      const filteredWebsites = visitedWebsites.filter((url) =>
        url.toLowerCase().includes(filter.toLowerCase())
      );
  
      // Display filtered results
      if (filteredWebsites.length === 0) {
        websitesList.innerHTML = '<li>No matching results.</li>';
      } else {
        filteredWebsites.forEach((url) => {
          let listItem = document.createElement('li');
          let link = document.createElement('a');
          link.href = url;
          link.textContent = url;
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          link.title = `Visit: ${url}`;
          
          listItem.appendChild(link);
          websitesList.appendChild(listItem);
        });
      }
    });
  }
  