function searchVisitedWebsites(filter = '') {
  chrome.storage.local.get('visitedWebsites', (result) => {
    const visitedWebsites = Array.isArray(result.visitedWebsites)
      ? result.visitedWebsites
      : [];

    const websitesList = document.getElementById('visitedWebsites');
    websitesList.innerHTML = ''; // Clear current list

    const filtered = visitedWebsites.filter(
      (entry) =>
        typeof entry.url === 'string' &&
        entry.url.toLowerCase().includes(filter.toLowerCase())
    );

    if (filtered.length === 0) {
      websitesList.innerHTML = '<li>No matching results.</li>';
    } else {
      filtered.forEach((entry) => {
        const li = document.createElement('li');
        const link = document.createElement('a');
        link.href = entry.url;
        link.textContent = `${entry.serial}. ${entry.url}`;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.title = `Visit: ${entry.url}`;

        li.appendChild(link);

        // Add formatted timestamp
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
          timeSpan.style.fontSize = '0.85em';
          timeSpan.style.color = '#666';

          li.appendChild(timeSpan);
        }

        websitesList.appendChild(li);
      });
    }
  });
}
(function () {
  const currentUrl = window.location.href;

  chrome.storage.local.get(['visitedWebsites'], function (result) {
    const visitedWebsites = Array.isArray(result.visitedWebsites)
      ? result.visitedWebsites
      : [];

    const alreadyVisited = visitedWebsites.some(
      (site) => site.url === currentUrl
    );

    if (!alreadyVisited) {
      visitedWebsites.push({
        serial: visitedWebsites.length + 1,
        url: currentUrl,
        timestamp: new Date().toISOString(),
      });

      chrome.storage.local.set({ visitedWebsites }, () => {
        console.log('Saved:', currentUrl);
      });
    }
  });
})();
