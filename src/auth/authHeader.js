const authHeader = () => {
  const localStorageData = JSON.parse(localStorage.getItem("user"));

  if (localStorageData && localStorageData.token) {
    return { "access-token": localStorageData.token };
  } else {
    return {};
  }
};

export default authHeader;
