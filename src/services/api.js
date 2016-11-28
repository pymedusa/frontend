import store from './store.js'
import axios from 'axios'

var api = axios.create({
    baseURL: store.state.auth.url,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Key': store.state.auth.key
    }
});

api.interceptors.response.use(function (response) {
    return response;
}, function (error) {
    // Handle error here
    // console.log('server is down');
    return Promise.reject(error);
});

export default api;
