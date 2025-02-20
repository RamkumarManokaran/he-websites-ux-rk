/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    removeConsole: {
      exclude: ["error"],
    },
  },
  productionBrowserSourceMaps: true,
  reactStrictMode: false,
  env: {
    PROJECT: "PGS",
    AFFILATE_ID: "607022",
    DOMAIN: "postgraduatesearch.com",
    SUBDOMAIN: "https://mdev.dev.aws.whatuni.com",
    NEXT_PUBLIC_HOME_REVIEW_API_ENDPOINT:
      "https://4oov0t9iqk.execute-api.eu-west-2.amazonaws.com/dev-hewebsites-bff/v1/homepage/reviews",
    NEXT_PUBLIC_SEARCH_AJAX_API:
      "https://4oov0t9iqk.execute-api.eu-west-2.amazonaws.com/dev-hewebsites-bff/v1/homepage",
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
    ],
  },
};

export default nextConfig;
