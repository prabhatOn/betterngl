const withPWA = require('next-pwa')({
    dest: 'public',
    disable: process.env.NODE_ENV === 'development',
    runtimeCaching: [
        {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
                cacheName: 'google-fonts',
                expiration: {
                    maxEntries: 10,
                    maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
                },
                cacheableResponse: {
                    statuses: [0, 200],
                },
            },
        },
        {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: 'StaleWhileRevalidate',
            options: {
                cacheName: 'jsdelivr',
                expiration: {
                    maxEntries: 20,
                    maxAgeSeconds: 365 * 24 * 60 * 60, // 1 year
                },
                cacheableResponse: {
                    statuses: [0, 200],
                },
            },
        },
    ],
});

const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },

    async headers() {
        return [
            {
                // Cache static resources for 1 year
                source: '/:all*(js|css|svg|png|jpg|jpeg|gif|woff2|ttf|eot)',
                headers: [
                    {
                        key: 'Cache-Control',
                        value: 'public, max-age=31536000, immutable',
                    },
                ],
            },
        ];
    },

    webpack(config) {
        config.optimization.splitChunks = {
            cacheGroups: {
                framework: {
                    chunks: 'all',
                    name: 'framework',
                    test: /[\\/]node_modules[\\/](react|react-dom|next)[\\/]/,
                    priority: 40,
                    enforce: true,
                },
                commons: {
                    name: 'commons',
                    minChunks: 2,
                    chunks: 'all',
                    reuseExistingChunk: true,
                },
            },
        };

        return config;
    },

    compress: true,
    poweredByHeader: false,

    images: {
        domains: ['images.unsplash.com', 'cdn.jsdelivr.net'],
        deviceSizes: [640, 768, 1024, 1280, 1600, 1920],
        formats: ['image/webp'],
    },
};

module.exports = withPWA(nextConfig);
