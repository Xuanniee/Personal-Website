export const environment = {
    production: true,
    githubAccessToken: (window as any).__env?.GITHUB_ACCESS_TOKEN || '', // Placeholder, to be replaced at runtime
};
  