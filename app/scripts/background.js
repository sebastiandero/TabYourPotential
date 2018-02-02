browser.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion);
});

let saveTabs = () => {
  browser.tabs.query({}).then(arr => saveForContext(arr, "testContext"));
};

let loadTabs = () => {
  tabs.forEach(tab => {
    browser.tabs.create({
      url: tab.url
    });
  });
};

let saveForContext = (tabsToSave, contextName) => {

  let tabsContext = {
    tabs: tabsToSave,
    name: contextName
  };

  let storageWrapper = JSON.parse(localStorage.getItem('TYP_StorageWrapper'));

  if (storageWrapper) {
    storageWrapper.contexts[contextName] = tabsToSave;
  }
  else {
    storageWrapper = {
      contexts: {}
    };

    storageWrapper.contexts[contextName] = tabsToSave;
  }
 
  localStorage.setItem('TYP_StorageWrapper', JSON.stringify(storageWrapper));
}

let reloadTabs = () => {
  let tabsContext = JSON.parse(localStorage.getItem('savedTabs'));
  console.log(tabsContext);
};