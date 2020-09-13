import { useState, useEffect } from 'react';

function useLocalStorage(saveOnChange, storageName, dispatchTo) {
  const [firstRun, setFirstRun] = useState(true);
  useEffect(() => {
    if (firstRun) {
      setFirstRun(false);
      return;
    }
    saveToLocalStorage(storageName, saveOnChange);
  }, [saveOnChange, firstRun, storageName]);

  useEffect(() => {
    if (!localStorage.hasOwnProperty(storageName)) {
      saveToLocalStorage(storageName, []);
    }
    const todosResult = JSON.parse(localStorage.getItem(storageName));
    dispatchTo(todosResult);
  }, [storageName, dispatchTo]);

  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export default useLocalStorage;
