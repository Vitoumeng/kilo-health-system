import axios from "axios";

const setUpAxios = () => {
  axios.defaults.baseURL = "http://96.9.77.143:7002/kilo-health-admin/";

  axios.interceptors.request.use(
    function (config) {
      const accessToken = localStorage.getItem("accessToken");

      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      return config;
    },
    function (err) {
      return Promise.reject(err);
    }
  );
};

export { setUpAxios };
