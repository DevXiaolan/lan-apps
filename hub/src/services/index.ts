import { request } from 'umi';

const BASE = 'https://apps-api.lanhao.name';
// const BASE = 'http://127.0.0.1:3001';

export interface IApp {
  entryurl: string;
  name: string;
  icon: string;
}

export const getApps = async (): Promise<IApp[]> => {
  const { code, data } = await request(`${BASE}/app`, {
    method: 'GET',
  });

  return code === 0 ? data : [];
};