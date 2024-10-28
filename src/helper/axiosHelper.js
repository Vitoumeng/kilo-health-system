import axios from "axios";
import { getAuth } from "./authHelper";

const AUTH = "ZzM6MTIz";

const setUpAxios = () => {
  axios.defaults.baseURL = "http://13.214.207.172:7777/";
  const auth = getAuth();

  if (auth) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  } else {
    axios.defaults.headers.common["Authorization"] = `Basic ${AUTH}`;
  }
};

export { setUpAxios };
