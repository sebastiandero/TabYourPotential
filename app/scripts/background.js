browser.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion);
});

let saveTabs = () => {
  browser.tabs.query({}).then(save);
};

let loadTabs = () => {
  tabs.forEach(tab => {
    browser.tabs.create({url: tab.url});
  });
};

let save = (tabsToSave) => {

  let tabsContext = {
    tabs: tabsToSave,
    name: ""
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
