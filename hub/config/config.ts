import { defineConfig, utils } from 'umi';
import defaultSettings from './defaultSettings';

const { winPath } = utils;

const { primaryColor } = defaultSettings;
const { NODE_ENV } = process.env;

export default defineConfig({
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    title: false,
    baseNavigator: true,
    baseSeparator: '-',
  },
  targets: {
    ie: 11,
  },
  qiankun: {
    master: {},
  },
  history: { type: 'browser' },
  hash: true,
  devtool:
    NODE_ENV === 'development' ? 'cheap-module-eval-source-map' : 'source-map',
  // 路由配置
  routes: [
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/',
          exact: true,
          component: './wellcome',
        },
        {
          path: '/app',
          routes: [
            {
              path: '/app*',
              component: './sub-app-container',
            },
            // 追加应用看这里
          ],
        },
        {
          path: '/exception/:code',
          component: './exception',
        },
        {
          component: './exception',
        },
      ],
    },
  ],
  // Theme for antd
  // https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': primaryColor,
  },
  ignoreMomentLocale: true,
  lessLoader: {
    javascriptEnabled: true,
    modifyVars: {
    },
  },
  cssLoader: {
    modules: {
      getLocalIdent: (
        context: {
          resourcePath: string;
        },
        _: string,
        localName: string,
      ) => {
        if (
          context.resourcePath.includes('node_modules') ||
          context.resourcePath.includes('global.less')
        ) {
          return localName;
        }

        const match = context.resourcePath.match(/src(.*)/);
        if (match && match[1]) {
          const antdProPath = match[1].replace('.less', '');
          const arr = winPath(antdProPath)
            .split('/')
            .map((a: string) => a.replace(/([A-Z])/g, '-$1'))
            .map((a: string) => a.toLowerCase());
          return `boss-${arr.join('-')}-${localName}`.replace(/--/g, '-');
        }
        return localName;
      },
    },
  },
  autoprefixer: {
    flexbox: true,
  },
  manifest: {
    basePath: '/',
  },
});
