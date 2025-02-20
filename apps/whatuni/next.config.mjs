/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
  },
  skipTrailingSlashRedirect: true,
  // productionBrowserSourceMaps: true,
  async headers() {
    return [
      {
        source: "/_next/static/:path*",
        headers: [
          {
            key: "max-http-header-size",
            value: "16384",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/money/ug-student-cost-of-living-calculator',
        destination: '/money/ug-student-budget-calculator/',
        permanent: true, // Use true for 301 permanent redirect, false for 302 temporary redirect
      }
    ];
  },
 
  //trailingSlash: true,
  // async redirects() {
  //   return [
  //     {
  //       source: "/:path*/",
  //       has: [
  //         {
  //           type: "query",
  //           key: "someQueryParam",
  //         },
  //       ],
  //       destination: "/:path*",
  //       permanent: true,
  //     },
  //   ];
  // },
  reactStrictMode: false,

  env: {
    PROJECT: "Whatuni",
    DOMAIN: "whatuni.com",
    SUBDOMAIN: "https://mdev.dev.aws.whatuni.com",
    AFFILATE_ID: "220703",
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.ctfassets.net" },
      {
        protocol: "https",
        hostname: "mdev.dev.aws.whatuni.com",
      },
      { protocol: "https", hostname: "videos.ctfassets.net" },
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
    ],
  },
};

export default nextConfig;
