browser.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion)
})

let currentContext = "testContext";

let getStorageContext = () => {
  return JSON.parse(localStorage.getItem('TYP_StorageWrapper'));
}

let setStorageContext = storageWrapper => {
  localStorage.setItem('TYP_StorageWrapper', JSON.stringify(storageWrapper));
}

let saveTabs = (contextName) => {
  browser.tabs.query({}).then(arr => saveForContext(arr, contextName));
};

let saveForContext = (tabsToSave, contextName) => {

  let tabsContext = {
    tabs: tabsToSave,
    name: contextName
  };

  let storageWrapper = getStorageContext();

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
  let storageWrapper = getStorageContext();

  if (storageWrapper) {
    saveForContext(currentContext);
    removeAllTabs().then(tempTab => {
      loadTabsFromContext();
      browser.tabs.remove(tempTab.id);
    });
  }
};

let removeAllTabs = () => {
  return new Promise((resolve, reject) => {
    browser.tabs.query({}).then(arr => {
      return browser.tabs.create({});
    }).catch(reject)
    .then((tempTab) => {
      browser.tabs.remove(arr. map(tab => tab.id))
      .catch(reject)
      .then(() => resolve(tempTab));
    });
  });
}

let loadTabsFromContext = (contextName) => {
  return new Promise((resolve,reject)=> {
    let storageWrapper = getStorageContext();
  });
}