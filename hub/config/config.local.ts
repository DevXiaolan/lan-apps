import { IConfig } from 'umi';

export default {
  proxy: {
    // Boss 后端服务
    '/api/': {
      target: 'http://localhost:7001/',
      changeOrigin: true,
    },
    // 盒子前端服务
    '/box/': {
      target: 'http://localhost:8001/',
      changeOrigin: true,
      pathRewrite: { '^/box': '' },
    },
    // 盒子后端服务
    '/box-api/': {
      target: 'http://localhost:7002/',
      changeOrigin: true,
      pathRewrite: { '^/box-api': '' },
    },
  },
} as IConfig;
