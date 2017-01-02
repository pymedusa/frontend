export default function(assetGroup, query, assetType) {
    var vm = this;
    if (![assetGroup, query, assetType].includes(undefined)) {
        let apiKey = JSON.parse(localStorage.getItem('user'))['apiKey'];
        return vm.config.auth.url + 'asset/' + assetGroup + '/' + String(query).toLowerCase() + '?api_key=' + apiKey + '&type=' + assetType;
    }
}
