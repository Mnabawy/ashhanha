import axios from 'axios';
import * as urls from './urls';
import store from '../../store/store';
import { AuthRepo } from '../../repo';
import { showError } from '../../common';

const authRepo = new AuthRepo();

export default () => {
  // Add a request interceptor

  axios.interceptors.request.use(
    (config) => {
      const userData = store.getState().auth.userData;
      config.baseURL = config.baseURL || urls.BASE_URL;

      return {
        ...config,
        headers: {
          ...config.headers,
          'Accept-Language': store.getState().lang.lang,
          // 'Content-Type': 'multipart/form-data',
          ...(config.headers.Authorization === 'false'
            ? {}
            : {
              Authorization: userData
                ? `Bearer ${userData?.token}`
                : config.headers.Authorization,
            }),
        },
      };
    },
    (error) => {
      console.log('conferr', error);
      return Promise.reject(error);
    },
  );
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      // console.log(response.data, 'interceptor');
      if (response.data?.data?.statusCode === 411 && store.getState().auth.userData) {
        console.log("wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww")
        showError(response.data.data.error);
        authRepo.logoutPrincipalUser();
      }
      return response;
    },
    async function (error) {
      console.log("ERROR interceptor----", error);
      console.log("ERROR interceptor res", error.response);
      return Promise.reject(error);
    },
  );
};

// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (err) => {
//     return new Promise((resolve, reject) => {
//       const originalReq = err.config;
//       if (
//         err.response.status === 401 &&
//         err.config &&
//         !err.config.__isRetryRequest
//       ) {
//         originalReq._retry = true;

//         let res = fetch(`${urls.APP_BASE_URL}refresh`, {
//           method: 'POST',
//           mode: 'cors',
//           cache: 'no-cache',
//           credentials: 'same-origin',
//           headers: {
//             'Content-Type': 'application/json',
//             Device: 'device',
//             Token: localStorage.getItem('token'),
//           },
//           redirect: 'follow',
//           referrer: 'no-referrer',
//           body: JSON.stringify({
//             token: localStorage.getItem('token'),
//             refresh_token: localStorage.getItem('refresh_token'),
//           }),
//         })
//           .then((res) => res.json())
//           .then((res) => {
//             console.log(res);
//             this.setSession({token: res.token, refresh_token: res.refresh});
//             originalReq.headers.Token = res.token;
//             originalReq.headers.Device = 'device';

//             return axios(originalReq);
//           });

//         resolve(res);
//       }

//       return Promise.reject(err);
//     });
//   },
// );
