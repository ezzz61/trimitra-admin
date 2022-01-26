import axios from "axios";

export default () => {
  let instance = axios.create({
    //LOCAL
    headers: {
      Authorization: localStorage.getItem("token")
        ? localStorage.getItem("token")
        : null
    },
    baseURL: `http://localhost:8080/api`
  });
  instance.interceptors.response.use(
    function(response) {
      if (response.data.status == 402) {
        localStorage.removeItem("token");
        localStorage.removeItem("data_user");
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
