import axios from "axios";
import { getAuth } from "./authHelper";

const Auth = "ZzM6MTIz";

export const setUpAxios = () => {
  axios.defaults.baseURL = "http://96.9.77.143:7002/kilo-health-admin";

  const auth = getAuth();

  if (auth) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
  } else {
    axios.defaults.headers.common["Authorization"] = `Bearer ${Auth}`;
  }
};
