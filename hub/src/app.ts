import { getApps } from './services';

export const qiankun = async () => {
  const apps = await getApps();
  return {
    apps: apps.map(app => ({
      name: app.name,
      entry: app.url,
    })),
  };
};
