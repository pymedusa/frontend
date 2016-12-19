import axios from 'axios';

let baseUrl = localStorage.getItem('baseUrl');
let idToken = localStorage.getItem('idToken');

const api = axios.create({
    baseURL: baseUrl,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Key': idToken
    }
});

export default api;
