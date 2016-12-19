import axios from 'axios';
import store from './store.js';

const api = axios.create({
    baseURL: store.config.auth.url,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Key': store.config.auth.key
    }
});

export default api;
