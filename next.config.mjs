const nextConfig = {
  experimental: {
    forceSwcTransforms: true,
  },
  sassOptions: {
    includePaths: ['styles'],
  },
  images: {
    domains: [
      'dev-onikuma-s3.s3.ap-northeast-2.amazonaws.com',
      's2.coinmarketcap.com',
    ],
  },
  env: {
    NEXT_PUBLIC_WAGMI_PROJECT_ID: process.env.WAGMI_PROJECT_ID,
    NEXT_PUBLIC_API_BASE_URL: process.env.API_BASE_URL,
    NEXT_PUBLIC_SOCKET_BASE_URL: process.env.SOCKET_BASE_URL,
    NEXT_PUBLIC_CLIENT_SERVER_URL: process.env.CLIENT_SERVER_URL,
    NEXT_PUBLIC_STORAGE_BASE_URL: process.env.STORAGE_BASE_URL,
    NEXT_PUBLIC_BERACHAIN_RPC_URL: process.env.BERACHAIN_RPC_URL,
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      use: ['@svgr/webpack'],
    });
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
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
            value:
              'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization',
          },
        ],
      },
    ];
  },
  rewrites: async () => {
    return [
      {
        source: '/api/users/login',
        destination: `${process.env.API_BASE_URL}/api/users/login`,
      },
      {
        source: '/api/users/detail',
        destination: `${process.env.API_BASE_URL}/api/users/detail`,
      },
      {
        source: '/api/users/refresh',
        destination: `${process.env.API_BASE_URL}/api/users/refresh`,
      },
      {
        source: '/api/topics/create',
        destination: `${process.env.API_BASE_URL}/api/topics/create`,
      },
      {
        source: '/api/topics/titles',
        destination: `${process.env.API_BASE_URL}/api/topics/titles`,
      },
      {
        source: '/api/topics/detail/:id*',
        destination: `${process.env.API_BASE_URL}/api/topics/detail/:id*`,
      },
      {
        source: '/api/topics/on-going',
        destination: `${process.env.API_BASE_URL}/api/topics/on-going`,
      },
      {
        source: '/api/topics/biggest-topic-voice/:id*',
        destination: `${process.env.API_BASE_URL}/api/topics/biggest-topic-voice/:id*`,
      },
      {
        source: '/api/topics/biggest-picker-image/:id*',
        destination: `${process.env.API_BASE_URL}/api/topics/biggest-picker-image/:id*`,
      },
      {
        source: '/api/topics/share-image/:id*',
        destination: `${process.env.API_BASE_URL}/api/topics/share-image/:id*`,
      },
      {
        source: '/api/activities/pool-in',
        destination: `${process.env.API_BASE_URL}/api/activities/pool-in`,
      },
      {
        source: '/api/activities/all/:id*',
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
          },
        ],
        destination: `${process.env.API_BASE_URL}/api/activities/all/:id*?page=:page&pageSize=:pageSize`,
      },
      {
        source: '/api/activities/buy-estimation/:id*',
        destination: `${process.env.API_BASE_URL}/api/activities/buy-estimation/:id*`,
      },
      {
        source: '/api/activities/vote/:id*',
        destination: `${process.env.API_BASE_URL}/api/activities/vote/:id*`,
      },
      {
        source: '/api/comments',
        destination: `${process.env.API_BASE_URL}/api/comments`,
      },
      {
        source: '/api/comments/all/:id*',
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
          },
        ],
        destination: `${process.env.API_BASE_URL}/api/comments/all/:id*?page=:page&pageSize=:pageSize`,
      },
      {
        source: '/api/comments/likes/:id*',
        destination: `${process.env.API_BASE_URL}/api/comments/likes/:id*`,
      },
      {
        source: '/api/dashboards/detail/:id*',
        destination: `${process.env.API_BASE_URL}/api/dashboards/detail/:id*`,
      },
      {
        source: '/api/dashboards/all-my-data',
        destination: `${process.env.API_BASE_URL}/api/dashboards/all-my-data`,
      },
      {
        source: '/api/dashboards/my-data/detail/:id*',
        destination: `${process.env.API_BASE_URL}/api/dashboards/my-data/detail/:id*`,
      },
      {
        source: '/api/image',
        destination: `${process.env.CLIENT_SERVER_URL}/api/image`,
      },
      {
        source: '/api/result',
        destination: `${process.env.CLIENT_SERVER_URL}/api/result`,
      },
      {
        source: '/api/poll-result',
        destination: `${process.env.CLIENT_SERVER_URL}/api/poll-result`,
      },
      {
        source: '/api/dashboards/leader-board',
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
          },
        ],
        destination: `${process.env.API_BASE_URL}/api/dashboards/leader-board?page=:page&pageSize=:pageSize`,
      },
    ];
  },
};

export default nextConfig;
