const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  sassOptions: {
    includePaths: ["styles"],
  },
  images: {
    domains: [
      'dev-onikuma-s3.s3.ap-northeast-2.amazonaws.com',
      's2.coinmarketcap.com'
    ]
  },
  env: {
    NEXT_PUBLIC_WAGMI_PROJECT_ID: process.env.WAGMI_PROJECT_ID,
    NEXT_PUBLIC_API_BASE_URL: process.env.API_BASE_URL,
    NEXT_PUBLIC_SOCKET_BASE_URL: process.env.SOCKET_BASE_URL,
    NEXT_PUBLIC_CLIENT_SERVER_URL: process.env.CLIENT_SERVER_URL
  },
  webpack(
    config,
    { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
    ) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    config.externals.push("pino-pretty", "lokijs", "encoding", {
      canvas: 'commonjs canvas',
      sharp: 'commonjs sharp',
      'utf-8-validate': 'commonjs utf-8-validate',
      bufferutil: 'commonjs bufferutil',
    }
    );
    config.resolve.fallback = { fs: false, net: false, tls: false }

    return config;
  },
  async headers() {
    return [
      {
        source: '/usports/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Expose-Headers',
            value: '*',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
          },
        ],
      },
    ]
  },
  rewrites: async() => {
    return [
      {
        source: '/users/login',
        destination: `${process.env.API_BASE_URL}/users/login`,
      },
      {
        source: '/users/detail',
        destination: `${process.env.API_BASE_URL}/users/detail`,
      },
      {
        source: '/users/refresh',
        destination: `${process.env.API_BASE_URL}/users/refresh`,
      },
      {
        source: '/topics/create',
        destination: `${process.env.API_BASE_URL}/topics/create`,
      },
      {
        source: '/topics/titles',
        destination: `${process.env.API_BASE_URL}/topics/titles`,
      },
      {
        source: '/topics/detail/:id*',
        destination: `${process.env.API_BASE_URL}/topics/detail/:id*`,
      },
      {
        source: '/topics/on-going',
        destination: `${process.env.API_BASE_URL}/topics/on-going`,
      },
      {
        source: '/topics/biggest-topic-voice/:id*',
        destination: `${process.env.API_BASE_URL}/topics/biggest-topic-voice/:id*`,
      },
      {
        source: '/topics/biggest-picker-image/:id*',
        destination: `${process.env.API_BASE_URL}/topics/biggest-picker-image/:id*`,
      },
      {
        source: '/topics/share-image/:id*',
        destination: `${process.env.API_BASE_URL}/topics/share-image/:id*`,
      },
      {
        source: '/activities/pool-in',
        destination: `${process.env.API_BASE_URL}/activities/pool-in`,
      },
      {
        source: '/activities/all/:id*',
        destination: `${process.env.API_BASE_URL}/activities/all/:id*`,
      },
      {
        source: '/activities/vote/:id*',
        destination: `${process.env.API_BASE_URL}/activities/vote/:id*`,
      },
      {
        source: '/comments',
        destination: `${process.env.API_BASE_URL}/comments`,
      },
      {
        source: '/comments/all/:id*',
        has: [
          {
            type: 'query',
            key: 'page',
            value: '(?<page>.*)',
          },
          {
            type: 'query',
            key: 'pageSize',
            value: '(?<pageSize>.*)',
          }
        ],
        destination: `${process.env.API_BASE_URL}/comments/all/:id*?page=:page&pageSize=:pageSize`,
      },
      {
        source: '/comments/likes/:id*',
        destination: `${process.env.API_BASE_URL}/comments/likes/:id*`,
      },
      {
        source: '/dashboards/detail/:id*',
        destination: `${process.env.API_BASE_URL}/dashboards/detail/:id*`,
      },
      {
        source: '/dashboards/all-my-data',
        destination: `${process.env.API_BASE_URL}/dashboards/all-my-data`,
      },
      {
        source: '/dashboards/my-data/detail/:id*',
        destination: `${process.env.API_BASE_URL}/dashboards/my-data/detail/:id*`,
      },
      {
        source: '/api/image',
        destination: `${process.env.CLIENT_SERVER_URL}/api/image`,
      },
      {
        source: '/api/result',
        destination: `${process.env.CLIENT_SERVER_URL}/api/result`,
      }
    ]
  }
};

export default nextConfig;