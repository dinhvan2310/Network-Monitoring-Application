import axios from "axios";
import queryString from "query-string";

const httpRequests = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

httpRequests.interceptors.request.use(async (config) => {
  // Handle token here ...
  return config;
});

httpRequests.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default httpRequests;
