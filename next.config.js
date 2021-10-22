// Default `reactStrictMode` is true when doing `npx create-next-app`.
// If `reactStrictMode` is true, it will temporarily cause problems when integrated with Material UI v4.2.x
// In other words :
// 1. Set `reactStrictMode` to `false` if using Material UI v4.2.x
// 2. Set `reactStrictMode` to `true` if using Material UI v5.0.x
module.exports = {
    reactStrictMode: true,
    // Notes : Guide https://nextjs.org/docs/basic-features/eslint#linting-custom-directories
    eslint: {
        dirs: ['pages', 'src', 'examples', 'styles'],
    },
}
