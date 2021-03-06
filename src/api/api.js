// TODO: this file 'api.js' must be deleted before connection to API
/* eslint-disable */

const mocks = {
  auth: { POST: { token: 'This-is-a-mocked-token' } },
  'user/me': { GET: { name: 'Michael Jackson', ico: require('@/assets/images/ava.png') } }
};

const apiCall = ({ url, method }) =>
  new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        resolve(mocks[url][method || 'GET']);
        console.log(`Mocked '${url}' - ${method || 'GET'}`);
        console.log('response: ', mocks[url][method || 'GET']);
      } catch (err) {
        reject(new Error(err));
      }
    }, 1000);
  });

export default apiCall;
