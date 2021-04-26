export { getLocalStorageItem, setLocalStorageItem };

function getLocalStorageItem<T>(key: string, defaultValue: T) {
  try {
    const item = window.localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch (error) {
    console.error(`Error getting localStorage key '${key}': ${error}`);
    return defaultValue;
  }
}

function setLocalStorageItem<T>(
  key: string,
  defaultValue: T,
  update: (item: T) => T
) {
  const prevItem = getLocalStorageItem(key, defaultValue);

  try {
    const item = update(prevItem);
    window.localStorage.setItem(key, JSON.stringify(item));
  } catch (error) {
    console.error(`Error setting localStorage key '${key}': ${error}`);
  }
}
