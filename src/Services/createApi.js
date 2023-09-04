import axios from "axios";

const createApi = axios.create({
  baseURL: "https://examination.onrender.com",
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

export default createApi;
