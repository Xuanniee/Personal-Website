(function (window) {
    window.__env = window.__env || {};
    // Set the environment variable from Render here
    window.__env.GITHUB_ACCESS_TOKEN = ''; // Will be replaced by Render's environment variable
    console.log('GITHUB_ACCESS_TOKEN:', window.__env.GITHUB_ACCESS_TOKEN);
})(this);
