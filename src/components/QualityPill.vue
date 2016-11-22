<template>
    <span v-bind:title="qualityTitle" v-bind:class="'quality ' + qualityClass">{{qualityString}}</span>
</template>
<script>
export default {
    name: 'quality-pill',
        props: {
            showQuality: {
                type: Object,
                required: true
            },
            showTitle: {
                type: Boolean,
                default: false
            },
            overrideClass: {
                type: String,
                default: ''
            }
        },
        data () {
            return {
                qualityTitle: '',
                qualityString: '',
                qualityClass: ''
            }
        },
        created () {
            var vm = this;
            var all = vm.showQuality.allowed.concat(vm.showQuality.preferred);
            if (vm.showTitle) {
                vm.qualityTitle = 'Allowed Quality:\n';
                if (vm.showQuality.allowed.length) {
                    vm.showQuality.allowed.forEach(function(quality){
                        vm.qualityTitle += '  ' + quality + '\n';
                    });
                } else {
                    vm.qualityTitle += '  None\n';
                }
                vm.qualityTitle += '\nPreferred Quality:\n';
                if (vm.showQuality.preferred.length) {
                    vm.showQuality.preferred.forEach(function(quality){
                        vm.qualityTitle += '  ' + quality + '\n';
                    });
                } else {
                    vm.qualityTitle += '  None\n';
                }
            } else {
                vm.qualityTitle = '';
            }

            if (all.every(function(quality, index, array){return quality.indexOf('1080p') !== -1})) {
                vm.qualityString = 'HD 1080p';
                vm.qualityClass = 'HD1080p';
            }
            if (all.every(function(quality, index, array){return quality.indexOf('720p') !== -1})) {
                vm.qualityString = 'HD 720p';
                vm.qualityClass = 'HD720p';
            }
        //  if sum_allowed_qualities == sum_preferred_qualities:
        //      quality = sum_allowed_qualities
        //  if quality in qualityPresets:
        //      cssClass = qualityPresetStrings[quality]
        //      qualityString = qualityPresetStrings[quality]
        //  elif quality in Quality.combinedQualityStrings:
        //      cssClass = Quality.cssClassStrings[quality]
        //      qualityString = Quality.combinedQualityStrings[quality]
        //  elif quality in Quality.qualityStrings:
        //      cssClass = Quality.cssClassStrings[quality]
        //      qualityString = Quality.qualityStrings[quality]
        //  # Check if all sources are HDTV
        //  elif set(allowed_qualities).issubset(set_hdtv)and set(preferred_qualities).issubset(set_hdtv):
        //      cssClass = Quality.cssClassStrings[Quality.ANYHDTV]
        //      qualityString = 'HDTV'
        //  # Check if all sources are WEB-DL
        //  elif set(allowed_qualities).issubset(set_webdl)and set(preferred_qualities).issubset(set_webdl):
        //      cssClass = Quality.cssClassStrings[Quality.ANYWEBDL]
        //      qualityString = 'WEB-DL'
        //  # Check if all sources are BLURAY
        //  elif set(allowed_qualities).issubset(set_bluray)and set(preferred_qualities).issubset(set_bluray):
        //      cssClass = Quality.cssClassStrings[Quality.ANYBLURAY]
        //      qualityString = 'BLURAY'
        //  # Check if all resolutions are 1080p
        //  elif set(allowed_qualities).issubset(set_1080p)and set(preferred_qualities).issubset(set_1080p):
        //      cssClass = Quality.cssClassStrings[Quality.FULLHDBLURAY]
        //      qualityString = '1080p'
        //  # Check if all resolutions are 720p
        //  elif set(allowed_qualities).issubset(set_720p)and set(preferred_qualities).issubset(set_720p):
        //      cssClass = Quality.cssClassStrings[Quality.HDBLURAY]
        //      qualityString = '720p'
        //  # Check if all resolutions are 4K UHD
        //  elif set(allowed_qualities).issubset(set_uhd_4k)and set(preferred_qualities).issubset(set_uhd_4k):
        //      cssClass = Quality.cssClassStrings[Quality.HDBLURAY]
        //      qualityString = '4K-UHD'
        //  # Check if all resolutions are 8K UHD
        //  elif set(allowed_qualities).issubset(set_uhd_8k)and set(preferred_qualities).issubset(set_uhd_8k):
        //      cssClass = Quality.cssClassStrings[Quality.HDBLURAY]
        //      qualityString = '8K-UHD'
        //  else:
        //      cssClass = "Custom"
        //      qualityString = "Custom"
        //  if overrideClass is None:
        //      cssClass = "quality " + cssClass
        //  else:
        //      cssClass = overrideClass
     }
}
</script>
