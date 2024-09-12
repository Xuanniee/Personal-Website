(function (window) {
    window.__env = window.__env || {};
    // Render injects environment variables at build time
    // Remember must build first before we replace the Env variable since this file is found in assets after building only
    window.__env.GITHUB_ACCESS_TOKEN = 'REPLACE_WITH_GITHUB_ACCESS_TOKEN';
})(this);
