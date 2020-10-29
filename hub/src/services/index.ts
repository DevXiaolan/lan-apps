import { request } from 'umi';

const BASE = 'https://apps-api.lanhao.name';

export interface IApp {
  url: string;
  name: string;
}

export const getApps = async (): Promise<IApp[]> => {
  const { code, data } = await request(`${BASE}/app`, {
    method: 'GET',
  });
  return code === 0 ? data : [];
};