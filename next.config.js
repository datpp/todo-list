const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer');
const withLess = require('@zeit/next-less');

const withLessConfig = {};

const withBundleAnalyzerConfig = {
    enabled: process.env.ANALYZE === 'true'
};

module.exports = withPlugins(
    [
        [withLess, withLessConfig],
        [withBundleAnalyzer(withBundleAnalyzerConfig)]
    ], {
        // Use the CDN in production and localhost for development.
        assetPrefix: process.env.ASSET_PREFIX
    }
);
