<!-- <div>Show {{ $route.params.showId }}</div> -->
<template>
    <div id="content">
        {{show}}
    </div>
</template>

<script>
export default {
    name: 'show',
    data() {
        return {
            show: {}
        }
    },
    watch: {
        '$route' (to, from) {
            // react to route changes...
        }
    }
}

//  var startVue = function(){
//      app = new Vue({
//          el: '#vue-wrap',
//          data: {
//              show: {},
//              shows: {},
//              MEDUSA: MEDUSA,
//              statuses: {
//                  UNKNOWN: -1,
//                  UNAIRED: 1,
//                  SNATCHED: 2,
//                  WANTED: 3,
//                  DOWNLOADED: 4,
//                  SKIPPED: 5,
//                  ARCHIVED: 6,
//                  IGNORED: 7,
//                  SNATCHED_PROPER: 9,
//                  SUBTITLED: 10,
//                  FAILED: 11,
//                  SNATCHED_BEST: 12
//              }
//          },
//          methods: {
//              getShow: function() {
//                  var vm = this;
//                  axios.get('/api/v2/show/' + parseInt(document.location.search.split('show=')[1], 10) + '?api_key=' + apiKey).then(function(response) {
//                      vm.show = response.data.shows[0];
//                      vm.show.seasons.reverse().forEach(function(season){
//                          season.episodes.reverse();
//                      });
//                  }).catch(function (error) {
//                      throw new Error(error);
//                  });
//              },
//              getShows: function() {
//                  var vm = this;
//                  axios.get('/api/v2/show?api_key=' + apiKey).then(function(response) {
//                      vm.shows = response.data.shows;
//                  }).catch(function (error) {
//                      throw new Error(error);
//                  });
//              },
//              anonRedirect: function(e) {
//                  e.preventDefault();
//                  var url = e.target.nodeName === 'IMG' ? e.target.parentElement.href : e.target.href;
//                  window.open(MEDUSA.info.anonRedirect + url, '_blank');
//              },
//              prettyFileSize: function(bytes) {
//                  // http://stackoverflow.com/a/14919494/2311366
//                  if(Math.abs(bytes) < 1024) {
//                      return bytes + ' B';
//                  }
//                  var units = ['kB','MB','GB','TB','PB','EB','ZB','YB'];
//                  var u = -1;
//                  do {
//                      bytes /= 1024;
//                      ++u;
//                  } while(Math.abs(bytes) >= 1024 && u < units.length - 1);
//                  return bytes.toFixed(1) + ' ' + units[u];
//              }
//          },
//          mounted: function () {
//              this.$nextTick(function() {
//                  // this.$el is in-document
//                  this.getShow();
//                  this.getShows();
//              });
//          }
//      });
//  };
</script>
