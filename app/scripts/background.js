browser.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion);
});



let printUrls = arr => {
  arr.forEach(tab => {
    console.log(tab.url);
  });
};

browser.tabs.query({}).then(printUrls);