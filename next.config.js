const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer');
// const withLess = require('@zeit/next-less');
// const withLessConfig = {cssModule: false};

const withBundleAnalyzerConfig = {
    enabled: process.env.ANALYZE === 'true'
};

module.exports = withPlugins(
    [
        [withBundleAnalyzer(withBundleAnalyzerConfig)]
    ], {
        // Use the CDN in production and localhost for development.
        assetPrefix: process.env.ASSET_PREFIX,
        serverRuntimeConfig: {
            // Will only be available on the server side
        },
        publicRuntimeConfig: {
            // Will be available on both server and client
            apiEndpoint: 'http://localhost:3000/api',
            persistStore: {
                whitelist: ['todo', 'task']
            }
        },
    }
);
