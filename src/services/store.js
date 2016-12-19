export default {
    config: {
        anonRedirect: null,
        anonSplitHome: null,
        comingEpsLayout: null,
        comingEpsSort: null,
        datePreset: null,
        fuzzyDating: null,
        historyLayout: null,
        homeLayout: null,
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
        auth: {
            url: 'http://localhost:8081/api/v2/',
            key: 'a2f694d2a12cc1fdc92a9d4bf7aa114c'
        }
    },
    statusStrings: {
        UNKNOWN: "Unknown",
        UNAIRED: "Unaired",
        SNATCHED: "Snatched",
        DOWNLOADED: "Downloaded",
        SKIPPED: "Skipped",
        SNATCHED_PROPER: "Snatched (Proper)",
        WANTED: "Wanted",
        ARCHIVED: "Archived",
        IGNORED: "Ignored",
        SUBTITLED: "Subtitled",
        FAILED: "Failed",
        SNATCHED_BEST: "Snatched (Best)"
    },
    shows: [],
    authenticated: false,
    user: {}
}
