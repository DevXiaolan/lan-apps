import isPlainObject from 'lodash/isPlainObject';
import { history as router } from 'umi';
import { parse } from 'qs';
import { Tree } from '@/store/global';
import defaultSettings from '../../config/defaultSettings';

// eslint-disable-next-line max-len, no-useless-escape
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/;

const isUrl = (path: string): boolean => reg.test(path);

/**
 * 删除含有 null 或者 undefined 的字段
 * @param data 要检测的数据
 */
function deleteNullOrUndefinedField(data: object) {
  return Object.keys(data).reduce((pre, key) => {
    let item = data[key];
    if (isPlainObject(item)) {
      item = deleteNullOrUndefinedField(item);
    }
    if (!(item == null)) {
      pre[key] = item; // eslint-disable-line no-param-reassign
    }
    return pre;
  }, {});
}

function replaceRouter(redirect: string) {
  router.replace(redirect || '/');
}

function getPageQuery() {
  return parse(window.location.search, {
    ignoreQueryPrefix: true,
  });
}

function deepFlatten<T>(arr: T[]): T[] {
  const ret: T[] = [];
  return ret.concat(...arr.map(v => (Array.isArray(v) ? deepFlatten(v) : v)));
}

function flatTree<T, K extends keyof T>(arr: T[], path: K): T[] {
  const emptyArr: T[] = [];
  return emptyArr.concat(
    ...arr.map(item => {
      const child: T[] = (item[path] as any) as T[];
      if (Array.isArray(child)) {
        return [item].concat(...flatTree(child, path));
      }
      return item;
    }),
  );
}

const isDev = (): boolean => {
  const { NODE_ENV } = process.env;
  return NODE_ENV === 'development';
};

// 获取 websocket 的连接地址与协议
const getWebsocketAddr = () => {
  let isHttps = false;
  if (window.location.protocol.startsWith('https')) {
    isHttps = true;
  }
  const { ws }: any = defaultSettings;
  const wsAddr = isDev() ? ws : window.location.host;
  return isHttps ? `wss://${wsAddr}` : `ws://${wsAddr}`;
};

// 获取用户组有权限的第一个页面
function getAuthGrpupIndexPageUrl(sidebar?: Tree[]): string | undefined {
  let url;

  if (sidebar && sidebar.length) {
    const item = sidebar[0];
    if (item.children && item.children.length) {
      url = getAuthGrpupIndexPageUrl(item.children);
    } else {
      url = item.url;
    }
  }

  return url;
}

// 邮箱校验
function emailChecker(email: string) {
  // eslint-disable-next-line no-useless-escape
  return !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email,
  );
}

export {
  isUrl,
  deleteNullOrUndefinedField,
  replaceRouter,
  getPageQuery,
  deepFlatten,
  flatTree,
  getWebsocketAddr,
  getAuthGrpupIndexPageUrl,
  emailChecker,
};
