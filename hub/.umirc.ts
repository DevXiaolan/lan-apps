import { defineConfig } from 'umi';

export default defineConfig({
  qiankun: {
    master: {},
  },
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:3000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/layouts/main',
      routes: [
        {
          path: '/:name',
          component: '@/pages/index',
        },
      ],
    },
  ],
});
