<template>
    <div id="content">
        <div class="pull-left form-inline">
            Change Show:
            <div class="navShow"><img v-on:click="prevShow()" id="prevShow" src="dist/images/prev.png" alt="&lt;&lt;" title="Prev Show" /></div>
            <select v-model="show.id[show.indexer]" id="pickShow" class="form-control form-control-inline input-sm">
                <option v-for="x in shows" v-bind:value="x.id[x.indexer]" v-bind:selected="x.id[x.indexer] === show.id[show.indexer] ? 'selected' : ''">{{x.title}}</option>
            </select>
            <div class="navShow"><img v-on:click="nextShow()" id="nextShow" src="dist/images/next.png" alt="&gt;&gt;" title="Next Show" /></div>
        </div>
        <div class="clearfix"></div>
        <div id="showtitle">
            <h1 class="title">{{show.title}}</h1>
        </div>
        <span v-if="show.seasons[0][0].season === 0" class="h2footer displayspecials pull-right">
            <!-- @TOOD: The below needs to send a put/patch to /config to change the displayShowSpecials field -->
            Display Specials: <a class="inner" v-bind:href="'home/toggleDisplayShowSpecials/?show=' + show.id[show.indexer]">{{config.displayShowSpecials ? 'Hide' : 'Show'}}</a>
        </span>
        <div class="h2footer pull-right">
            <select v-if="show.seasons.length > 14" id="seasonJump" class="form-control input-sm" style="position: relative; top: -4px;">
                <option value="jump">Jump to Season</option>
                <option v-for="season in show.seasons" v-bind:value="'#season-' + season[0].season">{{season[0].season !== 0 ? 'Season ' + season[0].season : 'Specials'}}</option>
            </select>
            <span v-if="show.seasons.length <= 14 && show.seasons.length > 1">
                Season: <template v-for="season in reverse(show.seasons)">
                    <template v-if="season[0].season !== 0">
                        <a v-bind:href="'#season-' + season[0].season">{{season[0].season}}</a> <span v-if="show.seasons.indexOf(season) < show.seasons.length" class="separator">|</span>
                    </template>
                    <a v-else v-bind:href="'#season-' + season[0].season">Specials</a>
                </template>
            </span>
        </div>
        <div class="clearfix"></div>
        <div v-if="show.queue.action" class="alert alert-info">{{show.queue.message}}</div>
        <div id="container">
            <div id="posterCol">
                <a v-bind:href="apiAsset('show', show.id[show.indexer], 'poster')" rel="dialog" v-bind:title="'View Poster for ' + show.title">
                    <img v-bind:src="apiAsset('show', show.id[show.indexer], 'posterThumb')" class="tvshowImg" v-bind:alt="'Poster Thumbnail for ' + show.title"/>
                </a>
            </div>
            <div id="showCol">
                <img id="showBanner" v-bind:src="apiAsset('show', show.id[show.indexer], 'banner')"/>
                <div id="showinfo">
                    <span v-if="show.rating.imdb" class="imdbstars" v-bind:qtip-content="show.rating.imdb.stars + ' / 10 Stars<br>' + show.rating.imdb.votes + ' Votes'">{{show.rating.imdb.stars}}</span>
                    <img v-if="show.rating.imdb" v-for="country in show.countries" src="dist/images/blank.png" v-bind:class="'country-flag flag-' + country" width="16" height="11" style="margin-left: 3px; vertical-align:middle;" />
                    <span>({{show.year.start}}) - {{show.runtime}} minutes - </span>
                    <a v-if="show.id.imdb" v-bind:href="'https://www.imdb.com/title/' + show.id.imdb" rel="noreferrer" v-on:click="anonRedirect" v-bind:title="'https://www.imdb.com/title/' + show.id.imdb">
                        <img alt="[imdb]" height="16" width="16" src="dist/images/imdb.png" style="margin-top: -1px; vertical-align:middle;"/>
                    </a>
                    <a v-bind:href="'http://thetvdb.com/?tab=series&id=' + show.id[show.indexer]" v-bind:title="'http://thetvdb.com/?tab=series&id=' + show.id[show.indexer]">
                        <img alt="[thetvdb]" height="16" width="16" src="dist/images/thetvdb16.png" style="margin-top: -1px; vertical-align:middle;"/>
                    </a>
                    <!-- <! % if xem_numbering or xem_absolute_numbering:
                    <a href="${anon_url('http://thexem.de/search?q=', show.title)}" rel="noreferrer" onclick="window.open(this.href, '_blank'); return false;" title="http://thexem.de/search?q-${show.title}">
                        <img alt="[xem]" height="16" width="16" src="dist/images/xem.png" style="margin-top: -1px; vertical-align:middle;"/>
                    </a>
                    % endif -->
                    <a v-bind:href="'https://fanart.tv/series/' + show.id.imdb" v-bind:title="'https://fanart.tv/series/' + show.id.imdb">
                        <img alt="[fanart.tv]" height="16" width="16" src="dist/images/fanart.tv.png" class="fanart"/>
                    </a>
                </div>
                <div v-if="show.genres" id="tags">
                    <ul v-for="genre in show.genres" class="tags">
                        <a v-if="show.id.imdb" v-bind:href="'http://www.imdb.com/search/title?count=100&title_type=tv_series&genres=' + genre.toLowerCase()" v-bind:title="'View other popular ' + genre + 'shows on IMDB.'"><li>{{genre}}</li></a>
                        <a v-if="!show.id.imdb" v-bind:href="'http://trakt.tv/shows/popular/?genres=' + genre.toLowerCase()" target="_blank" v-bind:title="'View other popular ' + genre + 'shows on trakt.tv.'"><li>{{genre}}</li></a>
                    </ul>
                </div>

                <!-- Show Summary -->
                <div id="summary" v-bind:class="config.fanartBackground ? 'summaryFanArt' : ''">
                    <table class="summaryTable pull-left">
                        <!-- anyQualities, bestQualities = Quality.splitQuality(int(show.quality))
                            <tr><td class="showLegend">Quality: </td><td>
                        % if show.quality in qualityPresets:
                            ${renderQualityPill(show.quality)}
                        % else:
                        % if anyQualities:
                            <i>Allowed:</i> ${', '.join([capture(renderQualityPill, x) for x in sorted(anyQualities)])}${'<br>' if bestQualities else ''}
                        % endif
                        % if bestQualities:
                            <i>Preferred:</i> ${', '.join([capture(renderQualityPill, x) for x in sorted(bestQualities)])}
                        % endif
                        % endif -->
                        <tr v-if="show.network && show.airs"><td class="showLegend">Originally Airs: </td><td>{{show.airs}} on {{show.network}}</td></tr>
                        <tr v-if="show.network && !show.airs"><td class="showLegend">Originally Airs: </td><td>{{show.network}}</td></tr>
                        <tr v-if="!show.network && show.airs"><td class="showLegend">Originally Airs: </td><td>{{show.airs}}</td></tr>
                        <tr><td class="showLegend">Show Status: </td><td>{{show.status}}</td></tr>
                        <tr><td class="showLegend">Default EP Status: </td><td>{{show.config.defaultEpisodeStatus}}</td></tr>
                        <!--% if showLoc[1]:
                            <tr><td class="showLegend">Location: </td><td>${showLoc[0]}</td></tr>
                        % else:
                            <tr><td class="showLegend"><span style="color: rgb(255, 0, 0);">Location: </span></td><td><span style="color: rgb(255, 0, 0);">${showLoc[0]}</span> (Missing)</td></tr>
                        % endif
                        % if all_scene_exceptions:
                            <tr><td class="showLegend" style="vertical-align: top;">Scene Name:</td><td>${all_scene_exceptions}</td></tr>
                        % endif-->
                        <tr v-if="show.config.release.requiredWords.length">
                            <td class="showLegend" style="vertical-align: top;">Required Words: </td><td><span class="break-word">{{show.config.release.requiredWords.join(', ')}}</span></td>
                        </tr>
                        <tr v-if="show.config.release.ignoredWords.length">
                            <td class="showLegend" style="vertical-align: top;">Ignored Words: </td><td><span class="break-word">{{show.config.release.ignoredWords.join(', ')}}</span></td>
                        </tr>
                        <!-- <tr>
                            <td class="showLegend" style="vertical-align: top;">Preferred Words: </td><td><span class="break-word"></span></td>
                        </tr> -->
                        <!-- % if undesired_words:
                            <tr><td class="showLegend" style="vertical-align: top;">Undesired Words: </td><td><span class="break-word">${undesired_words}</span></td></tr>
                        % endif -->
                        <tr v-if="show.config.release.whitelist.length">
                            <td class="showLegend">Wanted Group{{show.config.release.whitelist.length > 1 ? 's' : ''}}:</td>
                            <td>{{show.config.release.whitelist.join(', ')}}</td>
                        </tr>
                        <tr v-if="show.config.release.blacklist.length">
                            <td class="showLegend">Unwanted Group{{show.config.release.blacklist.length > 1 ? 's' : ''}}:</td>
                            <td>{{show.config.release.blacklist.join(', ')}}</td>
                        </tr>
                        <tr><td class="showLegend">Size:</td><td>{{prettyFileSize(show.size)}}</td></tr>
                    </table>

                    <!-- Option table right -->
                    <table class="showOptions">
                        <!-- @TODO: next 2 lines need to be converted to js -->
                        <!--  -->
                        <!--  info_flag = subtitles.code_from_code(show.lang) if show.lang else '' %> -->
                        <!-- <tr><td class="showLegend">Info Language:</td><td><img v-bind:src="'dist/images/subtitles/flags/' + show.language + '.png'" width="16" height="11" v-bind:alt="show.language" v-bind:title="show.language" onError="this.onerror=null;this.src='dist/images/flags/unknown.png';"/></td></tr> -->
                        <tr v-if="config.useSubtitles"><td class="showLegend">Subtitles: </td><td><img v-bind:src="'dist/images/' + (show.subtitles ? 'yes' : 'no') + '16.png'" v-bind:alt="show.subtitles ? 'Y' : 'N'" width="16" height="16" /></td></tr>
                        <tr><td class="showLegend">Season Folders: </td><td><img v-bind:src="'dist/images/' + ((show.config.flattenFolders || config.namingForceFolders) ? 'yes' : 'no') + '16.png'" alt="((show.config.flattenFolders || config.namingForceFolders) ? 'Y' : 'N')" width="16" height="16" /></td></tr>
                        <tr><td class="showLegend">Paused: </td><td><img v-bind:src="'dist/images/' + (show.paused ? 'yes' : 'no') + '16.png'" v-bind:alt="show.paused ? 'Y' : 'N'" width="16" height="16" /></td></tr>
                        <tr><td class="showLegend">Air-by-Date: </td><td><img v-bind:src="'dist/images/' + (show.airByDate ? 'yes' : 'no') + '16.png'" v-bind:alt="show.airByDate ? 'Y' : 'N'" width="16" height="16" /></td></tr>
                        <tr><td class="showLegend">Sports: </td><td><img v-bind:src="'dist/images/' + (show.sports ? 'yes' : 'no') + '16.png'" v-bind:alt="show.sports ? 'Y' : 'N'" width="16" height="16" /></td></tr>
                        <tr><td class="showLegend">Anime: </td><td><img v-bind:src="'dist/images/' + (show.anime ? 'yes' : 'no') + '16.png'" v-bind:alt="show.anime ? 'Y' : 'N'" width="16" height="16" /></td></tr>
                        <tr><td class="showLegend">DVD Order: </td><td><img v-bind:src="'dist/images/' + (show.dvdrder ? 'yes' : 'no') + '16.png'" v-bind:alt="show.dvdOrder ? 'Y' : 'N'" width="16" height="16" /></td></tr>
                        <tr><td class="showLegend">Scene Numbering: </td><td><img v-bind:src="'dist/images/' + (show.scene ? 'yes' : 'no') + '16.png'" v-bind:alt="show.scene ? 'Y' : 'N'" width="16" height="16" /></td></tr>
                    </table>
                </div>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="pull-left" >
            Change selected episodes to:<br>
            <select id="statusSelect" class="form-control form-control-inline input-sm">
                <!-- @TODO: Make this dynamic and add code to add/remove failed download options -->
                <option value="3">Wanted</option>
                <option value="5">Skipped</option>
                <option value="7">Ignored</option>
                <option value="104">Downloaded (SDTV)</option>
                <option value="204">Downloaded (SD DVD)</option>
                <option value="404">Downloaded (720p HDTV)</option>
                <option value="804">Downloaded (RawHD)</option>
                <option value="1604">Downloaded (1080p HDTV)</option>
                <option value="3204">Downloaded (720p WEB-DL)</option>
                <option value="6404">Downloaded (1080p WEB-DL)</option>
                <option value="12804">Downloaded (720p BluRay)</option>
                <option value="25604">Downloaded (1080p BluRay)</option>
                <option value="51204">Downloaded (4K UHD TV)</option>
                <option value="102404">Downloaded (4K UHD WEB-DL)</option>
                <option value="204804">Downloaded (4K UHD BluRay)</option>
                <option value="409604">Downloaded (8K UHD TV)</option>
                <option value="819204">Downloaded (8K UHD WEB-DL)</option>
                <option value="1638404">Downloaded (8K UHD BluRay)</option>
                <option value="3276804">Downloaded (Unknown)</option>
                <option value="106">Archived (SDTV)</option>
                <option value="206">Archived (SD DVD)</option>
                <option value="406">Archived (720p HDTV)</option>
                <option value="806">Archived (RawHD)</option>
                <option value="1606">Archived (1080p HDTV)</option>
                <option value="3206">Archived (720p WEB-DL)</option>
                <option value="6406">Archived (1080p WEB-DL)</option>
                <option value="12806">Archived (720p BluRay)</option>
                <option value="25606">Archived (1080p BluRay)</option>
                <option value="51206">Archived (4K UHD TV)</option>
                <option value="102406">Archived (4K UHD WEB-DL)</option>
                <option value="204806">Archived (4K UHD BluRay)</option>
                <option value="409606">Archived (8K UHD TV)</option>
                <option value="819206">Archived (8K UHD WEB-DL)</option>
                <option value="1638406">Archived (8K UHD BluRay)</option>
                <option value="3276806">Archived (Unknown)</option>
            </select>
            <input type="hidden" id="showID" v-bind:value="show.id.imdb" />
            <input type="hidden" id="indexer" v-bind:value="show.indexer" />
            <input class="btn btn-inline" type="button" id="changeStatus" value="Go" />
        </div>
        <br>
        <div class="pull-right clearfix" id="checkboxControls">
            <div style="padding-bottom: 5px;">
                 <!-- total_snatched = epCounts[Overview.SNATCHED] + epCounts[Overview.SNATCHED_PROPER] + epCounts[Overview.SNATCHED_BEST] %>
                <label for="wanted"><span class="wanted"><input type="checkbox" id="wanted" checked="checked" /> Wanted: <b>${epCounts[Overview.WANTED]}</b></span></label>
                <label for="qual"><span class="qual"><input type="checkbox" id="qual" checked="checked" /> Allowed: <b>${epCounts[Overview.QUAL]}</b></span></label>
                <label for="good"><span class="good"><input type="checkbox" id="good" checked="checked" /> Preferred: <b>${epCounts[Overview.GOOD]}</b></span></label>
                <label for="skipped"><span class="skipped"><input type="checkbox" id="skipped" checked="checked" /> Skipped: <b>${epCounts[Overview.SKIPPED]}</b></span></label>
                <label for="snatched"><span class="snatched"><input type="checkbox" id="snatched" checked="checked" /> Snatched: <b>${total_snatched}</b></span></label> -->
            </div>
            <button id="popover" type="button" class="btn btn-xs">Select Columns <b class="caret"></b></button>
            <div class="pull-right" >
                <button class="btn btn-xs seriesCheck">Select Filtered Episodes</button>
                <button class="btn btn-xs clearAll">Clear All</button>
            </div>
        </div>
        <br>
        <br>
        <br>
        <table v-bind:id="show.showType === 'anime' ? 'animeTable' : 'showTable'" v-bind:class="(config.fanartBackground ? 'displayShowTableFanArt tablesorterFanArt' : 'displayShowTable') + 'display_show'" cellspacing="0" border="0" cellpadding="0">
            <thead>
                <tr class="seasoncols" style="display:none;">
                    <th data-sorter="false" data-priority="critical" class="col-checkbox"><input type="checkbox" class="seasonCheck"/></th>
                    <th data-sorter="false" class="col-metadata">NFO</th>
                    <th data-sorter="false" class="col-metadata">TBN</th>
                    <th data-sorter="false" class="col-ep">Episode</th>
                    <th data-sorter="false" v-bind:class="'col-ep' + (show.showType === 'anime' ? '' : 'columnSelector-false')">Absolute</th>
                    <th data-sorter="false" v-bind:class="'col-ep' + (show.scene ? '' : 'columnSelector-false')">Scene</th>
                    <!-- <th data-sorter="false" ${("class=\"col-ep columnSelector-false\"", "class=\"col-ep\"")[bool(scene_anime)]}>Scene Absolute</th> -->
                    <th data-sorter="false" class="col-name">Name</th>
                    <th data-sorter="false" class="col-name columnSelector-false">File Name</th>
                    <th data-sorter="false" class="col-ep columnSelector-false">Size</th>
                    <th data-sorter="false" class="col-airdate">Airdate</th>
                    <th data-sorter="false" v-bind:class="'col-ep' + (config.downloadUrl ? '' : 'columnSelector-false')">Download</th>
                    <th data-sorter="false" v-bind:class="'col-ep' + (config.useSubtitles ? '' : 'columnSelector-false')">Subtitles</th>
                    <th data-sorter="false" class="col-status">Status</th>
                    <th data-sorter="false" class="col-search">Search</th>
                </tr>
            </thead>
            <tbody v-for="season in reverse(show.seasons)" v-bind:class="config.displayAllSeasons ? '' : 'toggle collapse' + (season[0].season === 0 ? ' in' : '')" v-bind:id="config.displayAllSeasons ? '' : 'collapseSeason-' + season[0].season">
                <tr v-for="episode in reverse(season)" v-bind:class="'season-' + episode.season + ' seasonstyle'" v-bind:id="'S' + episode.season + 'E' + episode.episode">
                    <td class="col-checkbox">
                        <input v-if="episode.status !== 'Unaired'" type="checkbox" class="epCheck" v-bind:id="episode.season + 'x' + episode.episode" v-bind:name="episode.season + 'x' + episode.episode" />
                    </td>
                    <td align="center"><img v-bind:src="'dist/images/nfo' + (episode.hasNfo ? '' : '-no') + '.gif'" v-bind:alt="episode.hasNfo ? 'Y' : 'N'" width="23" height="11" /></td>
                    <td align="center"><img v-bind:src="'dist/images/tbn' + (episode.hasTbn ? '' : '-no') + '.gif'" v-bind:alt="episode.hasTbn ? 'Y' : 'N'" width="23" height="11" /></td>
                    <td align="center">
                        <!-- text = str(epResult['episode'])
                        if epLoc != '' and epLoc is not None:
                            text = '<span title="' + epLoc + '" class="addQTip">' + text + "</span>"
                            epCount += 1
                            if not epLoc in epList:
                                epSize += epResult["file_size"]
                                epList.append(epLoc)
                        ${text} -->
                    </td>
                    <td align="center">{{episode.absoluteNumber}}</td>
                    <td align="center">
                        <!-- <input type="text" placeholder="${str(dfltSeas) + 'x' + str(dfltEpis)}" size="6" maxlength="8"
                        class="sceneSeasonXEpisode form-control input-scene" data-for-season="${epResult["season"]}" data-for-episode="${epResult["episode"]}"
                        id="sceneSeasonXEpisode_${show.indexerid}_${str(epResult["season"])}_${str(epResult["episode"])}"
                        title="Change this value if scene numbering differs from the indexer episode numbering. Generally used for non-anime shows."
                        if dfltEpNumbering:
                            value=""
                        else:
                            value="${str(scSeas)}x${str(scEpis)}"
                        endif
                        style="padding: 0; text-align: center; max-width: 60px;"/> -->
                    </td>
                    <td align="center">
                        <!-- <input type="text" placeholder="${str(dfltAbsolute)}" size="6" maxlength="8"
                        class="sceneAbsolute form-control input-scene" data-for-absolute="${epResult["absolute_number"]}"
                        id="sceneAbsolute_${show.indexerid}${"_"+str(epResult["absolute_number"])}"
                        title="Change this value if scene absolute numbering differs from the indexer absolute numbering. Generally used for anime shows."
                        if dfltAbsNumbering:
                            value=""
                        else:
                            value="${str(scAbsolute)}"
                        endif
                        style="padding: 0; text-align: center; max-width: 60px;"/> -->
                    </td>
                    <td class="col-name">
                        <img v-if="episode.description" src="dist/images/info32.png" width="16" height="16" class="plotInfo" alt="" v-bind:id="'plot_info_' + episode.season + '_' + episode.episode" />
                        <img v-else src="dist/images/info32.png" width="16" height="16" class="plotInfoNone" alt="" />
                        <span>{{episode.title}}</span>
                    </td>
                    <td class="col-name">{{episode.location}}</td>
                    <td v-if="episode.fileSize" class="col-ep">{{prettyFileSize(episode.fileSize)}}</td>
                    <td class="col-airdate">
                        <time v-if="(new Date(episode.airDate)).getFullYear() >= 1970" v-bind:datetime="(new Date(episode.airDate)).toISOString()" class="date">{{new Date(episode.airDate)}}</time>
                    </td>
                    <td>
                        <center v-if="config.downloadUrl && episode.location && [statusStrings.DOWNLOADED, statusStrings.ARCHIVED].indexOf(episode.status)">
                            <a v-bind:href="config.downloadUrl + episode.location.replace(config.rootDirs.split('|')[1], '')">Download</a>
                        </center>
                    </td>
                    <td v-for="flag in episode.subtitles" class="col-subtitles" align="center">
                        <!-- ## @TODO: ??? -->
                        <!-- ## alt="${subtitles.name_from_code(flag)}" -->
                        <img v-bind:src="'dist/images/subtitles/flags/' + flag + '.png'" width="16" height="11" onError="this.onerror=null;this.src='images/flags/unknown.png';" />
                    </td>
                    <!-- ##      curStatus, curQuality = Quality.splitCompositeStatus(int(epResult["status"])) %>
                    ##     % if curQuality != Quality.NONE:
                    ##         <td class="col-status">${statusStrings[curStatus]} ${renderQualityPill(curQuality)}</td>
                    ##     % else:
                    ##         <td class="col-status">${statusStrings[curStatus]}</td>
                    ##     % endif -->
                    <td class="col-search">
                        <template v-if="episode.season !== 0">
                            <a v-if="config.useFailedDownloads && [statusStrings.SNATCHED, statusStrings.SNATCHED_PROPER, statusStrings.SNATCHED_BEST, statusStrings.DOWNLOADED].indexOf(episode.status)">
                                <img src="dist/images/search16.png" height="16" alt="retry" title="Retry Download" />
                            </a>
                            <a v-else>
                                <img data-ep-search src="dist/images/search16.png" width="16" height="16" alt="search" title="Forced Search" />
                            </a>
                            <!-- <a class="epManualSearch" id="${str(show.indexerid)}x${str(epResult["season"])}x${str(epResult["episode"])}" name="${str(show.indexerid)}x${str(epResult["season"])}x${str(epResult["episode"])}" href="home/snatchSelection?show=${show.indexerid}&amp;season=${epResult["season"]}&amp;episode=${epResult["episode"]}&amp;manual_search_type=episode">
                                <img data-ep-manual-search src="dist/images/manualsearch.png" width="16" height="16" alt="search" title="Manual Search" />
                            </a> -->
                        </template>
                        <template v-else>
                            <!-- <a class="epManualSearch" id="${str(show.indexerid)}x${str(epResult["season"])}x${str(epResult["episode"])}" name="${str(show.indexerid)}x${str(epResult["season"])}x${str(epResult["episode"])}" href="home/snatchSelection?show=${show.indexerid}&amp;season=${epResult["season"]}&amp;episode=${epResult["episode"]}&amp;manual_search_type=episode"><img data-ep-manual-search src="dist/images/manualsearch.png" width="16" height="16" alt="search" title="Manual Search" /></a> -->
                        <template>
                    <!-- ##     % if int(epResult["status"]) not in Quality.SNATCHED + Quality.SNATCHED_PROPER and app.USE_SUBTITLES and show.subtitles and epResult["location"] and subtitles.needs_subtitles(epResult['subtitles']):
                    ##         <a class="epSubtitlesSearch" href="home/searchEpisodeSubtitles?show=${show.indexerid}&amp;season=${epResult["season"]}&amp;episode=${epResult["episode"]}"><img src="dist/images/closed_captioning.png" height="16" alt="search subtitles" title="Search Subtitles" /></a>
                    ##     % endif -->
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
// Services
import api from '../services/api.js'
import apiAsset from '../services/apiAsset.js'

// Methods
import anonRedirect from '../methods/anonRedirect.js'
import prettyFileSize from '../methods/prettyFileSize.js'

// Components
import QualityPill from '../components/QualityPill.vue'

export default {
    name: 'show',
    store: ['config', 'statusStrings', 'shows'],
    data() {
        return {
            isLoading: false,
            show: {
                id: {
                    tvdb: '',
                    imdb: ''
                },
                config: {
                    flattenFolders: null,
                    release: {
                        blacklist: [],
                        ignoredWords: [],
                        requiredWords: [],
                        whitelist: []
                    }
                },
                seasons: [
                    [
                        {
                            season: null
                        }
                    ]
                ],
                rating: {
                    imdb: {
                        stars: null,
                        votes: null
                    }
                },
                queue: {
                    action: '',
                    message: ''
                },
                year: {
                    start: null
                },
                size: 0 // @TODO: This is ${pretty_file_size(app.helpers.get_size(showLoc[0]))} in Python
            }
        }
    },
    mounted() {
        this.getShows();
        this.getShow(this.$route.params.showId);
    },
    methods: {
        apiAsset,
        getShow: function(showId) {
            if (showId) {
                var vm = this;
                if (!vm.isLoading) {
                    vm.isLoading = true;
                    api.get('show/tvdb' + showId).then(function(response) {
                        for (var key in response.data) {
                            vm.$set(vm.show, key, response.data[key]);
                        }
                        vm.isLoading = false;
                    }).catch(function (error) {
                        throw new Error(error);
                    });
                }
            }
        },
        getShows: function() {
            var vm = this;
            api.get('show').then(function(response) {
                vm.$set(vm, 'shows', response.data);
            }).catch(function (error) {
                throw new Error(error);
            });
        },
        prevShow: function() {
            let prevShow = document.querySelector(`option[value="${this.show.id[this.show.indexer]}"]`).previousElementSibling;
            if (prevShow) {
                this.getShow(prevShow.value);
            }
        },
        nextShow: function() {
            let nextShow = document.querySelector(`option[value="${this.show.id[this.show.indexer]}"]`).nextElementSibling;
            if (nextShow) {
                this.getShow(nextShow.value);
            }
        },
        prettyFileSize,
        anonRedirect,
        reverse: function(x){
            return x.slice().reverse()
        }
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
    },
    components: {
        'quality-pill': QualityPill
    }
}
</script>
