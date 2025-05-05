chrome.webNavigation.onCompleted.addListener(
  (details) => {
    if (details.frameId !== 0 || !details.url.startsWith('http')) return;

    const visitedUrl = details.url;

    chrome.storage.local.get(['visitedWebsites'], (result) => {
      let visitedWebsites = result.visitedWebsites || [];

      // Use .some() to check against object URLs
      const alreadyVisited = visitedWebsites.some(
        (website) => website.url === visitedUrl
      );

      if (!alreadyVisited) {
        const newWebsite = {
          url: visitedUrl,
          serial: visitedWebsites.length + 1,
        };
        visitedWebsites.push(newWebsite);
        chrome.storage.local.set({ visitedWebsites });
      }
    });
  },
  { url: [{ schemes: ['http', 'https'] }] }
);
