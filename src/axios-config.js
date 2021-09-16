import axios from "axios";
axios.defaults.baseURL = process.env.API_URL || "http://localhost:8000"; // <- api url
axios.defaults.withCredentials = true;
axios.interceptors.response.use(
    function (response) {
        // 200 type responses, this should be left as it is
        return response;
    },
    //   function (error) {
    //     if (error.response && error.response.status === 401) {
    //       // if logout isnt called before :
    //         store.dispatch("logout");
    //     }
    //     return Promise.reject(error);
    //   }
);
