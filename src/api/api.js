import axios from "axios";
import Vue from "vue";

export default () => {
  const token = Vue.cookie.get("token");
  let instance = axios.create({
    //LOCAL
    headers: {
      Authorization: token ? token : null
    },
    baseURL: `http://localhost:8080/api`
    // baseURL: `https://staging-trimitra.herokuapp.com/api`
    // baseURL: `https://trimitra-server.herokuapp.com/api`
  });
  instance.interceptors.response.use(
    function(response) {
      if (response.data.status == 402 || response.data.status == 403) {
        Vue.cookie.remove("token");
        Vue.cookie.remove("data_user");
        window.location = "/login";
      }
      response.data.status;
      // Any status code within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function(error) {
      console.log(error);

      // window.location = "/login";
      // Any status codes outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    }
  );

  return instance;
};
