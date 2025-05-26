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
