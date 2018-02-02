browser.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion);
});

browser.tabs.query({}).then(console.log)