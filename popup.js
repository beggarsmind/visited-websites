// Ensure download functionality works when the button is clicked
document
  .getElementById('downloadButton')
  .addEventListener('click', function () {
    chrome.storage.local.get(['visitedWebsites'], function (result) {
      const visitedWebsites = result.visitedWebsites || [];

      if (visitedWebsites.length === 0) {
        alert('No websites visited yet to download.');
        return;
      }

      // Prepare data with custom formatting
      let fileContent = 'Visited Website Tracker\n';
      fileContent += '===================\n';
      fileContent += 'S.No           Website URL\n';
      fileContent += '-------           --------------\n';

      // Loop through the visited websites and append to content
      visitedWebsites.forEach((website) => {
        fileContent += `${website.serial}   \t   ${website.url}\n`;
      });

      // Get the current date in DD_MM_YYYY format
      const currentDate = new Date();
      const day = String(currentDate.getDate()).padStart(2, '0'); // Add leading zero if day < 10
      const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Add leading zero if month < 10
      const year = currentDate.getFullYear();

      // Format the date as DD_MM_YYYY
      const formattedDate = `${day}_${month}_${year}`;

      // Dynamic filename using the current date
      const filename = `visited_websites_${formattedDate}.txt`;

      // Create a blob from the formatted text
      const blob = new Blob([fileContent], { type: 'text/plain' });

      // Create a link element for downloading
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename; // Use dynamic filename
      link.click(); // Trigger the download
    });
  });

// Fetch and display visited websites
function displayVisitedWebsites() {
  chrome.storage.local.get(['visitedWebsites'], function (result) {
    const visitedWebsites = result.visitedWebsites || [];
    const websitesList = document.getElementById('visitedWebsites');
    const visitedCountElement = document.querySelector('.visited_count span'); // Element for visited count

    websitesList.innerHTML = ''; // Clear current list

    // Display visited count
    visitedCountElement.textContent = `Total Visited Websites: ${visitedWebsites.length}`;

    if (visitedWebsites.length === 0) {
      websitesList.innerHTML = '<li>No websites visited yet.</li>';
    } else {
      visitedWebsites.forEach((website) => {
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
    }
  });
}

// Clear the list of visited websites
document.getElementById('clearButton').addEventListener('click', function () {
  chrome.storage.local.set({ visitedWebsites: [] }, function () {
    displayVisitedWebsites(); // Refresh the list
  });
});

// Load visited websites when popup opens
window.onload = displayVisitedWebsites;
