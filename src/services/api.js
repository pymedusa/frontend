import store from './store.js'
import axios from 'axios'

export default axios.create({
    baseURL: store.state.auth.url,
    timeout: 10000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-Api-Key': store.state.auth.key
    }
});
