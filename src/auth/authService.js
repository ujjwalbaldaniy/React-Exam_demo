const getLocatStorageData = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export { getLocatStorageData };
