export default function(assetGroup, query, assetType) {
    var vm = this;
    if (![assetGroup, query, assetType].includes(undefined)) {
        return vm.config.auth.url + 'asset/' + assetGroup + '/' + String(query).toLowerCase() + '?api_key=' + localStorage.getItem('idToken') + '&type=' + assetType;
    }
}
