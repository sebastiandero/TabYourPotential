browser.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion)
})

let saveTabs = (contextName) => {
  browser.tabs.query({}).then(arr => saveForContext(arr, contextName));
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
  } else {
    storageWrapper = {
      contexts: {}
    };

    storageWrapper.contexts[contextName] = tabsToSave;
  }

  localStorage.setItem('TYP_StorageWrapper', JSON.stringify(storageWrapper));
}

let reloadTabs = () => {
  let storageWrapper = JSON.parse(localStorage.getItem('TYP_StorageWrapper'));

  if (storageWrapper) {
    browser.tabs
  }
};

let removeAllTabs = () => {
  return new Promise((resolve, reject) => {

    browser.tabs.query({}).then(arr => {
      browser.tabs.discard(arr.map(tab => tab.id));
    });
  });
}
