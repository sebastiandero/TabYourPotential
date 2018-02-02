browser.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion)
});

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

let reloadTabs = (newContext) => {
  let storageWrapper = getStorageContext();

  if (storageWrapper) {
    saveForContext(currentContext);
    removeAllTabs().then(tempTab => {
      loadTabsFromContext(newContext).then((val) => {
        browser.tabs.remove(tempTab.id);
      });
    });
  }
};

let removeAllTabs = () => {
  return new Promise((resolve, reject) => {
    browser.tabs.query({}).then(arr => {
      browser.tabs.create({})
      .then((tempTab) => {
        browser.tabs.remove(arr.map(tab => tab.id))
        .catch(reject)
        .then(() => resolve(tempTab));
      });
    });
  });
}

let loadTabsFromContext = (contextName) => {
  return new Promise((resolve,reject)=> {
    let storageWrapper = getStorageContext();

    if(storageWrapper.currentContext) {
      let currContext = storageWrapper.currentContext;
      let tabs = storageWrapper.contexts[currContext];

      let pr = new Promise((resolve, reject) => {
        tabs.forEach(tab => {
          pr = pr.then( _ =>
          browser.tabs.create({
            url: tab.url
          }));
        });
        pr = pr.then(resolve);
      });
    }
  });
}