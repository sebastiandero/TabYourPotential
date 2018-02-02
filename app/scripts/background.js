browser.runtime.onInstalled.addListener((details) => {
  console.log('previousVersion', details.previousVersion);
});

let tabs = Array();

let save = arr => {
  tabs.forEach(element => {
    console.log(element);
  });
  tabs = arr;
};

let saveTabs = () => {
  browser.tabs.query({}).then(save);
};

let loadTabs = () => {
  tabs.forEach(tab => {
    browser.tabs.create({url: tab.url});
  });
};