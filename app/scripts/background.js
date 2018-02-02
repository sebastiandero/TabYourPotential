browser.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion);
});

let saveTabs = () => {
  browser.tabs.query({}).then(arr => saveForContext(arr, "testContext"));
};

let loadTabs = () => {
  tabs.forEach(tab => {
    browser.tabs.create({url: tab.url});
  });
};

let saveForContext = (tabs, context) => {

  let tabsContext = {
    tabs: tabsToSave,
    name: context
  };

  let storageWrapper = {
      tabContexts: [
        tabsContext
      ]
  };

  localStorage.setItem('TYP_StorageWrapper', JSON.stringify(storageWrapper));
}

let reloadTabs = () => {
  let tabsContext = JSON.parse(localStorage.getItem('savedTabs'));
  console.log(tabsContext);
};
