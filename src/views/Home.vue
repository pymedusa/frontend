<template>
    <div id="content">
        <table style="width: 100%;" class="home-header">
            <tr>
                <td align="right">
                    <div>
                        <span v-if="config.layout.home !== 'poster'">
                            <span class="show-option">
                                <button id="popover" type="button" class="btn btn-inline">Select Columns <b class="caret"></b></button>
                            </span>
                            <span class="show-option">
                                <button type="button" class="resetsorting btn btn-inline">Clear Filter(s)</button>
                            </span>
                        </span>
                        <span v-if="config.layout.home === 'poster'">
                            <span class="show-option"> Poster Size: <div style="width: 100px; display: inline-block; margin-left: 7px;" id="posterSizeSlider"></div>
                            </span>
                            <span class="show-option">
                                <input id="filterShowName" class="form-control form-control-inline input-sm input200" type="search" placeholder="Filter Show Name">
                            </span>
                            <span class="show-option"> Sort By:
                                <select id="postersort" class="form-control form-control-inline input-sm">
                                    <option value="name" data-sort="name">Name</option>
                                    <option value="date" data-sort="date">Next Episode</option>
                                    <option value="network" data-sort="network">Network</option>
                                    <option value="progress" data-sort="progress">Progress</option>
                                </select>
                            </span>
                            <span class="show-option"> Direction:
                                <select id="postersortdirection" class="form-control form-control-inline input-sm">
                                    <option value="true" data-sort="asc">Ascending </option>
                                    <option value="false" data-sort="desc">Descending</option>
                                </select>
                            </span>
                        </span>
                        <span class="show-option"> Layout:
                            <select name="layout" class="form-control form-control-inline input-sm" v-model="config.layout.home">
                                <option value="poster">Poster</option>
                                <option value="small">Small Poster</option>
                                <option value="banner">Banner</option>
                                <option value="simple">Simple</option>
                            </select>
                        </span>
                    </div>
                </td>
            </tr>
        </table>
        <table v-if="config.layout.home === 'banner'" id="showListTable${curListType}" class="tablesorter" cellspacing="1" border="0" cellpadding="0">
            <thead>
                <tr>
                    <th class="nowrap">Next Ep</th>
                    <th class="nowrap">Prev Ep</th>
                    <th>Show</th>
                    <th>Network</th>
                    <th>Quality</th>
                    <th>Downloads</th>
                    <th>Size</th>
                    <th>Active</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tfoot class="hidden-print">
                <tr>
                    <!-- @TODO: Replace the button below with something that adds a show using the API -->
                    <!--        The button below should use a modal or something that'll keep the user on the page -->
                    <th rowspan="1" colspan="1" align="center"><button class="btn">Add Show</button></th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                    <th>&nbsp;</th>
                </tr>
            </tfoot>
            <tbody v-for="show in shows">
                <tr>
                    <td align="center" class="nowrap">
                        <!-- airDate = sbdatetime.sbdatetime.convert_to_setting(network_timezones.parse_date_time(cur_airs_next, curShow.airs, curShow.network)) -->
                        <!-- <time datetime="${airDate.isoformat('T')}" class="date">${sbdatetime.sbdatetime.sbfdate(airDate)}</time> -->
                    </td>
                    <td align="center" class="nowrap">
                        <!-- airDate = sbdatetime.sbdatetime.convert_to_setting(network_timezones.parse_date_time(cur_airs_prev, curShow.airs, curShow.network)) -->
                        <!-- <time datetime="${airDate.isoformat('T')}" class="date">${sbdatetime.sbdatetime.sbfdate(airDate)}</time> -->
                    </td>
                    <td>
                        <span style="display: none;">{{show.name}}</span>
                        <div class="imgbanner banner">
                            <router-link :to="{ name: 'show', params: { showId: show.id[show.indexer] }}">
                                <img v-bind:src="apiAsset('show', show.id[show.indexer], 'banner')" class="banner" v-bind:alt="show.name" v-bind:title="show.name"/>
                            </router-link>
                        </div>
                    </td>
                    <td align="center">
                        <span v-if="show.network">
                            <span v-bind:title="show.network" class="hidden-print">
                                <img id="network" width="54" height="27" v-bind:src="apiAsset('network', show.network, 'poster')" v-bind:alt="show.network" v-bind:title="show.network" />
                            </span>
                            <span class="visible-print-inline">{{show.network}}</span>
                        </span>
                        <span v-else>
                            <span title="No Network" class="hidden-print">
                                <img id="network" width="54" height="27" src="/dist/images/network/no-network.png" alt="No Network" title="No Network" />
                            </span>
                            <span class="visible-print-inline">No Network</span>
                        </span>
                    </td>
                    <td align="center"><quality-pill v-bind:showQuality="show.config.qualities" v-bind:showTitle="true"></quality-pill></td>
                    <td align="center">
                        <!-- ## This first span is used for sorting and is never displayed to user -->
                        <span style="display: none;">${download_stat}</span>
                        <div class="progressbar hidden-print" style="position:relative;" data-show-id="${curShow.indexerid}" data-progress-percentage="${progressbar_percent}" data-progress-text="${download_stat}" data-progress-tip="${download_stat_tip}"></div>
                        <span class="visible-print-inline">${download_stat}</span>
                    </td>
                    <td align="center" data-show-size="show.fileSize">{{prettyFileSize(show.fileSize)}}</td>
                    <td align="center">
                        <img v-bind:src="'/dist/images/' + (!show.paused && show.status === 'Continuing' ? 'Yes' : 'No') + '16.png'" v-bind:alt="(!show.paused && show.status === 'Continuing' ? 'Yes' : 'No')" width="16" height="16" />
                    </td>
                    <td align="center">{{show.status}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
import {diff} from 'deep-diff';

// Services
import api from '../services/api.js'
import apiAsset from '../services/apiAsset.js'

// Methods
import anonRedirect from '../methods/anonRedirect.js'
import prettyFileSize from '../methods/prettyFileSize.js'

// Components
import QualityPill from '../components/QualityPill.vue'

export default {
    name: 'home',
    store: ['config', 'shows', 'authenticated', 'user'],
    data () {
        return {
            error: null
        }
    },
    mounted () {
        var vm = this;
        var deVue = function(x) {
            return JSON.parse(JSON.stringify(x));
        }
        // fetch the data when the view is created and the data is
        // already being observed
        vm.getShows();
        vm.$watch('config', function(config) {
            api.patch('config', deVue(config)).then(function(response) {
                log.info(response);
            }).catch(function (error) {
                log.info(error);
            });
        }, {
            deep: true
        });
    },
    methods: {
        apiAsset,
        getShows: function(){
            var vm = this;
            api.get('show').then(function(response) {
                vm.shows = response.data;
            }).catch(function (error) {
                console.log(error);
            });
        },
        prettyFileSize,
        anonRedirect
    },
    components: {
        'quality-pill': QualityPill
    }
};
</script>
