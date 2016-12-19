import store from '../services/store.js'

export default function(assetGroup, query, assetType) {
    if (![assetGroup, query, assetType].includes(undefined)) {
        return store.auth.url + 'asset/' + assetGroup + '/' + String(query).toLowerCase() + '?api_key=' + store.auth.key + '&type=' + assetType;
    }
}
