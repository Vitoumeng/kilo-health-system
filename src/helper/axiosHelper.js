import axios from "axios";

export const setupAxios = () => {
  axios.defaults.baseURL = "http://13.214.207.172:7777";
  axios.interceptors.request.use(
    function (config) {
      const accessToken = localStorage.getItem("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      } else {
        config.headers.Authorization = "Basic ZzM6MTIz";
      }
      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );
};
