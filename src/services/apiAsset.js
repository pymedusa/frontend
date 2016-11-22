import store from '../services/store.js'

export default function(assetGroup, query, assetType) {
    return store.state.auth.url + 'asset/' + assetGroup + '/' + String(query).toLowerCase() + '?api_key=' + store.state.auth.key + '&type=' + assetType;
}
