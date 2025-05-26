document.addEventListener('DOMContentLoaded', function () {
  // Retrieve visited websites from storage once
  chrome.storage.local.get('visitedWebsites', (result) => {
    const visitedWebsites = Array.isArray(result.visitedWebsites)
      ? result.visitedWebsites
      : [];

    updateVisitedCount(visitedWebsites);
    displayVisitedWebsites(visitedWebsites);
    setupSearch(visitedWebsites);
  });

  // Update visited websites count
  function updateVisitedCount(visitedWebsites) {
    const visitedCountElement = document.getElementById('visitedCount');
    if (visitedCountElement) {
      visitedCountElement.textContent = `Total Visited Websites: ${visitedWebsites.length}`;
    } else {
      console.warn('visitedCount element not found');
    }
  }

  // Display visited websites list
  function displayVisitedWebsites(visitedWebsites) {
    const websitesList = document.getElementById('visitedWebsites');
    if (!websitesList) return;

    websitesList.innerHTML = ''; // Clear current list

    if (visitedWebsites.length === 0) {
      websitesList.innerHTML = '<li>No websites visited yet.</li>';
      return;
    }

    visitedWebsites.forEach((website) => {
      let listItem = document.createElement('li');
      let link = document.createElement('a');
      link.href = website.url;
      link.textContent = website.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.title = `Visit: ${website.url}`;

      listItem.appendChild(link);

      // Format and append the timestamp if it exists
      if (website.timestamp) {
        const date = new Date(website.timestamp);
        const options = {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true,
        };
        const formattedDate = date.toLocaleString('en-US', options);

        const timeInfo = document.createElement('span');
        timeInfo.textContent = ` — Visited: ${formattedDate}`;
        timeInfo.style.fontSize = '0.9em';
        timeInfo.style.color = '#555';
        listItem.appendChild(timeInfo);
      }

      websitesList.appendChild(listItem);
    });
  }

  // Setup search input functionality
  function setupSearch(visitedWebsites) {
    const searchInput = document.getElementById('searchInput');
    const websitesList = document.getElementById('visitedWebsites');

    if (!searchInput || !websitesList) return;

    searchInput.addEventListener('input', function () {
      const query = searchInput.value.toLowerCase();
      const filteredWebsites = visitedWebsites.filter((website) =>
        website.url.toLowerCase().includes(query)
      );

      websitesList.innerHTML = ''; // Clear current list

      if (filteredWebsites.length === 0) {
        websitesList.innerHTML = '<li>No matching details found.</li>';
        return;
      }

      filteredWebsites.forEach((website) => {
        let listItem = document.createElement('li');
        let link = document.createElement('a');
        link.href = website.url;
        link.textContent = website.url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.title = `Visit: ${website.url}`;

        listItem.appendChild(link);
        websitesList.appendChild(listItem);
      });
    });
  }

  // Download button functionality
  const downloadButton = document.getElementById('downloadButton');
  if (downloadButton) {
    downloadButton.addEventListener('click', function () {
      chrome.storage.local.get(['visitedWebsites'], function (result) {
        const visitedWebsites = Array.isArray(result.visitedWebsites)
          ? result.visitedWebsites
          : [];

        if (visitedWebsites.length === 0) {
          alert('No websites visited yet to download.');
          return;
        }

        let fileContent = 'Visited Website Tracker\n';
        fileContent += '===================\n';
        fileContent += 'S.No           Website URL\n';
        fileContent += '-------        --------------\n';

        visitedWebsites.forEach((website, index) => {
          fileContent += `${index + 1}   \t   ${website.url}\n`;
        });

        const currentDate = new Date();
        const day = String(currentDate.getDate()).padStart(2, '0');
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const year = currentDate.getFullYear();
        const formattedDate = `${day}_${month}_${year}`;

        const filename = `visited_websites_${formattedDate}.txt`;
        const blob = new Blob([fileContent], { type: 'text/plain' });

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = filename;
        link.click();

        // Clean up the URL object after download
        URL.revokeObjectURL(link.href);
      });
    });
  }

  // Clear button functionality
  const clearButton = document.getElementById('clearButton');
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      chrome.storage.local.set({ visitedWebsites: [] }, () => {
        updateVisitedCount([]);
        displayVisitedWebsites([]);
        // Clear search input
        const searchInput = document.getElementById('searchInput');
        if (searchInput) searchInput.value = '';
      });
    });
  }
});
