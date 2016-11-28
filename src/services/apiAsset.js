import store from '../services/store.js'

export default function(assetGroup, query, assetType) {
    if (![assetGroup, query, assetType].includes(undefined)) {
        return store.state.auth.url + 'asset/' + assetGroup + '/' + String(query).toLowerCase() + '?api_key=' + store.state.auth.key + '&type=' + assetType;
    }
}
