console.log('DOM Loaded, running searchVisitedWebsites()');
document.addEventListener('DOMContentLoaded', () => {
  searchVisitedWebsites(); // Run this when popup opens
});

// Search Button Click
document.getElementById('searchButton').addEventListener('click', function () {
  const searchQuery = document.getElementById('searchInput').value.trim();
  searchVisitedWebsites(searchQuery);
});

// Enter key triggers search
document
  .getElementById('searchInput')
  .addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
      searchVisitedWebsites(this.value.trim());
    }
  });

// Main search function (supports timestamp format)
function searchVisitedWebsites(filter = '') {
  chrome.storage.local.get(['visitedWebsites'], function (result) {
    console.log('Storage result:', result);
    let visitedWebsites = result.visitedWebsites || [];
    console.log('Visited websites:', visitedWebsites);

    const websitesList = document.getElementById('visitedWebsites');
    websitesList.innerHTML = '';

    if (!Array.isArray(visitedWebsites)) {
      console.error('visitedWebsites is not an array');
      let visitedWebsites = [];
    }

    const filteredWebsites = visitedWebsites.filter(
      (entry) =>
        typeof entry.url === 'string' &&
        entry.url.toLowerCase().includes(filter.toLowerCase())
    );

    console.log('Filtered websites:', filteredWebsites);

    if (filteredWebsites.length === 0) {
      websitesList.innerHTML = '<li>No matching results.</li>';
      return;
    }

    filteredWebsites.forEach((entry) => {
      let listItem = document.createElement('li');
      let link = document.createElement('a');

      link.href = entry.url;
      link.textContent = entry.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.title = `Visit: ${entry.url}`;

      listItem.appendChild(link);

      if (entry.timestamp) {
        const date = new Date(entry.timestamp);
        const formatted = date.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        });
        const timeSpan = document.createElement('span');
        timeSpan.textContent = ` — Visited: ${formatted}`;
        timeSpan.style.color = '#666';
        timeSpan.style.fontSize = '0.85em';
        listItem.appendChild(timeSpan);
      }

      websitesList.appendChild(listItem);
    });
  });
}
document.addEventListener('DOMContentLoaded', () => {
  searchVisitedWebsites();
});
