export let getStorageContext = () => {
  return JSON.parse(localStorage.getItem('TYP_StorageWrapper'));
}

export let setStorageContext = storageWrapper => {
  localStorage.setItem('TYP_StorageWrapper', JSON.stringify(storageWrapper));
}

export let setTabsForContextName = (contextName, tabs) => {
  let storageWrapper = getStorageContext();

  if (storageWrapper) {
    storageWrapper.contexts[contextName] = tabs;
  } else {
    storageWrapper = {
      contexts: {}
    };

    storageWrapper.contexts[contextName] = tabs;
  }

  localStorage.setItem('TYP_StorageWrapper', JSON.stringify(storageWrapper));
};