<template>
    <div>
        <nav v-if="authenticated" class="navbar navbar-default navbar-fixed-top hidden-print" role="navigation">
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#main_nav">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    </button>
                    <router-link :to="{ name: 'home' }" class="navbar-brand" title="Medusa">
                        <img alt="Medusa" src="dist/images/medusa.png" style="height: 50px;" class="img-responsive pull-left" />
                    </router-link>
                </div>
                <div class="collapse navbar-collapse" id="main_nav">
                    <ul class="nav navbar-nav navbar-right">
                        <li id="NAVhome" class="navbar-split dropdown">
                            <router-link :to="{ name: 'home' }" class="dropdown-toggle" aria-haspopup="true" data-toggle="dropdown" data-hover="dropdown">
                                <span>Shows</span>
                                <b class="caret"></b>
                            </router-link>
                            <ul class="dropdown-menu">
                                <li><router-link :to="{ name: 'home' }"><i class="menu-icon-home"></i>&nbsp;Show List</router-link></li>
                                <!-- <li><router-link :to="{ name: 'addShow' }"><i class="menu-icon-addshow"></i>&nbsp;Add Shows</router-link></li>
                                <li><router-link :to="{ name: 'addRecommended' }"><i class="menu-icon-addshow"></i>&nbsp;Add Recommended Shows</router-link></li>
                                <li><router-link :to="{ name: 'postProcess' }"><i class="menu-icon-postprocess"></i>&nbsp;Manual Post-Processing</router-link></li>
                                <li v-if="recentShows.length > 0" role="separator" class="divider"></li> -->
                                <li v-for="show in recentShows">
                                    <router-link :to="{ name: 'show', params:{ showId: show.ids['thetvdb'] } }">
                                        <i class="menu-icon-addshow"></i> {{show.name}}
                                    </router-link>
                                </li>
                            </ul>
                            <div style="clear:both;"></div>
                        </li>
                        <li id="NAVschedule">
                            <a href="schedule/">Schedule</a>
                        </li>
                        <li id="NAVhistory">
                            <a href="history/">History</a>
                        </li>
                        <li id="NAVmanage" class="navbar-split dropdown">
                            <a href="manage/episodeStatuses/" class="dropdown-toggle" aria-haspopup="true" data-toggle="dropdown" data-hover="dropdown">
                                <span>Manage</span> <b class="caret"></b>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="manage/"><i class="menu-icon-manage"></i>&nbsp;Mass Update</a></li>
                                <li><a href="manage/backlogOverview/"><i class="menu-icon-backlog-view"></i>&nbsp;Backlog Overview</a></li>
                                <li><a href="manage/manageSearches/"><i class="menu-icon-manage-searches"></i>&nbsp;Manage Searches</a></li>
                                <li><a href="manage/episodeStatuses/"><i class="menu-icon-manage2"></i>&nbsp;Episode Status Management</a></li>
                                <li v-if="config.plex.server.enabled"><a href="home/updatePLEX/"><i class="menu-icon-plex"></i>&nbsp;Update PLEX</a></li>
                                <li v-if="config.kodi.enabled"><a href="home/updateKODI/"><i class="menu-icon-kodi"></i>&nbsp;Update KODI</a></li>
                                <li v-if="config.emby.enabled"><a href="home/updateEMBY/"><i class="menu-icon-emby"></i>&nbsp;Update Emby</a></li>
                                <li v-if="config.torrents.enabled"><a href="manage/manageTorrents/"><i class="menu-icon-bittorrent"></i>&nbsp;Manage Torrents</a></li>
                                <li v-if="config.failedDownloads.enabled"><a href="manage/failedDownloads/"><i class="menu-icon-failed-download"></i>&nbsp;Failed Downloads</a></li>
                                <li v-if="config.subtitles.enabled"><a href="manage/subtitleMissed/"><i class="menu-icon-backlog"></i>&nbsp;Missed Subtitle Management</a></li>
                            <!-- % if app.POSTPONE_IF_NO_SUBS:
                                <li><a href="manage/subtitleMissedPP/"><i class="menu-icon-backlog"></i>&nbsp;Missed Subtitle in Post-Process folder</a></li>
                            % endif -->
                            </ul>
                            <div style="clear:both;"></div>
                        </li>
                        <li id="NAVconfig" class="navbar-split dropdown">
                            <a href="config/" class="dropdown-toggle" aria-haspopup="true" data-toggle="dropdown" data-hover="dropdown"><span class="visible-xs-inline">Config</span><img src="dist/images/menu/system18.png" class="navbaricon hidden-xs" />
                            <b class="caret"></b>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="config/"><i class="menu-icon-help"></i>&nbsp;Help &amp; Info</a></li>
                                <li><a href="config/general/"><i class="menu-icon-config"></i>&nbsp;General</a></li>
                                <li><a href="config/backuprestore/"><i class="menu-icon-backup"></i>&nbsp;Backup &amp; Restore</a></li>
                                <li><a href="config/search/"><i class="menu-icon-manage-searches"></i>&nbsp;Search Settings</a></li>
                                <li><a href="config/providers/"><i class="menu-icon-provider"></i>&nbsp;Search Providers</a></li>
                                <li><a href="config/subtitles/"><i class="menu-icon-backlog"></i>&nbsp;Subtitles Settings</a></li>
                                <li><a href="config/postProcessing/"><i class="menu-icon-postprocess"></i>&nbsp;Post Processing</a></li>
                                <li><a href="config/notifications/"><i class="menu-icon-notification"></i>&nbsp;Notifications</a></li>
                                <li><a href="config/anime/"><i class="menu-icon-anime"></i>&nbsp;Anime</a></li>
                            </ul>
                            <div style="clear:both;"></div>
                        </li>
                        <li id="NAVsystem" class="navbar-split dropdown">
                            <a href="home/status/" class="dropdown-toggle" aria-haspopup="true" data-toggle="dropdown" data-hover="dropdown">
                                <span class="visible-xs-inline">Tools</span>
                                <img src="dist/images/menu/system18-2.png" class="navbaricon hidden-xs" />
                                <b class="caret"></b>
                            </a>
                            <ul class="dropdown-menu">
                                <li><a href="news/"><i class="menu-icon-news"></i>&nbsp;News${newsBadge}</a></li>
                                <li><a href="IRC/"><i class="menu-icon-irc"></i>&nbsp;IRC</a></li>
                                <li><a href="changes/"><i class="menu-icon-changelog"></i>&nbsp;Changelog</a></li>
                                <li><a href="${app.DONATIONS_URL}" rel="noreferrer" v-on:click="anonRedirect($event)"><i class="menu-icon-support"></i>&nbsp;Support Medusa</a></li>
                                <li role="separator" class="divider"></li>
                                <!-- %if numErrors:
                                    <li><a href="errorlogs/"><i class="menu-icon-error"></i>&nbsp;View Errors <span class="badge btn-danger">${numErrors}</span></a></li>
                                %endif
                                %if numWarnings:
                                    <li><a href="errorlogs/?level=${app.logger.WARNING}"><i class="menu-icon-viewlog-errors"></i>&nbsp;View Warnings <span class="badge btn-warning">${numWarnings}</span></a></li>
                                %endif -->
                                <li><a href="errorlogs/viewlog/"><i class="menu-icon-viewlog"></i>&nbsp;View Log</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="home/updateCheck?pid=${sbPID}"><i class="menu-icon-update"></i>&nbsp;Check For Updates</a></li>
                                <li><a href="home/restart/?pid=${sbPID}" class="confirm restart"><i class="menu-icon-restart"></i>&nbsp;Restart</a></li>
                                <li><a href="home/shutdown/?pid=${sbPID}" class="confirm shutdown"><i class="menu-icon-shutdown"></i>&nbsp;Shutdown</a></li>
                                <li v-if="!authenticated"><a href="logout" class="confirm logout"><i class="menu-icon-shutdown"></i>&nbsp;Logout</a></li>
                                <li role="separator" class="divider"></li>
                                <li><a href="home/status/"><i class="menu-icon-info"></i>&nbsp;Server Status</a></li>
                            </ul>
                            <div style="clear:both;"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <router-view></router-view>
        <footer v-if="authenticated">
            <div class="footer clearfix">
                <!-- <span class="footerhighlight">${stats['shows']['total']}</span> Shows (<span class="footerhighlight">${stats['shows']['active']}</span> Active)
                | <span class="footerhighlight">${ep_downloaded}</span>
                % if ep_snatched:
                <span class="footerhighlight"><a href="manage/episodeStatuses?whichStatus=2" title="View overview of snatched episodes">+${ep_snatched}</a></span> Snatched
                % endif
                &nbsp;/&nbsp;<span class="footerhighlight">${ep_total}</span> Episodes Downloaded ${ep_percentage}
                | Daily Search: <span class="footerhighlight">${str(daily_search_scheduler.timeLeft()).split('.')[0]}</span>
                | Backlog Search: <span class="footerhighlight">${str(backlog_search_scheduler.timeLeft()).split('.')[0]}</span>
                <div>
                % if mem_usage:
                    Memory used: <span class="footerhighlight">
                    % if mem_usage == 'resource':
                        ${pretty_file_size(resource.getrusage(resource.RUSAGE_SELF).ru_maxrss)}
                    % else:
                        ${pretty_file_size(Process(getpid()).memory_info().rss)}
                    % endif
                    </span> |
                % endif
                    Load time: <span class="footerhighlight">${"%.4f" % (time() - sbStartTime)}s</span> / Mako: <span class="footerhighlight">${"%.4f" % (time() - makoStartTime)}s</span> |
                    Branch: <span class="footerhighlight">${BRANCH}</span> |
                    Now: <span class="footerhighlight">${datetime.now().strftime(DATE_PRESET+" "+TIME_PRESET)}</span>
                </div> -->
            </div>
        </footer>
    </div>
</template>
<script>
import auth from './services/auth.js';
import api from './services/api.js';
import anonRedirect from './methods/anonRedirect.js';

export default {
    name: 'app',
    store: ['config', 'shows', 'authenticated', 'user'],
    data() {
        return {
            recentShows: []
        }
    },
    mounted() {
        // Set vm as app context so it can be accessed inside of other contexts
        var vm = this;

        this.$store.authenticated = auth.isAuthenticated();
        this.$store.user = JSON.parse(localStorage.getItem('user'));

        // Get the initial config data if logged in
        if (this.$store.authenticated) {
            api.get('config').then(function(response) {
                for (var key in response.data) {
                    vm.$store.config[key] = response.data[key];
                }
            }).catch(function(error) {
                throw new Error(error);
            });
        }
    },
    methods: {
        anonRedirect
    }
}
</script>
