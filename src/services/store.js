export default {
    config: {
        anonRedirect: null,
        anonSplitHome: null,
        comingEpsSort: null,
        datePreset: null,
        fuzzyDating: null,
        themeName: null,
        posterSortby: null,
        posterSortdir: null,
        rootDirs: null,
        sortArticle: null,
        timePreset: null,
        trimZero: null,
        fanartBackground: {
            enabled: null,
            opacity: null
        },
        branch: null,
        commitHash: null,
        release: null,
        sslVersion: null,
        pythonVersion: null,
        databaseVersion: {
            major: null,
            minor: null,
        },
        os: null,
        locale: null,
        localUser: null,
        programDir: null,
        configFile: null,
        dbFilename: null,
        cacheDir: null,
        logDir: null,
        appArgs: null,
        webRoot: null,
        githubUrl: null,
        wikiUrl: null,
        sourceUrl: null,
        displayAllSeasons: null,
        displayShowSpecials: null,
        downloadUrl: null,
        subtitlesMulti: null,
        namingForceFolders: null,
        kodi: {
            enabled: null
        },
        plex: {
            server: {
                enabled: null
            },
            client: {
                enabled: null
            }
        },
        emby: {
            enabled: null
        },
        torrents: {
            enabled: null
        },
        subtitles: {
            enabled: null
        },
        failedDownloads: {
            enabled: null
        },
        layout: {
            comingEpisodes: null,
            history: null,
            home: null
        },
        auth: {
            url: 'http://localhost:8081/api/v2/',
            key: ''
        }
    },
    statusStrings: {
        UNKNOWN: 'Unknown',
        UNAIRED: 'Unaired',
        SNATCHED: 'Snatched',
        DOWNLOADED: 'Downloaded',
        SKIPPED: 'Skipped',
        SNATCHED_PROPER: 'Snatched (Proper)',
        WANTED: 'Wanted',
        ARCHIVED: 'Archived',
        IGNORED: 'Ignored',
        SUBTITLED: 'Subtitled',
        FAILED: 'Failed',
        SNATCHED_BEST: 'Snatched (Best)',
        ENDED: 'Ended',
        CONTINUING: 'Continuing'
    },
    shows: [],
    recentShows: [],
    authenticated: false,
    user: {},
    debug: {
        pageLoadTime: 0
    }
}
