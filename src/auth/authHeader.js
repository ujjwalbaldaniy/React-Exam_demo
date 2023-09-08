const authHeader = () => {
  const localStorageData = JSON.parse(localStorage.getItem("user"));
  // console.log(localStorageData);
  // return { "access-token": localStorageData.token };

  if (localStorageData && localStorageData.token) {
    return { "access-token": localStorageData.token };
  } else {
    return {};
  }
};

export default authHeader;
