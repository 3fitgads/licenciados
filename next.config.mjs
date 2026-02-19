/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  // Reduce repeat downloads on returning visits by allowing long-lived browser caching
  // for assets served from /public (e.g. /logo.png). When changing a file, prefer
  // versioning the filename (e.g. logo.v2.png) to avoid clients keeping old cache.
  async headers() {
    const longCache = 'public, max-age=31536000, immutable';

    return [
      {
        // Images in /public
        source: '/:all*(png|jpg|jpeg|webp|gif|svg|ico)',
        headers: [{ key: 'Cache-Control', value: longCache }],
      },
      {
        // Fonts in /public
        source: '/:all*(woff2|woff|ttf|otf)',
        headers: [{ key: 'Cache-Control', value: longCache }],
      },
      {
        // Static assets (JS, CSS) in /public
        source: '/:all*(js|css)',
        headers: [{ key: 'Cache-Control', value: longCache }],
      },
    ];
  },

  // Next/Image optimized responses are served from `/_next/image` (not from /public directly).
  // Increasing this reduces repeat requests, but keep it conservative to avoid stale images
  // if you replace files while keeping the same filenames.
  images: {
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days - increased to reduce edge requests
  },
};

export default nextConfig;
