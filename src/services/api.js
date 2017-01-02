import axios from 'axios';

let baseUrl = localStorage.getItem('baseUrl');
let idToken = localStorage.getItem('idToken');

const api = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + idToken
    }
});

// // Add a response interceptor
// api.interceptors.response.use((response) => {
//     // Do something with response data
//     return response;
// }, (error) => {
//     // Do something with response error
//     if (error.message === 'Network Error') {
//         if (confirm('Looks like network is down, logout?')){
//             localStorage.removeItem('idToken');
//             localStorage.removeItem('user');
//         }
//     }
//     return Promise.reject(error);
// });

export default api;
