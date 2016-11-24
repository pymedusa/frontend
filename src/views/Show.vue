<template>
    <div id="content">
        <div class="pull-left form-inline">
            Change Show:
            <div class="navShow"><img v-on:click="prevShow()" id="prevShow" src="dist/images/prev.png" alt="&lt;&lt;" title="Prev Show" /></div>
            <select v-model="show.id['tvdb']" id="pickShow" class="form-control form-control-inline input-sm">
                <option v-for="x in shows" v-bind:value="x.id['tvdb']" v-bind:selected="x.id['tvdb'] === show.id['tvdb'] ? 'selected' : ''">{{x.title}}</option>
            </select>
            <div class="navShow"><img v-on:click="nextShow()" id="nextShow" src="dist/images/next.png" alt="&gt;&gt;" title="Next Show" /></div>
        </div>
        {{show}}
    </div>
</template>

<script>
// Services
import api from '../services/api.js'
import apiAsset from '../services/apiAsset.js'
import store from '../services/store.js'

// Methods
import anonRedirect from '../methods/anonRedirect.js'
import prettyFileSize from '../methods/prettyFileSize.js'

// Components
import QualityPill from '../components/QualityPill.vue'

export default {
    name: 'show',
    data() {
        return {
            shows: [],
            show: {
                id: {
                    tvdb: ''
                }
            }
        }
    },
    created() {
        this.getShows();
        this.getShow(this.$route.params.showId);
    },
    methods: {
        apiAsset,
        getShow: function(showId) {
            if (showId) {
                var vm = this;
                api.get('show/tvdb' + showId).then(function(response) {
                    vm.show = response.data;
                }).catch(function (error) {
                    throw new Error(error);
                });
            }
        },
        getShows: function() {
            var vm = this;
            api.get('show').then(function(response) {
                vm.shows = response.data;
            }).catch(function (error) {
                throw new Error(error);
            });
        },
        prevShow: function() {
            let prevShow = document.querySelector(`option[value="${this.show.id['tvdb']}"]`).previousElementSibling;
            if (prevShow) {
                this.getShow(prevShow.value);
            }
        },
        nextShow: function() {
            let nextShow = document.querySelector(`option[value="${this.show.id['tvdb']}"]`).nextElementSibling;
            if (nextShow) {
                this.getShow(nextShow.value);
            }
        },
        prettyFileSize,
        anonRedirect
    },
    watch: {
        'show.id.tvdb': function(to, from) {
            if (to !== from) {
                this.$router.push({
                    name: 'show',
                    params: {
                        showId: to
                    }
                });
            }
        },
        '$route': function(to, from) {
            if (to !== from) {
                this.getShow(to.params.showId);
            }
        }
    }
}
</script>
